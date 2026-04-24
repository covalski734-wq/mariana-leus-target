import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { CheckCircle, ArrowForward, Schedule, PeopleAlt, TrendingUp, Share } from '@mui/icons-material'
import { PageShell } from '@/components/PageShell'

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

const PLATFORMS = [
  { abbr: 'IG', name: 'Instagram', followers: 12400, reach: '+18%', eng: '4.2%', color: '#E1306C' },
  { abbr: 'FB', name: 'Facebook', followers: 8900, reach: '+12%', eng: '2.8%', color: '#1877F2' },
  { abbr: 'TT', name: 'TikTok', followers: 24100, reach: '+34%', eng: '6.7%', color: '#20D2CE' },
  { abbr: 'LI', name: 'LinkedIn', followers: 3200, reach: '+8%', eng: '3.1%', color: '#0A66C2' },
]

// Content calendar — 4 weeks × 7 days; -1 = weekend rest, 0-3 = content type
const CONTENT_TYPES = [
  { label: 'Reel', color: '#E1306C' },
  { label: 'Story', color: '#fbbf24' },
  { label: 'Post', color: '#60a5fa' },
  { label: 'Carousel', color: '#a78bfa' },
]
const CALENDAR: number[][] = [
  [0, 2, -1, 1, 3, -1, -1],
  [1, -1, 0, 2, 0, -1, -1],
  [3, 0, -1, 1, 2, -1, -1],
  [0, 2, 3, -1, 1, -1, -1],
]

const PlatformCard: React.FC<typeof PLATFORMS[0] & { active: boolean; idx: number }> = ({ abbr, name, followers, reach, eng, color, active, idx }) => {
  const count = useCounter(followers, 1200, active)
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.3 + idx * 0.1 }}
      className="rounded-xl border border-surface p-4"
      style={{ background: 'rgba(var(--surface-strong-rgb),0.7)' }}
    >
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
          style={{ background: color }}>
          {abbr}
        </div>
        <p className="text-sm font-semibold text-[color:var(--text-primary)]">{name}</p>
      </div>
      <p className="text-xl font-bold text-[color:var(--text-primary)]">
        {count >= 1000 ? `${(count / 1000).toFixed(1)}K` : count}
      </p>
      <p className="text-[10px] text-[color:var(--text-secondary)] mb-2">followers</p>
      <div className="flex gap-3 text-[10px]">
        <span style={{ color }}>{reach} reach</span>
        <span className="text-[color:var(--text-secondary)]">{eng} eng.</span>
      </div>
    </motion.div>
  )
}

