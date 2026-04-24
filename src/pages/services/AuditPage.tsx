import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Error as ErrorIcon, Warning, CheckCircle, ArrowForward } from '@mui/icons-material'
import { PageShell } from '@/components/PageShell'

const SCAN_ISSUES = [
  { text: 'Overlapping audience segments', level: 'high' as const },
  { text: 'No conversion tracking installed', level: 'high' as const },
  { text: 'Zero negative keywords in campaigns', level: 'medium' as const },
  { text: 'No A/B creative test active', level: 'medium' as const },
  { text: 'Manual bidding — no Smart Bidding', level: 'low' as const },
]

const ScannerVisual: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [scanPct, setScanPct] = useState(0)
  const [issueCount, setIssueCount] = useState(0)
  const [scanDone, setScanDone] = useState(false)

  useEffect(() => {
    if (!inView) return
    const t0 = performance.now()
    const dur = 2000
    const tick = (now: number) => {
      const p = Math.min((now - t0) / dur, 1)
      setScanPct(Math.round(p * 100))
      if (p < 1) {
        requestAnimationFrame(tick)
      } else {
        setScanDone(true)
        SCAN_ISSUES.forEach((_, i) =>
          setTimeout(() => setIssueCount((c) => c + 1), i * 260 + 100)
        )
      }
    }
    requestAnimationFrame(tick)
  }, [inView])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.3 }}
      className="rounded-2xl border border-surface p-5 shadow-2xl"
      style={{ background: 'rgba(var(--surface-rgb),0.96)' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-[color:var(--text-secondary)]">Account Diagnostic</p>
          <p className="text-sm font-semibold text-[color:var(--text-primary)] mt-0.5">Ad Account Analysis</p>
        </div>
        {!scanDone ? (
          <span className="flex items-center gap-1.5 text-amber-400 text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Scanning {scanPct}%
          </span>
        ) : (
          <span className="flex items-center gap-1 text-red-400 text-xs font-bold">
            <ErrorIcon sx={{ fontSize: 14 }} />
            {SCAN_ISSUES.length} issues found
          </span>
        )}
      </div>

      {/* Progress bar */}
      <div className="h-1.5 rounded-full mb-5 overflow-hidden" style={{ background: 'rgba(var(--surface-strong-rgb),1)' }}>
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: `${scanPct}%` }}
          className="h-full rounded-full transition-colors duration-500"
          style={{ background: scanDone ? '#f87171' : '#fbbf24' }}
        />
      </div>

      {/* Issues list */}
      <div className="space-y-2" style={{ minHeight: 170 }}>
        {SCAN_ISSUES.slice(0, issueCount).map((issue, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-surface"
            style={{ background: 'rgba(var(--surface-strong-rgb),0.5)' }}
          >
            {issue.level === 'high'
              ? <ErrorIcon sx={{ fontSize: 15, color: '#f87171' }} />
              : <Warning sx={{ fontSize: 15, color: '#fbbf24' }} />
            }
            <span className="text-xs text-[color:var(--text-secondary)] flex-1 leading-snug">{issue.text}</span>
            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${
              issue.level === 'high'
                ? 'bg-red-500/10 text-red-400'
                : issue.level === 'medium'
                ? 'bg-amber-500/10 text-amber-400'
                : 'bg-blue-500/10 text-blue-400'
            }`}>
              {issue.level}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Health score reveal */}
      {issueCount >= SCAN_ISSUES.length && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-4 pt-4 border-t border-surface"
        >
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-[color:var(--text-secondary)]">Account Health Score</span>
            <span className="text-red-400 font-bold">32 / 100</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(var(--surface-strong-rgb),1)' }}>
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '32%' }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="h-full rounded-full bg-gradient-to-r from-red-500 to-amber-400"
            />
          </div>
          <div className="flex items-center gap-1.5 mt-3">
            <CheckCircle sx={{ fontSize: 13, color: '#34d399' }} />
            <p className="text-[10px] text-emerald-400 font-semibold">After audit — target score: 87+</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

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

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } }
const fadeItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

export const AuditPage: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const benefits = t('services.benefits.audit', { returnObjects: true }) as string[]
  const details = t('services.details.audit')

  const go = (id: string) => { sessionStorage.setItem('scrollTarget', id); navigate('/') }

  return (
    <PageShell>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute -top-32 -right-16 w-[440px] h-[440px] rounded-full blur-[130px] opacity-20 bg-red-600" />
          <div className="absolute -bottom-20 -left-10 w-[380px] h-[380px] rounded-full blur-[120px] opacity-15 bg-emerald-600" />
        </div>

        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-14 items-center">
          {/* LEFT */}
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.button variants={fadeItem}
              onClick={() => go('services')}
              className="text-xs text-[color:var(--text-secondary)] hover:text-primary mb-7 flex items-center gap-1 transition-colors">
              {t('services_pages.backToServices')}
            </motion.button>

            <motion.span variants={fadeItem}
              className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
              style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', color: '#34d399' }}>
              Account Audit · Full Funnel Review
            </motion.span>

            <motion.h1 variants={fadeItem}
              className="text-4xl lg:text-5xl xl:text-6xl font-bold text-[color:var(--text-primary)] leading-[1.06] tracking-[-0.03em] mb-5">
              {details}
            </motion.h1>

            <motion.p variants={fadeItem}
              className="text-lg text-[color:var(--text-secondary)] leading-relaxed mb-8 max-w-lg">
              Most ad accounts leak 20–40% of budget on preventable issues. We find them all — and fix them.
            </motion.p>

            <motion.div variants={fadeItem} className="grid grid-cols-3 gap-3 mb-8">
              {[
                { value: '2 weeks', label: 'Delivery time', color: '#34d399' },
                { value: '20+', label: 'Data points', color: '#60a5fa' },
                { value: '$0', label: 'Wasted after', color: '#34d399' },
              ].map(s => (
                <div key={s.label} className="rounded-2xl border border-surface p-4 text-center"
                  style={{ background: 'rgba(var(--surface-rgb),0.7)' }}>
                  <p className="text-xl font-bold" style={{ color: s.color }}>{s.value}</p>
                  <p className="text-xs text-[color:var(--text-secondary)] mt-1">{s.label}</p>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeItem} className="flex gap-3 flex-wrap">
              <button onClick={() => go('contact')}
                className="px-6 py-3 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                style={{ background: 'linear-gradient(135deg,#059669,#10b981)' }}>
                {t('services_pages.getStarted')}
              </button>
              <button onClick={() => go('contact')}
                className="px-6 py-3 rounded-xl border border-surface text-sm font-semibold text-[color:var(--text-secondary)] hover:border-emerald-500 hover:text-emerald-400 transition-colors">
                {t('services_pages.freeAudit')}
              </button>
            </motion.div>
          </motion.div>

          {/* RIGHT — animated scanner */}
          <div className="hidden lg:block">
            <ScannerVisual />
          </div>
        </div>
      </section>

      {/* ── BEFORE / AFTER ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface">
        <div className="max-w-[1000px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <p className="text-xs uppercase tracking-[0.32em] text-emerald-400 mb-3">The difference</p>
            <h2 className="text-3xl font-bold text-[color:var(--text-primary)]">Before vs After the audit</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-5">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="rounded-2xl border p-7"
              style={{ borderColor: 'rgba(248,113,113,0.25)', background: 'rgba(248,113,113,0.04)' }}>
              <div className="flex items-center gap-2 mb-5">
                <ErrorIcon sx={{ fontSize: 18, color: '#f87171' }} />
                <p className="text-xs font-bold uppercase tracking-wider text-red-400">Before Audit</p>
              </div>
              <div className="space-y-3">
                {BEFORE.map((b, i) => (
                  <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                    transition={{ delay: i * 0.06 }} viewport={{ once: true }}
                    className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-red-500/15 flex items-center justify-center shrink-0">
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path d="M1 1l6 6M7 1L1 7" stroke="#f87171" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </span>
                    <span className="text-sm text-[color:var(--text-secondary)]">{b}</span>
                  </motion.div>
                ))}
              </div>
              <p className="text-xs text-red-400 font-semibold mt-5 pt-4 border-t border-red-500/15">~30% budget wasted monthly</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="rounded-2xl border p-7"
              style={{ borderColor: 'rgba(52,211,153,0.25)', background: 'rgba(52,211,153,0.04)' }}>
              <div className="flex items-center gap-2 mb-5">
                <CheckCircle sx={{ fontSize: 18, color: '#34d399' }} />
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">After Audit</p>
              </div>
              <div className="space-y-3">
                {AFTER.map((a, i) => (
                  <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                    transition={{ delay: i * 0.06 }} viewport={{ once: true }}
                    className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/15 flex items-center justify-center shrink-0">
                      <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                        <path d="M1 3.5L3.5 6L8 1" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <span className="text-sm text-[color:var(--text-secondary)]">{a}</span>
                  </motion.div>
                ))}
              </div>
              <p className="text-xs text-emerald-400 font-semibold mt-5 pt-4 border-t border-emerald-500/15">$0 wasted · +42% ROI improvement</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1000px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <p className="text-xs uppercase tracking-[0.32em] text-emerald-400 mb-3">{t('services_pages.included')}</p>
            <h2 className="text-3xl font-bold text-[color:var(--text-primary)]">What the audit covers</h2>
          </motion.div>
          <div className="grid sm:grid-cols-3 gap-5">
            {benefits.map((b, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                className="rounded-2xl border border-surface p-6" style={{ background: 'rgba(var(--surface-rgb),0.7)' }}>
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
                  <CheckCircle sx={{ fontSize: 18, color: '#34d399' }} />
                </div>
                <p className="text-sm text-[color:var(--text-secondary)] leading-relaxed">{b}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface">
        <div className="max-w-[1000px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <p className="text-xs uppercase tracking-[0.32em] text-emerald-400 mb-3">{t('services_pages.howItWorks')}</p>
            <h2 className="text-3xl font-bold text-[color:var(--text-primary)]">From access to action plan in 2 weeks</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { n: '01', title: 'Account Access', desc: 'Read-only access to your ad accounts. No changes made yet, no risk.' },
              { n: '02', title: 'Deep Analysis', desc: '20+ data points reviewed: structure, creatives, audiences, tracking, budgets.' },
              { n: '03', title: 'Report Delivery', desc: 'Detailed report with findings, severity levels, and prioritized action items.' },
              { n: '04', title: 'Strategy Call', desc: '60-minute walkthrough to review findings and agree on the implementation plan.' },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                className="rounded-2xl border border-surface p-6" style={{ background: 'rgba(var(--surface-rgb),0.6)' }}>
                <p className="text-3xl font-bold mb-4" style={{ color: 'rgba(52,211,153,0.25)' }}>{s.n}</p>
                <h3 className="text-sm font-semibold text-[color:var(--text-primary)] mb-2">{s.title}</h3>
                <p className="text-sm text-[color:var(--text-secondary)] leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div className="max-w-xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl font-bold text-[color:var(--text-primary)] mb-4">Find out where your budget goes</h2>
          <p className="text-[color:var(--text-secondary)] mb-8">Free initial audit — no commitment, zero changes to your account.</p>
          <button onClick={() => go('contact')}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-semibold hover:opacity-90 transition-opacity"
            style={{ background: 'linear-gradient(135deg,#059669,#10b981)' }}>
            {t('services_pages.freeAudit')} <ArrowForward sx={{ fontSize: 18 }} />
          </button>
        </motion.div>
      </section>
    </PageShell>
  )
}
