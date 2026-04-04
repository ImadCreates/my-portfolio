import { useState } from 'react';
import './myPortfolio.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import ContactModal from './components/ContactModal';
import Footer from './components/Footer';

export default function MyPortfolioApp({ activePortfolio, onSwitchPortfolio }) {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const openContactModal = () => setIsContactOpen(true);
  const closeContactModal = () => setIsContactOpen(false);

  return (
    <div className="mp-root" style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh' }}>
      <Navbar
        onOpenContact={openContactModal}
        activePortfolio={activePortfolio}
        onSwitchPortfolio={onSwitchPortfolio}
      />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact onOpenContact={openContactModal} />
      </main>
      <Footer />
      <ContactModal isOpen={isContactOpen} onClose={closeContactModal} />
    </div>
  );
}
