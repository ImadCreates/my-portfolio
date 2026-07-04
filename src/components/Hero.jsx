import { hero, personalInfo } from '../data/portfolioData';

export default function Hero() {
  const [first, last] = personalInfo.name.split(' ');

  return (
    <section aria-label="Player profile" className="relative flex min-h-svh flex-col justify-end">
      {/* The scar: the cut at rest, on the axis the loader draws. */}
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
      <div className="relative flex flex-1 flex-col justify-center px-6 pt-14 md:px-12">
        <p className="label-mono text-steel" data-reveal>
          {hero.eyebrow.join(' / ')}
        </p>
        <h1 className="display-face mt-6 text-hero text-bone" data-reveal>
          {first}
          <br />
          {last}
        </h1>
        <p className="mt-8 max-w-xl text-body text-steel" data-reveal>
          {personalInfo.positioning}
        </p>
      </div>

      <ul
        className="relative grid border-t border-hairline bg-ink md:grid-cols-3"
        aria-label="Record summary"
        data-reveal
      >
        {hero.recordStrip.map((item, i) => (
          <li
            key={item}
            className={`label-mono px-6 py-5 text-steel md:px-12 ${
              i > 0 ? 'border-t border-hairline md:border-t-0 md:border-l' : ''
            }`}
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
