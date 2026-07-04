import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import CaseStudy from './pages/CaseStudy';
import CutProvider from './components/CutProvider';
import { scrollToTop } from './lib/scroll';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    scrollToTop();
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <CutProvider>
        <a
          href="#main"
          className="label-mono fixed top-2 left-2 z-50 -translate-y-16 bg-ash px-4 py-2 text-bone transition-transform focus:translate-y-0"
        >
          SKIP TO CONTENT
        </a>
        <ScrollToTop />
        <Nav />
        <main id="main" tabIndex={-1} className="outline-none">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/record/:slug" element={<CaseStudy />} />
          </Routes>
        </main>
        <Footer />
      </CutProvider>
    </BrowserRouter>
  );
}
