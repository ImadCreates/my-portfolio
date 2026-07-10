import { Link } from 'react-router-dom';
import { useCut, cutClick } from '../components/CutProvider';
import Slash from '../components/Slash';
import usePageMeta from '../lib/usePageMeta';

/*
  P6: the 404. Ink page, mono statement, a single static cut line —
  drawn, not animated — and one way back.
*/
export default function NotFound() {
  const { cutNavigate } = useCut();

  usePageMeta(
    'PAGE NOT FOUND · Imaduddin Ahmed',
    'This page is not on the record. Return to the profile of Imaduddin Ahmed.',
  );

  return (
    <section
      aria-labelledby="notfound-heading"
      className="relative flex min-h-svh flex-col justify-center px-6 md:px-12"
    >
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <line
          x1="100"
          y1="0"
          x2="0"
          y2="100"
          stroke="var(--color-hairline)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
        <line
          x1="54"
          y1="46"
          x2="46"
          y2="54"
          stroke="var(--color-seal)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <p className="label-mono text-steel">404</p>
      <h1
        id="notfound-heading"
        className="mt-4 font-mono text-title tracking-[0.08em] text-bone uppercase"
      >
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-body text-steel">This page is not on the record.</p>
      <Link
        to="/"
        onClick={cutClick(cutNavigate, '/')}
        className="label-mono group mt-12 inline-flex items-center gap-2 text-bone transition-colors duration-(--t-fast) ease-settle active:translate-x-[2px] hover:text-seal"
      >
        <Slash />
        RETURN TO THE RECORD
      </Link>
    </section>
  );
}
