import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Mail, MapPin } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalInfo } from '../data/portfolioData';

export default function ContactModal({ isOpen, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    // Simulate send (replace with actual handler)
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setTimeout(() => {
        setSent(false);
        setForm({ name: '', email: '', message: '' });
        onClose();
      }, 2500);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative w-full max-w-xl"
            style={{
              background: '#0f1014',
              border: '1px solid rgba(255,70,85,0.2)',
              clipPath: 'polygon(0 0, 100% 0, 100% 96%, 97% 100%, 0 100%)',
              boxShadow: '0 0 60px rgba(255,70,85,0.15)',
            }}
          >
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-5 h-5" style={{ borderTop: '2px solid #ff4655', borderLeft: '2px solid #ff4655' }} />
            <div className="absolute bottom-0 right-0 w-5 h-5" style={{ borderBottom: '2px solid #ff4655', borderRight: '2px solid #ff4655' }} />

            {/* Top accent line */}
            <div className="h-0.5 w-full" style={{ background: 'linear-gradient(to right, #ff4655, transparent)' }} />

            <div className="p-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-8">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="font-orbitron text-xs text-red-500 tracking-widest">OPEN CHANNEL</span>
                  </div>
                  <h2 className="font-orbitron font-black text-2xl text-white tracking-wider">
                    CONTACT ME
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-500 hover:text-white hover:bg-white/5 transition-all duration-200"
                >
                  <X size={18} />
                </button>
              </div>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center"
                >
                  <div
                    className="w-16 h-16 mx-auto mb-4 flex items-center justify-center"
                    style={{ border: '2px solid #ff4655', boxShadow: '0 0 20px rgba(255,70,85,0.3)' }}
                  >
                    <Send size={24} style={{ color: '#ff4655' }} />
                  </div>
                  <h3 className="font-orbitron font-bold text-lg text-white mb-2">MESSAGE SENT</h3>
                  <p className="font-rajdhani text-gray-400 text-sm">I'll get back to you soon.</p>
                </motion.div>
              ) : (
                <>
                  {/* Form */}
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-8">
                    {[
                      { field: 'name', label: 'NAME', type: 'text', placeholder: 'Your name' },
                      { field: 'email', label: 'EMAIL', type: 'email', placeholder: 'your@email.com' },
                    ].map(({ field, label, type, placeholder }) => (
                      <div key={field}>
                        <label className="block font-orbitron text-xs text-gray-500 tracking-widest mb-2">
                          {label}
                        </label>
                        <input
                          type={type}
                          value={form[field]}
                          onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                          placeholder={placeholder}
                          required
                          className="w-full px-4 py-3 font-rajdhani text-sm text-white placeholder-gray-600 transition-all duration-200 outline-none"
                          style={{
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.08)',
                          }}
                          onFocus={(e) => (e.target.style.borderColor = 'rgba(255,70,85,0.4)')}
                          onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
                        />
                      </div>
                    ))}

                    <div>
                      <label className="block font-orbitron text-xs text-gray-500 tracking-widest mb-2">
                        MESSAGE
                      </label>
                      <textarea
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="What's on your mind?"
                        required
                        rows={4}
                        className="w-full px-4 py-3 font-rajdhani text-sm text-white placeholder-gray-600 transition-all duration-200 outline-none resize-none"
                        style={{
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.08)',
                        }}
                        onFocus={(e) => (e.target.style.borderColor = 'rgba(255,70,85,0.4)')}
                        onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={sending}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative flex items-center justify-center gap-3 w-full py-3.5 font-rajdhani font-bold text-sm tracking-widest text-white overflow-hidden"
                      style={{
                        background: sending ? 'rgba(255,70,85,0.5)' : '#ff4655',
                        clipPath: 'polygon(0 0, 95% 0, 100% 25%, 100% 100%, 5% 100%, 0 75%)',
                      }}
                    >
                      {sending ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          TRANSMITTING...
                        </>
                      ) : (
                        <>
                          <Send size={15} />
                          SEND MESSAGE
                        </>
                      )}
                    </motion.button>
                  </form>

                  {/* Divider */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex-1 h-px bg-white/5" />
                    <span className="font-orbitron text-xs text-gray-600 tracking-widest">OR REACH OUT VIA</span>
                    <div className="flex-1 h-px bg-white/5" />
                  </div>

                  {/* Social links */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { icon: <Mail size={16} />, label: 'EMAIL', href: `mailto:${personalInfo.email}`, color: '#ff4655' },
                      { icon: <GithubIcon size={16} />, label: 'GITHUB', href: personalInfo.github, color: '#00d4ff' },
                      { icon: <LinkedinIcon size={16} />, label: 'LINKEDIN', href: personalInfo.linkedin, color: '#4fc3f7' },
                    ].map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center gap-2 py-3 transition-all duration-200"
                        style={{
                          border: '1px solid rgba(255,255,255,0.06)',
                          background: 'rgba(255,255,255,0.02)',
                        }}
                      >
                        <span
                          className="transition-colors duration-200"
                          style={{ color: '#666' }}
                        >
                          <span style={{ color: social.color }}>{social.icon}</span>
                        </span>
                        <span
                          className="font-orbitron text-xs tracking-widest"
                          style={{ color: '#555', fontSize: '9px' }}
                        >
                          {social.label}
                        </span>
                      </a>
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
