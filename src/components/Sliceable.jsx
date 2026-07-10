import { cloneElement, isValidElement, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap, T, EASE, prefersReducedMotion } from '../lib/motion';
import { onCut, segmentIntersectsRect, splitClipPaths } from '../lib/blade';

/*
  B2: sliceable targets. When a cut line crosses the wrapped element it
  splits along the actual cut: two clipped duplicates snap 8px apart
  perpendicular to the cut, hold one base beat, then reassemble on the
  settle ease. Duplicates exist only for the duration of the effect.
  Never slices while the user has an active text selection. Under
  reduced motion no cuts are emitted, so this never triggers.
*/
const SPLIT_PX = 8;

export default function Sliceable({ children, className = '' }) {
  const ref = useRef(null);
  const aRef = useRef(null);
  const bRef = useRef(null);
  const busyRef = useRef(false);
  const [split, setSplit] = useState(null);
  const reduced = useMemo(() => prefersReducedMotion(), []);

  useEffect(() => {
    if (reduced) return undefined;
    return onCut((line) => {
      if (busyRef.current) return;
      const selection = window.getSelection?.();
      if (selection && !selection.isCollapsed) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || !segmentIntersectsRect(line, rect)) return;
      busyRef.current = true;
      setSplit(splitClipPaths(line, rect));
    });
  }, [reduced]);

  useLayoutEffect(() => {
    if (!split) return;
    const halves = [aRef.current, bRef.current];
    gsap.set(aRef.current, { x: split.nx * SPLIT_PX, y: split.ny * SPLIT_PX });
    gsap.set(bRef.current, { x: -split.nx * SPLIT_PX, y: -split.ny * SPLIT_PX });
    gsap.to(halves, {
      x: 0,
      y: 0,
      duration: T.base,
      ease: EASE.settle,
      delay: T.base /* hold apart for one base beat */,
      onComplete: () => {
        setSplit(null);
        busyRef.current = false;
      },
    });
  }, [split]);

  /* Duplicates must not carry ids, refs, or reveal hooks into the DOM;
     React 19 forwards ref as a prop, so it clones unless stripped. */
  const ghost = isValidElement(children)
    ? cloneElement(children, { id: undefined, ref: undefined, 'data-reveal': undefined })
    : children;

  return (
    <div ref={ref} className={`relative ${className}`}>
      <div style={split ? { visibility: 'hidden' } : undefined}>{children}</div>
      {split && (
        <>
          <div ref={aRef} aria-hidden="true" className="absolute inset-0" style={{ clipPath: split.a }}>
            {ghost}
          </div>
          <div ref={bRef} aria-hidden="true" className="absolute inset-0" style={{ clipPath: split.b }}>
            {ghost}
          </div>
        </>
      )}
    </div>
  );
}
