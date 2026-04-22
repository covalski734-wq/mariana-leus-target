import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { PageShell } from '@/components/PageShell'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] },
  viewport: { once: true },
})

const ScoreCircle: React.FC<{ label: string; score: number; color: string; delay: number }> = ({ label, score, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.7 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    className="flex flex-col items-center gap-2"
  >
    <div className="relative w-16 h-16">
      <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(var(--surface-strong-rgb),1)" strokeWidth="5" />
        <circle cx="32" cy="32" r="26" fill="none" stroke={color} strokeWidth="5"
          strokeDasharray={`${(score / 100) * 163.4} 163.4`} strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-bold text-[color:var(--text-primary)]">{score}</span>
      </div>
    </div>
    <p className="text-[10px] text-[color:var(--text-secondary)] text-center leading-tight">{label}</p>
  </motion.div>
)

const BrowserMock: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 24, scale: 0.96 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
    className="rounded-2xl border border-surface shadow-2xl overflow-hidden"
    style={{ background: 'rgba(var(--surface-rgb), 0.92)' }}
  >
    {/* Browser chrome */}
    <div className="h-9 flex items-center gap-1.5 px-3 border-b border-surface"
      style={{ background: 'rgba(var(--surface-strong-rgb), 0.9)' }}>
      <div className="w-3 h-3 rounded-full bg-red-400/80" />
      <div className="w-3 h-3 rounded-full bg-amber-400/80" />
      <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
      <div className="ml-2 flex-1 rounded-md px-3 py-1 text-[10px] text-[color:var(--text-secondary)]"
        style={{ background: 'rgba(var(--surface-rgb), 0.8)' }}>
        beautybrand.com
      </div>
      <div className="w-4 h-4 rounded-sm opacity-40">
        <svg viewBox="0 0 16 16" fill="currentColor" className="text-[color:var(--text-secondary)]">
          <path d="M8 1a7 7 0 100 14A7 7 0 008 1zM0 8a8 8 0 1116 0A8 8 0 010 8z" />
        </svg>
      </div>
    </div>
    {/* Page preview */}
    <div className="p-4 space-y-3" style={{ background: 'linear-gradient(to bottom, rgba(var(--surface-strong-rgb),0.5), transparent)' }}>
      {/* Nav bar */}
      <div className="flex items-center justify-between">
        <div className="h-3 w-16 rounded-sm" style={{ background: 'rgba(var(--primary-rgb),0.3)' }} />
        <div className="flex gap-2">
          {[1, 2, 3].map(i => <div key={i} className="h-2 w-8 rounded-sm bg-surface-strong" />)}
        </div>
      </div>
      {/* Hero content */}
      <div className="pt-2 space-y-2">
        <div className="h-5 w-3/4 rounded-sm" style={{ background: 'rgba(var(--text-rgb),0.12)' }} />
        <div className="h-3 w-full rounded-sm bg-surface-strong" />
        <div className="h-3 w-4/5 rounded-sm bg-surface-strong" />
        <div className="mt-3 flex gap-2">
          <div className="h-7 w-24 rounded-lg" style={{ background: 'rgba(var(--primary-rgb),0.7)' }} />
          <div className="h-7 w-20 rounded-lg border border-surface" />
        </div>
      </div>
      {/* Cards row */}
      <div className="flex gap-2 pt-2">
        {[1, 2, 3].map(i => (
          <div key={i} className="flex-1 h-12 rounded-lg border border-surface"
            style={{ background: 'rgba(var(--surface-strong-rgb),0.6)' }} />
        ))}
      </div>
    </div>
    {/* Lighthouse scores */}
    <div className="px-4 pb-5 border-t border-surface pt-4">
      <p className="text-[9px] uppercase tracking-[0.2em] text-[color:var(--text-secondary)] mb-3">Lighthouse</p>
      <div className="flex justify-around">
        <ScoreCircle label="Performance" score={98} color="#34d399" delay={0.45} />
        <ScoreCircle label="SEO" score={100} color="#34d399" delay={0.55} />
        <ScoreCircle label="Accessibility" score={95} color="#34d399" delay={0.65} />
        <ScoreCircle label="Best Practices" score={96} color="#fbbf24" delay={0.75} />
      </div>
    </div>
  </motion.div>
)

