import { hero, personalInfo } from '../data/portfolioData';

export default function Hero() {
  const [first, last] = personalInfo.name.split(' ');

  return (
    <section aria-label="Player profile" className="flex min-h-svh flex-col justify-end">
      <div className="flex flex-1 flex-col justify-center px-6 pt-14 md:px-12">
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
        className="grid border-t border-hairline md:grid-cols-3"
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
