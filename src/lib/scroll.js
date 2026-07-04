import Lenis from 'lenis';
import { gsap, ScrollTrigger, prefersReducedMotion } from './motion';

let lenis = null;

/* Lenis smooth scroll, lerp 0.1. Disabled entirely under reduced motion. */
export function initSmoothScroll() {
  if (lenis || prefersReducedMotion()) return;
  lenis = new Lenis({ lerp: 0.1 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

export function getLenis() {
  return lenis;
}

export function scrollToSection(id, { immediate = false } = {}) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis && !immediate) {
    /* force: the caller may have just released a scroll lock this tick. */
    lenis.scrollTo(el, { force: true });
  } else if (lenis) {
    lenis.scrollTo(el, { immediate: true, force: true });
  } else {
    el.scrollIntoView();
  }
}

export function scrollToTop() {
  if (lenis) {
    lenis.scrollTo(0, { immediate: true, force: true });
  } else {
    window.scrollTo(0, 0);
  }
}

/* Freeze scrolling while an overlay owns the screen. */
export function lockScroll(locked) {
  if (locked) lenis?.stop();
  else lenis?.start();
  document.body.style.overflow = locked ? 'hidden' : '';
}
