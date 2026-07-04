import { Link, Navigate, useParams } from 'react-router-dom';
import { record } from '../data/portfolioData';
import useReveals from '../lib/useReveals';

/* Case study, concept doc section 10. Outcome before tech, always. */
export default function CaseStudy() {
  const { slug } = useParams();
  const entry = record.find((item) => item.slug === slug);

  useReveals();

  if (!entry) return <Navigate to="/" replace />;

  return (
    <article className="px-6 pt-32 md:px-12">
      <Link
        to="/"
        className="label-mono text-steel transition-colors duration-(--t-fast) ease-settle hover:text-bone"
      >
        BACK TO RECORD
      </Link>

      <header className="mt-12" data-reveal>
        <p className="label-mono text-steel">
          {entry.year} · {entry.status} · {entry.stack}
        </p>
        <h1 className="display-face mt-6 text-hero text-bone">{entry.title}</h1>
        <p className="mt-8 max-w-2xl text-title text-bone">{entry.outcome}</p>
      </header>

      <section aria-labelledby="fight-heading" className="mt-24" data-reveal>
        <h2 id="fight-heading" className="label-mono pb-6 text-steel">
          THE FIGHT
        </h2>
        <p className="max-w-2xl text-body text-bone">{entry.fight}</p>
      </section>

      <section aria-labelledby="decisions-heading" className="mt-24">
        <h2 id="decisions-heading" className="label-mono pb-2 text-steel" data-reveal>
          DECISIONS
        </h2>
        <ul>
          {entry.decisions.map((decision) => (
            <li
              key={decision.title}
              className="grid gap-2 border-t border-hairline py-6 last:border-b md:grid-cols-[16rem_1fr] md:gap-6"
              data-reveal
            >
              <h3 className="label-mono text-bone">{decision.title}</h3>
              <p className="max-w-2xl text-body text-steel">{decision.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="replay-heading" className="mt-24" data-reveal>
        <h2 id="replay-heading" className="label-mono pb-6 text-steel">
          REPLAY
        </h2>
        <div className="max-w-3xl border border-hairline">
          <iframe
            src={`${entry.replay.url}?mute=1`}
            title="Routy app demo"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="aspect-video w-full"
          />
        </div>
        <p className="label-mono mt-4 text-steel">{entry.replay.caption}</p>
      </section>

      <section aria-label="Verifiable links" className="mt-24 pb-8" data-reveal>
        <div className="flex gap-12">
          <a
            href={entry.links.repo}
            target="_blank"
            rel="noreferrer"
            className="label-mono text-bone transition-colors duration-(--t-fast) ease-settle hover:text-seal"
          >
            REPO
          </a>
          <a
            href={entry.links.live}
            target="_blank"
            rel="noreferrer"
            className="label-mono text-bone transition-colors duration-(--t-fast) ease-settle hover:text-seal"
          >
            LIVE · ROUTY.CA
          </a>
        </div>
        <p className="label-mono mt-8 max-w-2xl text-steel">{entry.architecture}</p>
      </section>
    </article>
  );
}
