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

const POSTS = [
  { bg: 'from-amber-500 to-orange-500', emoji: '✨', label: 'New Launch', likes: '3.2k', w: 'col-span-2 row-span-2' },
  { bg: 'from-pink-500 to-rose-500', emoji: '🎯', label: 'Promo', likes: '1.8k', w: 'col-span-1' },
  { bg: 'from-violet-500 to-purple-600', emoji: '🎨', label: 'Brand', likes: '2.1k', w: 'col-span-1' },
  { bg: 'from-emerald-500 to-teal-500', emoji: '📈', label: 'Results', likes: '4.5k', w: 'col-span-1' },
  { bg: 'from-blue-500 to-cyan-500', emoji: '💡', label: 'Tips', likes: '1.3k', w: 'col-span-1' },
  { bg: 'from-rose-500 to-pink-600', emoji: '🚀', label: 'Launch', likes: '5.1k', w: 'col-span-1' },
]

export const SmmPage: React.FC = () => {
  const { t } = useTranslation()
  const benefits = t('services.benefits.smm', { returnObjects: true }) as string[]
  const details = t('services.details.smm')

  return (
    <PageShell>
      {/* Hero */}
      <section className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute w-[500px] h-[500px] rounded-full blur-[160px] opacity-25"
            style={{ background: 'radial-gradient(circle, #f59e0b, #ef4444)', top: '-180px', left: '-80px' }} />
          <div className="absolute w-[400px] h-[400px] rounded-full blur-[130px] opacity-20"
            style={{ background: 'radial-gradient(circle, #ec4899, #8b5cf6)', bottom: '-80px', right: '-60px' }} />
        </div>

        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
          <motion.div {...fadeUp()}>
            <Link to="/#services" onClick={() => { window.location.href = '/#services' }}
              className="inline-flex items-center gap-1.5 text-xs text-[color:var(--text-secondary)] hover:text-primary mb-8 transition-colors">
              {t('services_pages.backToServices')}
            </Link>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-6"
              style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', color: '#fbbf24' }}>
              Instagram · Facebook · TikTok · LinkedIn
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-[color:var(--text-primary)] leading-[1.08] tracking-[-0.03em] mb-6">
              {details}
            </h1>
            <p className="text-lg text-[color:var(--text-secondary)] leading-relaxed mb-10 max-w-lg">
              Build a brand that people follow, trust, and buy from — with a consistent content system that runs every week.
            </p>

            <div className="grid grid-cols-3 gap-4 mb-10">
              {[
                { value: '+280%', label: 'Reach Growth', color: '#f59e0b' },
                { value: '6.2%', label: 'Avg. Engagement', color: '#ec4899' },
                { value: '+45/mo', label: 'Followers Growth', color: '#34d399' },
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
                style={{ background: 'linear-gradient(135deg, #f59e0b, #ef4444)' }}>
                {t('services_pages.getStarted')}
              </button>
              <button onClick={() => { window.location.href = '/#contact' }}
                className="px-6 py-3 rounded-xl border border-surface text-sm font-semibold text-[color:var(--text-secondary)] hover:border-amber-500 hover:text-amber-400 transition-colors">
                {t('services_pages.freeAudit')}
              </button>
            </div>
          </motion.div>

          {/* Content grid visual */}
          <div className="hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="grid grid-cols-3 gap-2"
            >
              {POSTS.map((post, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                  className={`${post.w} aspect-square rounded-2xl bg-gradient-to-br ${post.bg} flex flex-col items-center justify-center gap-1 relative overflow-hidden`}
                >
                  <span className={i === 0 ? 'text-5xl' : 'text-3xl'}>{post.emoji}</span>
                  <span className="text-[10px] font-semibold text-white/90">{post.label}</span>
                  <div className="absolute bottom-2 right-2 flex items-center gap-1">
                    <span className="text-white/70 text-[9px]">❤️ {post.likes}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            {/* Engagement badge */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="mt-3 mx-auto w-fit rounded-2xl border border-surface px-5 py-3 shadow-xl"
              style={{ background: 'rgba(var(--surface-rgb), 0.95)', backdropFilter: 'blur(16px)' }}
            >
              <p className="text-xs text-[color:var(--text-secondary)]">This week's reach</p>
              <p className="text-xl font-bold text-[color:var(--text-primary)]">84,200 <span className="text-sm text-emerald-400">↑ +28%</span></p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface">
        <div className="max-w-[1000px] mx-auto">
          <motion.div className="mb-12" {...fadeUp()}>
            <p className="text-sm uppercase tracking-[0.32em] text-amber-400 mb-3">{t('services_pages.included')}</p>
            <h2 className="text-3xl font-bold text-[color:var(--text-primary)]">Full social media management</h2>
          </motion.div>
          <div className="grid sm:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <motion.div key={i} {...fadeUp(i * 0.1)}
                className="rounded-2xl border border-surface p-6"
                style={{ background: 'rgba(var(--surface-rgb), 0.7)' }}>
                <div className="w-8 h-8 rounded-lg mb-4 flex items-center justify-center"
                  style={{ background: 'rgba(245,158,11,0.12)' }}>
                  <span className="text-sm font-bold text-amber-400">{i + 1}</span>
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
            <p className="text-sm uppercase tracking-[0.32em] text-amber-400 mb-3">{t('services_pages.howItWorks')}</p>
            <h2 className="text-3xl font-bold text-[color:var(--text-primary)]">Content that compounds</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Brand Audit', desc: 'Review your current presence, voice, top-performing content, and competitor positioning.' },
              { step: '02', title: 'Content Calendar', desc: '30-day editorial calendar aligned with your promotions, trends, and audience interests.' },
              { step: '03', title: 'Create & Publish', desc: 'Consistent publishing schedule with captions, hashtags, and platform-native formats.' },
              { step: '04', title: 'Grow & Engage', desc: 'Active community management, reply strategy, and monthly performance reporting.' },
            ].map((s, i) => (
              <motion.div key={i} {...fadeUp(i * 0.1)}
                className="rounded-2xl border border-surface p-6"
                style={{ background: 'rgba(var(--surface-rgb), 0.6)' }}>
                <p className="text-3xl font-bold text-amber-500/25 mb-4">{s.step}</p>
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
          <h2 className="text-3xl font-bold text-[color:var(--text-primary)] mb-4">Grow your audience with purpose</h2>
          <p className="text-[color:var(--text-secondary)] mb-8">Let's build a social presence that turns followers into buyers.</p>
          <button onClick={() => { window.location.href = '/#contact' }}
            className="px-8 py-4 rounded-xl text-white font-semibold text-sm hover:opacity-90 transition-opacity"
            style={{ background: 'linear-gradient(135deg, #f59e0b, #ef4444)' }}>
            {t('services_pages.getStarted')} →
          </button>
        </motion.div>
      </section>
    </PageShell>
  )
}
