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

const SearchResultMock: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
    className="rounded-2xl border border-surface p-5 shadow-2xl font-sans"
    style={{ background: 'rgba(var(--surface-rgb), 0.92)', backdropFilter: 'blur(20px)' }}
  >
    {/* Search bar */}
    <div className="flex items-center gap-2 bg-[rgba(var(--surface-strong-rgb),0.8)] rounded-xl px-4 py-2.5 mb-5">
      <svg className="w-4 h-4 text-[color:var(--text-secondary)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <span className="text-sm text-[color:var(--text-primary)]">beauty products buy online best deals</span>
      <span className="text-xs text-[color:var(--text-secondary)] ml-auto opacity-60">×</span>
    </div>

    <p className="text-[10px] uppercase tracking-[0.24em] text-[color:var(--text-secondary)] mb-3">About 2,840,000,000 results</p>

    {/* Ad result — highlighted */}
    <div className="rounded-xl border p-4 mb-3"
      style={{ borderColor: 'rgba(var(--primary-rgb),0.25)', background: 'rgba(var(--primary-rgb),0.04)' }}>
      <div className="flex items-center gap-2 mb-1.5">
        <span className="text-[10px] font-semibold border px-1.5 py-0.5 rounded"
          style={{ borderColor: 'rgba(var(--primary-rgb),0.4)', color: 'rgb(var(--primary-rgb))' }}>Ad</span>
        <span className="text-xs text-[color:var(--text-secondary)]">beautybrand.com › shop › skincare</span>
      </div>
      <p className="text-sm font-semibold text-primary mb-1">Premium Skincare — Free UK Delivery Over £40</p>
      <p className="text-xs text-[color:var(--text-secondary)] leading-relaxed">Award-winning formulas backed by dermatologists. Shop 200+ products. 30-day money-back guarantee.</p>
      <div className="mt-2.5 flex gap-3 text-xs text-primary/70">
        <span>★ New Arrivals</span>
        <span>★ Bestsellers</span>
        <span>★ Gift Sets</span>
      </div>
    </div>

    {/* Organic results (greyed) */}
    {[
      { url: 'globalbeauty.com', title: 'Global Beauty Store | Skincare & Makeup', desc: 'Wide range of beauty products from...' },
      { url: 'skincareworld.co.uk', title: 'Skincare World — Trusted Since 2008', desc: 'Expert-recommended skincare from top brands...' },
    ].map((r, i) => (
      <div key={i} className="py-2.5 opacity-40">
        <p className="text-[10px] text-[color:var(--text-secondary)]">{r.url}</p>
        <p className="text-xs font-medium text-primary/80">{r.title}</p>
        <p className="text-[11px] text-[color:var(--text-secondary)]">{r.desc}</p>
      </div>
    ))}

    {/* Quality Score */}
    <div className="mt-4 pt-3 border-t border-surface flex items-center gap-3">
      <span className="text-xs text-[color:var(--text-secondary)]">Quality Score:</span>
      <div className="flex gap-0.5">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="w-2 h-3 rounded-sm transition-all"
            style={{ background: i < 9 ? 'rgb(52,211,153)' : 'rgba(var(--surface-strong-rgb),1)' }} />
        ))}
      </div>
      <span className="text-xs font-bold text-emerald-400">9/10</span>
    </div>
  </motion.div>
)

