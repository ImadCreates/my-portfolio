import { useEffect, useRef, useState } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { Mail, ChevronDown } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import AgentCard from './AgentCard';
import { personalInfo } from '../data/portfolioData';

const cardLayout = [
  {
    id: 'skills',
    position: 'far',
    rowX: -390,
    rowY: 12,
    targetX: -90,
    targetY: 58,
    targetRotate: 45,
    layer: 11,
  },
  {
    id: 'projects',
    position: 'side',
    rowX: -210,
    rowY: 0,
    targetX: -130,
    targetY: -6,
    targetRotate: -45,
    layer: 12,
  },
  {
    id: 'about',
    position: 'center',
    rowX: 0,
    rowY: -8,
    targetX: 0,
    targetY: -92,
    targetRotate: 0,
    layer: 13,
  },
  {
    id: 'experience',
    position: 'side',
    rowX: 210,
    rowY: 0,
    targetX: 130,
    targetY: -6,
    targetRotate: 45,
    layer: 12,
  },
  {
    id: 'education',
    position: 'far',
    rowX: 390,
    rowY: 12,
    targetX: 90,
    targetY: 58,
    targetRotate: -45,
    layer: 11,
  },
];

const cardLayoutById = Object.fromEntries(cardLayout.map((card) => [card.id, card]));
const mobileCardLayout = ['skills', 'projects', 'about', 'experience', 'education']
  .map((id) => cardLayoutById[id])
  .filter(Boolean);

const SPIN_ENTER_Y = 1;
const SPIN_EXIT_Y = 0;
const SPIN_REV_DURATION = 0.0134;
const SPIN_CYCLES_PER_LOOP = 100;
const SPIN_LOOP_DEGREES = 360 * SPIN_CYCLES_PER_LOOP;
const SPIN_LOOP_DURATION = SPIN_REV_DURATION * SPIN_CYCLES_PER_LOOP;
const CARD_SPRING = { type: 'spring', stiffness: 210, damping: 24, mass: 0.55 };
const CARD_ROTATE_SPRING = { type: 'spring', stiffness: 260, damping: 26, mass: 0.5 };

