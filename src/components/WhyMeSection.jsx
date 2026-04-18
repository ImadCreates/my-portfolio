import { motion } from 'framer-motion';
import { Volume2, ChevronRight } from 'lucide-react';
import SectionHeader from './SectionHeader';

// ─── WHY ME SCRIPT ───────────────────────────────────────────────────────────
const scriptParagraphs = [
  {
    id: 'intro',
    color: '#ff4655',
    label: 'INTRO',
    text: "Hi, my name is Imaduddin Ahmed. I'm a 4th-year Software Engineering student at York University, and I'm here today because I genuinely love building things that matter.",
  },
  {
    id: 'story',
    color: '#00d4ff',
    label: 'MY STORY',
    text: "Growing up, my family moved around a lot. New cities, new schools, new people — constantly. And every time, I had to start over. That actually taught me something I didn't expect: how to connect with people quickly, and how to get comfortable being uncomfortable. I'd walk into a room full of strangers, nervous on the inside, but I'd push through it anyway. I stopped waiting until I felt ready, because ready never came.",
  },
  {
    id: 'engineering',
    color: '#bd93f9',
    label: 'WHY ENGINEERING',
    text: "That same mindset is what drew me to software engineering. When I was younger, time would just disappear whenever I was coding — building apps, figuring out how things worked. It didn't feel like work. And over the past four years I've taken that curiosity and turned it into real projects. Most recently, I built MediLink — a full-stack emergency dispatch system that integrates a React web app, a Spring Boot backend, and a live FPGA board programmed in Verilog. That's hardware talking to software in real time, and I built every layer of it.",
  },
  {
    id: 'goals',
    color: '#ffd700',
    label: 'MY GOALS',
    text: "My goal coming out of this degree is to land an internship at a top-tier tech company, grow fast, and eventually build something of my own — ideally an engineering firm I can run with my family. Everything I do is pointed at that.",
  },
  {
    id: 'close',
    color: '#39ff88',
    label: 'CLOSING',
    text: `I'll close with the quote I keep on my wall: "Become someone who takes action, not someone who talks about it." That's the standard I hold myself to. And that's why I'm here.`,
  },
];

