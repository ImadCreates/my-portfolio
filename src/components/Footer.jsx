import { useEffect, useState } from 'react';
import { onSoundChange, setSound, soundEnabled } from '../lib/sound';

export default function Footer() {
  const [soundOn, setSoundOn] = useState(soundEnabled);

  useEffect(() => onSoundChange(setSoundOn), []);

  return (
    <footer className="mt-12 border-t border-hairline">
      <div className="flex flex-col justify-between gap-2 px-6 py-6 md:flex-row md:items-center md:px-12">
        <p className="label-mono text-steel">IMAD.A / TORONTO / 2026</p>
        <div className="flex items-center gap-8">
          <button
            type="button"
            onClick={() => setSound(!soundOn)}
            aria-pressed={soundOn}
            className="label-mono cursor-pointer text-steel transition-colors duration-(--t-fast) ease-settle hover:text-bone"
          >
            SOUND · {soundOn ? 'ON' : 'OFF'}
          </button>
          <p className="label-mono text-steel">
            BUILT WITH REACT + GSAP ·{' '}
            <a
              href="https://github.com/ImadCreates/my-portfolio"
              target="_blank"
              rel="noreferrer"
              className="text-bone underline underline-offset-4 transition-colors duration-(--t-fast) ease-settle hover:text-seal"
            >
              SOURCE
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
