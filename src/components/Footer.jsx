import { useEffect, useState } from 'react';
import { onSoundChange, setSound, soundEnabled } from '../lib/sound';

/* P6: live Toronto time, mono, updated on the minute, no seconds. */
const torontoTime = () =>
  new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Toronto',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date());

function useTorontoTime() {
  const [time, setTime] = useState(torontoTime);
  useEffect(() => {
    let timer;
    const arm = () => {
      /* Fire just past the next minute boundary, then re-arm. */
      timer = setTimeout(() => {
        setTime(torontoTime());
        arm();
      }, 60_000 - (Date.now() % 60_000) + 50);
    };
    arm();
    return () => clearTimeout(timer);
  }, []);
  return time;
}

export default function Footer() {
  const [soundOn, setSoundOn] = useState(soundEnabled);
  const time = useTorontoTime();

  useEffect(() => onSoundChange(setSoundOn), []);

  return (
    <footer className="mt-12 border-t border-hairline">
      <div className="flex flex-col justify-between gap-2 px-6 py-6 md:flex-row md:items-center md:px-12">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-8">
          <p className="label-mono text-steel">
            IMAD.A / TORONTO / 2026 · <time>{time}</time>
          </p>
          <p className="label-mono flex items-center gap-2 text-bone">
            <span aria-hidden="true" className="inline-block h-[6px] w-[6px] bg-bone" />
            OPEN TO CO-OP · SEPT 2026
          </p>
        </div>
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
