import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { hero, personalInfo } from '../data/portfolioData';
import { gsap, T, EASE, prefersReducedMotion } from '../lib/motion';
import { onCut } from '../lib/blade';
import { onIntroDone } from '../lib/intro';
import useLineReveal from '../lib/useLineReveal';

const SHEAR_PX = 2;
const SHEAR_HOLD_S = 0.15;
const HINT_KEY = 'rank-one:cut-done';

/* Rendered twice: once live, once as the shear duplicate. The live
   name carries the line-mask reveal; the duplicate stays unsplit. */
function HeroContent({ reveal = false, nameRef }) {
  const [first, last] = personalInfo.name.split(' ');
  const r = reveal ? { 'data-reveal': '' } : {};

  return (
    <>
      <p {...r} className="label-mono text-steel">
        {hero.eyebrow.join(' / ')}
      </p>
      <h1 ref={nameRef} className="display-face mt-6 text-hero text-bone">
        {first}
        <br />
        {last}
      </h1>
      <p {...r} className="mt-8 max-w-xl text-body text-steel">
        {personalInfo.positioning.lead}{' '}
        <em className="serif-accent">{personalInfo.positioning.accent}</em>
      </p>
    </>
  );
}

export default function Hero() {
  const wrapRef = useRef(null);
  const origRef = useRef(null);
  const dupRef = useRef(null);
  const hintRef = useRef(null);
  const nameRef = useRef(null);
  const stripRef = useRef(null);
  const shearTl = useRef(null);
  const [hintVisible] = useState(
    () => !sessionStorage.getItem(HINT_KEY) && !prefersReducedMotion(),
  );

  /* P3: the name reveals line by line once the intro has finished. */
  useLineReveal(nameRef, { trigger: 'intro' });

  /* P3: the record strip values roll up once, after the intro. */
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const inners = stripRef.current.querySelectorAll('[data-strip-inner]');
    gsap.set(inners, { yPercent: 110 });
    return onIntroDone(() => {
      gsap.to(inners, {
        yPercent: 0,
        duration: T.base,
        ease: EASE.settle,
        stagger: 0.09,
        overwrite: true,
      });
    });
  }, []);

  /* S1 shear: content above the cut line shifts 2px along the swipe
     vector, content below shifts the other way, then settles back.
     Cuts are site-wide now (B1); only cuts crossing the hero shear it. */
  const handleCut = useCallback((line) => {
    if (hintRef.current && !sessionStorage.getItem(HINT_KEY)) {
      sessionStorage.setItem(HINT_KEY, '1');
      gsap.to(hintRef.current, { autoAlpha: 0, duration: T.base, ease: EASE.settle });
    }

    const wrap = wrapRef.current;
    const orig = origRef.current;
    const dup = dupRef.current;
    if (!wrap || !orig || !dup) return;

    const dx = line.x2 - line.x1;
    const dy = line.y2 - line.y1;
    const len = Math.hypot(dx, dy);
    /* Near-vertical cuts shear along a nearly-horizontal split whose
       clip geometry degenerates; ship the cut without shear there. */
    if (len < 1 || Math.abs(dx) < 40) return;

    const heroRect = wrap.closest('section').getBoundingClientRect();
    const midY = (line.y1 + line.y2) / 2;
    if (midY < heroRect.top || midY > heroRect.bottom) return;

    const rect = wrap.getBoundingClientRect();
    const m = dy / dx;
    const x1 = line.x1 - rect.left;
    const y1 = line.y1 - rect.top;
    const y0 = y1 - m * x1;
    const yW = y1 + m * (rect.width - x1);
    const w = Math.round(rect.width);
    const above = `polygon(0px -9999px, ${w}px -9999px, ${w}px ${yW}px, 0px ${y0}px)`;
    const below = `polygon(0px ${y0}px, ${w}px ${yW}px, ${w}px 99999px, 0px 99999px)`;
    const ux = (dx / len) * SHEAR_PX;
    const uy = (dy / len) * SHEAR_PX;

    shearTl.current?.kill();
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set([orig, dup], { clearProps: 'clipPath,transform' });
        gsap.set(dup, { autoAlpha: 0 });
      },
    });
    shearTl.current = tl;
    tl.set(dup, { autoAlpha: 1 })
      .set(orig, { clipPath: above, x: ux, y: uy })
      .set(dup, { clipPath: below, x: -ux, y: -uy })
      .to([orig, dup], { x: 0, y: 0, duration: T.fast, ease: EASE.settle }, SHEAR_HOLD_S);
  }, []);

  useEffect(() => onCut(handleCut), [handleCut]);

  return (
    <section aria-label="Player profile" className="relative flex min-h-svh flex-col justify-end">
      <div className="relative flex flex-1 flex-col justify-center px-6 pt-14 md:px-12">
        <div ref={wrapRef} className="relative">
          <div ref={origRef}>
            <HeroContent reveal nameRef={nameRef} />
          </div>
          <div ref={dupRef} aria-hidden="true" className="invisible absolute inset-0 opacity-0">
            <HeroContent />
          </div>
        </div>
      </div>

      {/* S2.5: the hero right side hosts the slash canvas and one label. */}
      <p
        className="label-mono absolute top-1/2 right-4 hidden -translate-y-1/2 text-steel md:block"
        style={{ writingMode: 'vertical-rl' }}
        data-reveal
      >
        EST. TORONTO / 43.65 N
      </p>

      {hintVisible && (
        <p
          ref={hintRef}
          className="label-mono absolute right-6 bottom-28 text-steel md:right-12"
          data-reveal
        >
          SWIPE TO CUT
        </p>
      )}

      <ul
        ref={stripRef}
        className="relative grid border-t border-hairline bg-ink md:grid-cols-3"
        aria-label="Record summary"
      >
        {hero.recordStrip.map((item, i) => (
          <li
            key={item}
            className={`label-mono px-6 py-5 text-steel md:px-12 ${
              i > 0 ? 'border-t border-hairline md:border-t-0 md:border-l' : ''
            }`}
          >
            <span className="block overflow-clip">
              <span className="block" data-strip-inner>
                {item}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
