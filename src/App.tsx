import React, { Suspense, lazy } from 'react'
import './i18n/config'
import { ThemeProvider } from '@/hooks/useTheme'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { HeroSection } from '@/sections/HeroSection'

const ServicesSection = lazy(() => import('@/sections/ServicesSection').then((module) => ({ default: module.ServicesSection })))
const ProcessSection = lazy(() => import('@/sections/ProcessSection').then((module) => ({ default: module.ProcessSection })))
const ResultsSection = lazy(() => import('@/sections/ResultsSection').then((module) => ({ default: module.ResultsSection })))
const CaseStudiesSection = lazy(() => import('@/sections/CaseStudiesSection').then((module) => ({ default: module.CaseStudiesSection })))
const TrustSection = lazy(() => import('@/sections/TrustSection').then((module) => ({ default: module.TrustSection })))
const TestimonialsSection = lazy(() => import('@/sections/TestimonialsSection').then((module) => ({ default: module.TestimonialsSection })))
const ContentSection = lazy(() => import('@/sections/ContentSection').then((module) => ({ default: module.ContentSection })))
const ContactSection = lazy(() => import('@/sections/ContactSection').then((module) => ({ default: module.ContactSection })))

const SectionLoader = () => (
  <div className="flex justify-center py-20 text-gray-400">Loading section…</div>
)

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen app-shell transition-colors duration-300">
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
      </div>
    </ThemeProvider>
  )
}

export default App
