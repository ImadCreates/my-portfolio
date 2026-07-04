import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { record } from '../data/portfolioData';
import { gsap, T, EASE, prefersReducedMotion } from '../lib/motion';
import { POLY } from '../lib/cut';
import { useCut, cutClick } from './CutProvider';
import GhostNumeral from './GhostNumeral';
import SectionLabel from './SectionLabel';

const META_CLASSES =
  'label-mono text-steel transition-colors duration-(--t-fast) ease-settle ' +
  'group-hover:text-bone group-focus-visible:text-bone';

function RowContent({ entry }) {
  return (
    <div className="grid gap-2 px-6 py-8 md:min-h-[150px] md:grid-cols-[11rem_1fr_auto] md:items-center md:gap-6 md:px-12">
      <p className={META_CLASSES}>
        {entry.year} · {entry.status}
      </p>
      <div>
        <h3 className="display-face text-heading text-bone">{entry.title}</h3>
        <p className="mt-2 max-w-md text-body text-steel">{entry.blurb}</p>
      </div>
      <p className={`${META_CLASSES} md:text-right`}>{entry.stack}</p>
      {/* Mobile: the preview sits statically inside the row. */}
      <img
        src={entry.media.src}
        alt={entry.media.alt}
        width={entry.media.width}
        height={entry.media.height}
        loading="lazy"
        decoding="async"
        className="mt-4 block w-full border border-hairline md:hidden"
      />
      {/* The cut, in miniature: 1px seal line draws left to right on hover. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-seal transition-transform duration-(--t-fast) ease-cut group-hover:scale-x-100 group-focus-visible:scale-x-100"
      />
    </div>
  );
}

export default function RecordSection() {
  const { cutNavigate } = useCut();
  const [preview, setPreview] = useState(null);
  const panelRef = useRef(null);
  const prevRef = useRef(null);

  /* S2.4: hover preview pinned in the right third, desktop fine pointers
     only, revealed with the cut wipe. No cursor-following physics. */
  const finePointer = useMemo(
    () =>
      window.matchMedia('(hover: hover) and (pointer: fine)').matches && !prefersReducedMotion(),
    [],
  );

  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const prev = prevRef.current;
    prevRef.current = preview;
    if (preview && !prev) {
      gsap.set(panel, { autoAlpha: 1, clipPath: POLY.diagonal });
      gsap.to(panel, { clipPath: POLY.full, duration: T.base, ease: EASE.cut });
    } else if (!preview && prev) {
      gsap.to(panel, { autoAlpha: 0, duration: T.fast, ease: 'none' });
    }
  }, [preview]);

  const rowHandlers = (entry) =>
    finePointer
      ? {
          onMouseEnter: () => setPreview(entry.media),
          onMouseLeave: () => setPreview(null),
          onFocus: () => setPreview(entry.media),
          onBlur: () => setPreview(null),
        }
      : {};

  return (
    <section id="record" aria-labelledby="record-heading" className="relative pt-12 md:pt-16">
      <GhostNumeral n="01" />
      <SectionLabel id="record-heading" index="01" title="RECORD" />
      <div className="relative">
        <ul>
          {record.map((entry) => (
            <li key={entry.title} className="border-t border-hairline last:border-b" data-reveal>
              {entry.slug ? (
                <Link
                  to={`/record/${entry.slug}`}
                  onClick={cutClick(cutNavigate, `/record/${entry.slug}`)}
                  className="group relative block"
                  aria-label={`${entry.title} case study`}
                  {...rowHandlers(entry)}
                >
                  <RowContent entry={entry} />
                </Link>
              ) : (
                <a
                  href={entry.links.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative block"
                  aria-label={`${entry.title} demo video`}
                  {...rowHandlers(entry)}
                >
                  <RowContent entry={entry} />
                </a>
              )}
            </li>
          ))}
        </ul>

        {finePointer && (
          <div
            ref={panelRef}
            aria-hidden="true"
            className="pointer-events-none invisible absolute top-1/2 right-6 z-20 hidden w-[30%] -translate-y-1/2 border border-hairline bg-ink opacity-0 md:right-12 lg:block"
          >
            {preview && (
              <img
                src={preview.src}
                alt=""
                width={preview.width}
                height={preview.height}
                decoding="async"
                className="block aspect-16/10 w-full object-cover"
              />
            )}
          </div>
        )}
      </div>
    </section>
  );
}
