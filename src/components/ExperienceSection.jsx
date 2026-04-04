import { motion } from 'framer-motion';
import { Briefcase, MapPin, Calendar, ChevronRight } from 'lucide-react';
import SectionHeader from './SectionHeader';
import { experience } from '../data/portfolioData';

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          title="EXPERIENCE"
          subtitle="COMBAT LOG"
          color="#ffd700"
          icon="◇"
        />

        <div className="relative">
          {/* Timeline vertical line */}
          <div
            className="absolute left-6 top-0 bottom-0 w-px hidden md:block"
            style={{ background: 'linear-gradient(to bottom, #ffd700, rgba(255,215,0,0.1))' }}
          />

          <div className="flex flex-col gap-8">
            {experience.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative md:pl-16"
              >
                {/* Timeline dot */}
                <div
                  className="hidden md:flex absolute left-3.5 top-6 w-5 h-5 -translate-x-1/2 items-center justify-center rounded-sm z-10"
                  style={{
                    background: '#0f1014',
                    border: `2px solid ${exp.color}`,
                    boxShadow: `0 0 12px ${exp.color}60`,
                  }}
                >
                  <div className="w-2 h-2 rounded-sm" style={{ background: exp.color }} />
                </div>

                {/* Card */}
                <div
                  className="relative group p-6 transition-all duration-300 hover:translate-y-[-2px]"
                  style={{
                    border: `1px solid rgba(255,255,255,0.06)`,
                    background: 'rgba(26,29,35,0.5)',
                    clipPath: 'polygon(0 0, 100% 0, 100% 95%, 98% 100%, 0 100%)',
                  }}
                >
                  {/* Hover accent */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ border: `1px solid ${exp.color}30`, background: `${exp.color}04` }}
                  />

                  {/* Color accent bar left */}
                  <div
                    className="absolute left-0 top-4 bottom-4 w-0.5 rounded-full"
                    style={{ background: exp.color, boxShadow: `0 0 8px ${exp.color}` }}
                  />

                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4 pl-4">
                    <div>
                      <h3
                        className="font-orbitron font-bold text-lg text-white mb-1"
                        style={{ letterSpacing: '0.05em' }}
                      >
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-2">
                        <Briefcase size={12} style={{ color: exp.color }} />
                        <span className="font-rajdhani font-semibold text-sm" style={{ color: exp.color }}>
                          {exp.company}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={11} className="text-gray-500" />
                        <span className="font-rajdhani text-xs text-gray-400 tracking-widest">{exp.period}</span>
                      </div>
                      {exp.duration && (
                        <div className="font-rajdhani text-xs text-gray-600 tracking-widest text-right">
                          {exp.duration}
                        </div>
                      )}
                      <div className="flex items-center gap-1.5">
                        <MapPin size={11} className="text-gray-500" />
                        <span className="font-rajdhani text-xs text-gray-500">{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="font-rajdhani text-gray-400 text-sm leading-relaxed mb-4 pl-4">
                    {exp.description}
                  </p>

                  {/* Achievements */}
                  <div className="pl-4 flex flex-col gap-2">
                    {exp.achievements.map((ach, j) => (
                      <motion.div
                        key={j}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 + j * 0.05 + 0.3 }}
                        className="flex items-start gap-2"
                      >
                        <ChevronRight
                          size={13}
                          className="mt-0.5 flex-shrink-0"
                          style={{ color: exp.color }}
                        />
                        <span className="font-rajdhani text-sm text-gray-300">{ach}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
