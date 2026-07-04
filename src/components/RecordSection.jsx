import { Link } from 'react-router-dom';
import { record } from '../data/portfolioData';
import { useCut, cutClick } from './CutProvider';
import SectionLabel from './SectionLabel';

const META_CLASSES =
  'label-mono text-steel transition-colors duration-(--t-fast) ease-settle ' +
  'group-hover:text-bone group-focus-visible:text-bone';

function RowContent({ entry }) {
  return (
    <div className="grid items-baseline gap-2 px-6 py-8 md:grid-cols-[11rem_1fr_auto] md:gap-6 md:px-12">
      <p className={META_CLASSES}>
        {entry.year} · {entry.status}
      </p>
      <h3 className="display-face text-heading text-bone">{entry.title}</h3>
      <p className={`${META_CLASSES} md:text-right`}>{entry.stack}</p>
      {/* The cut, in miniature: 1px seal line draws left to right on hover. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-seal transition-transform duration-(--t-fast) ease-cut group-hover:scale-x-100 group-focus-visible:scale-x-100"
      />
    </div>
  );
}

export default function RecordSection() {
  const cutNavigate = useCut();

  return (
    <section id="record" aria-labelledby="record-heading" className="pt-24 md:pt-32">
      <SectionLabel id="record-heading" index="01" title="RECORD" />
      <ul>
        {record.map((entry) => (
          <li key={entry.title} className="border-t border-hairline last:border-b" data-reveal>
            {entry.slug ? (
              <Link
                to={`/record/${entry.slug}`}
                onClick={cutClick(cutNavigate, `/record/${entry.slug}`)}
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
