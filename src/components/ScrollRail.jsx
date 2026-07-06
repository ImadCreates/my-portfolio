import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from '../lib/motion';
import { getLenis, scrollToSection } from '../lib/scroll';

/*
  B3: the edge. A 1px hairline rail on the right, desktop only, 24px
  from the viewport edge. Scroll progress fills it in seal from the top,
  the thumb is a small blade-tip triangle, and each section gets a 6px
  notch. Notches are focusable buttons that scroll with the settle ease;
  this duplicates the nav as a shortcut, not the only path. Sits above
  the ghost numerals, below the slash canvas.
*/
const SECTIONS = [
  { id: 'record', label: 'RECORD' },
  { id: 'loadout', label: 'LOADOUT' },
  { id: 'player', label: 'THE PLAYER' },
  { id: 'challenge', label: 'CHALLENGE' },
];

export default function ScrollRail() {
  const { pathname } = useLocation();
  const railRef = useRef(null);
  const fillRef = useRef(null);
  const thumbRef = useRef(null);
  const [notches, setNotches] = useState([]);
  const [hovered, setHovered] = useState(null);
  const onHome = pathname === '/';

  /* Notch positions as scroll fractions. */
  useEffect(() => {
    if (!onHome) return undefined;
    const measure = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      setNotches(
        SECTIONS.map(({ id, label }) => {
          const el = document.getElementById(id);
          const top = el ? el.getBoundingClientRect().top + window.scrollY : 0;
          return { id, label, frac: Math.min(top / max, 1) };
        }),
      );
    };
    measure();
    window.addEventListener('resize', measure);
    window.addEventListener('load', measure);
    return () => {
      window.removeEventListener('resize', measure);
      window.removeEventListener('load', measure);
    };
  }, [onHome]);

  /* Progress fill and thumb follow the scroll. */
  useEffect(() => {
    if (!onHome) return undefined;
    const update = (y) => {
      const rail = railRef.current;
      if (!rail) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(Math.max(y / max, 0), 1) : 0;
      gsap.set(fillRef.current, { scaleY: p });
      gsap.set(thumbRef.current, { y: p * rail.clientHeight, yPercent: -50 });
    };
    const lenis = getLenis();
    if (lenis) {
      const handler = ({ scroll }) => update(scroll);
      lenis.on('scroll', handler);
      update(lenis.scroll);
      return () => lenis.off('scroll', handler);
    }
    const onScroll = () => update(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    update(window.scrollY);
    return () => window.removeEventListener('scroll', onScroll);
  }, [onHome, notches]);

  if (!onHome) return null;

  return (
    <nav aria-label="Sections" className="fixed inset-y-0 right-6 z-30 hidden md:block">
      <div ref={railRef} className="relative h-full w-px bg-hairline">
        <div ref={fillRef} className="absolute inset-0 origin-top scale-y-0 bg-seal" />
        <svg
          ref={thumbRef}
          aria-hidden="true"
          className="absolute top-0 -left-[3.5px]"
          width="8"
          height="8"
          viewBox="0 0 8 8"
        >
          <path d="M0 0 H8 L4 8 Z" fill="var(--color-bone)" />
        </svg>
        {notches.map(({ id, label, frac }) => (
          <button
            key={id}
            type="button"
            aria-label={`Jump to ${label}`}
            onClick={() => scrollToSection(id)}
            onMouseEnter={() => setHovered(id)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(id)}
            onBlur={() => setHovered(null)}
            style={{ top: `${frac * 100}%` }}
            className="absolute -left-2 flex h-4 w-4 -translate-y-1/2 cursor-pointer items-center justify-center"
          >
            <span aria-hidden="true" className="block h-px w-[6px] bg-steel" />
            <span
              className={`label-mono absolute right-5 whitespace-nowrap text-steel transition-opacity duration-(--t-fast) ease-settle ${
                hovered === id ? 'opacity-100' : 'opacity-0'
              }`}
              aria-hidden="true"
            >
              {label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}
