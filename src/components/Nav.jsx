import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { personalInfo } from '../data/portfolioData';
import { gsap, ScrollTrigger, T, EASE, prefersReducedMotion } from '../lib/motion';
import { getLenis, lockScroll, scrollToSection } from '../lib/scroll';

const LINKS = [
  { id: 'record', label: 'RECORD' },
  { id: 'loadout', label: 'LOADOUT' },
  { id: 'player', label: 'THE PLAYER' },
  { id: 'challenge', label: 'CHALLENGE', seal: true },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const headerRef = useRef(null);
  const linksRef = useRef(null);
  const underlineRef = useRef(null);
  const menuOpenRef = useRef(false);
  const location = useLocation();
  const navigate = useNavigate();
  const onHome = location.pathname === '/';

  menuOpenRef.current = menuOpen;

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    lockScroll(menuOpen);
    if (!menuOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  /* Hide on scroll down, return instantly on any scroll up. */
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const header = headerRef.current;
    let lastY = 0;

    const onScroll = (y) => {
      if (menuOpenRef.current) return;
      if (y > lastY && y > 96) {
        gsap.to(header, { yPercent: -100, duration: T.base, ease: EASE.settle, overwrite: true });
      } else if (y < lastY) {
        gsap.set(header, { yPercent: 0, overwrite: true });
      }
      lastY = y;
    };

    const lenis = getLenis();
    const onWindowScroll = () => onScroll(window.scrollY);
    if (lenis) {
      const handler = ({ scroll }) => onScroll(scroll);
      lenis.on('scroll', handler);
      return () => lenis.off('scroll', handler);
    }
    window.addEventListener('scroll', onWindowScroll, { passive: true });
    return () => window.removeEventListener('scroll', onWindowScroll);
  }, []);

  /* Track the active section on the home page. */
  useEffect(() => {
    if (!onHome) {
      setActiveSection(null);
      return undefined;
    }
    const triggers = LINKS.map(({ id }) =>
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: 'top center',
        end: 'bottom center',
        onToggle: (self) => {
          if (self.isActive) setActiveSection(id);
          else setActiveSection((current) => (current === id ? null : current));
        },
      }),
    );
    return () => triggers.forEach((t) => t.kill());
  }, [onHome]);

  /* Slide the 1px seal underline to the active link. */
  useEffect(() => {
    const underline = underlineRef.current;
    if (!underline) return undefined;

    const position = () => {
      const link = linksRef.current?.querySelector(`[data-nav-link="${activeSection}"]`);
      if (!link) {
        gsap.to(underline, { opacity: 0, duration: T.fast, ease: EASE.settle });
        return;
      }
      const vars = { x: link.offsetLeft, width: link.offsetWidth, opacity: 1 };
      if (prefersReducedMotion()) gsap.set(underline, vars);
      else gsap.to(underline, { ...vars, duration: T.base, ease: EASE.settle });
    };

    position();
    window.addEventListener('resize', position);
    return () => window.removeEventListener('resize', position);
  }, [activeSection]);

  const goToSection = (id) => {
    setMenuOpen(false);
    if (!onHome) {
      navigate(`/#${id}`);
      return;
    }
    scrollToSection(id);
    history.replaceState(null, '', `#${id}`);
  };

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-40 border-b border-hairline bg-ink">
      <nav aria-label="Primary" className="flex h-14 items-center justify-between px-6 md:px-12">
        <Link to="/" className="label-mono text-bone" aria-label="Imaduddin Ahmed, home">
          {personalInfo.shortName}
        </Link>

        <div ref={linksRef} className="relative hidden items-center gap-8 md:flex">
          {LINKS.map(({ id, label, seal }) => (
            <button
              key={id}
              type="button"
              onClick={() => goToSection(id)}
              className={`label-mono cursor-pointer transition-colors duration-(--t-fast) ease-settle ${
                seal ? 'text-seal' : 'text-steel hover:text-bone'
              } ${activeSection === id && !seal ? 'text-bone' : ''}`}
              data-nav-link={id}
            >
              {label}
            </button>
          ))}
          <span
            ref={underlineRef}
            aria-hidden="true"
            className="absolute -bottom-1 left-0 h-px w-0 bg-seal opacity-0"
          />
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
