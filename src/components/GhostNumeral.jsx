import { useLayoutEffect, useRef } from 'react';
import { gsap, ScrollTrigger, T, EASE, prefersReducedMotion } from '../lib/motion';
import { POLY } from '../lib/cut';

/*
  S2.1: a massive outlined Anton numeral on the right edge of each
  section, partially cropped by the viewport, behind content. Reveals
  once with the diagonal cut wipe (S1); opacity only under reduced motion.
*/
export default function GhostNumeral({ n, className = 'top-0' }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    const reduced = prefersReducedMotion();
    gsap.set(el, reduced ? { opacity: 0 } : { clipPath: POLY.diagonal });
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        if (reduced) gsap.to(el, { opacity: 1, duration: T.base, ease: 'none' });
        else gsap.to(el, { clipPath: POLY.full, duration: T.base, ease: EASE.cut });
      },
    });
    return () => trigger.kill();
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute right-0 -z-10 translate-x-[15%] select-none ${className}`}
    >
      <span
        ref={ref}
        className="display-face block text-[clamp(10rem,40vh,30rem)] leading-[0.8] text-transparent"
        style={{ WebkitTextStroke: '1px var(--color-hairline)' }}
      >
        {n}
      </span>
    </div>
  );
}
