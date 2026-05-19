import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/sections/HeroSection';
import { ServicesSection } from '@/sections/ServicesSection';
import { CaseStudiesSection } from '@/sections/CaseStudiesSection';
import { TestimonialsSection } from '@/sections/TestimonialsSection';
import { AboutSection } from '@/sections/AboutSection';
import { useReveal } from '@/hooks/useReveal';

const ContactSection = lazy(() =>
  import('@/sections/ContactSection').then(m => ({ default: m.ContactSection }))
);
const AboutPage = lazy(() =>
  import('@/pages/AboutPage').then(m => ({ default: m.AboutPage }))
);
const ServicesPage = lazy(() =>
  import('@/pages/ServicesPage').then(m => ({ default: m.ServicesPage }))
);
const PrivacyPage = lazy(() =>
  import('@/pages/PrivacyPage').then(m => ({ default: m.PrivacyPage }))
);
const MetaAdsPage = lazy(() =>
  import('@/pages/services/MetaAdsPage').then(m => ({ default: m.MetaAdsPage }))
);
const GoogleAdsPage = lazy(() =>
  import('@/pages/services/GoogleAdsPage').then(m => ({ default: m.GoogleAdsPage }))
);
const WebDevPage = lazy(() =>
  import('@/pages/services/WebDevPage').then(m => ({ default: m.WebDevPage }))
);
const SmmPage = lazy(() =>
  import('@/pages/services/SmmPage').then(m => ({ default: m.SmmPage }))
);
const SeoPage = lazy(() =>
  import('@/pages/services/SeoPage').then(m => ({ default: m.SeoPage }))
);
const NotFoundPage = lazy(() =>
  import('@/pages/NotFoundPage').then(m => ({ default: m.NotFoundPage }))
);

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const RevealObserver: React.FC = () => { useReveal(); return null; };

const LandingPage: React.FC = () => {
  useEffect(() => {
    const target = sessionStorage.getItem('scrollTarget');
    if (target) {
      sessionStorage.removeItem('scrollTarget');
      const attempt = (tries = 0) => {
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        else if (tries < 10) setTimeout(() => attempt(tries + 1), 150);
      };
      setTimeout(() => attempt(), 300);
    }
  }, []);

  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <CaseStudiesSection />
      <TestimonialsSection />
      <AboutSection />
      <Suspense fallback={<section id="contact" />}>
        <ContactSection />
      </Suspense>
    </main>
  );
};

const App: React.FC = () => (
  <BrowserRouter>
    <ScrollToTop />
    <RevealObserver />
    <Header />
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/meta-ads" element={<MetaAdsPage />} />
        <Route path="/services/google-ads" element={<GoogleAdsPage />} />
        <Route path="/services/web-dev" element={<WebDevPage />} />
        <Route path="/services/smm" element={<SmmPage />} />
        <Route path="/services/seo" element={<SeoPage />} />
        <Route path="/services/consultation" element={<SeoPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
    <Footer />
  </BrowserRouter>
);

export default App;
