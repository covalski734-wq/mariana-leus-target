import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Card } from '@/components/Card'

export const CaseStudiesSection: React.FC = () => {
  const { t } = useTranslation()
  const cases = t('caseStudies.items', { returnObjects: true }) as Array<{
    client: string
    industry: string
    challenge: string
    solution: string
    impact: string
    metric: string
  }>

  return (
    <section id="case-studies" className="py-20 px-4 sm:px-6 lg:px-8 bg-surface">
      <div className="max-w-[1440px] mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-sm uppercase tracking-[0.32em] text-primary mb-4">{t('caseStudies.title')}</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-[color:var(--text)] mb-4">{t('caseStudies.subtitle')}</h2>
          <p className="text-muted max-w-3xl mx-auto">{t('caseStudies.description')}</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {cases.map((item, index) => (
            <motion.div
              key={item.client}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-muted uppercase tracking-[0.24em]">{item.industry}</p>
                    <h3 className="text-2xl font-semibold text-[color:var(--text)] mt-2">{item.client}</h3>
                  </div>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">{item.metric}</span>
                </div>
                <div className="space-y-4 text-muted text-sm leading-relaxed">
                  <p>
                    <span className="font-semibold text-[color:var(--text)]">{t('caseStudies.challenge')} </span>
                    {item.challenge}
                  </p>
                  <p>
                    <span className="font-semibold text-[color:var(--text)]">{t('caseStudies.solution')} </span>
                    {item.solution}
                  </p>
                </div>
                <div className="mt-6 rounded-3xl bg-surface-strong p-4 text-sm text-[color:var(--text)]">
                  <p className="font-semibold text-[color:var(--text)] mb-2">{t('caseStudies.impact')}</p>
                  <p>{item.impact}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
