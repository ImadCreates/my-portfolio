import { useEffect, useMemo, useRef } from 'react';
import { gsap, T, EASE, prefersReducedMotion } from '../lib/motion';
import { emitCut } from '../lib/blade';

/*
  B1: the live slash, site-wide. A fixed full-viewport canvas active on
  both routes. A fast pointer swipe draws a straight 1px seal line along
  the swipe vector: draw 0.15s on the cut ease, hold one base beat, fade
  1.2s. Three concurrent cuts, oldest fades first.

  Draw stance: on pointerdown over non-interactive space the cursor
  swaps to the blade mark (body.draw-stance); it also engages while a
  fast swipe is armed. Slow drags exit cleanly so text selection works.
  The paint loop only runs while cuts are alive and pauses on hidden
  tabs. Reduced motion mounts nothing.
*/
const DRAW_S = 0.15;
const FADE_S = 1.2;
const MAX_CUTS = 3;
const WINDOW_MS = 120; /* rolling sample window for velocity */
const SPEED_ARM = 1.4; /* px/ms to arm a swipe */
const SPEED_COMMIT = 0.35; /* px/ms: decelerated, commit the cut */
const MIN_LEN = 90; /* px: shorter gestures are not cuts */

const INTERACTIVE =
  'a, button, input, textarea, select, iframe, video, header, [role="button"], [role="dialog"], [contenteditable]';

export default function SlashCanvas() {
  const canvasRef = useRef(null);
  const reduced = useMemo(() => prefersReducedMotion(), []);

  useEffect(() => {
    if (reduced) return undefined;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const seal = getComputedStyle(document.documentElement)
      .getPropertyValue('--color-seal')
      .trim();

    let dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
    };
    resize();
    window.addEventListener('resize', resize);

    const cuts = [];
    let tickerOn = false;

    const render = () => {
      if (document.hidden) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = Math.max(dpr, 1);
      ctx.strokeStyle = seal;
      for (const cut of cuts) {
        ctx.globalAlpha = cut.alpha;
        ctx.beginPath();
        ctx.moveTo(cut.x1 * dpr, cut.y1 * dpr);
        ctx.lineTo(
          (cut.x1 + (cut.x2 - cut.x1) * cut.draw) * dpr,
          (cut.y1 + (cut.y2 - cut.y1) * cut.draw) * dpr,
        );
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };

    const syncTicker = () => {
      const want = cuts.length > 0;
      if (want && !tickerOn) gsap.ticker.add(render);
      if (!want && tickerOn) {
        gsap.ticker.remove(render);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      tickerOn = want;
    };

    const removeCut = (cut) => {
      cut.tweens.forEach((tw) => tw.kill());
      const i = cuts.indexOf(cut);
      if (i > -1) cuts.splice(i, 1);
      syncTicker();
    };

    const spawnCut = (x1, y1, x2, y2) => {
      const cut = { x1, y1, x2, y2, draw: 0, alpha: 1, tweens: [] };
      cuts.push(cut);
      /* Cap at three: force the oldest into a quick fade. */
      while (cuts.length > MAX_CUTS) {
        const oldest = cuts[0];
        oldest.tweens.forEach((tw) => tw.kill());
        oldest.tweens = [
          gsap.to(oldest, {
            alpha: 0,
            duration: T.fast,
            ease: 'none',
            onComplete: () => removeCut(oldest),
          }),
        ];
        if (cuts[0] === oldest) break;
      }
      cut.tweens.push(gsap.to(cut, { draw: 1, duration: DRAW_S, ease: EASE.cut }));
      cut.tweens.push(
        gsap.to(cut, {
          alpha: 0,
          duration: FADE_S,
          delay: DRAW_S + T.base /* hold for one base beat before fading */,
          ease: 'none',
          onComplete: () => removeCut(cut),
        }),
      );
      syncTicker();
      emitCut({ x1, y1, x2, y2 });
    };

    /* Draw stance. Engages on pointerdown over non-interactive space and
       while a swipe is armed; never over links, inputs, or the nav. */
    let stanceHeld = false;
    const setStance = (on) => document.body.classList.toggle('draw-stance', on);

    /* Swipe detection on window so text stays selectable. */
    let pts = [];
    let armed = false;
    let start = null;
    let idleTimer = 0;

    const commit = (endX, endY) => {
      armed = false;
      pts = [];
      clearTimeout(idleTimer);
      if (!stanceHeld) setStance(false);
      if (document.hidden) return;
      if (Math.hypot(endX - start.x, endY - start.y) < MIN_LEN) return;
      spawnCut(start.x, start.y, endX, endY);
    };

    const onDown = (e) => {
      if (e.button !== 0 || e.pointerType !== 'mouse') return;
      if (e.target instanceof Element && e.target.closest(INTERACTIVE)) return;
      stanceHeld = true;
      setStance(true);
    };

    const onMove = (e) => {
      const t = performance.now();
      pts.push({ x: e.clientX, y: e.clientY, t });
      while (pts.length && t - pts[0].t > WINDOW_MS) pts.shift();
      if (pts.length < 2) return;
      const a = pts[0];
      const dist = Math.hypot(e.clientX - a.x, e.clientY - a.y);
      const speed = dist / Math.max(t - a.t, 1);
      if (!armed && speed > SPEED_ARM && dist > 24) {
        armed = true;
        start = { x: a.x, y: a.y };
        if (e.pointerType === 'mouse') setStance(true);
      } else if (armed && speed < SPEED_COMMIT) {
        commit(e.clientX, e.clientY);
      }
      if (armed) {
        /* A swipe that stops without lifting still commits. */
        clearTimeout(idleTimer);
        const { clientX, clientY } = e;
        idleTimer = setTimeout(() => commit(clientX, clientY), 140);
      }
    };

    const onUp = (e) => {
      stanceHeld = false;
      if (armed) commit(e.clientX, e.clientY);
      else setStance(false);
      pts = [];
    };

    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    window.addEventListener('pointercancel', onUp, { passive: true });

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
      clearTimeout(idleTimer);
      setStance(false);
      cuts.slice().forEach(removeCut);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40 h-full w-full"
    />
  );
}
