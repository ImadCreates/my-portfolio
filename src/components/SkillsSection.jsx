import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionHeader from './SectionHeader';
import { skills, skillTags } from '../data/portfolioData';

function SkillBar({ name, level, color, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -15 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07 }}
      className="group"
    >
      <div className="flex justify-between items-center mb-1.5">
        <span className="font-rajdhani font-semibold text-sm text-gray-300 group-hover:text-white transition-colors">
          {name}
        </span>
        <span className="font-orbitron text-xs font-bold" style={{ color }}>
          {level}%
        </span>
      </div>
      <div
        className="h-1.5 rounded-sm overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.05)' }}
      >
        <motion.div
          className="h-full rounded-sm"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: index * 0.07 + 0.2, ease: 'easeOut' }}
          style={{
            background: `linear-gradient(to right, ${color}99, ${color})`,
            boxShadow: `0 0 8px ${color}60`,
          }}
        />
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  return (
    <section id="skills" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          title="SKILLS"
          subtitle="ABILITY KIT"
          color="#bd93f9"
          icon="⬡"
        />

        <div className="grid md:grid-cols-2 gap-6">
          {skills.map((category, i) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative p-6"
              style={{
                border: `1px solid rgba(255,255,255,0.06)`,
                background: 'rgba(26,29,35,0.5)',
              }}
            >
              {/* Corner accents */}
              <div
                className="absolute top-0 left-0 w-4 h-4"
                style={{ borderTop: `2px solid ${category.color}`, borderLeft: `2px solid ${category.color}`, opacity: 0.7 }}
              />
              <div
                className="absolute bottom-0 right-0 w-4 h-4"
                style={{ borderBottom: `2px solid ${category.color}`, borderRight: `2px solid ${category.color}`, opacity: 0.7 }}
              />

              {/* Category header */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-2 h-2 rounded-sm"
                  style={{ background: category.color, boxShadow: `0 0 10px ${category.color}` }}
                />
                <h3
                  className="font-orbitron font-bold text-sm tracking-widest"
                  style={{ color: category.color }}
                >
                  {category.category.toUpperCase()}
                </h3>
                <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, ${category.color}30, transparent)` }} />
              </div>

              {/* Skill bars */}
              <div className="flex flex-col gap-4">
                {category.items.map((skill, j) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    color={category.color}
                    index={j}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional skill tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 p-6"
          style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(26,29,35,0.3)' }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="font-orbitron text-xs text-gray-500 tracking-widest">ADDITIONAL TOOLS</span>
            <div className="flex-1 h-px bg-white/5" />
          </div>
          <div className="flex flex-wrap gap-2">
            {skillTags.map((tool) => (
              <span
                key={tool}
                className="font-rajdhani text-sm text-gray-400 px-3 py-1.5 hover:text-white transition-colors cursor-default"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                {tool}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
