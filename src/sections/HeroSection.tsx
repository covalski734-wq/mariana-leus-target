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
        staggerChildren: 0.15,
        delayChildren: 0.08,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="pt-16 pb-20 px-4 sm:px-6 lg:px-8 lg:pt-28 bg-gradient-to-b from-[rgba(var(--bg-rgb),0.94)] to-[rgba(var(--surface-rgb),0.72)] relative overflow-hidden">
      {/* Animated background glow */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl opacity-25 animate-pulse" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-15 animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="max-w-[1440px] mx-auto grid gap-8 lg:gap-12 lg:grid-cols-2 lg:items-center overflow-hidden relative z-10">
        {/* Left Content */}
        <motion.div
          className="space-y-5 sm:space-y-6 lg:space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Urgency Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-3 py-2 sm:px-4 sm:py-2 w-fit">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            <span className="text-xs sm:text-sm text-primary font-medium">{t('hero.urgency')}</span>
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[color:var(--text-primary)] leading-tight tracking-[-0.02em]">
            {t('hero.headline')}
          </motion.h1>

          {/* Subheadline */}
          <motion.p variants={itemVariants} className="text-base sm:text-lg lg:text-xl text-[color:var(--text-secondary)] leading-relaxed max-w-2xl">
            {t('hero.subheadline')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 pt-2 lg:pt-4">
            <Button
              variant="primary"
              size="lg"
              onClick={() => scrollToSection('contact')}
              className="w-full sm:w-auto group relative overflow-hidden"
            >
              <span className="relative z-10">{t('hero.cta')}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection('services')}
              className="w-full sm:w-auto"
            >
              Learn More
            </Button>
          </motion.div>

          {/* Social Proof */}
          <motion.div variants={itemVariants} className="hidden sm:grid grid-cols-3 gap-4 lg:gap-8 pt-6 lg:pt-8 border-t border-surface/30">
            <div>
              <p className="text-xl sm:text-2xl font-bold text-primary">150+</p>
              <p className="text-xs sm:text-sm text-[color:var(--text-secondary)]">Happy Clients</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-primary">8+</p>
              <p className="text-xs sm:text-sm text-[color:var(--text-secondary)]">Years Experience</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-primary">320%</p>
              <p className="text-xs sm:text-sm text-[color:var(--text-secondary)]">Avg ROI</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          className="relative h-72 sm:h-80 lg:h-full lg:min-h-[500px] -mx-4 sm:mx-0 lg:mx-0"
        >
          {/* IMAGE PROMPT: Confident female marketer working on laptop with analytics dashboards visible, modern aesthetic, dark theme with tech elements, professional environment */}
          <div className="w-full h-full bg-gradient-to-br from-primary/12 via-accent/5 to-primary/8 rounded-2xl lg:rounded-3xl border border-primary/25 flex items-center justify-center relative overflow-hidden shadow-lg lg:shadow-xl">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-40 lg:opacity-30">
              <div className="absolute -top-20 -right-20 w-56 h-56 lg:w-72 lg:h-72 bg-primary rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
              <div className="absolute -bottom-16 -left-16 w-64 h-64 lg:w-80 lg:h-80 bg-accent rounded-full blur-3xl opacity-50 animate-pulse\" style={{ animationDelay: '2.5s', animationDuration: '5s' }} />
            </div>

            {/* Placeholder text */}
            <div className="relative z-10 text-center space-y-3 sm:space-y-4 px-6">
              <svg className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto text-primary opacity-70" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <p className="text-sm sm:text-base text-[color:var(--text-secondary)] max-w-xs leading-relaxed">
                Professional Marketing Dashboard & Analytics
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
