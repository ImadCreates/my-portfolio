import { useEffect, useState } from 'react';
import MediaFrame from './MediaFrame';

/*
  P5: the house media treatment. Every image renders duotone — shadows
  mapped toward ink, highlights toward bone — via the global SVG
  feComponentTransfer filter (defined in App), inside the hairline
  MediaFrame with an optional mono caption below. The duotone lives on
  an overlay copy of the image; revealing the true colors is an opacity
  fade of that overlay, because url() filters cannot interpolate.

  reveal modes:
  - 'hover': fine pointers ease the duotone off over one base beat, the
    record coming alive under attention. Default.
  - 'auto': eases off right after mount; used by the record hover
    preview, where the pointer rests on the row, not the panel.
  - 'never': stays duotone always (The Player portrait).
*/
const OVERLAY_BASE =
  'duotone absolute inset-0 h-full w-full object-cover transition-opacity ' +
  'duration-(--t-base) ease-settle';

export default function TreatedMedia({
  src,
  alt,
  width,
  height,
  caption,
  reveal = 'hover',
  className = '',
  imgClassName = 'block w-full',
  loading = 'lazy',
  ...rest
}) {
  const [autoRevealed, setAutoRevealed] = useState(false);

  useEffect(() => {
    if (reveal !== 'auto') return undefined;
    const raf = requestAnimationFrame(() => setAutoRevealed(true));
    return () => cancelAnimationFrame(raf);
  }, [reveal]);

  const overlayState =
    reveal === 'hover'
      ? 'pointer-fine:group-hover/media:opacity-0'
      : reveal === 'auto' && autoRevealed
        ? 'opacity-0'
        : '';

  const frame = (frameClass, frameRest) => (
    <MediaFrame className={`group/media ${frameClass}`} {...frameRest}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
        className={imgClassName}
      />
      <img
        src={src}
        alt=""
        aria-hidden="true"
        width={width}
        height={height}
        loading={loading}
        decoding="async"
        className={`${OVERLAY_BASE} ${overlayState}`}
      />
    </MediaFrame>
  );

  if (!caption) return frame(className, rest);

  return (
    <figure {...rest}>
      {frame(className)}
      <figcaption className="caption-mono mt-3">{caption}</figcaption>
    </figure>
  );
}
