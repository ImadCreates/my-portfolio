import { useLayoutEffect } from 'react';
import { gsap, ScrollTrigger, T, EASE, prefersReducedMotion } from './motion';
import { onIntroDone } from './intro';

/*
  P3: line-mask reveals for the display headings. A small self-written
  splitter: words are measured in place, grouped into lines by their
  offset, then each line is rebuilt inside an overflow-clip mask and
  rises from 110% on the settle ease with a 90ms stagger, once. The
  split re-runs on resize (line breaks move); after the reveal has
  played, re-split lines stay put. Under reduced motion nothing is
  split and the heading stays fully readable, zero animation.

  Inline elements inside the heading (the seal period, serif accents)
  ride along: element nodes glued to the previous word without
  whitespace stay in that word's wrapper so a line can never break
  between CHALLENGE and its period.
*/
const STAGGER = 0.09;

function tokenize(nodes) {
  /* tokens: { parts: Node[], space: bool (separator before), br: bool } */
  const tokens = [];
  let space = false;
  let br = false;
  let open = false; /* last chunk ended without trailing whitespace */

  const push = (part) => {
    if (open && !space && !br && tokens.length) {
      tokens[tokens.length - 1].parts.push(part);
    } else {
      tokens.push({ parts: [part], space, br });
    }
    space = false;
    br = false;
    open = true;
  };

  for (const node of nodes) {
    if (node.nodeType === Node.TEXT_NODE) {
      for (const seg of node.textContent.split(/(\s+)/)) {
        if (!seg) continue;
        if (/\s/.test(seg)) {
          space = true;
          open = false;
        } else {
          push(document.createTextNode(seg));
        }
      }
    } else if (node.nodeName === 'BR') {
      br = true;
      open = false;
    } else {
      push(node.cloneNode(true));
    }
  }
  return tokens;
}

function splitIntoLines(el, tokens) {
  /* Measure: every token in an inline-block so offsetTop groups lines. */
  el.textContent = '';
  const wraps = tokens.map((token) => {
    if (token.br) el.appendChild(document.createElement('br'));
    if (token.space) el.appendChild(document.createTextNode(' '));
    const wrap = document.createElement('span');
    wrap.style.display = 'inline-block';
    token.parts.forEach((part) => wrap.appendChild(part.cloneNode(true)));
    el.appendChild(wrap);
    return wrap;
  });

  const lines = [];
  let lastTop = null;
  wraps.forEach((wrap, i) => {
    const top = wrap.offsetTop;
    if (lastTop === null || Math.abs(top - lastTop) > 2) {
      lines.push([]);
      lastTop = top;
    }
    lines[lines.length - 1].push(i);
  });

  /* Rebuild: one block mask per line, inline content restored inside. */
  el.textContent = '';
  return lines.map((indices) => {
    const mask = document.createElement('span');
    mask.style.display = 'block';
    mask.style.overflow = 'clip';
    const inner = document.createElement('span');
    inner.style.display = 'block';
    indices.forEach((i, j) => {
      if (j > 0 && tokens[i].space) inner.appendChild(document.createTextNode(' '));
      tokens[i].parts.forEach((part) => inner.appendChild(part.cloneNode(true)));
    });
    mask.appendChild(inner);
    el.appendChild(mask);
    return inner;
  });
}

/* trigger: 'scroll' reveals at 88% viewport once; 'intro' waits for the
   loading sequence (immediate on repeat visits). */
export default function useLineReveal(ref, { trigger = 'scroll' } = {}) {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return undefined;

    const originals = [...el.childNodes];
    const tokens = tokenize(originals);
    let revealed = false;
    let inners = splitIntoLines(el, tokens);
    gsap.set(inners, { yPercent: 110 });

    const reveal = () => {
      revealed = true;
      gsap.to(inners, {
        yPercent: 0,
        duration: T.cut,
        ease: EASE.settle,
        stagger: STAGGER,
        overwrite: true,
      });
    };

    let cleanupTrigger;
    if (trigger === 'intro') {
      cleanupTrigger = onIntroDone(reveal);
    } else {
      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        once: true,
        onEnter: reveal,
      });
      cleanupTrigger = () => st.kill();
    }

    /* Line breaks move with the viewport; re-split at the new width. */
    let lastWidth = el.clientWidth;
    let timer = 0;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (!ref.current || el.clientWidth === lastWidth) return;
        lastWidth = el.clientWidth;
        inners = splitIntoLines(el, tokens);
        gsap.set(inners, { yPercent: revealed ? 0 : 110 });
      }, 150);
    };
    window.addEventListener('resize', onResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', onResize);
      cleanupTrigger();
      el.textContent = '';
      originals.forEach((node) => el.appendChild(node));
    };
  }, [ref, trigger]);
}
