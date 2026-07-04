import { challenge, personalInfo } from '../data/portfolioData';
import useCopyEmail from '../lib/useCopyEmail';
import Slash from './Slash';

const EXTERNAL_LINKS = [
  { label: 'GITHUB', href: personalInfo.github },
  { label: 'LINKEDIN', href: personalInfo.linkedin },
  { label: 'RESUME', href: personalInfo.resume },
];

export default function ChallengeSection() {
  const { copied, copy } = useCopyEmail();
  const headline = challenge.headline.replace(/\.$/, '');

  return (
    <section
      id="challenge"
      aria-labelledby="challenge-heading"
      className="flex min-h-svh flex-col justify-center px-6 pt-24 md:px-12"
    >
      <h2 id="challenge-heading" className="display-face text-hero text-bone" data-reveal>
        {headline}
        <span className="text-seal">.</span>
      </h2>
      <p className="mt-8 max-w-xl text-body text-steel" data-reveal>
        {challenge.line}
      </p>

      <div className="mt-16 flex flex-col gap-6 md:flex-row md:items-center md:gap-12" data-reveal>
        <button
          type="button"
          onClick={copy}
          className="label-mono group flex cursor-pointer items-center gap-2 text-left text-bone transition-colors duration-(--t-fast) ease-settle active:translate-x-[2px] hover:text-seal"
          aria-live="polite"
        >
          <Slash />
          {copied ? 'COPIED' : personalInfo.email.toUpperCase()}
        </button>

        {EXTERNAL_LINKS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="label-mono group flex items-center gap-2 text-steel transition-colors duration-(--t-fast) ease-settle active:translate-x-[2px] hover:text-bone"
          >
            <Slash />
            {label}
          </a>
        ))}
      </div>
    </section>
  );
}
