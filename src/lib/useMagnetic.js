import { useEffect } from 'react';
import { gsap, T, EASE, prefersReducedMotion } from './motion';

/*
  P3: magnetic hover. The element eases toward the cursor, 5px max,
  and returns on leave with the settle ease. Fine pointers only; under
  reduced motion nothing engages. Exactly two elements on the site are
  magnetic: the challenge email link and the nav CHALLENGE link.
*/
const MAX_PX = 5;

export default function useMagnetic(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (
      !window.matchMedia('(hover: hover) and (pointer: fine)').matches ||
      prefersReducedMotion()
    ) {
      return undefined;
    }

    const xTo = gsap.quickTo(el, 'x', { duration: T.base, ease: EASE.settle });
    const yTo = gsap.quickTo(el, 'y', { duration: T.base, ease: EASE.settle });
    let cx = 0;
    let cy = 0;

    const onEnter = () => {
      /* Center of the untranslated box: subtract any in-flight offset. */
      const rect = el.getBoundingClientRect();
      cx = rect.left + rect.width / 2 - Number(gsap.getProperty(el, 'x'));
      cy = rect.top + rect.height / 2 - Number(gsap.getProperty(el, 'y'));
    };
    const onMove = (e) => {
      xTo(gsap.utils.clamp(-MAX_PX, MAX_PX, e.clientX - cx));
      yTo(gsap.utils.clamp(-MAX_PX, MAX_PX, e.clientY - cy));
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener('pointerenter', onEnter);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointerenter', onEnter);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      gsap.set(el, { x: 0, y: 0 });
    };
  }, [ref]);
}
