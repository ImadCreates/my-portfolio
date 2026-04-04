import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ChevronDown } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import AgentCard from './AgentCard';
import { personalInfo } from '../data/portfolioData';

const cards = [
  { id: 'skills', position: 'far' },
  { id: 'projects', position: 'side' },
  { id: 'about', position: 'center' },
  { id: 'experience', position: 'side' },
  { id: 'education', position: 'far' },
];

export default function HeroSection({ onNavigate, onOpenContact }) {
  const [activeCard, setActiveCard] = useState('about');
  const cardsRowRef = useRef(null);
  const aboutCardRef = useRef(null);

  useEffect(() => {
    const centerAboutCard = () => {
      if (window.innerWidth >= 768) return;

      const row = cardsRowRef.current;
      const aboutCard = aboutCardRef.current;
      if (!row || !aboutCard) return;

      const targetScrollLeft = aboutCard.offsetLeft - (row.clientWidth - aboutCard.clientWidth) / 2;
      const maxScrollLeft = row.scrollWidth - row.clientWidth;
      row.scrollLeft = Math.max(0, Math.min(targetScrollLeft, maxScrollLeft));
    };

    const frame = requestAnimationFrame(centerAboutCard);
    const timeout = setTimeout(centerAboutCard, 120);
    window.addEventListener('resize', centerAboutCard);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timeout);
      window.removeEventListener('resize', centerAboutCard);
    };
  }, []);

  const handleCardClick = (id) => {
    setActiveCard(id);
    if (id !== 'about') {
      setTimeout(() => onNavigate(id), 300);
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid opacity-40" />

      {/* Diagonal lines */}
      <div className="absolute left-0 top-0 bottom-0 w-24 overflow-hidden opacity-20 pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="absolute top-0 bottom-0 w-px" style={{ left: `${i * 24}px`, background: 'linear-gradient(to bottom, transparent, rgba(255,70,85,0.4), transparent)', transform: 'skewX(-15deg)' }} />
        ))}
      </div>
      <div className="absolute right-0 top-0 bottom-0 w-24 overflow-hidden opacity-20 pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="absolute top-0 bottom-0 w-px" style={{ right: `${i * 24}px`, background: 'linear-gradient(to bottom, transparent, rgba(255,70,85,0.4), transparent)', transform: 'skewX(15deg)' }} />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-7xl mx-auto px-4">

        {/* Name / Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center"
        >
          <h1 className="hidden md:block font-orbitron font-black tracking-widest" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#ece8e1' }}>
            {personalInfo.name}
          </h1>
          <div className="flex items-center justify-center gap-3 mt-2">
            <div className="h-px w-16 bg-red-500/40" />
            <span className="font-rajdhani font-semibold tracking-widest text-sm" style={{ color: '#ff4655' }}>
              {personalInfo.title.toUpperCase()}
            </span>
            <div className="h-px w-16 bg-red-500/40" />
          </div>
        </motion.div>

        {/* Cards Row */}
        <motion.div
          ref={cardsRowRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-end justify-start md:justify-center gap-3 md:gap-4 w-full overflow-x-auto pb-2 px-2 md:px-0"
          style={{ scrollbarWidth: 'none', touchAction: 'pan-x' }}
        >
          {cards.map((card, i) => (
            <motion.div
              key={card.id}
              ref={card.id === 'about' ? aboutCardRef : null}
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 * i + 0.4 }}
            >
              <AgentCard
                id={card.id}
                position={card.position}
                isCenter={card.id === 'about'}
                isActive={activeCard === card.id}
                onClick={() => handleCardClick(card.id)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="flex items-center gap-3 md:gap-4"
        >
          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer"
            className="group relative flex items-center gap-2 px-5 py-2.5 border border-white/15 hover:border-cyan-400/50 transition-all duration-300"
            style={{ background: 'rgba(15,16,20,0.8)' }}>
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'rgba(0,212,255,0.05)' }} />
            <GithubIcon size={16} className="text-gray-400 group-hover:text-cyan-400 transition-colors duration-200" />
            <span className="font-rajdhani font-semibold text-sm tracking-widest text-gray-400 group-hover:text-cyan-400 transition-colors duration-200">GITHUB</span>
            <span className="absolute bottom-0 left-0 w-0 h-px group-hover:w-full transition-all duration-300 bg-cyan-400" />
          </a>

          <button onClick={onOpenContact}
            className="group relative flex items-center gap-2 px-8 py-3 overflow-hidden"
            style={{ background: '#ff4655', clipPath: 'polygon(0 0, 95% 0, 100% 20%, 100% 100%, 5% 100%, 0 80%)' }}>
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ background: 'rgba(255,255,255,0.1)' }} />
            <Mail size={16} className="text-white" />
            <span className="font-rajdhani font-bold text-sm tracking-widest text-white">CONTACT ME</span>
          </button>

          <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer"
            className="group relative flex items-center gap-2 px-5 py-2.5 border border-white/15 hover:border-blue-400/50 transition-all duration-300"
            style={{ background: 'rgba(15,16,20,0.8)' }}>
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'rgba(79,195,247,0.05)' }} />
            <LinkedinIcon size={16} className="text-gray-400 group-hover:text-blue-400 transition-colors duration-200" />
            <span className="font-rajdhani font-semibold text-sm tracking-widest text-gray-400 group-hover:text-blue-400 transition-colors duration-200">LINKEDIN</span>
            <span className="absolute bottom-0 left-0 w-0 h-px group-hover:w-full transition-all duration-300 bg-blue-400" />
          </a>
        </motion.div>

        {/* Tagline bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="flex items-center gap-2 px-4 py-1.5"
        >
          <div className="flex items-center gap-2 px-4 py-1.5" style={{ background: 'rgba(139,0,0,0.3)', border: '1px solid rgba(255,70,85,0.2)' }}>
            <span style={{ color: '#ff4655', fontSize: '10px' }}>▲</span>
            <span className="font-rajdhani text-xs text-red-400 tracking-widest">
              {personalInfo.tagline.toUpperCase()}
            </span>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="flex flex-col items-center gap-1"
        >
          <span className="font-rajdhani text-xs text-gray-600 tracking-widest">SCROLL</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
            <ChevronDown size={16} className="text-gray-600" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
