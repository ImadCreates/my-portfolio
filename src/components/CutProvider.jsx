import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { gsap, T, EASE, prefersReducedMotion } from '../lib/motion';
import { POLY, halfShifts } from '../lib/cut';

const CutContext = createContext({ cutNavigate: () => {}, cutTo: () => {} });

/* cutNavigate(to): route change through the cut.
   cutTo(action): any state change through the cut. */
export const useCut = () => useContext(CutContext);

/* Click handler for router links that should travel through the cut.
   Modified clicks (new tab, etc.) fall through to the browser. */
export function cutClick(cutNavigate, to) {
  return (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    cutNavigate(to);
  };
}

const INTRO_KEY = 'rank-one:intro-played';

function CutName() {
  return (
    <div className="flex h-full items-center justify-center">
      <p className="display-face text-center text-hero text-bone opacity-0" data-cut-name>
        IMADUDDIN
        <br />
        AHMED
      </p>
    </div>
  );
}

export default function CutProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const rootRef = useRef(null);
  const upperRef = useRef(null);
  const lowerRef = useRef(null);
  const lineRef = useRef(null);
  const timelineRef = useRef(null);
  const locationRef = useRef(location);
  locationRef.current = location;

  /* Decide before first paint so the hero never flashes ahead of the intro. */
  const [introPending] = useState(
    () => !sessionStorage.getItem(INTRO_KEY) && !prefersReducedMotion(),
  );

  const finish = useCallback(() => {
    gsap.set(rootRef.current, { autoAlpha: 0 });
    timelineRef.current = null;
  }, []);

  /* (a) First-visit loading sequence. Concept doc section 5, under 1s. */
  useLayoutEffect(() => {
    if (!introPending) {
      sessionStorage.setItem(INTRO_KEY, '1');
      return undefined;
    }
    const names = rootRef.current.querySelectorAll('[data-cut-name]');
    const shifts = halfShifts();
    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem(INTRO_KEY, '1');
        finish();
      },
    });
    timelineRef.current = tl;

    gsap.set(rootRef.current, { autoAlpha: 1 });
    gsap.set([upperRef.current, lowerRef.current], { x: 0, y: 0, autoAlpha: 1 });

    /* The sword is drawn: 1px seal line, top-right to bottom-left. */
    tl.to(lineRef.current, { strokeDashoffset: 0, duration: T.base, ease: EASE.cut })
      /* The name snaps in along the line. One frame, no fade. */
      .set(names, { opacity: 1 })
      /* The screen separates along the cut and reveals the hero. */
      .set(lineRef.current, { opacity: 0 }, 0.78)
      .to(
        upperRef.current,
        { x: shifts.upper.x, y: shifts.upper.y, duration: T.fast, ease: EASE.cut },
        0.78,
      )
      .to(
        lowerRef.current,
        { x: shifts.lower.x, y: shifts.lower.y, duration: T.fast, ease: EASE.cut },
        0.78,
      );

    return () => tl.kill();
  }, [introPending, finish]);

  /* (b) Transitions. Same gesture, under 0.7s, interruptible. */
  const cutTo = useCallback(
    (action) => {
      const root = rootRef.current;
      const halves = [upperRef.current, lowerRef.current];
      const names = root.querySelectorAll('[data-cut-name]');

      timelineRef.current?.kill();

      if (prefersReducedMotion()) {
        /* The cut becomes a plain fade. */
        const tl = gsap.timeline({ onComplete: finish });
        timelineRef.current = tl;
        gsap.set(names, { opacity: 0 });
        gsap.set(lineRef.current, { opacity: 0 });
        gsap.set(halves, { x: 0, y: 0, autoAlpha: 1 });
        tl.fromTo(root, { autoAlpha: 0 }, { autoAlpha: 1, duration: T.fast, ease: 'none' })
          .call(action)
          .to(root, { autoAlpha: 0, duration: T.base, ease: 'none' }, '+=0.05');
        return;
      }

      const shifts = halfShifts();
      const tl = gsap.timeline({ onComplete: finish });
      timelineRef.current = tl;

      gsap.set(root, { autoAlpha: 1 });
      gsap.set(names, { opacity: 0 });
      gsap.set(lineRef.current, { opacity: 1, strokeDashoffset: 1 });
      gsap.set(halves, { x: 0, y: 0, autoAlpha: 0 });

      /* Line draws over the outgoing page, screen snaps to ink, the route
         swaps underneath, and the halves separate to reveal the new page. */
      tl.to(lineRef.current, { strokeDashoffset: 0, duration: T.fast, ease: EASE.cut })
        .set(halves, { autoAlpha: 1 })
        .set(lineRef.current, { opacity: 0 })
        .call(action)
        .to(
          upperRef.current,
          { x: shifts.upper.x, y: shifts.upper.y, duration: T.base, ease: EASE.cut },
          '+=0.04',
        )
        .to(
          lowerRef.current,
          { x: shifts.lower.x, y: shifts.lower.y, duration: T.base, ease: EASE.cut },
          '<',
        );
    },
    [finish],
  );

  const cutNavigate = useCallback(
    (to) => {
      const { pathname, hash } = locationRef.current;
      if (to === pathname + hash) return;
      cutTo(() => navigate(to));
    },
    [cutTo, navigate],
  );

  const value = useMemo(() => ({ cutNavigate, cutTo }), [cutNavigate, cutTo]);

  return (
    <CutContext.Provider value={value}>
      {children}
      <div
        ref={rootRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-50"
        style={{ visibility: introPending ? 'visible' : 'hidden' }}
      >
        <div ref={upperRef} className="absolute inset-0 bg-ink" style={{ clipPath: POLY.upper }}>
          <CutName />
        </div>
        <div ref={lowerRef} className="absolute inset-0 bg-ink" style={{ clipPath: POLY.lower }}>
          <CutName />
        </div>
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <line
            ref={lineRef}
            x1="100"
            y1="0"
            x2="0"
            y2="100"
            pathLength="1"
            stroke="var(--color-seal)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            strokeDasharray="1"
            strokeDashoffset="1"
          />
        </svg>
      </div>
    </CutContext.Provider>
  );
}
