import { useLayoutEffect } from 'react';
import { gsap, ScrollTrigger, T, EASE, prefersReducedMotion } from './motion';

/*
  Scroll reveals: 24px rise plus fade, settle ease, 60ms stagger, once.
  Reduced motion gets opacity only. Concept doc section 7.

  Elements already inside the viewport on load reveal immediately, so the
  hero pitch is complete without a scroll. The rest trigger at 88%.
*/
export default function useReveals() {
  useLayoutEffect(() => {
    const els = gsap.utils.toArray('[data-reveal]');
    if (!els.length) return undefined;

    const reduced = prefersReducedMotion();
    const ctx = gsap.context(() => {
      gsap.set(els, reduced ? { opacity: 0 } : { opacity: 0, y: 24 });

      const reveal = (batch) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: T.base,
          ease: EASE.settle,
          stagger: 0.06,
          overwrite: true,
        });

      const inView = els.filter((el) => el.getBoundingClientRect().top < window.innerHeight);
      const rest = els.filter((el) => !inView.includes(el));

      if (inView.length) reveal(inView);
      if (rest.length) {
        ScrollTrigger.batch(rest, {
          start: 'top 88%',
          once: true,
          onEnter: reveal,
        });
      }
    });

    return () => ctx.revert();
  }, []);
}
