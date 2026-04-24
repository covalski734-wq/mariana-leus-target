import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import {
  TrendingUp,
  AttachMoney,
  PeopleAlt,
  CheckCircle,
  ArrowForward,
} from '@mui/icons-material'
import { PageShell } from '@/components/PageShell'

function useCounter(end: number, duration: number, active: boolean) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!active) return
    const t0 = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1)
      setValue(Math.round((1 - Math.pow(1 - p, 3)) * end))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [end, duration, active])
  return value
}

const BARS = [35, 52, 44, 68, 58, 79, 92]
const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

const FUNNEL = [
  { stage: 'Impressions', val: '420K', pct: 100 },
  { stage: 'Clicks', val: '18.4K', pct: 44 },
  { stage: 'Leads', val: '1,247', pct: 30 },
  { stage: 'Conversions', val: '312', pct: 20 },
]

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
}

export const MetaAdsPage: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const benefits = t('services.benefits.metaAds', { returnObjects: true }) as string[]
  const details = t('services.details.metaAds')

  const statsRef = useRef<HTMLDivElement>(null)
  const inView = useInView(statsRef, { once: true, margin: '-80px' })
  const roas = useCounter(42, 1400, inView)
  const cpa = useCounter(52, 1400, inView)
  const reach = useCounter(340, 1600, inView)

  const go = (id: string) => { sessionStorage.setItem('scrollTarget', id); navigate('/') }

  return (
    <PageShell>
      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute -top-40 -right-20 w-[520px] h-[520px] rounded-full blur-[160px]"
            style={{ background: 'rgba(99,60,180,0.18)' }} />
          <div className="absolute -bottom-32 -left-16 w-[380px] h-[380px] rounded-full blur-[130px]"
            style={{ background: 'rgba(var(--primary-rgb),0.12)' }} />
        </div>

        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-[1.15fr_0.85fr] gap-14 items-center">
          {/* LEFT */}
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.button variants={item}
              onClick={() => go('services')}
              className="text-xs text-[color:var(--text-secondary)] hover:text-primary mb-7 flex items-center gap-1 transition-colors">
              {t('services_pages.backToServices')}
            </motion.button>

            <motion.span variants={item}
              className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
              style={{ background: 'rgba(var(--primary-rgb),0.1)', border: '1px solid rgba(var(--primary-rgb),0.25)', color: 'rgb(var(--primary-rgb))' }}>
              Meta Ads · Facebook · Instagram · TikTok
            </motion.span>

            <motion.h1 variants={item}
              className="text-4xl lg:text-5xl xl:text-6xl font-bold text-[color:var(--text-primary)] leading-[1.06] tracking-[-0.03em] mb-5">
              {details}
            </motion.h1>

            <motion.p variants={item} className="text-lg text-[color:var(--text-secondary)] leading-relaxed mb-8 max-w-lg">
              We build and manage Meta ad systems that drive consistent, measurable revenue — not just traffic and vanity metrics.
            </motion.p>

            {/* Animated counters */}
            <motion.div variants={item} ref={statsRef} className="grid grid-cols-3 gap-3 mb-9">
              {[
                { value: `${(roas / 10).toFixed(1)}x`, label: 'Avg. ROAS', color: '#a78bfa' },
                { value: `−${cpa}%`, label: 'CPA reduction', color: '#34d399' },
                { value: `+${reach}%`, label: 'Reach growth', color: 'rgb(var(--primary-rgb))' },
              ].map(s => (
                <div key={s.label} className="rounded-2xl border border-surface p-4 text-center"
                  style={{ background: 'rgba(var(--surface-rgb),0.7)' }}>
                  <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
                  <p className="text-xs text-[color:var(--text-secondary)] mt-1">{s.label}</p>
                </div>
              ))}
            </motion.div>

            <motion.div variants={item} className="flex gap-3 flex-wrap">
              <button onClick={() => go('contact')}
                className="px-6 py-3 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition-opacity bg-primary">
                {t('services_pages.getStarted')}
              </button>
              <button onClick={() => go('contact')}
                className="px-6 py-3 rounded-xl border border-surface text-sm font-semibold text-[color:var(--text-secondary)] hover:border-primary hover:text-primary transition-colors">
                {t('services_pages.freeAudit')}
              </button>
            </motion.div>
          </motion.div>

          {/* RIGHT — dashboard */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }} className="hidden lg:block">
            <div className="rounded-2xl border border-surface p-5 shadow-2xl"
              style={{ background: 'rgba(var(--surface-rgb),0.94)' }}>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[color:var(--text-secondary)]">Campaign Analytics</p>
                  <p className="text-sm font-semibold text-[color:var(--text-primary)] mt-0.5">Q4 Performance</p>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold text-emerald-400"
                  style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.2)' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Active
                </div>
              </div>

              {/* Bar chart */}
              <div className="mb-5">
                <div className="flex justify-between text-[10px] text-[color:var(--text-secondary)] mb-2">
                  <span>Weekly Revenue</span>
                  <span className="text-emerald-400 font-semibold">+$18,400 · ↑28%</span>
                </div>
                <div className="h-[72px] flex items-end gap-1.5">
                  {BARS.map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <motion.div
                        initial={{ scaleY: 0 }} animate={inView ? { scaleY: 1 } : {}}
                        transition={{ duration: 0.55, delay: 0.4 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                        style={{ height: `${h}%`, transformOrigin: 'bottom', background: `rgba(var(--primary-rgb),${0.22 + i * 0.1})` }}
                        className="w-full rounded-t-sm"
                      />
                      <span className="text-[9px] text-[color:var(--text-secondary)]">{DAYS[i]}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metric chips */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { Icon: TrendingUp, label: 'ROAS', value: '4.2x', c: '#a78bfa' },
                  { Icon: AttachMoney, label: 'CPA', value: '$14', c: '#34d399' },
                  { Icon: PeopleAlt, label: 'Reach', value: '128K', c: 'rgb(var(--primary-rgb))' },
                ].map(m => (
                  <div key={m.label} className="rounded-xl border border-surface p-3"
                    style={{ background: 'rgba(var(--surface-strong-rgb),0.8)' }}>
                    <m.Icon sx={{ fontSize: 15, color: m.c }} />
                    <p className="text-base font-bold mt-0.5" style={{ color: m.c }}>{m.value}</p>
                    <p className="text-[10px] text-[color:var(--text-secondary)]">{m.label}</p>
                  </div>
                ))}
              </div>

              {/* Funnel */}
              <div className="pt-4 border-t border-surface">
                <p className="text-[10px] uppercase tracking-wider text-[color:var(--text-secondary)] mb-3">Conversion funnel</p>
                {FUNNEL.map((f, i) => (
                  <div key={f.stage} className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] text-[color:var(--text-secondary)] w-[78px] shrink-0">{f.stage}</span>
                    <div className="flex-1 h-1 rounded-full" style={{ background: 'rgba(var(--surface-strong-rgb),1)' }}>
                      <motion.div initial={{ width: 0 }} animate={inView ? { width: `${f.pct}%` } : {}}
                        transition={{ duration: 0.7, delay: 0.7 + i * 0.1 }}
                        className="h-full rounded-full bg-primary" />
                    </div>
                    <span className="text-[10px] font-semibold text-[color:var(--text-primary)] w-10 text-right">{f.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface">
        <div className="max-w-[1000px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <p className="text-xs uppercase tracking-[0.32em] text-primary mb-3">{t('services_pages.included')}</p>
            <h2 className="text-3xl font-bold text-[color:var(--text-primary)]">Everything in the package</h2>
          </motion.div>
          <div className="grid sm:grid-cols-3 gap-5">
            {benefits.map((b, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                className="rounded-2xl border border-surface p-6" style={{ background: 'rgba(var(--surface-rgb),0.7)' }}>
                <CheckCircle sx={{ fontSize: 22, color: 'rgb(var(--primary-rgb))' }} className="mb-4" />
                <p className="text-sm text-[color:var(--text-secondary)] leading-relaxed">{b}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1000px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <p className="text-xs uppercase tracking-[0.32em] text-primary mb-3">{t('services_pages.howItWorks')}</p>
            <h2 className="text-3xl font-bold text-[color:var(--text-primary)]">From setup to scale in 4 weeks</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { n: '01', title: 'Audience Research', desc: 'Map demographics, interests, behaviors, and look-alike segments.' },
              { n: '02', title: 'Creative Strategy', desc: 'Ad creatives matched to each funnel stage with built-in A/B structure.' },
              { n: '03', title: 'Campaign Launch', desc: 'Proper objectives, placements, and bidding from day one.' },
              { n: '04', title: 'Optimize & Scale', desc: 'Weekly testing cycles, reallocation to winners, systematic scaling.' },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                className="rounded-2xl border border-surface p-6" style={{ background: 'rgba(var(--surface-rgb),0.6)' }}>
                <p className="text-3xl font-bold mb-4" style={{ color: 'rgba(var(--primary-rgb),0.25)' }}>{s.n}</p>
                <h3 className="text-sm font-semibold text-[color:var(--text-primary)] mb-2">{s.title}</h3>
                <p className="text-sm text-[color:var(--text-secondary)] leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface">
        <motion.div className="max-w-xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl font-bold text-[color:var(--text-primary)] mb-4">Ready to run profitable Meta Ads?</h2>
          <p className="text-[color:var(--text-secondary)] mb-8">Free audit — see exactly where your budget leaks and what to fix first.</p>
          <button onClick={() => go('contact')}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-white font-semibold hover:opacity-90 transition-opacity">
            {t('services_pages.freeAudit')} <ArrowForward sx={{ fontSize: 18 }} />
          </button>
        </motion.div>
      </section>
    </PageShell>
  )
}