export const WebDevPage: React.FC = () => {
  const { t } = useTranslation()
  const benefits = t('services.benefits.webDev', { returnObjects: true }) as string[]
  const details = t('services.details.webDev')

  return (
    <PageShell>
      {/* Hero */}
      <section className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
        {/* Subtle grid background */}
        <div className="absolute inset-0 -z-10 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: 'linear-gradient(rgba(var(--text-rgb),1) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--text-rgb),1) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }} />
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute w-[500px] h-[500px] rounded-full blur-[150px] opacity-15 bg-cyan-500 -top-40 right-0" />
          <div className="absolute w-[400px] h-[400px] rounded-full blur-[120px] opacity-12 bg-blue-600 bottom-0 left-0" />
        </div>

        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
          <motion.div {...fadeUp()}>
            <Link to="/#services" onClick={() => { window.location.href = '/#services' }}
              className="inline-flex items-center gap-1.5 text-xs text-[color:var(--text-secondary)] hover:text-primary mb-8 transition-colors">
              {t('services_pages.backToServices')}
            </Link>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-6"
              style={{ background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.3)', color: '#22d3ee' }}>
              Landing Pages · Funnels · Performance
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-[color:var(--text-primary)] leading-[1.08] tracking-[-0.03em] mb-6">
              {details}
            </h1>
            <p className="text-lg text-[color:var(--text-secondary)] leading-relaxed mb-10 max-w-lg">
              Pages that load in under 2 seconds, score 95+ on Lighthouse, and convert ad traffic into revenue.
            </p>

            <div className="grid grid-cols-3 gap-4 mb-10">
              {[
                { value: '2.1s', label: 'Avg. Load Time', color: '#22d3ee' },
                { value: '98', label: 'Lighthouse Score', color: '#34d399' },
                { value: '+38%', label: 'Conversion Lift', color: '#a78bfa' },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl border border-surface p-4 text-center"
                  style={{ background: 'rgba(var(--surface-rgb), 0.7)' }}>
                  <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
                  <p className="text-xs text-[color:var(--text-secondary)] mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-3 flex-wrap">
              <button onClick={() => { window.location.href = '/#contact' }}
                className="px-6 py-3 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #0891b2, #6366f1)' }}>
                {t('services_pages.getStarted')}
              </button>
              <button onClick={() => { window.location.href = '/#contact' }}
                className="px-6 py-3 rounded-xl border border-surface text-sm font-semibold text-[color:var(--text-secondary)] hover:border-cyan-500 hover:text-cyan-400 transition-colors">
                {t('services_pages.freeAudit')}
              </button>
            </div>
          </motion.div>

          <div className="hidden lg:block">
            <BrowserMock />
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface">
        <div className="max-w-[1000px] mx-auto">
          <motion.div className="mb-12" {...fadeUp()}>
            <p className="text-sm uppercase tracking-[0.32em] text-cyan-400 mb-3">{t('services_pages.included')}</p>
            <h2 className="text-3xl font-bold text-[color:var(--text-primary)]">Built for ad performance</h2>
          </motion.div>
          <div className="grid sm:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <motion.div key={i} {...fadeUp(i * 0.1)}
                className="rounded-2xl border border-surface p-6"
                style={{ background: 'rgba(var(--surface-rgb), 0.7)' }}>
                <div className="w-8 h-8 rounded-lg mb-4 flex items-center justify-center bg-cyan-500/10">
                  <span className="text-sm font-bold text-cyan-400">{i + 1}</span>
                </div>
                <p className="text-sm text-[color:var(--text-secondary)] leading-relaxed">{b}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1000px] mx-auto">
          <motion.div className="mb-12" {...fadeUp()}>
            <p className="text-sm uppercase tracking-[0.32em] text-cyan-400 mb-3">{t('services_pages.howItWorks')}</p>
            <h2 className="text-3xl font-bold text-[color:var(--text-primary)]">From brief to live in 3–4 weeks</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Discovery', desc: 'Define your audience, conversion goal, offer, and ad traffic source before touching a pixel.' },
              { step: '02', title: 'Design', desc: 'Mobile-first wireframe and design — built around user flow, not just aesthetics.' },
              { step: '03', title: 'Development', desc: 'Fast, clean code with pixel-perfect implementation, analytics tagging, and form integrations.' },
              { step: '04', title: 'Launch & Track', desc: 'Go live with full conversion tracking. A/B test readiness built in from day one.' },
            ].map((s, i) => (
              <motion.div key={i} {...fadeUp(i * 0.1)}
                className="rounded-2xl border border-surface p-6"
                style={{ background: 'rgba(var(--surface-rgb), 0.6)' }}>
                <p className="text-3xl font-bold text-cyan-500/25 mb-4">{s.step}</p>
                <h3 className="text-base font-semibold text-[color:var(--text-primary)] mb-2">{s.title}</h3>
                <p className="text-sm text-[color:var(--text-secondary)] leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface">
        <motion.div className="max-w-xl mx-auto text-center" {...fadeUp()}>
          <h2 className="text-3xl font-bold text-[color:var(--text-primary)] mb-4">Get a landing page that converts</h2>
          <p className="text-[color:var(--text-secondary)] mb-8">Built around your ads, your audience, and your offer — not a template.</p>
          <button onClick={() => { window.location.href = '/#contact' }}
            className="px-8 py-4 rounded-xl text-white font-semibold text-sm hover:opacity-90 transition-opacity"
            style={{ background: 'linear-gradient(135deg, #0891b2, #6366f1)' }}>
            {t('services_pages.getStarted')} →
          </button>
        </motion.div>
      </section>
    </PageShell>
  )
}
