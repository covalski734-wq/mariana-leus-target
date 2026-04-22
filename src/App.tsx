import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './i18n/config'
import { ThemeProvider } from '@/hooks/useTheme'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { HeroSection } from '@/sections/HeroSection'
import { PrivacyPage } from '@/pages/PrivacyPage'

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
const ContactSection = lazy(() =>
  import('@/sections/ContactSection').then((m) => ({ default: m.ContactSection }))
)

const SectionLoader = () => (
  <div className="flex justify-center py-20 text-[color:var(--text-muted)]">Loading…</div>
)

const LandingPage: React.FC = () => (
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
        <ContactSection />
      </Suspense>
    </main>
    <Footer />
  </>
)

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <div className="min-h-screen app-shell transition-colors duration-300">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
          </Routes>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
