import { useState, useEffect } from 'react';
import BackgroundEffect from './components/BackgroundEffect';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import EducationSection from './components/EducationSection';
import ContactModal from './components/ContactModal';
import Footer from './components/Footer';
import { personalInfo } from './data/portfolioData';

const sectionOrder = ['hero', 'about', 'experience', 'projects', 'skills', 'education'];

export default function App() {
  const [activePortfolio, setActivePortfolio] = useState('val');
  const [activeSection, setActiveSection] = useState('hero');
  const [contactOpen, setContactOpen] = useState(false);

  // Track active section on scroll
  useEffect(() => {
    if (activePortfolio !== 'val') {
      return undefined;
    }

    const observers = {};

    sectionOrder.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id === 'hero' ? 'about' : id);
          }
        },
        { threshold: 0.4 }
      );

      observer.observe(el);
      observers[id] = observer;
    });

    return () => {
      Object.values(observers).forEach((obs) => obs.disconnect());
    };
  }, [activePortfolio]);

  useEffect(() => {
    if (activePortfolio !== 'val') {
      setContactOpen(false);
    }
  }, [activePortfolio]);

  const navigateTo = (id) => {
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('about');
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
    }
  };

  return (
    <div className="relative min-h-screen bg-val-dark overflow-x-hidden">
      {/* Animated particle background */}
      <BackgroundEffect />

      <PortfolioSwitchBar activePortfolio={activePortfolio} onChange={setActivePortfolio} />

      {activePortfolio === 'val' ? (
        <>
          {/* Fixed Navigation */}
          <Navbar activeSection={activeSection} onNavigate={navigateTo} />

          {/* Main content */}
          <main className="relative z-10">
            <HeroSection onNavigate={navigateTo} onOpenContact={() => setContactOpen(true)} />

            {/* Divider */}
            <SectionDivider />

            <AboutSection onOpenContact={() => setContactOpen(true)} />
            <SectionDivider />
            <ExperienceSection />
            <SectionDivider />
            <ProjectsSection />
            <SectionDivider />
            <SkillsSection />
            <SectionDivider />
            <EducationSection />
          </main>

          <Footer onNavigate={navigateTo} />

          {/* Contact Modal */}
          <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
        </>
      ) : (
        <main className="relative z-10 min-h-screen px-4 pt-36 pb-8 md:px-8">
          <EmbeddedPortfolioView />
        </main>
      )}
    </div>
  );
}

function PortfolioSwitchBar({ activePortfolio, onChange }) {
  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[70] flex gap-4">
      <button
        type="button"
        onClick={() => onChange('my')}
        aria-pressed={activePortfolio === 'my'}
        className="flex items-center gap-2 px-4 py-1.5 border transition-colors duration-200"
        style={{
          background: 'rgba(15,16,20,0.88)',
          borderColor: activePortfolio === 'my' ? 'rgba(255,70,85,0.6)' : 'rgba(255,255,255,0.1)',
        }}
      >
        <span className="text-xs" style={{ color: activePortfolio === 'my' ? '#ff4655' : '#9e9e9e' }}>🔒</span>
        <span
          className="font-rajdhani text-xs tracking-widest"
          style={{ color: activePortfolio === 'my' ? '#ff4655' : '#9e9e9e' }}
        >
          CLOSE ◈
        </span>
      </button>

      <button
        type="button"
        onClick={() => onChange('val')}
        aria-pressed={activePortfolio === 'val'}
        className="flex items-center gap-2 px-4 py-1.5 border transition-colors duration-200"
        style={{
          background: 'rgba(15,16,20,0.88)',
          borderColor: activePortfolio === 'val' ? 'rgba(0,212,255,0.6)' : 'rgba(255,255,255,0.1)',
        }}
      >
        <span
          className="font-rajdhani text-xs tracking-widest"
          style={{ color: activePortfolio === 'val' ? '#00d4ff' : '#9e9e9e' }}
        >
          OPEN ◇
        </span>
        <span className="text-xs" style={{ color: activePortfolio === 'val' ? '#00d4ff' : '#9e9e9e' }}>🔓</span>
      </button>
    </div>
  );
}

function EmbeddedPortfolioView() {
  return (
    <section className="mx-auto w-full max-w-7xl">
      <div
        className="px-4 py-3"
        style={{
          border: '1px solid rgba(255,70,85,0.2)',
          background: 'rgba(15,16,20,0.85)',
        }}
      >
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="font-orbitron text-xs tracking-widest text-red-400">MY-PORTFOLIO MODE</p>
            <p className="font-rajdhani text-sm text-gray-400">Same page, no new tabs.</p>
          </div>
          <button
            type="button"
            onClick={() => window.location.assign(personalInfo.website)}
            className="px-4 py-2 font-rajdhani text-xs tracking-widest border"
            style={{ borderColor: 'rgba(255,255,255,0.2)', color: '#ece8e1' }}
          >
            OPEN DIRECT IN THIS TAB
          </button>
        </div>
      </div>

      <div
        className="mt-4 overflow-hidden"
        style={{
          border: '1px solid rgba(255,255,255,0.12)',
          background: 'rgba(15,16,20,0.75)',
          height: 'calc(100vh - 220px)',
          minHeight: '520px',
        }}
      >
        <iframe
          title="My Portfolio"
          src={personalInfo.website}
          className="w-full h-full"
          loading="lazy"
        />
      </div>
    </section>
  );
}

function SectionDivider() {
  return (
    <div className="flex items-center gap-4 px-12 py-2 opacity-20">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent" />
      <div className="w-1 h-1 rounded-full bg-red-500 rotate-45" />
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent" />
    </div>
  );
}