export default function WhyMeSection() {

  return (
    <section id="whyme" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          title="WHY ME"
          subtitle="AGENT BRIEF"
          color="#ffd700"
          icon="▶"
        />

        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* ── Left: Video Player ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="relative"
              style={{ border: '1px solid rgba(255,215,0,0.2)', background: 'rgba(26,29,35,0.6)' }}
            >
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-5 h-5 z-10" style={{ borderTop: '2px solid #ffd700', borderLeft: '2px solid #ffd700' }} />
              <div className="absolute top-0 right-0 w-5 h-5 z-10" style={{ borderTop: '2px solid #ffd700', borderRight: '2px solid #ffd700' }} />
              <div className="absolute bottom-0 left-0 w-5 h-5 z-10" style={{ borderBottom: '2px solid #ffd700', borderLeft: '2px solid #ffd700' }} />
              <div className="absolute bottom-0 right-0 w-5 h-5 z-10" style={{ borderBottom: '2px solid #ffd700', borderRight: '2px solid #ffd700' }} />

              {/* Label */}
              <div className="flex items-center gap-2 px-4 py-2.5" style={{ borderBottom: '1px solid rgba(255,215,0,0.12)' }}>
                <Volume2 size={13} style={{ color: '#ffd700' }} />
                <span className="font-orbitron text-xs tracking-widest" style={{ color: '#ffd700' }}>
                  WHY ME — AGENT STATEMENT
                </span>
                <div className="w-1.5 h-1.5 rounded-full ml-auto animate-pulse" style={{ background: '#ffd700' }} />
              </div>

              {/* Video — YouTube embed */}
              <div className="relative bg-black" style={{ aspectRatio: '9/16', maxHeight: '480px' }}>
                <iframe
                  src="https://www.youtube.com/embed/QeSlzvbtGAE"
                  title="Why Me — Imaduddin Ahmed"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ border: 'none' }}
                />
              </div>

              <div className="px-4 py-2 flex items-center gap-2" style={{ borderTop: '1px solid rgba(255,215,0,0.08)' }}>
                <span className="font-rajdhani text-xs text-gray-500 tracking-widest">IMADUDDIN AHMED · YORK UNIVERSITY · 2026</span>
              </div>
            </div>
          </motion.div>

          {/* ── Right: Script ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="h-px flex-1 bg-white/5" />
              <span className="font-orbitron text-xs text-gray-500 tracking-widest">TRANSCRIPT</span>
              <div className="h-px flex-1 bg-white/5" />
            </div>

            {scriptParagraphs.map((para, i) => (
              <motion.div
                key={para.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="relative pl-4"
                style={{ borderLeft: `2px solid ${para.color}40` }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <ChevronRight size={11} style={{ color: para.color }} />
                  <span
                    className="font-orbitron tracking-widest"
                    style={{ fontSize: '9px', color: para.color }}
                  >
                    {para.label}
                  </span>
                </div>
                <p className="font-rajdhani text-gray-300 leading-relaxed" style={{ fontSize: '0.95rem' }}>
                  {para.text}
                </p>
              </motion.div>
            ))}
          </motion.div>

        </div>

        {/* ── Reflection ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-14 relative p-6"
          style={{
            border: '1px solid rgba(189,147,249,0.18)',
            background: 'rgba(189,147,249,0.04)',
          }}
        >
          <div className="absolute top-0 left-0 w-5 h-5" style={{ borderTop: '2px solid #bd93f9', borderLeft: '2px solid #bd93f9' }} />
          <div className="absolute bottom-0 right-0 w-5 h-5" style={{ borderBottom: '2px solid #bd93f9', borderRight: '2px solid #bd93f9' }} />

          <div className="flex items-center gap-2 mb-5">
            <div className="w-2 h-2 rounded-full" style={{ background: '#bd93f9', boxShadow: '0 0 8px #bd93f9' }} />
            <span className="font-orbitron text-xs tracking-widest" style={{ color: '#bd93f9' }}>REFLECTION &amp; PROFESSIONAL GROWTH</span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                color: '#ff4655',
                title: 'Where I Started',
                text: 'I came into Software Engineering knowing I wanted to build things, but without a clear direction. My early projects were small and siloed — simple scripts, basic web pages. I was technically learning, but not yet thinking in systems.',
              },
              {
                color: '#00d4ff',
                title: 'What Changed',
                text: 'Two concurrent internships in my third year forced rapid growth. At Cetmatrix I owned a full mobile CI/CD pipeline end-to-end. At CARE Hospitals I managed live healthcare infrastructure. Shipping real code in critical environments taught me accountability that no course could replicate.',
              },
              {
                color: '#ffd700',
                title: 'Linking Artifacts to Growth',
                text: 'MediLink directly reflects that growth — it bridges mobile (Flutter), web (React), and backend (Spring Boot + Firebase) in a single cohesive system. PrimeBid takes it further into distributed microservices with Docker and an API Gateway, problems I now understand from experience, not just theory.',
              },
              {
                color: '#39ff88',
                title: 'Looking Forward',
                text: 'My next step is a new-grad role where I can grow into a senior engineer and eventually an engineering leader. I want to keep building products that solve real problems — and one day run a firm with my family. Every artifact in this portfolio is a deliberate step toward that.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex flex-col gap-2"
              >
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: item.color, boxShadow: `0 0 6px ${item.color}` }} />
                  <span className="font-orbitron text-xs tracking-widest" style={{ color: item.color }}>{item.title.toUpperCase()}</span>
                </div>
                <p className="font-rajdhani text-gray-300 leading-relaxed text-sm pl-3.5" style={{ borderLeft: `1px solid ${item.color}30` }}>
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
