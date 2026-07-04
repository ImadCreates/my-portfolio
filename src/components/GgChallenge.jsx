import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCut } from './CutProvider';
import { scrollToSection } from '../lib/scroll';

/* Typing gg outside inputs opens the challenge through the cut. */
export default function GgChallenge() {
  const { cutTo } = useCut();
  const navigate = useNavigate();
  const location = useLocation();
  const locationRef = useRef(location);
  locationRef.current = location;

  useEffect(() => {
    let lastKey = '';
    let lastTime = 0;

    const onKey = (e) => {
      const target = e.target;
      if (
        (target instanceof Element &&
          target.closest('input, textarea, select, [contenteditable]')) ||
        e.metaKey ||
        e.ctrlKey ||
        e.altKey
      ) {
        lastKey = '';
        return;
      }
      const now = performance.now();
      if (e.key === 'g' && lastKey === 'g' && now - lastTime < 600) {
        lastKey = '';
        cutTo(() => {
          if (locationRef.current.pathname !== '/') {
            navigate('/#challenge');
          } else {
            scrollToSection('challenge', { immediate: true });
            history.replaceState(null, '', '#challenge');
          }
        });
        return;
      }
      lastKey = e.key;
      lastTime = now;
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [cutTo, navigate]);

  return null;
}
