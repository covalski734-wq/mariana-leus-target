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

const SocialPost: React.FC<{
  brand: string
  emoji: string
  caption: string
  likes: string
  comments: string
  shares: string
  accent: string
  delay: number
}> = ({ brand, emoji, caption, likes, comments, shares, accent, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 16, scale: 0.96 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    className="rounded-2xl border p-4 shadow-lg"
    style={{
      borderColor: `${accent}30`,
      background: `rgba(var(--surface-rgb), 0.9)`,
      backdropFilter: 'blur(14px)',
    }}
  >
    <div className="flex items-center gap-2.5 mb-3">
      <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
        style={{ background: `linear-gradient(135deg, ${accent}, ${accent}88)` }}
      >
        {brand[0]}
      </div>
      <div>
        <p className="text-xs font-semibold text-[color:var(--text-primary)]">{brand}</p>
        <p className="text-[10px] text-[color:var(--text-secondary)]">Sponsored · Meta Ads</p>
      </div>
    </div>
    <div
      className="h-24 rounded-xl mb-3 flex items-center justify-center text-4xl"
      style={{ background: `linear-gradient(135deg, ${accent}22, ${accent}08)` }}
    >
      {emoji}
    </div>
    <p className="text-xs text-[color:var(--text-secondary)] leading-relaxed mb-3">{caption}</p>
    <div className="flex gap-4 text-xs text-[color:var(--text-secondary)]">
      <span>❤️ {likes}</span>
      <span>💬 {comments}</span>
      <span>↗ {shares}</span>
    </div>
  </motion.div>
)

export const MetaAdsPage: React.FC = () => {
  const { t } = useTranslation()
  const benefits = t('services.benefits.metaAds', { returnObjects: true }) as string[]
  const details = t('services.details.metaAds')
  const items = t('services.items', { returnObjects: true }) as { key: string; description: string }[]
  const description = items.find((it) => it.key === 'metaAds')?.description ?? ''

  return (
    <PageShell>
      {/* Hero */}
      <section className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute w-[600px] h-[600px] rounded-full blur-[160px] opacity-30"
            style={{ background: 'radial-gradient(circle, #7c3aed, #4f46e5)', top: '-200px', right: '-100px' }} />
          <div className="absolute w-[400px] h-[400px] rounded-full blur-[120px] opacity-20"
            style={{ background: 'radial-gradient(circle, #ec4899, #8b5cf6)', bottom: '-100px', left: '-80px' }} />
        </div>

        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
          <motion.div {...fadeUp()}>
            <Link to="/#services" onClick={() => { window.location.href = '/#services' }}
              className="inline-flex items-center gap-1.5 text-xs text-[color:var(--text-secondary)] hover:text-primary mb-8 transition-colors">
              {t('services_pages.backToServices')}
            </Link>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-6"
              style={{ background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.3)', color: '#a78bfa' }}>
              Meta Ads · Facebook · Instagram · TikTok
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-[color:var(--text-primary)] leading-[1.08] tracking-[-0.03em] mb-6">
              {details}
            </h1>
            <p className="text-lg text-[color:var(--text-secondary)] leading-relaxed mb-10 max-w-lg">
              {description}
            </p>

            <div className="grid grid-cols-3 gap-4 mb-10">
              {[
                { value: '4.2x', label: 'Avg. ROAS', color: '#a78bfa' },
                { value: '−52%', label: 'CPA Reduction', color: '#34d399' },
                { value: '+340%', label: 'Reach Growth', color: '#f472b6' },
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
                style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}>
                {t('services_pages.getStarted')}
              </button>
              <button onClick={() => { window.location.href = '/#contact' }}
                className="px-6 py-3 rounded-xl border border-surface text-sm font-semibold text-[color:var(--text-secondary)] hover:border-primary hover:text-primary transition-colors">
                {t('services_pages.freeAudit')}
              </button>
            </div>
          </motion.div>

          {/* Social posts visual */}
          <div className="hidden lg:block relative">
            <div className="space-y-4">
              <SocialPost brand="Beauty Brand" emoji="💄" caption="Discover award-winning skincare. Free shipping on orders over $50."
                likes="2,487" comments="318" shares="1.2k" accent="#7c3aed" delay={0.2} />
              <SocialPost brand="E-Shop Growth" emoji="🛍️" caption="Summer sale — up to 60% off selected items. Limited time."
                likes="1,834" comments="204" shares="870" accent="#ec4899" delay={0.35} />
            </div>
            {/* ROAS floating card */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -right-6 top-8 rounded-2xl border p-4 shadow-2xl"
              style={{
                borderColor: 'rgba(124,58,237,0.25)',
                background: 'rgba(var(--surface-rgb), 0.95)',
                backdropFilter: 'blur(16px)',
              }}
            >
              <p className="text-xs mb-1" style={{ color: '#a78bfa' }}>ROAS This Month</p>
              <p className="text-3xl font-bold text-[color:var(--text-primary)]">4.2x</p>
              <p className="text-xs font-semibold text-emerald-400 mt-0.5">↑ +18% vs last month</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface">
        <div className="max-w-[1000px] mx-auto">
          <motion.div className="mb-12" {...fadeUp()}>
            <p className="text-sm uppercase tracking-[0.32em] mb-3" style={{ color: '#a78bfa' }}>{t('services_pages.included')}</p>
            <h2 className="text-3xl font-bold text-[color:var(--text-primary)]">Everything in the package</h2>
          </motion.div>
          <div className="grid sm:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <motion.div key={i} {...fadeUp(i * 0.1)}
                className="rounded-2xl border border-surface p-6"
                style={{ background: 'rgba(var(--surface-rgb), 0.7)' }}>
                <div className="w-8 h-8 rounded-lg mb-4 flex items-center justify-center"
                  style={{ background: 'rgba(124,58,237,0.15)' }}>
                  <span className="text-sm font-bold" style={{ color: '#a78bfa' }}>{i + 1}</span>
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
            <p className="text-sm uppercase tracking-[0.32em] mb-3" style={{ color: '#a78bfa' }}>{t('services_pages.howItWorks')}</p>
            <h2 className="text-3xl font-bold text-[color:var(--text-primary)]">From zero to optimized in weeks</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Audience Research', desc: 'Deep dive into your ideal customer: demographics, interests, behaviors, and look-alikes.' },
              { step: '02', title: 'Creative Strategy', desc: 'Develop ad creatives and copy matched to each funnel stage — awareness, consideration, conversion.' },
              { step: '03', title: 'Campaign Launch', desc: 'Structure campaigns for maximum reach efficiency — correct objectives, placements, and bidding.' },
              { step: '04', title: 'Optimize & Scale', desc: 'Weekly A/B testing, budget reallocation to winners, and scaling profitable ad sets.' },
            ].map((s, i) => (
              <motion.div key={i} {...fadeUp(i * 0.1)}
                className="rounded-2xl border border-surface p-6"
                style={{ background: 'rgba(var(--surface-rgb), 0.6)' }}>
                <p className="text-3xl font-bold mb-4" style={{ color: 'rgba(124,58,237,0.3)' }}>{s.step}</p>
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
          <h2 className="text-3xl font-bold text-[color:var(--text-primary)] mb-4">Ready to run profitable Meta Ads?</h2>
          <p className="text-[color:var(--text-secondary)] mb-8">Get a free audit of your current ad account and a clear action plan.</p>
          <button onClick={() => { window.location.href = '/#contact' }}
            className="px-8 py-4 rounded-xl text-white font-semibold text-sm hover:opacity-90 transition-opacity"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}>
            {t('services_pages.freeAudit')} →
          </button>
        </motion.div>
      </section>
    </PageShell>
  )
}
