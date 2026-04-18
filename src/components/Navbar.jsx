import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navItems = [
  { id: 'skills', label: 'SKILLS', color: '#bd93f9' },
  { id: 'projects', label: 'PROJECTS', color: '#00d4ff' },
  { id: 'about', label: 'ABOUT ME', color: '#ff4655' },
  { id: 'experience', label: 'EXPERIENCE', color: '#ffd700' },
  { id: 'education', label: 'EDUCATION', color: '#39ff88' },
  { id: 'whyme', label: 'WHY ME', color: '#ffd700' },
];

export default function Navbar({ activeSection, onNavigate, activePortfolio, onSwitchPortfolio }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const showFloatingSwitch = !scrolled;
  const showInlineSwitch = scrolled;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (id) => {
    onNavigate(id);
    setMobileOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-2' : 'py-4'
      }`}
      style={{
        background: scrolled
          ? 'rgba(15, 16, 20, 0.97)'
          : 'rgba(15, 16, 20, 0.6)',
        backdropFilter: 'blur(16px)',
        borderBottom: scrolled ? '1px solid rgba(255,70,85,0.15)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between relative">
        {/* Logo */}
        <button
          onClick={() => handleNav('hero')}
          className="relative group"
        >
          <span
            className="font-orbitron font-bold text-lg tracking-widest"
            style={{ color: '#ff4655' }}
          >
            Imad
          </span>
          <span className="font-rajdhani text-xs text-gray-500 block tracking-widest uppercase">
            Portfolio
          </span>
          <span
            className="absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
            style={{ background: '#ff4655' }}
          />
        </button>

        {/* Mobile centered switch */}
        <div className="md:hidden absolute left-1/2 -translate-x-1/2">
          <PortfolioSwitchButtons
            activePortfolio={activePortfolio}
            onSwitchPortfolio={onSwitchPortfolio}
            compact
          />
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {showInlineSwitch && (
            <div className="mr-3">
              <PortfolioSwitchButtons
                activePortfolio={activePortfolio}
                onSwitchPortfolio={onSwitchPortfolio}
              />
            </div>
          )}

          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className="relative px-4 py-2 group"
            >
              <span
                className="font-rajdhani font-semibold text-sm tracking-widest transition-colors duration-200"
                style={{
                  color: activeSection === item.id ? item.color : '#9e9e9e',
                }}
              >
                {item.label}
              </span>
              {/* Active / hover underline */}
              <span
                className="absolute bottom-0 left-4 right-4 h-px transition-all duration-300"
                style={{
                  background: item.color,
                  opacity: activeSection === item.id ? 1 : 0,
                  transform: activeSection === item.id ? 'scaleX(1)' : 'scaleX(0)',
                }}
              />
              <span
                className="absolute bottom-0 left-4 right-4 h-px transition-all duration-300 opacity-0 group-hover:opacity-60"
                style={{ background: item.color }}
              />
              {/* Active dot */}
              {activeSection === item.id && (
                <motion.span
                  layoutId="navDot"
                  className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                  style={{ background: item.color }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-gray-400 hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Floating switch at top only before scrolling in Valorant mode */}
      <AnimatePresence>
        {showFloatingSwitch && (
          <motion.div
            initial={{ y: -16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -16, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="hidden md:flex justify-center mt-2"
          >
            <PortfolioSwitchButtons
              activePortfolio={activePortfolio}
              onSwitchPortfolio={onSwitchPortfolio}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
            style={{ background: 'rgba(15,16,20,0.98)', borderTop: '1px solid rgba(255,70,85,0.1)' }}
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleNav(item.id)}
                  className="flex items-center gap-3 py-3 px-2 border-b border-white/5 last:border-0"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: item.color }}
                  />
                  <span
                    className="font-rajdhani font-semibold text-sm tracking-widest"
                    style={{ color: activeSection === item.id ? item.color : '#9e9e9e' }}
                  >
                    {item.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function PortfolioSwitchButtons({ activePortfolio, onSwitchPortfolio, compact = false }) {
  const baseButtonClass = compact
    ? 'flex items-center gap-1.5 px-2 py-1 border transition-colors duration-200'
    : 'flex items-center gap-2 px-3 py-1.5 border transition-colors duration-200';
  const textClass = compact ? 'font-rajdhani text-[10px] tracking-widest' : 'font-rajdhani text-xs tracking-widest';
  const proLabel = 'PRO';
  const valLabel = 'VAL';

  return (
    <div
      className="flex gap-2 rounded-md p-1"
      style={{ background: 'rgba(8,10,14,0.72)', border: '1px solid rgba(255,255,255,0.08)' }}
    >
      <button
        type="button"
        onClick={() => onSwitchPortfolio('my')}
        aria-pressed={activePortfolio === 'my'}
        className={baseButtonClass}
        style={{
          background: 'rgba(15,16,20,0.88)',
          borderColor: activePortfolio === 'my' ? 'rgba(255,70,85,0.6)' : 'rgba(255,255,255,0.1)',
        }}
      >
        <span className={compact ? 'text-[10px]' : 'text-xs'} style={{ color: activePortfolio === 'my' ? '#ff4655' : '#9e9e9e' }}>🔒</span>
        <span className={textClass} style={{ color: activePortfolio === 'my' ? '#ff4655' : '#9e9e9e' }}>
          {proLabel}
        </span>
      </button>

      <button
        type="button"
        onClick={() => onSwitchPortfolio('val')}
        aria-pressed={activePortfolio === 'val'}
        className={baseButtonClass}
        style={{
          background: 'rgba(15,16,20,0.88)',
          borderColor: activePortfolio === 'val' ? 'rgba(0,212,255,0.6)' : 'rgba(255,255,255,0.1)',
        }}
      >
        <span className={textClass} style={{ color: activePortfolio === 'val' ? '#00d4ff' : '#9e9e9e' }}>
          {valLabel}
        </span>
        <span className={compact ? 'text-[10px]' : 'text-xs'} style={{ color: activePortfolio === 'val' ? '#00d4ff' : '#9e9e9e' }}>🔓</span>
      </button>
    </div>
  );
}
