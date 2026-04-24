import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ManageSearch, BarChart, TrendingDown, CheckCircle, ArrowForward } from '@mui/icons-material'
import { PageShell } from '@/components/PageShell'

const KEYWORDS = [
  { text: 'buy marketing services online', intent: 'Transactional', cpc: '$2.40', color: '#22d3ee' },
  { text: 'best Google Ads specialist', intent: 'Commercial', cpc: '$1.85', color: '#60a5fa' },
  { text: 'Facebook ads agency for ecommerce', intent: 'Commercial', cpc: '$1.60', color: '#a78bfa' },
  { text: 'how to reduce ad spend waste', intent: 'Informational', cpc: '$0.55', color: '#34d399' },
  { text: 'increase ROAS Google Ads', intent: 'Informational', cpc: '$0.80', color: '#fbbf24' },
  { text: 'Google Ads management pricing', intent: 'Transactional', cpc: '$3.10', color: '#f472b6' },
]

const CAMPAIGN_TYPES = [
  {
    Icon: ManageSearch,
    title: 'Search Campaigns',
    desc: 'Capture high-intent buyers exactly when they search. Optimized headlines, keyword match types, and Quality Score management.',
    span: 'lg:col-span-2',
    accent: '#60a5fa',
  },
  {
    Icon: BarChart,
    title: 'Display & Remarketing',
    desc: 'Stay visible across 2M+ websites. Re-engage visitors who didn\'t convert.',
    span: '',
    accent: '#a78bfa',
  },
  {
    Icon: TrendingDown,
    title: 'Smart Bidding',
    desc: 'Target CPA and Target ROAS strategies that automatically maximize conversions.',
    span: '',
    accent: '#34d399',
  },
  {
    Icon: ManageSearch,
    title: 'YouTube Ads',
    desc: 'Video ad campaigns on YouTube — skippable, non-skippable, and bumper formats tuned for your funnel.',
    span: 'lg:col-span-2',
    accent: '#f87171',
  },
]

function useCounter(end: number, duration: number, active: boolean) {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!active) return
    const t0 = performance.now()
    const r = (now: number) => {
      const p = Math.min((now - t0) / duration, 1)
      setV(Math.round((1 - Math.pow(1 - p, 3)) * end))
      if (p < 1) requestAnimationFrame(r)
    }
    requestAnimationFrame(r)
  }, [end, duration, active])
  return v
}

