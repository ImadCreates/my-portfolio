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
    /* P4: the one loud moment. The section inverts to a full-bleed seal
       field: ink for the display heading and the email CTA (AA passes
       at large sizes only, 3.46:1), bone for body-size text (4.89:1).
       Steel never touches seal (1.67:1). */
    <section
      id="challenge"
      aria-labelledby="challenge-heading"
      className="relative flex min-h-svh flex-col justify-center bg-seal px-6 pt-12 md:px-12"
    >
      <GhostNumeral n="04" stroke="var(--color-ink)" className="top-1/2 -translate-y-1/2" />
      {/* B2: the giant heading is a sliceable target. */}
      <Sliceable>
        <h2 id="challenge-heading" ref={headingRef} className="display-face text-hero text-ink">
          {headline}
          <span className="text-bone">.</span>
        </h2>
      </Sliceable>
      <p className="mt-8 max-w-xl text-body text-bone" data-reveal>
        {challenge.line.lead} <em className="serif-accent">{challenge.line.accent}</em>
        {challenge.line.tail}
      </p>

      <div
        className="mt-16 flex flex-col items-start gap-8 md:flex-row md:items-center md:gap-12"
        data-reveal
      >
        {/* The magnetic email link renders ink-on-seal, at title size so
            large-text contrast holds. */}
        <button
          ref={emailRef}
          type="button"
          onClick={copy}
          className="group flex cursor-pointer items-center gap-3 text-left font-mono text-title tracking-[0.08em] text-ink uppercase transition-colors duration-(--t-fast) ease-settle active:translate-x-[2px] hover:text-bone"
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
            className="label-mono group flex items-center gap-2 text-bone active:translate-x-[2px]"
          >
            <Slash />
            {label}
          </a>
        ))}
      </div>
    </section>
  );
}