const SocialDashboard: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="space-y-4"
    >
      {/* Platform cards 2×2 */}
      <div className="grid grid-cols-2 gap-3">
        {PLATFORMS.map((p, i) => (
          <PlatformCard key={p.abbr} {...p} active={inView} idx={i} />
        ))}
      </div>

      {/* Content calendar */}
      <div className="rounded-xl border border-surface p-4"
        style={{ background: 'rgba(var(--surface-rgb),0.9)' }}>
        <p className="text-[10px] uppercase tracking-widest text-[color:var(--text-secondary)] mb-3">Monthly content plan</p>
        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 mb-1">
          {DAYS.map((d, i) => (
            <div key={i} className="text-center text-[9px] text-[color:var(--text-secondary)]">{d}</div>
          ))}
        </div>
        {/* Calendar cells */}
        {CALENDAR.map((week, wi) => (
          <div key={wi} className="grid grid-cols-7 gap-1 mb-1">
            {week.map((type, di) => (
              <motion.div
                key={di}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 + (wi * 7 + di) * 0.02, duration: 0.25 }}
                className="aspect-square rounded-sm"
                style={{
                  background: type === -1
                    ? 'rgba(var(--surface-strong-rgb),0.4)'
                    : CONTENT_TYPES[type].color + '70',
                }}
                title={type >= 0 ? CONTENT_TYPES[type].label : 'Rest'}
              />
            ))}
          </div>
        ))}
        {/* Legend */}
        <div className="flex flex-wrap gap-3 mt-2">
          {CONTENT_TYPES.map(c => (
            <div key={c.label} className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 rounded-sm" style={{ background: c.color + '80' }} />
              <span className="text-[9px] text-[color:var(--text-secondary)]">{c.label}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } }
const fadeItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

export const SmmPage: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const benefits = t('services.benefits.smm', { returnObjects: true }) as string[]
  const details = t('services.details.smm')

  const go = (id: string) => { sessionStorage.setItem('scrollTarget', id); navigate('/') }

  return (
    <PageShell>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute -top-40 -left-16 w-[480px] h-[480px] rounded-full blur-[150px]"
            style={{ background: 'rgba(245,158,11,0.18)' }} />
          <div className="absolute -bottom-20 -right-10 w-[380px] h-[380px] rounded-full blur-[130px]"
            style={{ background: 'rgba(236,72,153,0.14)' }} />
        </div>

        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-start">
          {/* LEFT */}
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.button variants={fadeItem}
              onClick={() => go('services')}
              className="text-xs text-[color:var(--text-secondary)] hover:text-primary mb-7 flex items-center gap-1 transition-colors">
              {t('services_pages.backToServices')}
            </motion.button>

            <motion.span variants={fadeItem}
              className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
              style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', color: '#fbbf24' }}>
              Instagram · Facebook · TikTok · LinkedIn
            </motion.span>

            <motion.h1 variants={fadeItem}
              className="text-4xl lg:text-5xl xl:text-6xl font-bold text-[color:var(--text-primary)] leading-[1.06] tracking-[-0.03em] mb-5">
              {details}
            </motion.h1>

            <motion.p variants={fadeItem}
              className="text-lg text-[color:var(--text-secondary)] leading-relaxed mb-8 max-w-lg">
              Build a brand that people follow, trust, and buy from — with a consistent content system that runs every week.
            </motion.p>

            <motion.div variants={fadeItem} className="grid grid-cols-3 gap-3 mb-8">
              {[
                { value: '+280%', label: 'Reach growth', color: '#f59e0b' },
                { value: '6.2%', label: 'Avg. engagement', color: '#ec4899' },
                { value: '+45/mo', label: 'New followers', color: '#34d399' },
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
                style={{ background: 'linear-gradient(135deg,#f59e0b,#ef4444)' }}>
                {t('services_pages.getStarted')}
              </button>
              <button onClick={() => go('contact')}
                className="px-6 py-3 rounded-xl border border-surface text-sm font-semibold text-[color:var(--text-secondary)] hover:border-amber-500 hover:text-amber-400 transition-colors">
                {t('services_pages.freeAudit')}
              </button>
            </motion.div>
          </motion.div>

          {/* RIGHT — platform dashboard + content calendar */}
          <div className="hidden lg:block pt-4">
            <SocialDashboard />
          </div>
        </div>
      </section>

      {/* ── WHAT WE CREATE ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface">
        <div className="max-w-[1000px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <p className="text-xs uppercase tracking-[0.32em] text-amber-400 mb-3">Content formats</p>
            <h2 className="text-3xl font-bold text-[color:var(--text-primary)]">Every format, one strategy</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { Icon: Share, title: 'Reels & Short Video', desc: 'Platform-native short-form content optimized for reach and engagement algorithms.' },
              { Icon: Schedule, title: 'Stories & Highlights', desc: 'Daily story sequences that drive DMs, link clicks, and story-to-sale conversions.' },
              { Icon: PeopleAlt, title: 'Feed Posts & Carousels', desc: 'Educational and brand-building content designed for saves, shares, and profile visits.' },
              { Icon: TrendingUp, title: 'Community Management', desc: 'Active comment and DM engagement that builds trust and turns followers into buyers.' },
            ].map(({ Icon, title, desc }, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                className="rounded-2xl border border-surface p-6" style={{ background: 'rgba(var(--surface-rgb),0.7)' }}>
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center mb-5">
                  <Icon sx={{ fontSize: 22, color: '#f59e0b' }} />
                </div>
                <h3 className="text-sm font-semibold text-[color:var(--text-primary)] mb-2">{title}</h3>
                <p className="text-sm text-[color:var(--text-secondary)] leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1000px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <p className="text-xs uppercase tracking-[0.32em] text-amber-400 mb-3">{t('services_pages.included')}</p>
            <h2 className="text-3xl font-bold text-[color:var(--text-primary)]">Full social media management</h2>
          </motion.div>
          <div className="grid sm:grid-cols-3 gap-5">
            {benefits.map((b, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                className="rounded-2xl border border-surface p-6" style={{ background: 'rgba(var(--surface-rgb),0.7)' }}>
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center mb-4">
                  <CheckCircle sx={{ fontSize: 18, color: '#f59e0b' }} />
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
            <p className="text-xs uppercase tracking-[0.32em] text-amber-400 mb-3">{t('services_pages.howItWorks')}</p>
            <h2 className="text-3xl font-bold text-[color:var(--text-primary)]">Content that compounds every month</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { n: '01', title: 'Brand Audit', desc: 'Review your current presence, voice, top-performing content, and competitor positioning.' },
              { n: '02', title: 'Content Calendar', desc: '30-day editorial plan aligned with your promotions, audience interests, and trends.' },
              { n: '03', title: 'Create & Publish', desc: 'Consistent publishing schedule with captions, hashtags, and platform-native formats.' },
              { n: '04', title: 'Grow & Engage', desc: 'Active community management, reply strategy, and monthly performance reporting.' },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                className="rounded-2xl border border-surface p-6" style={{ background: 'rgba(var(--surface-rgb),0.6)' }}>
                <p className="text-3xl font-bold mb-4" style={{ color: 'rgba(245,158,11,0.25)' }}>{s.n}</p>
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
          <h2 className="text-3xl font-bold text-[color:var(--text-primary)] mb-4">Grow your audience with purpose</h2>
          <p className="text-[color:var(--text-secondary)] mb-8">Let's build a social presence that turns followers into buyers.</p>
          <button onClick={() => go('contact')}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-semibold hover:opacity-90 transition-opacity"
            style={{ background: 'linear-gradient(135deg,#f59e0b,#ef4444)' }}>
            {t('services_pages.getStarted')} <ArrowForward sx={{ fontSize: 18 }} />
          </button>
        </motion.div>
      </section>
    </PageShell>
  )
}
