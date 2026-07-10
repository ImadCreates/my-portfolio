import { useRef } from 'react';
import { challenge, personalInfo } from '../data/portfolioData';
import useCopyEmail from '../lib/useCopyEmail';
import useLineReveal from '../lib/useLineReveal';
import useMagnetic from '../lib/useMagnetic';
import GhostNumeral from './GhostNumeral';
import Slash from './Slash';
import Sliceable from './Sliceable';

const EXTERNAL_LINKS = [
  { label: 'GITHUB', href: personalInfo.github },
  { label: 'LINKEDIN', href: personalInfo.linkedin },
  { label: 'RESUME', href: personalInfo.resume },
];

export default function ChallengeSection() {
  const { copied, copy } = useCopyEmail();
  const headingRef = useRef(null);
  const emailRef = useRef(null);
  const headline = challenge.headline.replace(/\.$/, '');

  useLineReveal(headingRef);
  useMagnetic(emailRef);

  return (
    <section
      id="challenge"
      aria-labelledby="challenge-heading"
      className="relative flex min-h-svh flex-col justify-center px-6 pt-12 md:px-12"
    >
      <GhostNumeral n="04" className="top-1/2 -translate-y-1/2" />
      {/* B2: the giant heading is a sliceable target. */}
      <Sliceable>
        <h2 id="challenge-heading" ref={headingRef} className="display-face text-hero text-bone">
          {headline}
          <span className="text-seal">.</span>
        </h2>
      </Sliceable>
      <p className="mt-8 max-w-xl text-body text-steel" data-reveal>
        {challenge.line.lead} <em className="serif-accent">{challenge.line.accent}</em>
        {challenge.line.tail}
      </p>

      <div className="mt-16 flex flex-col gap-6 md:flex-row md:items-center md:gap-12" data-reveal>
        <button
          ref={emailRef}
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
