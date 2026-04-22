import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Card } from '@/components/Card'

const imagePlaceholders = [
  'Photo: short-form video ad creative (Reel or Story) — dark background, performance metrics overlay',
  'Photo: ad copy mock-up on phone screen — clean white interface, highlighted CTA button',
  'Photo: analytics dashboard screenshot — bar charts, ROAS, CPA numbers highlighted',
]

export const ContentSection: React.FC = () => {
  const { t } = useTranslation()
  const contentItems = t('blog.items', { returnObjects: true }) as Array<{
    title: string
    description: string
    tag: string
  }>

  return (
    <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8 bg-surface-strong">
      <div className="max-w-[1440px] mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-sm uppercase tracking-[0.32em] text-primary mb-3">{t('blog.label') || t('blog.title')}</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-[color:var(--text-primary)] mb-4">
            {t('blog.title')}
          </h2>
          <p className="text-xl text-[color:var(--text-secondary)] max-w-2xl mx-auto">
            {t('blog.subtitle')}
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {contentItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card hover className="group overflow-hidden h-full flex flex-col">
                {/* Image placeholder */}
                <div className="h-48 rounded-xl border border-surface bg-gradient-to-br from-primary/10 to-accent/10 mb-6 flex flex-col items-center justify-center gap-2 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(var(--primary-rgb),0.05),rgba(var(--accent-rgb),0.08))]" />
                  <span className="text-xs uppercase tracking-[0.28em] font-semibold text-primary z-10 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/10">
                    {item.tag}
                  </span>
                  <p className="text-[10px] text-[color:var(--text-muted)] z-10 text-center px-4 leading-snug">
                    {imagePlaceholders[index]}
                  </p>
                </div>
                <h3 className="text-xl font-bold text-[color:var(--text-primary)] mb-3">
                  {item.title}
                </h3>
                <p className="text-[color:var(--text-secondary)] leading-relaxed flex-1">
                  {item.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
