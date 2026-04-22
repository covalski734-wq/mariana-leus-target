import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/Button'

interface MetricCardProps {
  label: string
  value: string
  change: string
  positive?: boolean
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, change, positive = true }) => (
  <div
    className="rounded-xl p-3 flex-1"
    style={{ background: 'rgba(var(--surface-strong-rgb), 0.9)' }}
  >
    <p className="text-xs text-[color:var(--text-secondary)]">{label}</p>
    <p className="text-xl font-bold text-[color:var(--text-primary)] mt-0.5">{value}</p>
    <p className={`text-xs font-semibold mt-0.5 ${positive ? 'text-emerald-500' : 'text-red-400'}`}>
      {change}
    </p>
  </div>
)

export const HeroSection: React.FC = () => {
  const { t } = useTranslation()

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  const stats = t('hero.stats', { returnObjects: true }) as Record<
    string,
    { value: string; label: string }
  >

  return (
    <section className="relative overflow-hidden px-4 pt-20 pb-20 sm:px-6 lg:px-8 lg:pt-32 lg:pb-28">

      {/* Background orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute w-[600px] h-[600px] bg-primary/10 blur-[140px] rounded-full top-[-180px] left-[-160px] animate-float1" />
        <div className="absolute w-[450px] h-[450px] bg-accent/10 blur-[120px] rounded-full bottom-[-120px] right-[-120px] animate-float2" />
      </div>

      <div className="max-w-[1200px] mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-7"
        >

          {/* Scarcity badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full text-sm text-primary">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            {t('hero.urgency')}
          </div>

          {/* Headline */}
          <h1 className="text-[2.75rem] sm:text-5xl lg:text-6xl font-semibold leading-[1.06] tracking-[-0.03em] text-[color:var(--text-primary)]">
            {t('hero.headlinePart1')}<br />
            <span className="text-primary">{t('hero.headlineAccent')}</span><br />
            {t('hero.headlinePart2')}
          </h1>

          {/* Sub-headline */}
          <p className="text-lg text-[color:var(--text-secondary)] max-w-lg leading-relaxed">
            {t('hero.subheadline')}
          </p>

          {/* CTA row */}
          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <Button
              variant="primary"
              size="lg"
              onClick={() => scrollToSection('contact')}
              className="w-full sm:w-auto"
            >
              {t('hero.ctaPrimary')}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection('services')}
              className="w-full sm:w-auto"
            >
              {t('hero.ctaSecondary')}
            </Button>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-6 pt-5 border-t border-surface max-w-md">
            {Object.values(stats).map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-bold text-primary">{s.value}</p>
                <p className="text-sm text-[color:var(--text-secondary)] mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT — Campaign performance dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative hidden lg:block"
        >
          <div
            className="relative rounded-2xl border border-surface p-6 shadow-2xl overflow-hidden"
            style={{ background: 'rgba(var(--surface-rgb), 0.78)', backdropFilter: 'blur(20px)' }}
          >
            <div className="absolute inset-0 pointer-events-none opacity-20 animate-gradientMove bg-[linear-gradient(120deg,transparent,rgba(0,74,173,0.3),transparent)]" />

            <div className="relative space-y-5">

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--text-secondary)]">
                    Campaign Performance
                  </p>
                  <p className="text-base font-semibold text-[color:var(--text-primary)] mt-0.5">
                    Beauty Brand · Meta + Google
                  </p>
                </div>
                <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/25 rounded-full px-3 py-1">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-emerald-500 text-xs font-semibold">Live</span>
                </div>
              </div>

              <div className="flex gap-3">
                <MetricCard label="ROAS" value="4.2x" change="↑ +18% this week" positive />
                <MetricCard label="CPA" value="$12.40" change="↓ −34% vs last mo." positive />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-[color:var(--text-secondary)]">Weekly Revenue</p>
                  <p className="text-xs font-semibold text-primary">+$18,400 · ↑28%</p>
                </div>
                <div className="h-[72px] flex items-end gap-1.5">
                  {[38, 52, 45, 68, 61, 79, 92].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t animate-bar"
                      style={{
                        height: `${h}%`,
                        background: `rgba(var(--primary-rgb), ${0.22 + i * 0.09})`,
                        animationDelay: `${i * 0.12}s`,
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <span className="text-xs text-[color:var(--text-secondary)]">Platforms:</span>
                <span className="text-xs font-medium bg-primary/10 border border-primary/20 text-primary px-2.5 py-0.5 rounded-full">
                  Meta Ads
                </span>
                <span className="text-xs font-medium bg-accent/10 border border-accent/20 text-accent px-2.5 py-0.5 rounded-full">
                  Google Ads
                </span>
              </div>
            </div>
          </div>

          {/* Floating leads card */}
          <motion.div
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-5 -left-7 rounded-xl border border-surface p-3.5 shadow-xl"
            style={{ background: 'rgba(var(--surface-rgb), 0.92)', backdropFilter: 'blur(14px)' }}
          >
            <p className="text-xs text-[color:var(--text-secondary)]">Leads this week</p>
            <p className="text-xl font-bold text-[color:var(--text-primary)] mt-0.5">
              147{' '}
              <span className="text-sm text-emerald-500 font-semibold">+41%</span>
            </p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
