import { useLayoutEffect, useRef } from 'react';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/motion';

/*
  P3: the media frame. Every image and video sits inside a 1px hairline
  frame at scale 1.12; on scroll the inner media translates vertically
  within the frame (scrubbed), so the frame never moves and the media
  drifts like a window onto a deeper layer. The 1.12 scale leaves 6% of
  headroom each way; the drift uses 5.5% so rounding can never expose
  the frame edge. Reduced motion renders the media static and unscaled.
*/
const DRIFT = 5.5;

export default function MediaFrame({ children, className = '', ...rest }) {
  const frameRef = useRef(null);
  const innerRef = useRef(null);
  const reduced = prefersReducedMotion();

  useLayoutEffect(() => {
    if (reduced) return undefined;
    const tween = gsap.fromTo(
      innerRef.current,
      { yPercent: -DRIFT },
      {
        yPercent: DRIFT,
        ease: 'none',
        scrollTrigger: {
          trigger: frameRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reduced]);

  return (
    <div
      ref={frameRef}
      className={`relative overflow-clip border border-hairline ${className}`}
      {...rest}
    >
      <div
        ref={innerRef}
        className="relative h-full w-full"
        style={reduced ? undefined : { scale: '1.12' }}
      >
        {children}
      </div>
    </div>
  );
}
