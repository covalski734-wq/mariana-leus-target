import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

// ─── Individual step visuals ──────────────────────────────────────────────────

const ResearchVisual: React.FC = () => (
  <div className="h-full flex flex-col">
    <div className="flex items-center justify-between mb-5">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-primary mb-1">Audience Insights</p>
        <h3 className="text-xl font-semibold text-[color:var(--text-primary)]">Target Analysis</h3>
      </div>
      <div className="flex gap-1.5">
        <span className="text-xs bg-primary/10 border border-primary/20 text-primary px-2 py-1 rounded-full font-medium">
          Meta
        </span>
        <span className="text-xs bg-accent/10 border border-accent/20 text-accent px-2 py-1 rounded-full font-medium">
          Google
        </span>
      </div>
    </div>

    <div className="mb-5">
      <p className="text-xs uppercase tracking-wider text-[color:var(--text-secondary)] mb-2">
        Audience Segments
      </p>
      <div className="flex flex-wrap gap-2">
        {['25–34 y.o.', 'Entrepreneurs', 'E-commerce', 'SaaS', 'B2B', 'Online retail'].map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 rounded-full border border-surface bg-surface-strong text-xs text-[color:var(--text-secondary)]"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>

    <div className="mb-5">
      <div className="flex justify-between text-sm mb-1.5">
        <span className="text-[color:var(--text-secondary)]">Potential Reach</span>
        <span className="text-primary font-semibold">2.4M users</span>
      </div>
      <div className="h-2 rounded-full bg-surface-strong">
        <div
          className="h-2 rounded-full bg-gradient-to-r from-primary to-accent"
          style={{ width: '78%' }}
        />
      </div>
    </div>

    <div className="grid grid-cols-2 gap-3 mt-auto">
      <div className="rounded-xl bg-surface-strong p-4">
        <p className="text-xs text-[color:var(--text-secondary)]">Competitors analyzed</p>
        <p className="text-2xl font-bold text-primary mt-1">14</p>
      </div>
      <div className="rounded-xl bg-surface-strong p-4">
        <p className="text-xs text-[color:var(--text-secondary)]">Market opportunity</p>
        <p className="text-lg font-bold text-primary mt-1">High intent</p>
      </div>
    </div>
  </div>
)

const StrategyVisual: React.FC = () => (
  <div className="h-full flex flex-col">
    <p className="text-xs uppercase tracking-[0.2em] text-primary mb-1">Campaign Strategy</p>
    <h3 className="text-xl font-semibold text-[color:var(--text-primary)] mb-5">Funnel Architecture</h3>

    <div className="space-y-4 mb-5">
      {[
        { label: 'Awareness', pct: '100%', barW: '100%' },
        { label: 'Consideration', pct: '32%', barW: '32%' },
        { label: 'Conversion', pct: '8.5%', barW: '8.5%' },
      ].map((step, i) => (
        <div key={step.label}>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-[color:var(--text-secondary)]">{step.label}</span>
            <span className="text-primary font-semibold">{step.pct}</span>
          </div>
          <div className="h-2.5 rounded-full bg-surface-strong">
            <div
              className="h-2.5 rounded-full bg-primary"
              style={{ width: step.barW, opacity: 0.35 + i * 0.3 }}
            />
          </div>
        </div>
      ))}
    </div>

    <div className="mt-auto p-4 rounded-xl bg-surface-strong">
      <p className="text-xs text-[color:var(--text-secondary)] mb-3">Budget Allocation</p>
      <div className="flex gap-0.5 h-3 rounded-full overflow-hidden">
        <div className="bg-primary rounded-l-full" style={{ width: '60%' }} />
        <div className="bg-accent rounded-r-full" style={{ width: '40%' }} />
      </div>
      <div className="flex gap-5 mt-2.5 text-xs text-[color:var(--text-secondary)]">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-primary inline-block" />
          Meta 60%
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-accent inline-block" />
          Google 40%
        </span>
      </div>
    </div>
  </div>
)

const LaunchVisual: React.FC = () => (
  <div className="h-full flex flex-col">
    <div className="flex items-center justify-between mb-5">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-primary mb-1">Status</p>
        <h3 className="text-xl font-semibold text-[color:var(--text-primary)]">Campaigns Live</h3>
      </div>
      <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-3 py-1">
        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
        <span className="text-emerald-500 text-xs font-semibold">LIVE</span>
      </div>
    </div>

    <div className="space-y-3 flex-1">
      {[
        { name: 'Meta Ads', impressions: '12,450', ctr: '3.2%' },
        { name: 'Google Search', impressions: '8,320', ctr: '4.1%' },
        { name: 'Google Display', impressions: '24,100', ctr: '1.8%' },
      ].map((p) => (
        <div
          key={p.name}
          className="flex items-center justify-between p-3.5 rounded-xl bg-surface-strong"
        >
          <div>
            <p className="font-medium text-sm text-[color:var(--text-primary)]">{p.name}</p>
            <p className="text-xs text-[color:var(--text-secondary)] mt-0.5">{p.impressions} impressions</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-semibold text-emerald-500">Active</p>
            <p className="text-sm font-bold text-primary mt-0.5">{p.ctr} CTR</p>
          </div>
        </div>
      ))}
    </div>

    <div className="mt-4 text-center p-3.5 rounded-xl border border-primary/20 bg-primary/5">
      <p className="text-xs text-[color:var(--text-secondary)]">First leads expected</p>
      <p className="text-lg font-bold text-primary">24–48 hours</p>
    </div>
  </div>
)

const OptimizationVisual: React.FC = () => (
  <div className="h-full flex flex-col">
    <p className="text-xs uppercase tracking-[0.2em] text-primary mb-1">Optimization</p>
    <h3 className="text-xl font-semibold text-[color:var(--text-primary)] mb-5">Performance Trends</h3>

    <div className="grid grid-cols-2 gap-3 mb-5">
      {[
        { label: 'ROAS', value: '4.2x', change: '+18%' },
        { label: 'CPA', value: '$12.40', change: '−34%' },
        { label: 'CTR', value: '3.8%', change: '+22%' },
        { label: 'Conversions', value: '284', change: '+67%' },
      ].map((m) => (
        <div key={m.label} className="p-3.5 rounded-xl bg-surface-strong">
          <p className="text-xs text-[color:var(--text-secondary)]">{m.label}</p>
          <p className="text-xl font-bold text-[color:var(--text-primary)] mt-0.5">{m.value}</p>
          <p className="text-xs font-semibold text-emerald-500 mt-0.5">{m.change}</p>
        </div>
      ))}
    </div>

    <div className="mt-auto p-4 rounded-xl border border-primary/20 bg-primary/5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-[color:var(--text-secondary)]">Today's adjustments</p>
          <p className="text-2xl font-bold text-primary">12</p>
        </div>
        <p className="text-xs text-[color:var(--text-secondary)] max-w-[130px] text-right">
          Bids, audiences & creatives tuned
        </p>
      </div>
    </div>
  </div>
)

const ReportsVisual: React.FC = () => (
  <div className="h-full flex flex-col">
    <div className="flex items-center justify-between mb-5">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-primary mb-1">Reporting</p>
        <h3 className="text-xl font-semibold text-[color:var(--text-primary)]">Weekly Report</h3>
      </div>
      <span className="text-xs border border-surface text-[color:var(--text-secondary)] px-3 py-1 rounded-full bg-surface-strong">
        Every Monday
      </span>
    </div>

    <div className="space-y-1 mb-5">
      {[
        { label: 'Revenue', value: '+$18,400', trend: '+28%' },
        { label: 'Ad Spend', value: '$4,380', trend: '−6%' },
        { label: 'Leads', value: '147', trend: '+41%' },
        { label: 'ROAS', value: '4.2x', trend: '+18%' },
      ].map((item) => (
        <div
          key={item.label}
          className="flex items-center justify-between py-2.5 border-b border-surface"
        >
          <span className="text-sm text-[color:var(--text-secondary)]">{item.label}</span>
          <div>
            <span className="text-sm font-semibold text-[color:var(--text-primary)]">
              {item.value}
            </span>
            <span className="ml-2 text-xs text-emerald-500 font-semibold">{item.trend}</span>
          </div>
        </div>
      ))}
    </div>

    <div className="mt-auto">
      <p className="text-xs text-[color:var(--text-secondary)] mb-2">Revenue trend (last 7 days)</p>
      <div className="h-16 flex items-end gap-1.5">
        {[38, 52, 45, 68, 61, 79, 92].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t"
            style={{
              height: `${h}%`,
              background: `rgba(var(--primary-rgb), ${0.18 + i * 0.11})`,
            }}
          />
        ))}
      </div>
    </div>
  </div>
)

