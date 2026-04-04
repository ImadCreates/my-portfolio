import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navItems = [
  { id: 'skills', label: 'SKILLS', color: '#bd93f9' },
  { id: 'projects', label: 'PROJECTS', color: '#00d4ff' },
  { id: 'about', label: 'ABOUT ME', color: '#ff4655' },
  { id: 'experience', label: 'EXPERIENCE', color: '#ffd700' },
  { id: 'education', label: 'EDUCATION', color: '#4fc3f7' },
];

export default function Navbar({ activeSection, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNav('hero')}
          className="relative group"
        >
          <span
            className="font-orbitron font-bold text-lg tracking-widest"
            style={{ color: '#ff4655' }}
          >
            &lt;DEV/&gt;
          </span>
          <span className="font-rajdhani text-xs text-gray-500 block tracking-widest uppercase">
            Portfolio
          </span>
          <span
            className="absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
            style={{ background: '#ff4655' }}
          />
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
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
