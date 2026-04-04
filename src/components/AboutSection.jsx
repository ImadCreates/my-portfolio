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

export default function AboutSection({ onOpenContact }) {
  return (
    <section id="about" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          title="ABOUT ME"
          subtitle="AGENT PROFILE"
          color="#ff4655"
          icon="◆"
        />

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Bio */}
          <div>
            <motion.div
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

              <p className="font-rajdhani text-gray-300 leading-relaxed" style={{ fontSize: '1.05rem' }}>
                {personalInfo.bio}
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
