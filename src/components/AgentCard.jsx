import { motion } from 'framer-motion';

const cardConfig = {
  skills: {
    label: 'SKILLS',
    color: '#bd93f9',
    shadowColor: 'rgba(189,147,249,0.4)',
    icon: '⬡',
    gradient: 'from-purple-900/60 via-purple-800/20 to-transparent',
    bgAccent: 'rgba(189,147,249,0.06)',
    Visual: () => (
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="relative w-full h-full">
          {/* Hexagon grid pattern */}
          <svg viewBox="0 0 200 300" className="w-full h-full opacity-20">
            <defs>
              <pattern id="hex-skills" x="0" y="0" width="40" height="46" patternUnits="userSpaceOnUse">
                <polygon points="20,2 38,12 38,34 20,44 2,34 2,12" fill="none" stroke="#bd93f9" strokeWidth="0.8"/>
              </pattern>
            </defs>
            <rect width="200" height="300" fill="url(#hex-skills)"/>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6">
            {[['JAVA', 92], ['SPRING BOOT', 90], ['REACT', 86], ['FLUTTER', 85]].map(([skill, pct], i) => (
              <div key={skill} className="w-full" style={{ opacity: 1 - i * 0.12 }}>
                <div className="flex justify-between text-xs font-rajdhani text-purple-300 mb-1">
                  <span>{skill}</span>
                  <span>{pct}%</span>
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${pct}%`,
                      background: '#bd93f9',
                      boxShadow: '0 0 6px #bd93f9',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  projects: {
    label: 'PROJECTS',
    color: '#00d4ff',
    shadowColor: 'rgba(0,212,255,0.4)',
    icon: '◈',
    gradient: 'from-cyan-900/60 via-cyan-800/20 to-transparent',
    bgAccent: 'rgba(0,212,255,0.06)',
    Visual: () => (
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="relative w-full h-full flex flex-col gap-2 p-5 pt-8">
          {[
            { name: 'MEDILINK', tags: ['Flutter', 'React', 'Firebase'], active: true },
            { name: 'PRIMEBID', tags: ['Java', 'Spring Boot', 'Docker'], active: false },
            { name: 'VALORANT PORTFOLIO', tags: ['React', 'Vite', 'Framer'], active: true },
          ].map((proj, i) => (
            <div
              key={proj.name}
              className="border border-cyan-500/20 bg-cyan-500/5 rounded p-2.5"
              style={{ opacity: 1 - i * 0.2 }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: proj.active ? '#00d4ff' : '#ffd700',
                    boxShadow: `0 0 4px ${proj.active ? '#00d4ff' : '#ffd700'}`,
                  }}
                />
                <span className="text-xs font-rajdhani text-cyan-300 font-semibold">{proj.name}</span>
              </div>
              <div className="flex gap-1 flex-wrap">
                {proj.tags.map(t => (
                  <span key={t} className="text-xs px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 font-mono">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  about: {
    label: 'ABOUT ME',
    color: '#ff4655',
    shadowColor: 'rgba(255,70,85,0.5)',
    icon: '◆',
    gradient: 'from-red-900/70 via-red-800/30 to-transparent',
    bgAccent: 'rgba(255,70,85,0.08)',
    Visual: () => (
      <div className="absolute inset-0 flex flex-col items-center justify-start overflow-hidden pt-6">
        {/* Valorant-style logo mark */}
        <div className="relative">
          <div
            className="w-20 h-20 border-2 border-red-500/60 rounded-sm flex items-center justify-center"
            style={{ transform: 'rotate(45deg)', boxShadow: '0 0 20px rgba(255,70,85,0.3)' }}
          >
            <div
              className="w-12 h-12 border border-red-400/40 flex items-center justify-center"
              style={{ transform: 'rotate(0deg)' }}
            >
              <span className="font-orbitron font-black text-2xl text-red-400" style={{ transform: 'rotate(-45deg)' }}>V</span>
            </div>
          </div>
          <div className="absolute -inset-4 rounded-full opacity-20 animate-pulse-glow" style={{ background: 'radial-gradient(circle, #ff4655, transparent 70%)' }} />
        </div>
        <div className="mt-6 text-center px-4">
          <div className="font-orbitron text-xs text-red-400/70 tracking-widest mb-1">IMADUDDIN</div>
          <div className="font-orbitron text-xs text-red-400/70 tracking-widest">AHMED</div>
        </div>
        {/* Decorative diagonal lines */}
        <div className="absolute bottom-16 left-0 right-0 flex justify-between px-3 opacity-30">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-px h-8 bg-red-500" style={{ transform: 'skewX(-20deg)' }} />
          ))}
        </div>
      </div>
    ),
  },
  experience: {
    label: 'EXPERIENCE',
    color: '#ffd700',
    shadowColor: 'rgba(255,215,0,0.4)',
    icon: '◇',
    gradient: 'from-yellow-900/60 via-yellow-800/20 to-transparent',
    bgAccent: 'rgba(255,215,0,0.06)',
    Visual: () => (
      <div className="absolute inset-0 flex flex-col items-start justify-start overflow-hidden p-5 pt-6">
        {/* Timeline */}
        <div className="relative w-full flex flex-col gap-3">
          <div className="absolute left-2 top-3 bottom-3 w-px bg-yellow-500/20" />
          {[
            { role: 'SWE Intern', company: 'CETMATRIX', year: '2025' },
            { role: 'IT Infra Intern', company: 'CARE Hospitals', year: '2025' },
          ].map((exp, i) => (
            <div key={i} className="flex items-start gap-3 pl-1">
              <div className="relative mt-1.5 z-10">
                <div
                  className="w-3 h-3 rounded-full border-2"
                  style={{ borderColor: '#ffd700', background: i === 0 ? '#ffd700' : 'transparent', boxShadow: i === 0 ? '0 0 8px #ffd700' : 'none' }}
                />
              </div>
              <div style={{ opacity: 1 - i * 0.25 }}>
                <div className="font-rajdhani font-semibold text-xs text-yellow-300">{exp.role}</div>
                <div className="font-rajdhani text-xs text-gray-500">{exp.company} · {exp.year}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  education: {
    label: 'EDUCATION',
    color: '#39ff88',
    shadowColor: 'rgba(57,255,136,0.4)',
    icon: '△',
    gradient: 'from-emerald-900/60 via-emerald-800/20 to-transparent',
    bgAccent: 'rgba(57,255,136,0.07)',
    Visual: () => (
      <div className="absolute inset-0 flex flex-col items-center justify-start overflow-hidden pt-8 px-4">
        {/* Graduation icon / book */}
        <div className="relative">
          <svg viewBox="0 0 80 60" width="80" height="60" className="opacity-60">
            <polygon points="40,5 75,20 40,35 5,20" fill="none" stroke="#39ff88" strokeWidth="1.5"/>
            <line x1="40" y1="35" x2="40" y2="55" stroke="#39ff88" strokeWidth="1.5"/>
            <ellipse cx="40" cy="55" rx="12" ry="4" fill="none" stroke="#39ff88" strokeWidth="1.5"/>
            <line x1="75" y1="20" x2="75" y2="40" stroke="#39ff88" strokeWidth="1.5"/>
            <circle cx="75" cy="42" r="3" fill="#39ff88"/>
          </svg>
          <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(circle, #39ff88, transparent 70%)', filter: 'blur(8px)' }} />
        </div>
        <div className="mt-4 text-center">
          <div className="font-orbitron text-xs text-green-300/70 tracking-widest">SOFTWARE</div>
          <div className="font-orbitron text-xs text-green-300/70 tracking-widest">ENGINEERING</div>
          <div className="mt-2 font-rajdhani text-xs text-green-400/50">York University · 4th Year</div>
        </div>
        <div className="mt-3 flex gap-1">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="text-xs" style={{ color: '#ffd700' }}>★</span>
          ))}
          <span className="text-xs" style={{ color: '#444' }}>★</span>
        </div>
      </div>
    ),
  },
};

function seededFloat(seed) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967295;
}

function buildParticles(id, count = 32) {
  return Array.from({ length: count }, (_, i) => {
    const sx = 12 + seededFloat(`${id}-${i}-sx`) * 76;
    const sy = 10 + seededFloat(`${id}-${i}-sy`) * 80;
    const dx = -70 + seededFloat(`${id}-${i}-dx`) * 140;
    const dy = -70 + seededFloat(`${id}-${i}-dy`) * 140;
    const size = 1 + seededFloat(`${id}-${i}-sz`) * 2.4;
    const delay = seededFloat(`${id}-${i}-dl`) * 0.42;
    const duration = 0.8 + seededFloat(`${id}-${i}-du`) * 0.9;

    return {
      sx,
      sy,
      dx,
      dy,
      size,
      delay,
      duration,
    };
  });
}

const cardParticles = Object.fromEntries(
  Object.keys(cardConfig).map((id) => [id, buildParticles(id)])
);

export default function AgentCard({ id, isCenter, isActive, onClick, position, deteriorating = false }) {
  const config = cardConfig[id];
  const Visual = config.Visual;
  const particles = cardParticles[id] || [];

  const positionScale = {
    far: 0.88,
    side: 0.94,
    center: 1,
  };
  const scale = positionScale[position] || 1;

  const cardHeight = isCenter ? 420 : position === 'side' ? 380 : 350;
  const cardWidth = isCenter ? 200 : position === 'side' ? 178 : 160;

  return (
    <motion.div
      onClick={onClick}
      className="relative cursor-pointer select-none flex-shrink-0"
      style={{ width: cardWidth, height: cardHeight }}
      whileHover={{
        scale: scale * 1.04,
        y: -8,
        transition: { duration: 0.25, ease: 'easeOut' },
      }}
      whileTap={{ scale: scale * 0.97 }}
      initial={{ scale, opacity: 0, y: 30 }}
      animate={{ scale, opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Outer border / glow container */}
      <motion.div
        className="relative w-full h-full rounded-sm overflow-hidden"
        animate={
          deteriorating
            ? {
                opacity: [1, 0.9, 0.62, 0],
                scale: [1, 0.74, 0.32, 0.04],
                y: [0, 6, 14, 20],
              }
            : {
                opacity: 1,
                scale: 1,
                y: 0,
              }
        }
        transition={
          deteriorating
            ? { duration: 2.1, ease: [0.22, 1, 0.36, 1] }
            : { duration: 0.42, ease: [0.22, 1, 0.36, 1] }
        }
        style={{
          border: `1px solid ${isActive ? config.color : 'rgba(255,255,255,0.08)'}`,
          boxShadow: isActive
            ? `0 0 30px ${config.shadowColor}, 0 0 60px ${config.shadowColor}40, inset 0 0 20px ${config.shadowColor}10`
            : `0 8px 32px rgba(0,0,0,0.6)`,
          background: '#0f1014',
          transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
        }}
      >
        {/* Top corner accents */}
        <div
          className="absolute top-0 left-0 w-4 h-4 z-20"
          style={{ borderTop: `2px solid ${config.color}`, borderLeft: `2px solid ${config.color}`, opacity: 0.8 }}
        />
        <div
          className="absolute top-0 right-0 w-4 h-4 z-20"
          style={{ borderTop: `2px solid ${config.color}`, borderRight: `2px solid ${config.color}`, opacity: 0.8 }}
        />

        {/* Card visual / illustration area */}
        <div
          className="relative w-full overflow-hidden"
          style={{
            height: '72%',
            background: `linear-gradient(170deg, ${config.bgAccent} 0%, rgba(15,16,20,0.95) 100%)`,
          }}
        >
          <Visual />
          {/* Gradient fade to bottom */}
          <div
            className="absolute inset-x-0 bottom-0 h-24 z-10"
            style={{ background: 'linear-gradient(to bottom, transparent, #0f1014)' }}
          />
        </div>

        {/* Bottom label area */}
        <div
          className="absolute bottom-0 left-0 right-0 z-20 px-3 pb-3 pt-2"
          style={{ background: 'linear-gradient(to top, #0a0b0e, rgba(10,11,14,0.7))' }}
        >
          {/* Accent bar */}
          <div
            className="w-full h-px mb-2"
            style={{ background: `linear-gradient(to right, ${config.color}, transparent)`, opacity: 0.6 }}
          />
          {/* Agent name label */}
          <div
            className="font-rajdhani font-bold tracking-widest text-center"
            style={{
              fontSize: isCenter ? '14px' : '12px',
              color: isActive ? config.color : '#ece8e1',
              textShadow: isActive ? `0 0 12px ${config.color}` : 'none',
              letterSpacing: '0.2em',
            }}
          >
            {config.label}
          </div>

          {/* Ready indicator */}
          <div className="flex items-center justify-center gap-1.5 mt-1.5">
            <div
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: config.color, boxShadow: `0 0 6px ${config.color}` }}
            />
            <span className="font-rajdhani text-xs tracking-widest" style={{ color: config.color, fontSize: '9px' }}>
              READY
            </span>
          </div>
        </div>

        {/* Active card top warning triangles (like Valorant) */}
        {isCenter && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 flex gap-3">
            <div style={{ color: config.color, fontSize: '16px', filter: 'drop-shadow(0 0 4px currentColor)' }}>▲</div>
          </div>
        )}

        {/* Scan line effect on active */}
        {isActive && (
          <div
            className="absolute inset-0 pointer-events-none z-30"
            style={{
              background: `linear-gradient(to bottom, transparent 0%, ${config.color}08 50%, transparent 100%)`,
              animation: 'float 3s ease-in-out infinite',
            }}
          />
        )}

        {/* Bottom corner accents */}
        <div
          className="absolute bottom-0 left-0 w-4 h-4 z-20"
          style={{ borderBottom: `2px solid ${config.color}`, borderLeft: `2px solid ${config.color}`, opacity: 0.8 }}
        />
        <div
          className="absolute bottom-0 right-0 w-4 h-4 z-20"
          style={{ borderBottom: `2px solid ${config.color}`, borderRight: `2px solid ${config.color}`, opacity: 0.8 }}
        />
      </motion.div>

      {deteriorating && (
        <div className="absolute -inset-2 pointer-events-none overflow-visible z-40">
          {particles.map((p, i) => (
            <motion.span
              key={`${id}-particle-${i}`}
              className="absolute rounded-full"
              style={{
                left: `${p.sx}%`,
                top: `${p.sy}%`,
                width: p.size,
                height: p.size,
                background: config.color,
                boxShadow: `0 0 10px ${config.color}`,
                mixBlendMode: 'screen',
              }}
              animate={{
                x: [0, p.dx * 0.35, p.dx],
                y: [0, p.dy * 0.35, p.dy],
                opacity: [0, 1, 0.65, 0],
                scale: [0.2, 1.35, 0.9, 0.15],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                repeatDelay: 0.02,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
