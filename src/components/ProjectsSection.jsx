import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Star, Play } from 'lucide-react';
import { GithubIcon } from './Icons';
import SectionHeader from './SectionHeader';
import { projects } from '../data/portfolioData';

function VideoPanel({ url, label, desc, color }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="flex flex-col gap-2 flex-1 min-w-0">
      {/* Label */}
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
        <span className="font-orbitron text-xs tracking-widest" style={{ color }}>{label}</span>
      </div>

      {/* Video */}
      <div className="relative bg-black w-full" style={{ aspectRatio: '16/9' }}>
        {playing ? (
          <iframe
            src={`${url}?autoplay=1`}
            title={label}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ border: 'none' }}
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="w-full h-full flex flex-col items-center justify-center gap-2 group/play"
            style={{ background: `linear-gradient(135deg, ${color}14, rgba(15,16,20,0.96))` }}
          >
            <div
              className="flex items-center justify-center w-12 h-12 rounded-full transition-transform duration-200 group-hover/play:scale-110"
              style={{
                background: `${color}20`,
                border: `2px solid ${color}`,
                boxShadow: `0 0 20px ${color}40`,
              }}
            >
              <Play size={18} fill={color} style={{ color, marginLeft: 3 }} />
            </div>
            <span className="font-orbitron text-xs tracking-widest" style={{ color, fontSize: '10px' }}>
              PLAY
            </span>
          </button>
        )}
      </div>

      {/* Description */}
      <p className="font-rajdhani text-xs text-gray-500 leading-relaxed">{desc}</p>
    </div>
  );
}

function ProjectCard({ project, i, total }) {
  const isWide = !!project.wide;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: i * 0.1 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`relative group flex flex-col ${isWide ? 'md:col-span-2' : ''}`}
      style={{
        border: `1px solid rgba(255,255,255,0.06)`,
        background: 'rgba(26,29,35,0.5)',
        clipPath: 'polygon(0 0, 100% 0, 100% 96%, 97% 100%, 0 100%)',
      }}
    >
      {/* Hover border */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ border: `1px solid ${project.color}35` }}
      />

      {/* Top accent line */}
      <div className="h-0.5 w-full" style={{ background: `linear-gradient(to right, ${project.color}, transparent)` }} />

      {/* Featured badge */}
      {project.featured && (
        <div
          className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5"
          style={{ background: `${project.color}15`, border: `1px solid ${project.color}30` }}
        >
          <Star size={9} style={{ color: project.color }} />
          <span className="font-orbitron tracking-widest" style={{ color: project.color, fontSize: '9px' }}>FEATURED</span>
        </div>
      )}

      <div className="p-6 flex flex-col flex-1">
        {/* Number + Title row */}
        <div className="font-orbitron text-xs tracking-widest mb-2 opacity-40" style={{ color: project.color }}>
          {String(i + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </div>
        <h3 className="font-orbitron font-bold text-xl text-white mb-1" style={{ letterSpacing: '0.05em' }}>
          {project.title}
        </h3>
        <p className="font-rajdhani text-xs tracking-widest mb-4" style={{ color: project.color, opacity: 0.7 }}>
          {project.subtitle}
        </p>

        {/* Wide layout: description left, videos right */}
        {isWide && project.demos ? (
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-8 mb-4">
            {/* Left: description + highlights + tech */}
            <div className="flex flex-col gap-4">
              <p className="font-rajdhani text-gray-400 text-sm leading-relaxed">{project.description}</p>

              <div className="flex flex-wrap gap-2">
                {project.highlights.map((h, j) => (
                  <div key={j} className="flex items-center gap-1.5 px-2 py-1"
                    style={{ background: `${project.color}10`, border: `1px solid ${project.color}20` }}>
                    <div className="w-1 h-1 rounded-full" style={{ background: project.color }} />
                    <span className="font-rajdhani text-xs text-gray-300">{h}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span key={tech} className="font-mono text-xs px-2 py-0.5 rounded-sm"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#9e9e9e' }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: two videos side by side */}
            <div className="flex gap-4">
              {project.demos.map((demo) => (
                <VideoPanel key={demo.label} {...demo} color={project.color} />
              ))}
            </div>
          </div>
        ) : (
          <>
            <p className="font-rajdhani text-gray-400 text-sm leading-relaxed mb-4 flex-1">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.highlights.map((h, j) => (
                <div key={j} className="flex items-center gap-1.5 px-2 py-1"
                  style={{ background: `${project.color}10`, border: `1px solid ${project.color}20` }}>
                  <div className="w-1 h-1 rounded-full" style={{ background: project.color }} />
                  <span className="font-rajdhani text-xs text-gray-300">{h}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5 mb-5">
              {project.techStack.map((tech) => (
                <span key={tech} className="font-mono text-xs px-2 py-0.5 rounded-sm"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#9e9e9e' }}>
                  {tech}
                </span>
              ))}
            </div>
          </>
        )}

        {/* Links */}
        <div className="flex items-center gap-3 pt-4 mt-auto" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group/link">
              <GithubIcon size={14} className="text-gray-500 group-hover/link:text-white transition-colors" />
              <span className="font-rajdhani text-xs text-gray-500 group-hover/link:text-white transition-colors tracking-widest">SOURCE</span>
            </a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group/link ml-auto">
              <span className="font-rajdhani text-xs tracking-widest transition-colors" style={{ color: project.color }}>LIVE DEMO</span>
              <ExternalLink size={12} style={{ color: project.color }} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader title="PROJECTS" subtitle="MISSION INTEL" color="#00d4ff" icon="◈" />
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} i={i} total={projects.length} />
          ))}
        </div>
      </div>
    </section>
  );
}
