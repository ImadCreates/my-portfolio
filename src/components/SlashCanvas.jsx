import { useEffect, useMemo, useRef } from 'react';
import { gsap, T, EASE, prefersReducedMotion } from '../lib/motion';

/*
  S1: the live slash. A fast pointer swipe over the hero draws a straight
  1px seal line along the swipe vector. Draw 0.15s on the cut ease, hold,
  fade 1.2s. Three concurrent cuts max, oldest fades first. Vanilla
  canvas painted from a gsap.ticker callback that only runs while cuts
  exist, the hero is on screen, and the tab is visible.
*/
const DRAW_S = 0.15;
const FADE_S = 1.2;
const MAX_CUTS = 3;
const WINDOW_MS = 120; /* rolling sample window for velocity */
const SPEED_ARM = 1.4; /* px/ms to arm a swipe */
const SPEED_COMMIT = 0.35; /* px/ms: decelerated, commit the cut */
const MIN_LEN = 90; /* px: shorter gestures are not cuts */

export default function SlashCanvas({ onCut }) {
  const canvasRef = useRef(null);
  const onCutRef = useRef(onCut);
  onCutRef.current = onCut;

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
    let onScreen = true;
    let tickerOn = false;

    const render = () => {
      if (!onScreen || document.hidden) return;
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
      onCutRef.current?.({ x1, y1, x2, y2 });
    };

    /* Swipe detection: listen on window so hero text stays selectable. */
    let pts = [];
    let armed = false;
    let start = null;

    const commit = (endX, endY) => {
      armed = false;
      pts = [];
      if (!onScreen || document.hidden) return;
      const rect = canvas.getBoundingClientRect();
      const p1 = { x: start.x - rect.left, y: start.y - rect.top };
      const p2 = { x: endX - rect.left, y: endY - rect.top };
      if (Math.hypot(p2.x - p1.x, p2.y - p1.y) < MIN_LEN) return;
      /* The gesture must cross the hero. */
      const midY = (p1.y + p2.y) / 2;
      if (midY < 0 || midY > rect.height) return;
      spawnCut(p1.x, p1.y, p2.x, p2.y);
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
      } else if (armed && speed < SPEED_COMMIT) {
        commit(e.clientX, e.clientY);
      }
    };
    const onUp = (e) => {
      if (armed) commit(e.clientX, e.clientY);
      pts = [];
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    window.addEventListener('pointercancel', onUp, { passive: true });

    /* Pause when the hero leaves the viewport. */
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
    });
    io.observe(canvas);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
      io.disconnect();
      cuts.slice().forEach(removeCut);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-20 h-full w-full"
    />
  );
}
