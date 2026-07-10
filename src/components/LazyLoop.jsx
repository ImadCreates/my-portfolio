import { useEffect, useMemo, useRef, useState } from 'react';
import { prefersReducedMotion } from '../lib/motion';

/*
  S3: the product loop. Muted webm with playsinline and a poster; the
  video source is not attached until the element scrolls near the
  viewport. Reduced motion gets no autoplay and visible controls.
*/
export default function LazyLoop({ src, poster, width, height, label }) {
  const ref = useRef(null);
  const [near, setNear] = useState(false);
  const reduced = useMemo(() => prefersReducedMotion(), []);

  useEffect(() => {
    /* React does not always reflect the muted prop to the attribute,
       and autoplay policy requires it before the source attaches. */
    if (ref.current) ref.current.muted = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: '400px 0px' },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={near ? src : undefined}
      poster={poster}
      width={width}
      height={height}
      autoPlay={!reduced}
      muted
      loop
      playsInline
      controls={reduced}
      preload="none"
      aria-label={label}
      className="block aspect-16/10 w-full bg-ash object-cover"
    />
  );
}
