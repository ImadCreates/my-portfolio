import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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

const sectionOrder = ['hero', 'about', 'experience', 'projects', 'skills', 'education'];

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [contactOpen, setContactOpen] = useState(false);
  const sectionRefs = useRef({});

  // Track active section on scroll
  useEffect(() => {
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
  }, []);

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
    </div>
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
