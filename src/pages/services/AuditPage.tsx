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

const BEFORE = [
  'Overlapping audience segments',
  'No negative keyword list',
  'Missing conversion tracking',
  'Manual bidding only',
  'No creative A/B testing',
  'Wasted retargeting budget',
]

const AFTER = [
  'Precise exclusion audiences',
  '340+ negative keywords added',
  'Full funnel conversion events',
  'Smart bidding with ROAS targets',
  'Systematic creative rotation',
  'High-intent retargeting only',
]

export const AuditPage: React.FC = () => {
  const { t } = useTranslation()
  const benefits = t('services.benefits.audit', { returnObjects: true }) as string[]
  const details = t('services.details.audit')

  return (
    <PageShell>
      {/* Hero */}
      <section className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute w-[450px] h-[450px] rounded-full blur-[140px] opacity-15 bg-red-600 -top-32 right-0" />
          <div className="absolute w-[450px] h-[450px] rounded-full blur-[140px] opacity-15 bg-emerald-600 bottom-0 left-0" />
        </div>

        <div className="max-w-[1200px] mx-auto">
          <motion.div className="max-w-2xl mb-12" {...fadeUp()}>
            <Link to="/#services" onClick={() => { window.location.href = '/#services' }}
              className="inline-flex items-center gap-1.5 text-xs text-[color:var(--text-secondary)] hover:text-primary mb-8 transition-colors">
              {t('services_pages.backToServices')}
            </Link>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-6"
              style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', color: '#34d399' }}>
              Account Audit · Full Funnel Review
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-[color:var(--text-primary)] leading-[1.08] tracking-[-0.03em] mb-6">
              {details}
            </h1>
            <p className="text-lg text-[color:var(--text-secondary)] leading-relaxed mb-10">
              Most ad accounts leak 20–40% of budget on preventable issues. We find them all — and fix them.
            </p>
            <div className="flex gap-3 flex-wrap">
              <button onClick={() => { window.location.href = '/#contact' }}
                className="px-6 py-3 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #059669, #10b981)' }}>
                {t('services_pages.getStarted')}
              </button>
              <button onClick={() => { window.location.href = '/#contact' }}
                className="px-6 py-3 rounded-xl border border-surface text-sm font-semibold text-[color:var(--text-secondary)] hover:border-emerald-500 hover:text-emerald-400 transition-colors">
                {t('services_pages.freeAudit')}
              </button>
            </div>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-lg mb-16">
            {[
              { value: '2 weeks', label: 'Delivery time', color: '#34d399' },
              { value: '20+', label: 'Data points', color: '#60a5fa' },
              { value: '$0', label: 'Wasted after audit', color: '#34d399' },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-surface p-4 text-center"
                style={{ background: 'rgba(var(--surface-rgb), 0.7)' }}>
                <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
                <p className="text-xs text-[color:var(--text-secondary)] mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Before / After comparison */}
        <div className="max-w-[1200px] mx-auto">
          <motion.div {...fadeUp(0.1)}>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Before */}
              <div className="rounded-2xl border p-8"
                style={{ borderColor: 'rgba(239,68,68,0.25)', background: 'rgba(239,68,68,0.04)' }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-red-500/15 flex items-center justify-center">
                    <span className="text-red-400 text-sm font-bold">✗</span>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-red-400 font-semibold">Before Audit</p>
                    <p className="text-xs text-[color:var(--text-secondary)]">Typical account state</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {BEFORE.map((issue, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-red-500/20 flex-shrink-0 flex items-center justify-center text-red-400 text-xs">✗</span>
                      <span className="text-sm text-[color:var(--text-secondary)]">{issue}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-red-500/15">
                  <p className="text-sm font-semibold text-red-400">~30% budget wasted monthly</p>
                </div>
              </div>

              {/* After */}
              <div className="rounded-2xl border p-8"
                style={{ borderColor: 'rgba(16,185,129,0.25)', background: 'rgba(16,185,129,0.04)' }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/15 flex items-center justify-center">
                    <span className="text-emerald-400 text-sm font-bold">✓</span>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">After Audit</p>
                    <p className="text-xs text-[color:var(--text-secondary)]">Optimized and clean</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {AFTER.map((fix, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, x: 12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 + 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex-shrink-0 flex items-center justify-center text-emerald-400 text-xs">✓</span>
                      <span className="text-sm text-[color:var(--text-secondary)]">{fix}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-emerald-500/15">
                  <p className="text-sm font-semibold text-emerald-400">$0 wasted · +42% ROI improvement</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What's included */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface">
        <div className="max-w-[1000px] mx-auto">
          <motion.div className="mb-12" {...fadeUp()}>
            <p className="text-sm uppercase tracking-[0.32em] text-emerald-400 mb-3">{t('services_pages.included')}</p>
            <h2 className="text-3xl font-bold text-[color:var(--text-primary)]">What the audit covers</h2>
          </motion.div>
          <div className="grid sm:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <motion.div key={i} {...fadeUp(i * 0.1)}
                className="rounded-2xl border border-surface p-6"
                style={{ background: 'rgba(var(--surface-rgb), 0.7)' }}>
                <div className="w-8 h-8 rounded-lg mb-4 flex items-center justify-center bg-emerald-500/10">
                  <span className="text-sm font-bold text-emerald-400">{i + 1}</span>
                </div>
                <p className="text-sm text-[color:var(--text-secondary)] leading-relaxed">{b}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1000px] mx-auto">
          <motion.div className="mb-12" {...fadeUp()}>
            <p className="text-sm uppercase tracking-[0.32em] text-emerald-400 mb-3">{t('services_pages.howItWorks')}</p>
            <h2 className="text-3xl font-bold text-[color:var(--text-primary)]">From access to action plan in 2 weeks</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Account Access', desc: 'You grant read-only access to your ad accounts. No risk, no changes made yet.' },
              { step: '02', title: 'Deep Analysis', desc: '20+ data points reviewed: structure, creatives, audiences, conversions, budgets.' },
              { step: '03', title: 'Report Delivery', desc: 'Detailed PDF with findings, severity levels, and prioritized recommendations.' },
              { step: '04', title: 'Action Plan', desc: '60-minute walkthrough call to review findings and agree on implementation steps.' },
            ].map((s, i) => (
              <motion.div key={i} {...fadeUp(i * 0.1)}
                className="rounded-2xl border border-surface p-6"
                style={{ background: 'rgba(var(--surface-rgb), 0.6)' }}>
                <p className="text-3xl font-bold text-emerald-500/25 mb-4">{s.step}</p>
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
          <h2 className="text-3xl font-bold text-[color:var(--text-primary)] mb-4">Find out where your budget is going</h2>
          <p className="text-[color:var(--text-secondary)] mb-8">Free initial audit — no commitment, no changes to your account.</p>
          <button onClick={() => { window.location.href = '/#contact' }}
            className="px-8 py-4 rounded-xl text-white font-semibold text-sm hover:opacity-90 transition-opacity"
            style={{ background: 'linear-gradient(135deg, #059669, #10b981)' }}>
            {t('services_pages.freeAudit')} →
          </button>
        </motion.div>
      </section>
    </PageShell>
  )
}
