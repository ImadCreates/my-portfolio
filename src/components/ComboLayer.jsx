import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap, T, prefersReducedMotion } from '../lib/motion';
import { onCut } from '../lib/blade';

/*
  B2: the combo counter. Cuts landed within 1.2s chain. From x2 a mono
  counter renders at the endpoint of the latest cut for 0.6s. Streak
  titles show once per threshold per session, seal, under the counter.
  All aria-hidden and pointer-events none. No shake, no flashes.
*/
const CHAIN_MS = 1200;
const TITLES = { 4: 'CLEAN FORM', 7: 'PERFECT FORM', 10: 'MASTER STROKE' };
const titleKey = (n) => `rank-one:streak-${n}`;

export default function ComboLayer() {
  const boxRef = useRef(null);
  const chainRef = useRef({ count: 0, last: 0 });
  const [display, setDisplay] = useState(null);
  const reduced = useMemo(() => prefersReducedMotion(), []);

  useEffect(() => {
    if (reduced) return undefined;
    return onCut((line) => {
      const now = performance.now();
      const chain = chainRef.current;
      chain.count = now - chain.last <= CHAIN_MS ? chain.count + 1 : 1;
      chain.last = now;
      if (chain.count < 2) {
        setDisplay(null);
        return;
      }
      let title = null;
      if (TITLES[chain.count] && !sessionStorage.getItem(titleKey(chain.count))) {
        sessionStorage.setItem(titleKey(chain.count), '1');
        title = TITLES[chain.count];
      }
      setDisplay({
        count: chain.count,
        title,
        x: Math.min(Math.max(line.x2, 16), window.innerWidth - 112),
        y: Math.min(Math.max(line.y2, 24), window.innerHeight - 56),
        key: now,
      });
    });
  }, [reduced]);

  /* Visible for 0.6s total: hold one base beat, fade one fast beat. */
  useLayoutEffect(() => {
    if (!display || !boxRef.current) return;
    gsap.fromTo(
      boxRef.current,
      { autoAlpha: 1 },
      {
        autoAlpha: 0,
        duration: T.fast,
        delay: T.base,
        ease: 'none',
        overwrite: true,
        onComplete: () => setDisplay(null),
      },
    );
  }, [display]);

  if (reduced || !display) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-40">
      <div key={display.key} ref={boxRef} className="absolute" style={{ left: display.x + 10, top: display.y + 6 }}>
        <p className="label-mono text-bone">CUT x{display.count}</p>
        {display.title && <p className="label-mono mt-1 text-seal">{display.title}</p>}
      </div>
    </div>
  );
}
