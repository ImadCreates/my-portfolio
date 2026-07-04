import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(ScrollTrigger, CustomEase);

/*
  Motion tokens are defined once, in index.css. This module reads them so
  GSAP and CSS animate with the exact same durations and curves.
*/
const rootStyle = getComputedStyle(document.documentElement);

function seconds(token, fallback) {
  const value = parseFloat(rootStyle.getPropertyValue(token));
  return Number.isFinite(value) ? value : fallback;
}

function registerEase(name, token, fallback) {
  const value = rootStyle.getPropertyValue(token);
  const nums = value.match(/-?\d*\.?\d+/g);
  CustomEase.create(name, nums ? nums.join(',') : fallback);
  return name;
}

export const T = {
  fast: seconds('--t-fast', 0.2),
  base: seconds('--t-base', 0.4),
  cut: seconds('--t-cut', 0.7),
};

export const EASE = {
  cut: registerEase('cut', '--ease-cut', '0.83,0,0.17,1'),
  settle: registerEase('settle', '--ease-settle', '0.22,1,0.36,1'),
};

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export { gsap, ScrollTrigger };
