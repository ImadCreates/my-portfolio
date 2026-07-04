import { challenge, personalInfo } from '../data/portfolioData';
import useCopyEmail from '../lib/useCopyEmail';

const EXTERNAL_LINKS = [
  { label: 'GITHUB', href: personalInfo.github },
  { label: 'LINKEDIN', href: personalInfo.linkedin },
  { label: 'RESUME', href: personalInfo.resume },
];

export default function ChallengeSection() {
  const { copied, copy } = useCopyEmail();

  return (
    <section
      id="challenge"
      aria-labelledby="challenge-heading"
      className="flex min-h-svh flex-col justify-center px-6 pt-24 md:px-12"
    >
      <h2 id="challenge-heading" className="display-face text-hero text-bone" data-reveal>
        {challenge.headline}
      </h2>
      <p className="mt-8 max-w-xl text-body text-steel" data-reveal>
        {challenge.line}
      </p>

      <div className="mt-16 flex flex-col gap-6 md:flex-row md:items-center md:gap-12" data-reveal>
        <button
          type="button"
          onClick={copy}
          className="label-mono cursor-pointer text-left text-bone transition-colors duration-(--t-fast) ease-settle hover:text-seal"
          aria-live="polite"
        >
          {copied ? 'COPIED' : personalInfo.email.toUpperCase()}
        </button>

        {EXTERNAL_LINKS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="label-mono text-steel transition-colors duration-(--t-fast) ease-settle hover:text-bone"
          >
            {label}
          </a>
        ))}
      </div>
    </section>
  );
}
