import { Link } from 'react-router-dom';
import { record } from '../data/portfolioData';
import SectionLabel from './SectionLabel';

function RowContent({ entry }) {
  return (
    <div className="grid items-baseline gap-2 px-6 py-8 md:grid-cols-[11rem_1fr_auto] md:gap-6 md:px-12">
      <p className="label-mono text-steel" data-row-meta>
        {entry.year} · {entry.status}
      </p>
      <h3 className="display-face text-heading text-bone">{entry.title}</h3>
      <p className="label-mono text-steel md:text-right" data-row-meta>
        {entry.stack}
      </p>
    </div>
  );
}

export default function RecordSection() {
  return (
    <section id="record" aria-labelledby="record-heading" className="pt-24 md:pt-32">
      <SectionLabel id="record-heading" index="01" title="RECORD" />
      <ul>
        {record.map((entry) => (
          <li key={entry.title} className="border-t border-hairline last:border-b" data-reveal>
            {entry.slug ? (
              <Link
                to={`/record/${entry.slug}`}
                className="group relative block"
                data-row
                aria-label={`${entry.title} case study`}
              >
                <RowContent entry={entry} />
              </Link>
            ) : (
              <a
                href={entry.links.demo}
                target="_blank"
                rel="noreferrer"
                className="group relative block"
                data-row
                aria-label={`${entry.title} demo video`}
              >
                <RowContent entry={entry} />
              </a>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
