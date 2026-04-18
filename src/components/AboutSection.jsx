import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Code2, Globe } from 'lucide-react';
import SectionHeader from './SectionHeader';
import { personalInfo } from '../data/portfolioData';

const techStack = [
  { name: 'Java', color: '#ff4655' },
  { name: 'Spring Boot', color: '#68d391' },
  { name: 'Flutter', color: '#00d4ff' },
  { name: 'React', color: '#4299e1' },
  { name: 'Firebase', color: '#ffd700' },
  { name: 'Docker', color: '#63b3ed' },
  { name: 'Dart', color: '#bd93f9' },
  { name: 'GitHub Actions', color: '#f6ad55' },
  { name: 'JavaScript', color: '#ffd700' },
  { name: 'Postman', color: '#ff6b35' },
];

const phraseTargets = [
  {
    id: 'education',
    color: '#39ff88',
    text: '4th-year Software Engineering student at York University',
  },
  {
    id: 'about',
    color: '#ff4655',
    text: 'Full-Stack Developer',
  },
  {
    id: 'projects',
    color: '#00d4ff',
    text: 'building scalable, end-to-end solutions',
  },
  {
    id: 'skills',
    color: '#bd93f9',
    text: 'Java (Spring Boot), React, and Flutter',
  },
  {
    id: 'experience',
    color: '#ffd700',
    text: 'concurrent internships',
  },
  {
    id: 'experienceCetmatrix',
    color: '#ffd700',
    text: 'Cetmatrix',
  },
  {
    id: 'experienceCare',
    color: '#ffd700',
    text: 'Care Hospitals',
  },
];

function seededFloat(seed) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967295;
}

function buildMergeParticles(targetId, count = 22) {
  return Array.from({ length: count }, (_, i) => ({
    startAngle: seededFloat(`${targetId}-${i}-sa`) * Math.PI * 2,
    radiusOffset: -28 + seededFloat(`${targetId}-${i}-ro`) * 56,
    curveSign: seededFloat(`${targetId}-${i}-sg`) > 0.5 ? 1 : -1,
    curveStrength: 90 + seededFloat(`${targetId}-${i}-cs`) * 130,
    launchJitter: -18 + seededFloat(`${targetId}-${i}-lj`) * 36,
    size: 1 + seededFloat(`${targetId}-${i}-sz`) * 2.8,
    delay: seededFloat(`${targetId}-${i}-dl`) * 0.45,
    durationOffset: seededFloat(`${targetId}-${i}-du`) * 0.95,
  }));
}

