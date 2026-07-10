import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import CaseStudy from './pages/CaseStudy';
import CutProvider from './components/CutProvider';
import CommandPalette from './components/CommandPalette';
import GgChallenge from './components/GgChallenge';
import SlashCanvas from './components/SlashCanvas';
import ComboLayer from './components/ComboLayer';
import ScrollRail from './components/ScrollRail';
import Grain from './components/Grain';
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
        {/* P5: the house duotone. Luminance in, shadows mapped toward
            ink, highlights toward bone. Referenced as url(#duotone). */}
        <svg aria-hidden="true" width="0" height="0" className="absolute">
          <filter id="duotone" colorInterpolationFilters="sRGB">
            <feColorMatrix
              type="matrix"
              values="0.2126 0.7152 0.0722 0 0
                      0.2126 0.7152 0.0722 0 0
                      0.2126 0.7152 0.0722 0 0
                      0 0 0 1 0"
            />
            <feComponentTransfer>
              <feFuncR type="table" tableValues="0.0392 0.9294" />
              <feFuncG type="table" tableValues="0.0392 0.9294" />
              <feFuncB type="table" tableValues="0.0431 0.9137" />
            </feComponentTransfer>
          </filter>
        </svg>
        {/* S2.2: structural grid. Three faint vertical rules, fixed
            behind all content. */}
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 hidden md:block">
          <span className="absolute inset-y-0 left-12 w-px bg-hairline/40" />
          <span className="absolute inset-y-0 left-[62%] w-px bg-hairline/40" />
          <span className="absolute inset-y-0 right-12 w-px bg-hairline/40" />
        </div>
        <a
          href="#main"
          className="label-mono fixed top-2 left-2 z-50 -translate-y-16 bg-ash px-4 py-2 text-bone transition-transform duration-(--t-fast) ease-settle focus:translate-y-0"
        >
          SKIP TO CONTENT
        </a>
        <ScrollToTop />
        <CommandPalette />
        <GgChallenge />
        <Nav />
        <main id="main" tabIndex={-1} className="outline-none">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/record/:slug" element={<CaseStudy />} />
          </Routes>
        </main>
        <Footer />
        {/* B3: the edge. Above ghost numerals, below the blade layer. */}
        <ScrollRail />
        {/* B1/B2: the blade layer. Site-wide, above content and nav,
            below the route-transition overlay. */}
        <SlashCanvas />
        <ComboLayer />
        {/* P2: film grain over everything except the route-cut overlay
            and the command palette. */}
        <Grain />
      </CutProvider>
    </BrowserRouter>
  );
}
