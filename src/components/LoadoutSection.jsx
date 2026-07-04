import { loadout } from '../data/portfolioData';
import SectionLabel from './SectionLabel';

export default function LoadoutSection() {
  return (
    <section id="loadout" aria-labelledby="loadout-heading" className="pt-24 md:pt-32">
      <SectionLabel id="loadout-heading" index="02" title="LOADOUT" />
      <ul>
        {loadout.map(({ skill, evidence }) => (
          <li
            key={skill}
            className="grid gap-1 border-t border-hairline px-6 py-5 last:border-b md:grid-cols-[16rem_1fr] md:gap-6 md:px-12"
            data-reveal
          >
            <span className="label-mono text-bone">{skill}</span>
            <span className="text-body text-steel">{evidence}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
