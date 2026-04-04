import { useState, useEffect } from 'react';

const links = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar({ onOpenContact, activePortfolio, onSwitchPortfolio }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleOpenContact = () => {
    if (typeof onOpenContact === 'function') {
      onOpenContact();
      setMobileOpen(false);
      return;
    }

    window.location.href = 'mailto:approachimad@gmail.com';
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-35% 0px -60% 0px' }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const aboutLink = links[0];
  const otherLinks = links.slice(1);

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: 'all 0.3s ease',
          background: scrolled ? 'rgba(7, 9, 15, 0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(34, 211, 238, 0.07)' : 'none',
        }}
      >
        <div
          className="max-container"
          style={{ height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}
        >
          <a href="#hero" style={{ textDecoration: 'none' }}>
            <span className="gradient-text" style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '1.1rem', fontWeight: 700 }}>
              IA.
            </span>
          </a>

          <div className="md:hidden absolute left-1/2 -translate-x-1/2">
            <PortfolioSwitchInline
              activePortfolio={activePortfolio}
              onSwitchPortfolio={onSwitchPortfolio}
              compact
            />
          </div>

          <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '2.25rem' }}>
            <PortfolioSwitchInline
              activePortfolio={activePortfolio}
              onSwitchPortfolio={onSwitchPortfolio}
            />

            <a href={aboutLink.href} className={`nav-link ${active === aboutLink.href.slice(1) ? 'active' : ''}`}>
              {aboutLink.label}
            </a>

            {otherLinks.map((l) => (
              <a key={l.href} href={l.href} className={`nav-link ${active === l.href.slice(1) ? 'active' : ''}`}>
                {l.label}
              </a>
            ))}

            <button
              type="button"
              onClick={handleOpenContact}
              className="btn-outline"
              style={{ padding: '0.45rem 1.1rem', fontSize: '0.85rem' }}
            >
              <span>Let's Connect</span>
            </button>
          </nav>

          <button
            className="mobile-menu-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: 'none',
              border: '1px solid rgba(34,211,238,0.2)',
              borderRadius: '8px',
              padding: '7px 9px',
              cursor: 'pointer',
              display: 'none',
              flexDirection: 'column',
              gap: '4px',
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: 'block',
                  width: '20px',
                  height: '1.5px',
                  background: mobileOpen && i === 1 ? 'transparent' : 'var(--accent)',
                  transition: 'all 0.3s ease',
                  transform: mobileOpen
                    ? i === 0
                      ? 'rotate(45deg) translate(4px, 4px)'
                      : i === 2
                        ? 'rotate(-45deg) translate(4px, -4px)'
                        : ''
                    : '',
                }}
              />
            ))}
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div
          className="mobile-menu"
          style={{
            position: 'fixed',
            top: '70px',
            left: 0,
            right: 0,
            zIndex: 49,
            background: 'rgba(7, 9, 15, 0.97)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(34, 211, 238, 0.08)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}
        >
          <a
            href={aboutLink.href}
            className={`nav-link ${active === aboutLink.href.slice(1) ? 'active' : ''}`}
            style={{ fontSize: '1rem' }}
            onClick={() => setMobileOpen(false)}
          >
            {aboutLink.label}
          </a>

          {otherLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`nav-link ${active === l.href.slice(1) ? 'active' : ''}`}
              style={{ fontSize: '1rem' }}
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </a>
          ))}

          <button
            type="button"
            onClick={handleOpenContact}
            className="btn-outline"
            style={{ alignSelf: 'flex-start' }}
          >
            <span>Let's Connect</span>
          </button>
        </div>
      )}
    </>
  );
}

function PortfolioSwitchInline({ activePortfolio, onSwitchPortfolio, compact = false }) {
  const baseStyle = compact
    ? { padding: '0.24rem 0.5rem', fontSize: '0.64rem' }
    : { padding: '0.26rem 0.55rem', fontSize: '0.66rem' };

  const handleSwitch = (mode) => {
    if (typeof onSwitchPortfolio === 'function') {
      onSwitchPortfolio(mode);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.35rem',
        padding: '0.18rem',
        borderRadius: '8px',
        border: '1px solid rgba(34, 211, 238, 0.2)',
        background: 'rgba(7, 9, 15, 0.75)',
      }}
    >
      <button
        type="button"
        onClick={() => handleSwitch('my')}
        aria-pressed={activePortfolio === 'my'}
        style={{
          ...baseStyle,
          borderRadius: '6px',
          border: `1px solid ${activePortfolio === 'my' ? 'rgba(255,70,85,0.6)' : 'rgba(255,255,255,0.1)'}`,
          color: activePortfolio === 'my' ? '#ff4655' : '#9ca3af',
          background: 'rgba(10,14,22,0.9)',
          letterSpacing: '0.08em',
          fontFamily: 'Rajdhani, sans-serif',
          fontWeight: 700,
          cursor: 'pointer',
        }}
      >
        PRO
      </button>

      <button
        type="button"
        onClick={() => handleSwitch('val')}
        aria-pressed={activePortfolio === 'val'}
        style={{
          ...baseStyle,
          borderRadius: '6px',
          border: `1px solid ${activePortfolio === 'val' ? 'rgba(0,212,255,0.65)' : 'rgba(255,255,255,0.1)'}`,
          color: activePortfolio === 'val' ? '#22d3ee' : '#9ca3af',
          background: 'rgba(10,14,22,0.9)',
          letterSpacing: '0.08em',
          fontFamily: 'Rajdhani, sans-serif',
          fontWeight: 700,
          cursor: 'pointer',
        }}
      >
        VAL
      </button>
    </div>
  );
}
