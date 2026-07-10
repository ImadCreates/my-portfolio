import { education, experience, personalInfo, player } from '../data/portfolioData';
import GhostNumeral from './GhostNumeral';
import SectionLabel from './SectionLabel';

function CareerEntry({ heading, period, description }) {
  return (
    <li className="border-t border-hairline px-6 py-6 last:border-b md:px-12" data-reveal>
      <div className="flex flex-col justify-between gap-1 md:flex-row md:items-baseline md:gap-6">
        <h4 className="text-body text-bone">{heading}</h4>
        <p className="label-mono shrink-0 text-steel">{period}</p>
      </div>
      <p className="mt-2 max-w-2xl text-body text-steel">{description}</p>
    </li>
  );
}

export default function PlayerSection() {
  return (
    <section id="player" aria-labelledby="player-heading" className="relative pt-12 md:pt-16">
      <GhostNumeral n="03" />
      <SectionLabel id="player-heading" index="03" title="THE PLAYER" />

      <div className="grid gap-12 px-6 md:grid-cols-[1fr_auto] md:px-12">
        <div className="max-w-2xl space-y-6" data-reveal>
          {player.paragraphs.map((text) => (
            <p key={text.slice(0, 24)} className="text-body text-bone">
              {text}
            </p>
          ))}
        </div>
        <img
          src={personalInfo.photo}
          alt="Imaduddin Ahmed"
          width="280"
          height="280"
          loading="lazy"
          className="h-56 w-56 self-start object-cover grayscale contrast-125 md:h-70 md:w-70"
          data-reveal
        />
      </div>

      <h3 className="label-mono mt-10 px-6 pb-4 text-steel md:px-12" data-reveal>
        CAREER
      </h3>
      <ul>
        {experience.map((job) => (
          <CareerEntry
            key={`${job.role}-${job.company}`}
            heading={`${job.role} · ${job.company}`}
            period={job.period}
            description={job.description}
          />
        ))}
      </ul>

      <h3 className="label-mono mt-8 px-6 pb-4 text-steel md:px-12" data-reveal>
        EDUCATION
      </h3>
      <ul>
        {education.map((entry) => (
          <CareerEntry
            key={entry.degree}
            heading={`${entry.degree} · ${entry.institution}`}
            period={entry.period}
            description={entry.description}
          />
        ))}
      </ul>
    </section>
  );
}
