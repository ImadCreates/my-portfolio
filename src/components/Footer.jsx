import { motion } from 'framer-motion';
import { Mail, ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalInfo } from '../data/portfolioData';

export default function Footer({ onNavigate }) {
  return (
    <footer
      className="relative py-12 px-6"
      style={{ borderTop: '1px solid rgba(255,70,85,0.1)', background: 'rgba(10,11,14,0.8)' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left */}
          <div>
            <div className="font-orbitron font-black text-lg text-white tracking-widest mb-1">
              &lt;DEV/&gt;
            </div>
            <p className="font-rajdhani text-xs text-gray-600 tracking-widest">
              {personalInfo.tagline.toUpperCase()}
            </p>
          </div>

          {/* Center: Back to top */}
          <button
            onClick={() => onNavigate('hero')}
            className="group flex flex-col items-center gap-1"
          >
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="p-2 border border-white/10 group-hover:border-red-500/30 transition-colors duration-200"
            >
              <ArrowUp size={16} className="text-gray-500 group-hover:text-red-400 transition-colors" />
            </motion.div>
            <span className="font-orbitron text-xs text-gray-600 tracking-widest" style={{ fontSize: '9px' }}>
              BACK TO TOP
            </span>
          </button>

          {/* Right: Social */}
          <div className="flex items-center gap-4">
            {[
              { icon: <GithubIcon size={16} />, href: personalInfo.github, color: '#00d4ff' },
              { icon: <LinkedinIcon size={16} />, href: personalInfo.linkedin, color: '#4fc3f7' },
              { icon: <Mail size={16} />, href: `mailto:${personalInfo.email}`, color: '#ff4655' },
            ].map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-600 hover:text-white transition-all duration-200 group"
                style={{ border: '1px solid rgba(255,255,255,0.05)' }}
              >
                <span className="group-hover:text-current transition-colors" style={{ '--tw-text-opacity': 1 }}>
                  <span style={{ color: 'inherit' }}>{s.icon}</span>
                </span>
              </a>
            ))}
          </div>
        </div>

        <div
          className="mt-8 pt-6 text-center"
          style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
        >
          <p className="font-rajdhani text-xs text-gray-700 tracking-widest">
            © {new Date().getFullYear()} {personalInfo.name.toUpperCase()} · BUILT WITH REACT + TAILWIND
          </p>
        </div>
      </div>
    </footer>
  );
}