export default function AboutSection({ onOpenContact, heroSpinActive = false }) {
  const sectionRef = useRef(null);
  const bioCardRef = useRef(null);
  const phraseRefs = useRef({});
  const [mergeActive, setMergeActive] = useState(false);
  const [mergeCycle, setMergeCycle] = useState(0);
  const [phraseCenters, setPhraseCenters] = useState({});
  const [sectionSize, setSectionSize] = useState({ width: 0, height: 0 });

  const mergeParticles = useMemo(
    () => Object.fromEntries(phraseTargets.map((t) => [t.id, buildMergeParticles(t.id)])),
    []
  );

  const setPhraseRef = (id) => (node) => {
    if (node) {
      phraseRefs.current[id] = node;
    }
  };

  const recalcPhraseCenters = () => {
    const section = sectionRef.current;
    if (!section) return;

    const sectionRect = section.getBoundingClientRect();
    const nextCenters = {};

    phraseTargets.forEach(({ id }) => {
      const phraseNode = phraseRefs.current[id];
      if (!phraseNode) return;
      const rect = phraseNode.getBoundingClientRect();
      nextCenters[id] = {
        x: rect.left - sectionRect.left + rect.width / 2,
        y: rect.top - sectionRect.top + rect.height / 2,
      };
    });

    setPhraseCenters(nextCenters);
    setSectionSize({ width: sectionRect.width, height: sectionRect.height });
  };

  useEffect(() => {
    recalcPhraseCenters();
    const onResize = () => recalcPhraseCenters();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    setMergeActive(heroSpinActive);
    if (heroSpinActive) {
      setMergeCycle((v) => v + 1);
      requestAnimationFrame(() => recalcPhraseCenters());
    }
  }, [heroSpinActive]);

  return (
    <section ref={sectionRef} id="about" className="relative -mt-52 pt-24 pb-32 px-6 md:-mt-64 md:pt-28">
      <div className="absolute inset-0 pointer-events-none z-30 overflow-visible">
        {phraseTargets.flatMap((target) => {
          const center = phraseCenters[target.id];
          const particles = mergeParticles[target.id] || [];
          if (!center || !sectionSize.width || !sectionSize.height) return [];

          const ringCenterX = sectionSize.width * 0.5;
          const ringCenterY = -Math.max(72, Math.min(138, sectionSize.height * 0.12));
          const circleRadius = Math.min(262, Math.max(186, sectionSize.width * 0.225));

          return particles.map((p, i) => {
            const startRadius = circleRadius + p.radiusOffset;
            const startX = ringCenterX + Math.cos(p.startAngle) * startRadius;
            const startY = ringCenterY + Math.sin(p.startAngle) * startRadius + p.launchJitter;

            const dx = center.x - startX;
            const dy = center.y - startY;
            const length = Math.max(1, Math.hypot(dx, dy));
            const nx = -dy / length;
            const ny = dx / length;
            const curvePush = p.curveStrength * p.curveSign;

            const midX = startX + dx * 0.46 + nx * curvePush;
            const midY = startY + dy * 0.46 + ny * curvePush - 34;

            return (
              <motion.span
                key={`${target.id}-merge-${i}-${mergeCycle}`}
                className="absolute rounded-full"
                style={{
                  left: 0,
                  top: 0,
                  width: p.size,
                  height: p.size,
                  background: target.color,
                  boxShadow: `0 0 10px ${target.color}`,
                  mixBlendMode: 'screen',
                }}
                initial={{ x: startX, y: startY, opacity: 0, scale: 0.15 }}
                animate={
                  mergeActive
                    ? {
                        x: [startX, midX, center.x],
                        y: [startY, midY, center.y],
                        opacity: [0, 1, 0.9, 0],
                        scale: [0.12, 1.4, 0.88, 0.12],
                      }
                    : {
                        opacity: 0,
                        scale: 0.1,
                      }
                }
                transition={
                  mergeActive
                    ? {
                        duration: 1.42 + p.durationOffset,
                        delay: p.delay,
                        repeat: Infinity,
                        repeatDelay: 0.06,
                        ease: 'easeOut',
                      }
                    : {
                        duration: 0.2,
                        ease: 'easeOut',
                      }
                }
              />
            );
          });
        })}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeader
          title="ABOUT ME"
          subtitle="AGENT PROFILE"
          color="#ff4655"
          icon="◆"
        />

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Bio */}
          <div>
            {/* Profile Photo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative mb-6 flex justify-center"
            >
              <div className="relative w-44 h-44">
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-5 h-5 z-10" style={{ borderTop: '2px solid #ff4655', borderLeft: '2px solid #ff4655' }} />
                <div className="absolute top-0 right-0 w-5 h-5 z-10" style={{ borderTop: '2px solid #ff4655', borderRight: '2px solid #ff4655' }} />
                <div className="absolute bottom-0 left-0 w-5 h-5 z-10" style={{ borderBottom: '2px solid #ff4655', borderLeft: '2px solid #ff4655' }} />
                <div className="absolute bottom-0 right-0 w-5 h-5 z-10" style={{ borderBottom: '2px solid #ff4655', borderRight: '2px solid #ff4655' }} />

                {personalInfo.avatar ? (
                  <img
                    src={personalInfo.avatar}
                    alt={personalInfo.name}
                    className="w-full h-full object-cover"
                    style={{ border: '1px solid rgba(255,70,85,0.2)' }}
                  />
                ) : (
                  <div
                    className="w-full h-full flex flex-col items-center justify-center gap-2"
                    style={{
                      background: 'rgba(26,29,35,0.8)',
                      border: '1px solid rgba(255,70,85,0.15)',
                    }}
                  >
                    {/* Silhouette placeholder */}
                    <svg viewBox="0 0 80 80" width="56" height="56" className="opacity-25">
                      <circle cx="40" cy="28" r="16" fill="#ff4655" />
                      <path d="M10 72 Q10 50 40 50 Q70 50 70 72" fill="#ff4655" />
                    </svg>
                    <span className="font-orbitron text-[9px] tracking-widest text-red-500/50 text-center px-2">
                      PHOTO<br />COMING SOON
                    </span>
                  </div>
                )}

                {/* Glow backdrop */}
                <div
                  className="absolute -inset-3 -z-10 rounded-sm opacity-20"
                  style={{ background: 'radial-gradient(circle at center, #ff4655, transparent 70%)', filter: 'blur(12px)' }}
                />
              </div>
            </motion.div>

            <motion.div
              ref={bioCardRef}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative p-6 mb-6"
              style={{
                border: '1px solid rgba(255,70,85,0.15)',
                background: 'rgba(26,29,35,0.5)',
                clipPath: 'polygon(0 0, 100% 0, 100% 90%, 96% 100%, 0 100%)',
              }}
            >
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-4 h-4" style={{ borderTop: '2px solid #ff4655', borderLeft: '2px solid #ff4655' }} />
              <div className="absolute bottom-0 right-0 w-4 h-4" style={{ borderBottom: '2px solid #ff4655', borderRight: '2px solid #ff4655' }} />

              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="font-orbitron text-xs text-red-500 tracking-widest">ACTIVE AGENT</span>
              </div>

              <p className="font-rajdhani text-gray-300 leading-relaxed mb-4" style={{ fontSize: '1.05rem' }}>
                Software has always been more than a degree to me — it&apos;s how I make ideas real.
                I&apos;m a{' '}
                <motion.span
                  ref={setPhraseRef('education')}
                  className="inline-block"
                  animate={mergeActive ? { color: '#39ff88', textShadow: '0 0 12px rgba(57,255,136,0.55)' } : { color: '#cbd5e1', textShadow: '0 0 0 rgba(57,255,136,0)' }}
                  transition={{ duration: 0.35 }}
                >
                  4th-year Software Engineering student at York University
                </motion.span>{' '}
                and a{' '}
                <motion.span
                  ref={setPhraseRef('about')}
                  className="inline-block"
                  animate={mergeActive ? { color: '#ff4655', textShadow: '0 0 12px rgba(255,70,85,0.55)' } : { color: '#cbd5e1', textShadow: '0 0 0 rgba(255,70,85,0)' }}
                  transition={{ duration: 0.35, delay: 0.06 }}
                >
                  Full-Stack Developer
                </motion.span>{' '}
                focused on{' '}
                <motion.span
                  ref={setPhraseRef('projects')}
                  className="inline-block"
                  animate={mergeActive ? { color: '#00d4ff', textShadow: '0 0 12px rgba(0,212,255,0.55)' } : { color: '#cbd5e1', textShadow: '0 0 0 rgba(0,212,255,0)' }}
                  transition={{ duration: 0.35, delay: 0.12 }}
                >
                  building scalable, end-to-end solutions
                </motion.span>
                . I specialize in bridging high-performance backend architectures with polished, user-centric interfaces using{' '}
                <motion.span
                  ref={setPhraseRef('skills')}
                  className="inline-block"
                  animate={mergeActive ? { color: '#bd93f9', textShadow: '0 0 12px rgba(189,147,249,0.55)' } : { color: '#cbd5e1', textShadow: '0 0 0 rgba(189,147,249,0)' }}
                  transition={{ duration: 0.35, delay: 0.18 }}
                >
                  Java (Spring Boot), React, and Flutter
                </motion.span>
                . I recently completed{' '}
                <motion.span
                  ref={setPhraseRef('experience')}
                  className="inline-block"
                  animate={mergeActive ? { color: '#ffd700', textShadow: '0 0 12px rgba(255,215,0,0.5)' } : { color: '#cbd5e1', textShadow: '0 0 0 rgba(255,215,0,0)' }}
                  transition={{ duration: 0.35, delay: 0.24 }}
                >
                  concurrent internships
                </motion.span>{' '}
                balancing full-stack mobile development at{' '}
                <motion.span
                  ref={setPhraseRef('experienceCetmatrix')}
                  className="inline-block"
                  animate={mergeActive ? { color: '#ffd700', textShadow: '0 0 12px rgba(255,215,0,0.5)' } : { color: '#cbd5e1', textShadow: '0 0 0 rgba(255,215,0,0)' }}
                  transition={{ duration: 0.35, delay: 0.28 }}
                >
                  Cetmatrix
                </motion.span>{' '}
                with critical IT infrastructure management at{' '}
                <motion.span
                  ref={setPhraseRef('experienceCare')}
                  className="inline-block"
                  animate={mergeActive ? { color: '#ffd700', textShadow: '0 0 12px rgba(255,215,0,0.5)' } : { color: '#cbd5e1', textShadow: '0 0 0 rgba(255,215,0,0)' }}
                  transition={{ duration: 0.35, delay: 0.32 }}
                >
                  Care Hospitals
                </motion.span>
                , mastering both the software lifecycle and the underlying systems that keep applications running securely.
              </p>

              <p className="font-rajdhani text-gray-400 leading-relaxed" style={{ fontSize: '0.97rem' }}>
                What sets me apart is that rare dual perspective — I understand the code <span style={{ color: '#ece8e1' }}>and</span> the
                infrastructure it lives on. That hands-on mix of shipping features and managing production systems
                is what makes me a developer who builds with the full picture in mind.
              </p>
            </motion.div>

            {/* Goals & Vision */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="relative p-5 mb-6"
              style={{
                border: '1px solid rgba(0,212,255,0.18)',
                background: 'rgba(0,212,255,0.04)',
              }}
            >
              <div className="absolute top-0 left-0 w-4 h-4" style={{ borderTop: '2px solid #00d4ff', borderLeft: '2px solid #00d4ff' }} />
              <div className="absolute bottom-0 right-0 w-4 h-4" style={{ borderBottom: '2px solid #00d4ff', borderRight: '2px solid #00d4ff' }} />

              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full" style={{ background: '#00d4ff', boxShadow: '0 0 8px #00d4ff' }} />
                <span className="font-orbitron text-xs tracking-widest" style={{ color: '#00d4ff' }}>GOALS &amp; VISION</span>
              </div>

              <p className="font-rajdhani text-gray-300 leading-relaxed" style={{ fontSize: '1.02rem' }}>
                My goal is to join a high-impact engineering team where I can contribute as a
                full-stack engineer from day one — tackling real problems at scale, writing code
                that ships, and growing into a technical lead who architects systems that matter.
                I&apos;m drawn to teams that move fast, care deeply about quality, and aren&apos;t
                afraid to build something new. Long term, I want to be the engineer who bridges
                the gap between bold product vision and solid, scalable execution.
              </p>
            </motion.div>

            {/* Info Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="grid grid-cols-1 gap-3 mb-6"
            >
              {[
                { icon: <MapPin size={14} />, label: 'LOCATION', value: personalInfo.location, color: '#ff4655' },
                { icon: <Mail size={14} />, label: 'EMAIL', value: personalInfo.email, color: '#00d4ff' },
                { icon: <Code2 size={14} />, label: 'SCHOOL', value: 'York University', color: '#bd93f9' },
                { icon: <Globe size={14} />, label: 'WEBSITE', value: 'imaduddin-ahmed.vercel.app', color: '#ffd700', href: personalInfo.website },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-4 px-4 py-3"
                  style={{
                    border: '1px solid rgba(255,255,255,0.06)',
                    background: 'rgba(15,16,20,0.6)',
                  }}
                >
                  <span style={{ color: item.color }}>{item.icon}</span>
                  <span className="font-orbitron text-xs tracking-widest text-gray-500 w-20">{item.label}</span>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer"
                      className="font-rajdhani text-sm hover:underline transition-colors"
                      style={{ color: item.color }}>
                      {item.value}
                    </a>
                  ) : (
                    <span className="font-rajdhani text-sm text-gray-200">{item.value}</span>
                  )}
                </div>
              ))}
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              onClick={onOpenContact}
              className="group relative px-8 py-3 font-rajdhani font-bold text-sm tracking-widest overflow-hidden"
              style={{
                background: 'transparent',
                border: '1px solid #ff4655',
                color: '#ff4655',
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'rgba(255,70,85,0.1)' }}
              />
              GET IN TOUCH →
            </motion.button>
          </div>

          {/* Right: Tech Stack */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px flex-1 bg-white/5" />
                <span className="font-orbitron text-xs text-gray-500 tracking-widest">TECH ARSENAL</span>
                <div className="h-px flex-1 bg-white/5" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {techStack.map((tech, i) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    whileHover={{ scale: 1.04, y: -2 }}
                    className="relative px-4 py-3 flex items-center gap-3 cursor-default"
                    style={{
                      border: `1px solid ${tech.color}20`,
                      background: `${tech.color}08`,
                    }}
                  >
                    <div
                      className="w-2 h-2 rounded-sm flex-shrink-0"
                      style={{ background: tech.color, boxShadow: `0 0 8px ${tech.color}` }}
                    />
                    <span className="font-rajdhani font-semibold text-sm tracking-wide" style={{ color: '#ece8e1' }}>
                      {tech.name}
                    </span>
                    <div
                      className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                      style={{ background: tech.color }}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mt-8">
                {[
                  { value: '4th', label: 'Year · York', color: '#ff4655' },
                  { value: '2x', label: 'Internships', color: '#00d4ff' },
                  { value: '2', label: 'Active Builds', color: '#ffd700' },
                ].map((stat) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center py-4 px-2"
                    style={{ border: `1px solid ${stat.color}20`, background: `${stat.color}06` }}
                  >
                    <div
                      className="font-orbitron font-black text-2xl mb-1"
                      style={{ color: stat.color, textShadow: `0 0 20px ${stat.color}` }}
                    >
                      {stat.value}
                    </div>
                    <div className="font-rajdhani text-xs text-gray-500 tracking-widest">
                      {stat.label.toUpperCase()}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
