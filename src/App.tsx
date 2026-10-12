import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/layout/ScrollToTop';

import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { ServiceDetail } from './pages/ServiceDetail';
import { Portfolio } from './pages/Portfolio';
import { About } from './pages/About';
import { Process } from './pages/Process';
import { Contact } from './pages/Contact';
import { Photography } from './pages/Photography';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { Terms } from './pages/Terms';
import { NotFound } from './pages/NotFound';
import { CustomCursor } from './components/effects/CustomCursor';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <CustomCursor />
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-brand-bg text-brand-text font-body selection:bg-brand-blue selection:text-white">
        {/* Optional slim announcement strip */}
        <AnnouncementBar />

        {/* Refined sticky navigation bar */}
        <Navbar />

        {/* Main Routed Content */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/photography" element={<Photography />} />
            <Route path="/photography" element={<Photography />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/work" element={<Portfolio />} />
            <Route path="/about" element={<About />} />
            <Route path="/process" element={<Process />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Brand Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
