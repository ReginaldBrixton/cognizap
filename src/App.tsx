/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { SmoothScroll } from './components/SmoothScroll';
import { ScrollProgress } from './components/ScrollProgress';
import { ScrollToTop } from './components/ScrollToTop';
import { ScrollControls } from './components/ScrollControls';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Problem } from './components/Problem';
import { Features } from './components/Features';
import { Workspace } from './components/Workspace';
import { SocialProof } from './components/SocialProof';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import { EarlyAccess } from './pages/EarlyAccess';
import { Pricing } from './pages/Pricing';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';
import { Product } from './pages/Product';
import { FeaturesPage } from './pages/Features';
import { Integrations } from './pages/Integrations';
import { Changelog } from './pages/Changelog';
import { UserSupport } from './pages/UserSupport';
import { AdminSupport } from './pages/AdminSupport';

function LandingPage() {
  return (
    <>
      <ScrollProgress />
      <main>
        <Hero />
        <Problem />
        <Features />
        <Workspace />
        <SocialProof />
        <CTA />
      </main>
    </>
  );
}

function AppContent() {
  const location = useLocation();
  const hideFooter = location.pathname === '/support' || location.pathname === '/admin/support';

  return (
    <div className="relative min-h-screen bg-sand dark:bg-night text-dark dark:text-night-text font-sans selection:bg-sage/30 selection:text-dark transition-colors duration-500 flex flex-col">
      <ScrollControls />
      <Navbar />
      <div className="flex-1 flex flex-col">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/product" element={<Product />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/changelog" element={<Changelog />} />
          <Route path="/early-access" element={<EarlyAccess />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/support" element={<UserSupport />} />
          <Route path="/admin/support" element={<AdminSupport />} />
        </Routes>
      </div>
      {!hideFooter && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <SmoothScroll>
        <AppContent />
      </SmoothScroll>
    </BrowserRouter>
  );
}
