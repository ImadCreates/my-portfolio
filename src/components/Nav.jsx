import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { personalInfo } from '../data/portfolioData';

const LINKS = [
  { id: 'record', label: 'RECORD' },
  { id: 'loadout', label: 'LOADOUT' },
  { id: 'player', label: 'THE PLAYER' },
  { id: 'challenge', label: 'CHALLENGE', seal: true },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const goToSection = (id) => {
    setMenuOpen(false);
    if (location.pathname !== '/') {
      navigate(`/#${id}`);
      return;
    }
    document.getElementById(id)?.scrollIntoView();
    history.replaceState(null, '', `#${id}`);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-hairline bg-ink" data-nav>
      <nav aria-label="Primary" className="flex h-14 items-center justify-between px-6 md:px-12">
        <Link to="/" className="label-mono text-bone" aria-label="Imaduddin Ahmed, home">
          {personalInfo.shortName}
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map(({ id, label, seal }) => (
            <button
              key={id}
              type="button"
              onClick={() => goToSection(id)}
              className={`label-mono cursor-pointer transition-colors duration-(--t-fast) ease-settle ${
                seal ? 'text-seal' : 'text-steel hover:text-bone'
              }`}
              data-nav-link={id}
            >
              {label}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="label-mono cursor-pointer text-bone md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? 'CLOSE' : 'MENU'}
        </button>
      </nav>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 top-14 z-40 flex flex-col justify-center gap-8 bg-ink px-6"
        >
          {LINKS.map(({ id, label, seal }) => (
            <button
              key={id}
              type="button"
              onClick={() => goToSection(id)}
              className={`display-face cursor-pointer text-left text-heading ${
                seal ? 'text-seal' : 'text-bone'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
