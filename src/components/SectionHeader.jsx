import { motion } from 'framer-motion';

export default function SectionHeader({ title, subtitle, color = '#ff4655', icon }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-16"
    >
      <div className="flex items-center gap-4 mb-3">
        <div className="h-px flex-1" style={{ background: `linear-gradient(to right, ${color}, transparent)`, maxWidth: 60 }} />
        <span className="font-orbitron text-xs tracking-widest" style={{ color }}>
          {icon} {subtitle}
        </span>
      </div>
      <h2
        className="font-orbitron font-black tracking-wider"
        style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#ece8e1' }}
      >
        {title}
      </h2>
      <div className="mt-3 h-px w-24" style={{ background: `linear-gradient(to right, ${color}, transparent)` }} />
    </motion.div>
  );
}