export const GoogleAdsPage: React.FC = () => {
  const { t } = useTranslation()
  const benefits = t('services.benefits.googleAds', { returnObjects: true }) as string[]
  const details = t('services.details.googleAds')

  return (
    <PageShell>
      {/* Hero */}
      <section className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute w-[500px] h-[500px] rounded-full blur-[140px] opacity-20 bg-blue-500 -top-40 right-0" />
          <div className="absolute w-[350px] h-[350px] rounded-full blur-[100px] opacity-15 bg-cyan-400 bottom-0 left-0" />
        </div>

        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-[1.15fr_0.85fr] gap-16 items-center">
          <motion.div {...fadeUp()}>
            <Link to="/#services" onClick={() => { window.location.href = '/#services' }}
              className="inline-flex items-center gap-1.5 text-xs text-[color:var(--text-secondary)] hover:text-primary mb-8 transition-colors">
              {t('services_pages.backToServices')}
            </Link>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-6"
              style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)', color: '#60a5fa' }}>
              Google Search · Display · YouTube
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-[color:var(--text-primary)] leading-[1.08] tracking-[-0.03em] mb-6">
              {details}
            </h1>
            <p className="text-lg text-[color:var(--text-secondary)] leading-relaxed mb-10 max-w-lg">
              Capture intent-driven traffic at the exact moment people search for what you offer.
            </p>

            <div className="grid grid-cols-3 gap-4 mb-10">
              {[
                { value: '9/10', label: 'Quality Score', color: '#34d399' },
                { value: '−41%', label: 'CPC Reduction', color: '#60a5fa' },
                { value: '8.4%', label: 'Avg. CTR', color: '#fbbf24' },
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
                className="px-6 py-3 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90 bg-blue-600">
                {t('services_pages.getStarted')}
              </button>
              <button onClick={() => { window.location.href = '/#contact' }}
                className="px-6 py-3 rounded-xl border border-surface text-sm font-semibold text-[color:var(--text-secondary)] hover:border-blue-500 hover:text-blue-400 transition-colors">
                {t('services_pages.freeAudit')}
              </button>
            </div>
          </motion.div>

          <div className="hidden lg:block">
            <SearchResultMock />
          </div>
        </div>
      </section>

      {/* Campaign types */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface">
        <div className="max-w-[1000px] mx-auto">
          <motion.div className="mb-12" {...fadeUp()}>
            <p className="text-sm uppercase tracking-[0.32em] text-blue-400 mb-3">{t('services_pages.included')}</p>
            <h2 className="text-3xl font-bold text-[color:var(--text-primary)]">What's covered</h2>
          </motion.div>
          <div className="grid sm:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <motion.div key={i} {...fadeUp(i * 0.1)}
                className="rounded-2xl border border-surface p-6"
                style={{ background: 'rgba(var(--surface-rgb), 0.7)' }}>
                <div className="w-8 h-8 rounded-lg mb-4 flex items-center justify-center bg-blue-500/10">
                  <span className="text-sm font-bold text-blue-400">{i + 1}</span>
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
            <p className="text-sm uppercase tracking-[0.32em] text-blue-400 mb-3">{t('services_pages.howItWorks')}</p>
            <h2 className="text-3xl font-bold text-[color:var(--text-primary)]">Built for maximum intent capture</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Keyword Research', desc: 'Map high-intent search queries to each buying stage. Identify gaps your competitors miss.' },
              { step: '02', title: 'Ad Copy & Extensions', desc: 'Craft responsive ads with compelling headlines, descriptions, and sitelink extensions.' },
              { step: '03', title: 'Campaign Structure', desc: 'Build tightly themed ad groups with exact/phrase/broad match strategies for control.' },
              { step: '04', title: 'Bid Optimization', desc: 'Apply Smart Bidding, ROAS targets, and negative keyword hygiene for maximum efficiency.' },
            ].map((s, i) => (
              <motion.div key={i} {...fadeUp(i * 0.1)}
                className="rounded-2xl border border-surface p-6"
                style={{ background: 'rgba(var(--surface-rgb), 0.6)' }}>
                <p className="text-3xl font-bold text-blue-500/25 mb-4">{s.step}</p>
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
          <h2 className="text-3xl font-bold text-[color:var(--text-primary)] mb-4">Start capturing high-intent traffic</h2>
          <p className="text-[color:var(--text-secondary)] mb-8">Free account audit — see exactly where your budget is leaking and what to fix first.</p>
          <button onClick={() => { window.location.href = '/#contact' }}
            className="px-8 py-4 rounded-xl text-white font-semibold text-sm hover:opacity-90 transition-opacity bg-blue-600">
            {t('services_pages.freeAudit')} →
          </button>
        </motion.div>
      </section>
    </PageShell>
  )
}
