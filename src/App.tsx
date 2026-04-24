import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from '@/context/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/sections/HeroSection';
import { ServicesSection } from '@/sections/ServicesSection';
import { CaseStudiesSection } from '@/sections/CaseStudiesSection';
import { TestimonialsSection } from '@/sections/TestimonialsSection';
import { AboutSection } from '@/sections/AboutSection';
import { ContactSection } from '@/sections/ContactSection';
import { AboutPage } from '@/pages/AboutPage';
import { ServicesPage } from '@/pages/ServicesPage';
import { PrivacyPage } from '@/pages/PrivacyPage';
import { MetaAdsPage } from '@/pages/services/MetaAdsPage';
import { GoogleAdsPage } from '@/pages/services/GoogleAdsPage';
import { WebDevPage } from '@/pages/services/WebDevPage';
import { SmmPage } from '@/pages/services/SmmPage';
import { SeoPage } from '@/pages/services/SeoPage';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

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
      <ContactSection />
    </main>
  );
};

const App: React.FC = () => (
  <BrowserRouter>
    <LanguageProvider>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/meta-ads" element={<MetaAdsPage />} />
        <Route path="/services/google-ads" element={<GoogleAdsPage />} />
        <Route path="/services/web-dev" element={<WebDevPage />} />
        <Route path="/services/smm" element={<SmmPage />} />
        <Route path="/services/seo" element={<SeoPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
      </Routes>
      <Footer />
    </LanguageProvider>
  </BrowserRouter>
);

export default App;
