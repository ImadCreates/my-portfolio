import { motion } from 'framer-motion';
import { Award, MapPin, Calendar, BookOpen } from 'lucide-react';
import SectionHeader from './SectionHeader';
import { education } from '../data/portfolioData';

export default function EducationSection() {
  return (
    <section id="education" className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          title="EDUCATION"
          subtitle="AGENT TRAINING"
          color="#4fc3f7"
          icon="△"
        />

        <div className="flex flex-col gap-8">
          {education.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative group"
              style={{
                border: `1px solid rgba(255,255,255,0.06)`,
                background: 'rgba(26,29,35,0.5)',
              }}
            >
              {/* Hover border */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ border: `1px solid ${edu.color}30` }}
              />

              {/* Left accent bar */}
              <div
                className="absolute left-0 top-0 bottom-0 w-0.5"
                style={{ background: `linear-gradient(to bottom, ${edu.color}, transparent)` }}
              />

              <div className="p-6 pl-8">
                {/* Header row */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <BookOpen size={14} style={{ color: edu.color }} />
                      <h3
                        className="font-orbitron font-bold text-lg text-white"
                        style={{ letterSpacing: '0.04em' }}
                      >
                        {edu.degree}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award size={12} style={{ color: edu.color }} />
                      <span className="font-rajdhani font-semibold text-sm" style={{ color: edu.color }}>
                        {edu.institution}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={11} className="text-gray-500" />
                      <span className="font-rajdhani text-xs text-gray-400 tracking-widest">{edu.period}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin size={11} className="text-gray-500" />
                      <span className="font-rajdhani text-xs text-gray-500">{edu.location}</span>
                    </div>
                  </div>
                </div>

                {/* GPA / Honors */}
                <div className="flex flex-wrap gap-3 mb-4">
                  {edu.gpa && (
                    <div
                      className="flex items-center gap-2 px-3 py-1.5"
                      style={{ background: `${edu.color}10`, border: `1px solid ${edu.color}25` }}
                    >
                      <span className="font-orbitron text-xs tracking-widest" style={{ color: edu.color }}>GPA</span>
                      <span className="font-rajdhani font-bold text-sm text-white">{edu.gpa}</span>
                    </div>
                  )}
                  <div
                    className="flex items-center gap-2 px-3 py-1.5"
                    style={{ background: `${edu.color}10`, border: `1px solid ${edu.color}25` }}
                  >
                    <span className="font-orbitron text-xs tracking-widest" style={{ color: edu.color, fontSize: '9px' }}>
                      {edu.honors}
                    </span>
                  </div>
                </div>

                {/* Highlights */}
                <div className="grid sm:grid-cols-2 gap-2">
                  {edu.highlights.map((highlight, j) => (
                    <motion.div
                      key={j}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 + j * 0.06 + 0.2 }}
                      className="flex items-start gap-2"
                    >
                      <div
                        className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0"
                        style={{ background: edu.color, boxShadow: `0 0 6px ${edu.color}` }}
                      />
                      <span className="font-rajdhani text-sm text-gray-400">{highlight}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