export const GoogleAdsPage: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const benefits = t('services.benefits.googleAds', { returnObjects: true }) as string[]
  const details = t('services.details.googleAds')

  const [visibleCount, setVisibleCount] = useState(0)
  const kwRef = useRef<HTMLDivElement>(null)
  const kwInView = useInView(kwRef, { once: true, margin: '-60px' })

  const statsRef = useRef<HTMLDivElement>(null)
  const statsInView = useInView(statsRef, { once: true })
  const ctr = useCounter(84, 1400, statsInView)
  const qs = useCounter(9, 1200, statsInView)
  const cpc = useCounter(41, 1400, statsInView)

  useEffect(() => {
    if (!kwInView) return
    let i = 0
    const id = setInterval(() => {
      i++
      setVisibleCount(i)
      if (i >= KEYWORDS.length) clearInterval(id)
    }, 280)
    return () => clearInterval(id)
  }, [kwInView])

  const go = (id: string) => { sessionStorage.setItem('scrollTarget', id); navigate('/') }

  return (
    <PageShell>
      {/* ── HERO — CENTERED FULL-WIDTH ── */}
      <section className="relative overflow-hidden py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-[160px]"
            style={{ background: 'rgba(59,130,246,0.12)' }} />
        </div>

        <div className="max-w-[860px] mx-auto text-center">
          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            onClick={() => go('services')}
            className="text-xs text-[color:var(--text-secondary)] hover:text-primary mb-8 flex items-center gap-1 mx-auto transition-colors">
            {t('services_pages.backToServices')}
          </motion.button>

          <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
            style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)', color: '#60a5fa' }}>
            Google Search · Display · YouTube · Shopping
          </motion.span>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="text-4xl lg:text-6xl font-bold text-[color:var(--text-primary)] leading-[1.06] tracking-[-0.03em] mb-6">
            {details}
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-lg text-[color:var(--text-secondary)] leading-relaxed max-w-2xl mx-auto mb-10">
            We target users at the exact moment of intent — turning searches into leads and leads into revenue.
          </motion.p>

          {/* Stats */}
          <motion.div ref={statsRef} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="inline-grid grid-cols-3 gap-4 mb-10">
            {[
              { value: `${ctr / 10}%`, label: 'Avg. CTR', color: '#60a5fa' },
              { value: `${qs}/10`, label: 'Quality Score', color: '#34d399' },
              { value: `−${cpc}%`, label: 'CPC reduction', color: '#a78bfa' },
            ].map(s => (
              <div key={s.label} className="rounded-2xl border border-surface px-6 py-4 text-center"
                style={{ background: 'rgba(var(--surface-rgb),0.7)' }}>
                <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
                <p className="text-xs text-[color:var(--text-secondary)] mt-1">{s.label}</p>
              </div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
            className="flex gap-3 justify-center flex-wrap">
            <button onClick={() => go('contact')}
              className="px-6 py-3 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition-opacity"
              style={{ background: '#2563eb' }}>
              {t('services_pages.getStarted')}
            </button>
            <button onClick={() => go('contact')}
              className="px-6 py-3 rounded-xl border border-surface text-sm font-semibold text-[color:var(--text-secondary)] hover:border-blue-500 hover:text-blue-400 transition-colors">
              {t('services_pages.freeAudit')}
            </button>
          </motion.div>
        </div>

        {/* ── KEYWORD CHIPS ANIMATION ── */}
        <div ref={kwRef} className="max-w-[860px] mx-auto mt-16">
          <p className="text-center text-xs uppercase tracking-[0.3em] text-[color:var(--text-secondary)] mb-6">
            Keywords we target for you
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <AnimatePresence>
              {KEYWORDS.slice(0, visibleCount).map((kw, i) => (
                <motion.div key={kw.text}
                  initial={{ opacity: 0, scale: 0.75, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-xl border px-4 py-2.5"
                  style={{ borderColor: `${kw.color}30`, background: `${kw.color}08` }}>
                  <p className="text-sm font-medium text-[color:var(--text-primary)]">{kw.text}</p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                      style={{ background: `${kw.color}18`, color: kw.color }}>
                      {kw.intent}
                    </span>
                    <span className="text-[10px] text-[color:var(--text-secondary)]">CPC {kw.cpc}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── CAMPAIGN TYPES ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface">
        <div className="max-w-[1000px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <p className="text-xs uppercase tracking-[0.32em] text-blue-400 mb-3">Campaign Types</p>
            <h2 className="text-3xl font-bold text-[color:var(--text-primary)]">All Google Ads formats, one strategy</h2>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {CAMPAIGN_TYPES.map((c, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                className={`rounded-2xl border border-surface p-7 ${c.span}`}
                style={{ background: 'rgba(var(--surface-rgb),0.7)' }}>
                <div className="w-10 h-10 rounded-xl mb-5 flex items-center justify-center"
                  style={{ background: `${c.accent}15` }}>
                  <c.Icon sx={{ fontSize: 22, color: c.accent }} />
                </div>
                <h3 className="text-base font-semibold text-[color:var(--text-primary)] mb-2">{c.title}</h3>
                <p className="text-sm text-[color:var(--text-secondary)] leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1000px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <p className="text-xs uppercase tracking-[0.32em] text-blue-400 mb-3">{t('services_pages.included')}</p>
            <h2 className="text-3xl font-bold text-[color:var(--text-primary)]">What's covered</h2>
          </motion.div>
          <div className="grid sm:grid-cols-3 gap-5">
            {benefits.map((b, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                className="rounded-2xl border border-surface p-6" style={{ background: 'rgba(var(--surface-rgb),0.7)' }}>
                <CheckCircle sx={{ fontSize: 20, color: '#60a5fa' }} className="mb-4" />
                <p className="text-sm text-[color:var(--text-secondary)] leading-relaxed">{b}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface">
        <motion.div className="max-w-xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl font-bold text-[color:var(--text-primary)] mb-4">Start capturing high-intent traffic</h2>
          <p className="text-[color:var(--text-secondary)] mb-8">Free account audit — find out where your budget leaks and what to fix first.</p>
          <button onClick={() => go('contact')}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-semibold hover:opacity-90 transition-opacity"
            style={{ background: '#2563eb' }}>
            {t('services_pages.freeAudit')} <ArrowForward sx={{ fontSize: 18 }} />
          </button>
        </motion.div>
      </section>
    </PageShell>
  )
}
