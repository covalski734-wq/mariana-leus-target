import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/Button'

export const HeroSection: React.FC = () => {
  const { t } = useTranslation()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-dark-bg to-dark-card/20">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center overflow-hidden">
        {/* Left Content */}
        <motion.div
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Urgency Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-2">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            <span className="text-sm text-primary font-medium">{t('hero.urgency')}</span>
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={itemVariants} className="text-5xl lg:text-6xl font-bold text-white leading-tight">
            {t('hero.headline')}
          </motion.h1>

          {/* Subheadline */}
          <motion.p variants={itemVariants} className="text-xl text-gray-300 leading-relaxed max-w-md">
            {t('hero.subheadline')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex gap-4 pt-4">
            <Button
              variant="primary"
              size="lg"
              onClick={() => scrollToSection('contact')}
              className="group relative overflow-hidden"
            >
              <span className="relative z-10">{t('hero.cta')}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection('services')}
            >
              Learn More
            </Button>
          </motion.div>

          {/* Social Proof */}
          <motion.div variants={itemVariants} className="flex gap-8 pt-8 border-t border-dark-border/50">
            <div>
              <p className="text-2xl font-bold text-primary">150+</p>
              <p className="text-sm text-gray-400">Happy Clients</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">8+</p>
              <p className="text-sm text-gray-400">Years in Business</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">320%</p>
              <p className="text-sm text-gray-400">Avg ROI</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative h-96 lg:h-full min-h-96"
        >
          {/* IMAGE PROMPT: Confident female marketer working on laptop with analytics dashboards visible, modern aesthetic, dark theme with tech elements, professional environment */}
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl border border-primary/30 flex items-center justify-center relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-10 right-10 w-40 h-40 bg-primary rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-10 left-10 w-40 h-40 bg-accent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Placeholder text */}
            <div className="relative z-10 text-center space-y-4">
              <svg className="w-24 h-24 mx-auto text-primary opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-gray-400 text-sm max-w-xs">
                Professional Marketing Dashboard & Analytics
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