const VISUALS: React.FC[] = [
  ResearchVisual,
  StrategyVisual,
  LaunchVisual,
  OptimizationVisual,
  ReportsVisual,
]

// ─── Main section ─────────────────────────────────────────────────────────────

export const ProcessSection: React.FC = () => {
  const { t } = useTranslation()
  const steps = t('process.steps', { returnObjects: true }) as Array<{
    number: string
    title: string
    description: string
  }>

  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 1024
  )

  const containerRef = useRef<HTMLDivElement>(null)
  const stepRowRefs = useRef<(HTMLDivElement | null)[]>([])
  const numberRefs = useRef<(HTMLDivElement | null)[]>([])
  const panelRefs = useRef<(HTMLDivElement | null)[]>([])
  const activeRef = useRef(-1)

  // Media query listener — no scroll cost
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)')
    const handler = (e: MediaQueryListEvent | MediaQueryList) => setIsMobile(e.matches)
    handler(mq)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Scroll-driven DOM updates — never triggers React re-render
  useEffect(() => {
    if (isMobile) return

    let rafId: number | null = null

    const update = () => {
      const container = containerRef.current
      if (!container) return

      const rect = container.getBoundingClientRect()
      const scrollable = container.offsetHeight - window.innerHeight
      if (scrollable <= 0) return

      const progress = Math.max(0, Math.min(1, -rect.top / scrollable))
      const count = steps.length
      if (count === 0) return

      const newActive = Math.min(Math.floor(progress * count), count - 1)
      if (newActive === activeRef.current) return
      activeRef.current = newActive

      // Update step row opacity
      stepRowRefs.current.forEach((el, i) => {
        if (!el) return
        el.style.opacity = i === newActive ? '1' : '0.32'
      })

      // Update step number circle
      numberRefs.current.forEach((el, i) => {
        if (!el) return
        if (i === newActive) {
          el.style.background = 'var(--primary)'
          el.style.color = '#ffffff'
          el.style.borderColor = 'var(--primary)'
        } else {
          el.style.background = 'transparent'
          el.style.color = 'var(--primary)'
          el.style.borderColor = 'rgba(var(--primary-rgb), 0.35)'
        }
      })

      // Swap right panel
      panelRefs.current.forEach((el, i) => {
        if (!el) return
        el.style.opacity = i === newActive ? '1' : '0'
        el.style.transform =
          i === newActive ? 'translateY(0) scale(1)' : 'translateY(14px) scale(0.98)'
        el.style.pointerEvents = i === newActive ? 'auto' : 'none'
      })
    }

    const onScroll = () => {
      if (rafId !== null) return
      rafId = requestAnimationFrame(() => {
        rafId = null
        update()
      })
    }

    // Initialise without waiting for first scroll
    activeRef.current = -1
    update()

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [isMobile, steps.length])

  // ─── Mobile layout ──────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <section id="process" className="bg-surface py-20 px-4 sm:px-6">
        <div className="max-w-[600px] mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">
            {t('header.process')}
          </p>
          <h2 className="text-3xl font-bold text-[color:var(--text-primary)] mb-2">
            {t('process.title')}
          </h2>
          <p className="text-[color:var(--text-secondary)] mb-10">{t('process.subtitle')}</p>

          <div className="space-y-10">
            {steps.map((step, index) => {
              const Visual = VISUALS[index] ?? VISUALS[0]
              return (
                <div key={index}>
                  {/* Step header */}
                  <div className="flex gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full border-2 border-primary bg-primary text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {step.number}
                    </div>
                    <div className="pt-0.5">
                      <p className="font-semibold text-[color:var(--text-primary)]">{step.title}</p>
                      <p className="text-sm mt-1 text-[color:var(--text-secondary)] leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Visual card — auto height so nothing clips */}
                  <div
                    className="rounded-2xl border border-surface p-5"
                    style={{
                      background: 'rgba(var(--surface-rgb), 0.82)',
                      backdropFilter: 'blur(18px)',
                    }}
                  >
                    <Visual />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    )
  }

  // ─── Desktop: scroll-story layout ──────────────────────────────────────────
  return (
    <section
      id="process"
      ref={containerRef}
      className="relative bg-surface"
      style={{ minHeight: '350vh' }}
    >
      <div className="sticky top-0 h-screen flex items-center bg-surface overflow-hidden">
        <div className="max-w-[1200px] mx-auto w-full px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20">

          {/* LEFT: Step list */}
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Process</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-[color:var(--text-primary)] mb-2">
              {t('process.title')}
            </h2>
            <p className="text-[color:var(--text-secondary)] mb-8 leading-relaxed">
              {t('process.subtitle')}
            </p>

            <div className="space-y-6">
              {steps.map((step, index) => (
                <div
                  key={index}
                  ref={(el) => { stepRowRefs.current[index] = el }}
                  className="step-row flex gap-4 items-start"
                  style={{ opacity: index === 0 ? 1 : 0.32 }}
                >
                  <div
                    ref={(el) => { numberRefs.current[index] = el }}
                    className="step-num rounded-full border-2 flex items-center justify-center font-bold text-sm flex-shrink-0"
                    style={{
                      width: '2.5rem',
                      height: '2.5rem',
                      background: index === 0 ? 'var(--primary)' : 'transparent',
                      color: index === 0 ? '#ffffff' : 'var(--primary)',
                      borderColor:
                        index === 0 ? 'var(--primary)' : 'rgba(var(--primary-rgb), 0.35)',
                    }}
                  >
                    {step.number}
                  </div>
                  <div className="pt-0.5">
                    <p className="font-semibold text-[color:var(--text-primary)]">{step.title}</p>
                    <p className="text-sm mt-1 text-[color:var(--text-secondary)] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Visual panels */}
          <div className="relative h-[500px] self-center">
            {steps.map((_, index) => {
              const Visual = VISUALS[index] ?? VISUALS[0]
              return (
                <div
                  key={index}
                  ref={(el) => { panelRefs.current[index] = el }}
                  className="story-panel"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: index === 0 ? 1 : 0,
                    transform:
                      index === 0
                        ? 'translateY(0) scale(1)'
                        : 'translateY(14px) scale(0.98)',
                    pointerEvents: index === 0 ? 'auto' : 'none',
                  }}
                >
                  <div
                    className="h-full rounded-2xl border border-surface p-6 shadow-xl overflow-hidden"
                    style={{
                      background: 'rgba(var(--surface-rgb), 0.82)',
                      backdropFilter: 'blur(18px)',
                    }}
                  >
                    <Visual />
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
