import React, { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './i18n/config'
import { ThemeProvider } from '@/hooks/useTheme'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { HeroSection } from '@/sections/HeroSection'
import { PrivacyPage } from '@/pages/PrivacyPage'

const AboutPage = lazy(() =>
  import('@/pages/AboutPage').then((m) => ({ default: m.AboutPage }))
)
const MetaAdsPage = lazy(() =>
  import('@/pages/services/MetaAdsPage').then((m) => ({ default: m.MetaAdsPage }))
)
const GoogleAdsPage = lazy(() =>
  import('@/pages/services/GoogleAdsPage').then((m) => ({ default: m.GoogleAdsPage }))
)
const SmmPage = lazy(() =>
  import('@/pages/services/SmmPage').then((m) => ({ default: m.SmmPage }))
)
const AuditPage = lazy(() =>
  import('@/pages/services/AuditPage').then((m) => ({ default: m.AuditPage }))
)
const WebDevPage = lazy(() =>
  import('@/pages/services/WebDevPage').then((m) => ({ default: m.WebDevPage }))
)

const ServicesSection = lazy(() =>
  import('@/sections/ServicesSection').then((m) => ({ default: m.ServicesSection }))
)
const ProcessSection = lazy(() =>
  import('@/sections/ProcessSection').then((m) => ({ default: m.ProcessSection }))
)
const ResultsSection = lazy(() =>
  import('@/sections/ResultsSection').then((m) => ({ default: m.ResultsSection }))
)
const CaseStudiesSection = lazy(() =>
  import('@/sections/CaseStudiesSection').then((m) => ({ default: m.CaseStudiesSection }))
)
const TrustSection = lazy(() =>
  import('@/sections/TrustSection').then((m) => ({ default: m.TrustSection }))
)
const TestimonialsSection = lazy(() =>
  import('@/sections/TestimonialsSection').then((m) => ({ default: m.TestimonialsSection }))
)
const ContentSection = lazy(() =>
  import('@/sections/ContentSection').then((m) => ({ default: m.ContentSection }))
)
const FAQSection = lazy(() =>
  import('@/sections/FAQSection').then((m) => ({ default: m.FAQSection }))
)
const ContactSection = lazy(() =>
  import('@/sections/ContactSection').then((m) => ({ default: m.ContactSection }))
)

const SectionLoader = () => (
  <div className="flex justify-center py-20 text-[color:var(--text-muted)]">Loading…</div>
)

const LandingPage: React.FC = () => {
  useEffect(() => {
    const target = sessionStorage.getItem('scrollTarget')
    if (target) {
      sessionStorage.removeItem('scrollTarget')
      const attempt = (tries = 0) => {
        const el = document.getElementById(target)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        } else if (tries < 10) {
          setTimeout(() => attempt(tries + 1), 150)
        }
      }
      setTimeout(() => attempt(), 300)
    }
  }, [])

  return (
    <>
      <Header />
      <main className="pt-20">
        <HeroSection />
        <Suspense fallback={<SectionLoader />}>
          <ServicesSection />
          <ProcessSection />
          <ResultsSection />
          <CaseStudiesSection />
          <TrustSection />
          <TestimonialsSection />
          <ContentSection />
          <FAQSection />
          <ContactSection />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <div className="min-h-screen app-shell transition-colors duration-300">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/about" element={<Suspense fallback={<SectionLoader />}><AboutPage /></Suspense>} />
            <Route path="/services/meta-ads" element={<Suspense fallback={<SectionLoader />}><MetaAdsPage /></Suspense>} />
            <Route path="/services/google-ads" element={<Suspense fallback={<SectionLoader />}><GoogleAdsPage /></Suspense>} />
            <Route path="/services/smm" element={<Suspense fallback={<SectionLoader />}><SmmPage /></Suspense>} />
            <Route path="/services/audit" element={<Suspense fallback={<SectionLoader />}><AuditPage /></Suspense>} />
            <Route path="/services/web-dev" element={<Suspense fallback={<SectionLoader />}><WebDevPage /></Suspense>} />
          </Routes>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