export default function HeroSection({ onNavigate, onOpenContact, onSpinChange }) {
  const [activeCard, setActiveCard] = useState('about');
  const [layoutScale, setLayoutScale] = useState(0.9);
  const [isDesktop, setIsDesktop] = useState(true);
  const [spinMode, setSpinMode] = useState(false);
  const [isReverting, setIsReverting] = useState(false);
  const orbitControls = useAnimationControls();
  const mobileScrollerRef = useRef(null);
  const mobileAboutRef = useRef(null);

  useEffect(() => {
    const updateLayout = () => {
      const w = window.innerWidth;
      const desktop = w >= 768;
      setIsDesktop(desktop);

      if (w < 768) {
        setLayoutScale(0.66);
        setSpinMode(false);
      } else if (w < 1024) {
        setLayoutScale(0.78);
      } else if (w < 1280) {
        setLayoutScale(0.86);
      } else {
        setLayoutScale(0.94);
      }
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (!isDesktop) {
        setSpinMode(false);
        return;
      }

      const y = window.scrollY;
      setSpinMode((prev) => (prev ? y > SPIN_EXIT_Y : y > SPIN_ENTER_Y));
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isDesktop]);

  useEffect(() => {
    if (spinMode) {
      setIsReverting(false);
      orbitControls.start({
        rotate: SPIN_LOOP_DEGREES,
        transition: { duration: SPIN_LOOP_DURATION, ease: 'linear', repeat: Infinity },
      });
      return undefined;
    }

    setIsReverting(true);
    orbitControls.stop();
    orbitControls.set({ rotate: 0 });
    const rafId = window.requestAnimationFrame(() => {
      setIsReverting(false);
    });

    return () => {
      window.cancelAnimationFrame(rafId);
    };
  }, [spinMode, orbitControls]);

  useEffect(() => {
    if (onSpinChange) {
      onSpinChange(spinMode);
    }
  }, [spinMode, onSpinChange]);

  useEffect(() => {
    if (isDesktop) return undefined;

    const rafId = window.requestAnimationFrame(() => {
      const scroller = mobileScrollerRef.current;
      const aboutCard = mobileAboutRef.current;
      if (!scroller || !aboutCard) return;

      const targetLeft = aboutCard.offsetLeft - (scroller.clientWidth - aboutCard.clientWidth) / 2;
      scroller.scrollTo({ left: Math.max(0, targetLeft), behavior: 'auto' });
    });

    return () => window.cancelAnimationFrame(rafId);
  }, [isDesktop]);

  const handleCardClick = (id) => {
    setActiveCard(id);
    if (id !== 'about') {
      setTimeout(() => onNavigate(id), 250);
    }
  };

  return (
    <section id="hero" className="relative min-h-[105vh] pt-32 md:pt-36 pb-10 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-40" />

      <div className="absolute left-0 top-0 bottom-0 w-24 overflow-hidden opacity-20 pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-px"
            style={{
              left: `${i * 24}px`,
              background: 'linear-gradient(to bottom, transparent, rgba(255,70,85,0.4), transparent)',
              transform: 'skewX(-15deg)',
            }}
          />
        ))}
      </div>
      <div className="absolute right-0 top-0 bottom-0 w-24 overflow-hidden opacity-20 pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-px"
            style={{
              right: `${i * 24}px`,
              background: 'linear-gradient(to bottom, transparent, rgba(255,70,85,0.4), transparent)',
              transform: 'skewX(15deg)',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 flex flex-col items-center">
        <div className="text-center mb-6 md:mb-8 pt-1">
          <h1
            className="hidden md:block font-orbitron font-black tracking-widest leading-tight"
            style={{ fontSize: 'clamp(1.6rem, 4vw, 3rem)', color: '#ece8e1', lineHeight: 1.2 }}
          >
            {personalInfo.name}
          </h1>
          <div className="flex items-center justify-center gap-3 mt-1">
            <div className="h-px w-16 bg-red-500/40" />
            <span className="font-rajdhani font-semibold tracking-widest text-sm" style={{ color: '#ff4655' }}>
              {personalInfo.title.toUpperCase()}
            </span>
            <div className="h-px w-16 bg-red-500/40" />
          </div>
        </div>

        <div className="hidden md:flex relative w-full h-[560px] items-center justify-center">
          <div
            className="absolute rounded-full border border-red-500/15 pointer-events-none"
            style={{
              width: `${560 * layoutScale}px`,
              height: `${560 * layoutScale}px`,
              boxShadow: 'inset 0 0 40px rgba(255,70,85,0.08)',
            }}
          />

          <div
            className="absolute pointer-events-none"
            style={{
              width: `${560 * layoutScale}px`,
              height: `${560 * layoutScale}px`,
              opacity: spinMode ? 1 : 0,
              transition: 'opacity 0.2s ease',
            }}
          >
            <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2" style={{ background: 'linear-gradient(to bottom, rgba(255,70,85,0.25), rgba(255,70,85,0.08), rgba(255,70,85,0.25))' }} />
            <div className="absolute top-1/2 left-0 right-0 h-px -translate-y-1/2" style={{ background: 'linear-gradient(to right, rgba(255,70,85,0.25), rgba(255,70,85,0.08), rgba(255,70,85,0.25))' }} />
            <span className="absolute left-1/2 top-2 -translate-x-1/2 font-orbitron text-xs" style={{ color: 'rgba(255,70,85,0.35)' }}>N</span>
            <span className="absolute right-6 top-[14%] font-orbitron text-xs" style={{ color: 'rgba(255,70,85,0.35)' }}>NE</span>
            <span className="absolute left-6 top-[14%] font-orbitron text-xs" style={{ color: 'rgba(255,70,85,0.35)' }}>NW</span>
            <span className="absolute right-6 bottom-[14%] font-orbitron text-xs" style={{ color: 'rgba(255,70,85,0.35)' }}>SE</span>
            <span className="absolute left-6 bottom-[14%] font-orbitron text-xs" style={{ color: 'rgba(255,70,85,0.35)' }}>SW</span>
            <span className="absolute left-1/2 bottom-2 -translate-x-1/2 font-orbitron text-xs" style={{ color: 'rgba(255,70,85,0.35)' }}>S</span>
          </div>

          <motion.div
            className="absolute"
            animate={orbitControls}
            initial={{ rotate: 0 }}
            style={{ width: 1, height: 1, willChange: 'transform', transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
          >
            {cardLayout.map((card) => {
              return (
                <motion.div
                  key={card.id}
                  className="absolute"
                  style={{ left: 0, top: 0, zIndex: card.layer, willChange: 'transform' }}
                  animate={{
                    x: (spinMode ? card.targetX : card.rowX) * layoutScale,
                    y: (spinMode ? card.targetY : card.rowY) * layoutScale,
                  }}
                  transition={spinMode ? { duration: 0.06, ease: 'linear' } : CARD_SPRING}
                >
                  <motion.div
                    style={{ x: '-50%', y: '-50%', scale: layoutScale }}
                    animate={{ rotate: spinMode ? card.targetRotate : 0 }}
                    transition={spinMode ? { duration: 0.06, ease: 'linear' } : CARD_ROTATE_SPRING}
                  >
                    <AgentCard
                      id={card.id}
                      position={card.position}
                      isCenter={card.id === 'about'}
                      isActive={activeCard === card.id}
                      deteriorating={spinMode || isReverting}
                      onClick={() => handleCardClick(card.id)}
                    />
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <div ref={mobileScrollerRef} className="md:hidden w-full overflow-x-auto px-1 pb-2 -mx-1 snap-x snap-mandatory">
          <div className="flex gap-4 min-w-max px-2">
            {mobileCardLayout.map((card) => (
              <div
                key={card.id}
                ref={card.id === 'about' ? mobileAboutRef : null}
                className="shrink-0 snap-center"
              >
                <AgentCard
                  id={card.id}
                  position={card.id === 'about' ? 'center' : 'far'}
                  isCenter={card.id === 'about'}
                  isActive={activeCard === card.id}
                  deteriorating={false}
                  onClick={() => handleCardClick(card.id)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-4 z-20 mt-4 md:mt-2">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center gap-2 px-5 py-2.5 border border-white/15 hover:border-cyan-400/50 transition-all duration-300"
            style={{ background: 'rgba(15,16,20,0.8)' }}
          >
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'rgba(0,212,255,0.05)' }}
            />
            <GithubIcon size={16} className="text-gray-400 group-hover:text-cyan-400 transition-colors duration-200" />
            <span className="font-rajdhani font-semibold text-sm tracking-widest text-gray-400 group-hover:text-cyan-400 transition-colors duration-200">
              GITHUB
            </span>
            <span className="absolute bottom-0 left-0 w-0 h-px group-hover:w-full transition-all duration-300 bg-cyan-400" />
          </a>

          <button
            onClick={onOpenContact}
            className="group relative flex items-center gap-2 px-8 py-3 overflow-hidden"
            style={{ background: '#ff4655', clipPath: 'polygon(0 0, 95% 0, 100% 20%, 100% 100%, 5% 100%, 0 80%)' }}
          >
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ background: 'rgba(255,255,255,0.1)' }}
            />
            <Mail size={16} className="text-white" />
            <span className="font-rajdhani font-bold text-sm tracking-widest text-white">CONTACT ME</span>
          </button>

          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center gap-2 px-5 py-2.5 border border-white/15 hover:border-blue-400/50 transition-all duration-300"
            style={{ background: 'rgba(15,16,20,0.8)' }}
          >
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'rgba(79,195,247,0.05)' }}
            />
            <LinkedinIcon size={16} className="text-gray-400 group-hover:text-blue-400 transition-colors duration-200" />
            <span className="font-rajdhani font-semibold text-sm tracking-widest text-gray-400 group-hover:text-blue-400 transition-colors duration-200">
              LINKEDIN
            </span>
            <span className="absolute bottom-0 left-0 w-0 h-px group-hover:w-full transition-all duration-300 bg-blue-400" />
          </a>
        </div>

        <div className="mt-6 flex items-center gap-2 px-4 py-1.5" style={{ background: 'rgba(139,0,0,0.3)', border: '1px solid rgba(255,70,85,0.2)' }}>
          <span style={{ color: '#ff4655', fontSize: '10px' }}>▲</span>
          <span className="font-rajdhani text-xs text-red-400 tracking-widest">{personalInfo.tagline.toUpperCase()}</span>
        </div>

        <div className="mt-5 flex flex-col items-center gap-1">
          <span className="font-rajdhani text-xs text-gray-600 tracking-widest">SCROLL</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
            <ChevronDown size={16} className="text-gray-600" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}