import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { PageShell } from '@/components/PageShell'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
  viewport: { once: true },
})

export const AboutPage: React.FC = () => {
  const { t } = useTranslation()

  const milestones = t('about.milestones', { returnObjects: true }) as { year: string; text: string }[]
  const valueItems = t('about.valueItems', { returnObjects: true }) as { title: string; desc: string }[]

  return (
    <PageShell>
      {/* Hero */}
      <section className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute w-[500px] h-[500px] rounded-full blur-[140px] bg-primary/8 -top-40 -right-40" />
          <div className="absolute w-[400px] h-[400px] rounded-full blur-[120px] bg-accent/6 bottom-0 -left-32" />
        </div>

        <div className="max-w-[1100px] mx-auto">
          <div className="grid lg:grid-cols-[1fr_400px] gap-16 items-center">
            <motion.div {...fadeUp()}>
              <p className="text-sm uppercase tracking-[0.32em] text-primary mb-4">{t('about.label')}</p>
              <h1 className="text-5xl lg:text-6xl font-bold text-[color:var(--text-primary)] leading-[1.05] tracking-[-0.03em] mb-6">
                {t('about.title')}
              </h1>
              <p className="text-xl text-[color:var(--text-secondary)] mb-4 leading-relaxed">
                {t('about.subtitle')}
              </p>
              <p className="text-base text-[color:var(--text-secondary)] leading-relaxed max-w-lg">
                {t('about.bio')}
              </p>

              <div className="grid grid-cols-3 gap-6 mt-10 pt-8 border-t border-surface max-w-sm">
                {[
                  { value: t('about.experience'), label: 'Experience' },
                  { value: t('about.clients'), label: 'Clients' },
                  { value: t('about.countries'), label: 'Countries' },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="text-2xl font-bold text-primary">{s.value}</p>
                    <p className="text-xs text-[color:var(--text-secondary)] mt-0.5 uppercase tracking-wide">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex gap-3">
                <Link
                  to="/#contact"
                  onClick={() => { window.location.href = '/#contact' }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  {t('about.cta')}
                </Link>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-surface text-sm font-semibold text-[color:var(--text-secondary)] hover:border-primary hover:text-primary transition-colors"
                >
                  ← Home
                </Link>
              </div>
            </motion.div>

            {/* Photo */}
            <motion.div {...fadeUp(0.15)} className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="w-72 h-80 lg:w-80 lg:h-96 rounded-3xl overflow-hidden border border-surface shadow-2xl">
                  <img
                    src="/mariana.jpg"
                    alt="Mariana Leus — Paid Ads Specialist"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                {/* Floating badge */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-4 -left-6 rounded-2xl border border-surface px-4 py-3 shadow-xl"
                  style={{ background: 'rgba(var(--surface-rgb), 0.95)', backdropFilter: 'blur(16px)' }}
                >
                  <p className="text-xs text-[color:var(--text-secondary)]">Average client ROI</p>
                  <p className="text-xl font-bold text-primary">320%</p>
                </motion.div>
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                  className="absolute -top-4 -right-6 rounded-2xl border border-surface px-4 py-3 shadow-xl"
                  style={{ background: 'rgba(var(--surface-rgb), 0.95)', backdropFilter: 'blur(16px)' }}
                >
                  <p className="text-xs text-[color:var(--text-secondary)]">Happy clients</p>
                  <p className="text-xl font-bold text-emerald-500">150+</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface">
        <div className="max-w-[800px] mx-auto">
          <motion.div className="mb-14" {...fadeUp()}>
            <p className="text-sm uppercase tracking-[0.32em] text-primary mb-3">{t('about.journey')}</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-[color:var(--text-primary)]">My Journey</h2>
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-primary/20 to-transparent" />

            <div className="space-y-10">
              {milestones.map((m, i) => (
                <motion.div key={i} {...fadeUp(i * 0.08)} className="flex gap-6">
                  <div className="flex-shrink-0 w-6 flex flex-col items-center pt-1">
                    <div className="w-[22px] h-[22px] rounded-full border-2 border-primary bg-primary/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                  </div>
                  <div className="pb-2">
                    <p className="text-sm font-bold text-primary mb-1">{m.year}</p>
                    <p className="text-[color:var(--text-secondary)] leading-relaxed">{m.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1100px] mx-auto">
          <motion.div className="text-center mb-14" {...fadeUp()}>
            <p className="text-sm uppercase tracking-[0.32em] text-primary mb-3">{t('about.values')}</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-[color:var(--text-primary)]">What I Stand For</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {valueItems.map((v, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.1)}
                className="rounded-2xl border border-surface p-8"
                style={{ background: 'rgba(var(--surface-rgb), 0.6)', backdropFilter: 'blur(12px)' }}
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5">
                  <span className="text-primary font-bold text-lg">{i + 1}</span>
                </div>
                <h3 className="text-lg font-semibold text-[color:var(--text-primary)] mb-2">{v.title}</h3>
                <p className="text-[color:var(--text-secondary)] leading-relaxed text-sm">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface">
        <motion.div className="max-w-xl mx-auto text-center" {...fadeUp()}>
          <h2 className="text-3xl font-bold text-[color:var(--text-primary)] mb-4">{t('about.cta')}</h2>
          <p className="text-[color:var(--text-secondary)] mb-8">
            Ready to turn your ad budget into predictable revenue? Let's talk.
          </p>
          <button
            onClick={() => { window.location.href = '/#contact' }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-white font-semibold hover:opacity-90 transition-opacity"
          >
            Get in touch →
          </button>
        </motion.div>
      </section>
    </PageShell>
  )
}
