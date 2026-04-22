import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Card } from '@/components/Card'

export const TrustSection: React.FC = () => {
  const { t } = useTranslation()
  const trustItems = t('trust.items', { returnObjects: true }) as Array<{
    title: string
    description: string
  }>

  return (
    <section id="trust" className="py-20 px-4 sm:px-6 lg:px-8 bg-surface-strong">
      <div className="max-w-[1440px] mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-[color:var(--text-primary)] mb-4">
            {t('trust.title')}
          </h2>
          <p className="text-xl text-[color:var(--text-secondary)] max-w-2xl mx-auto">
            {t('trust.subtitle')}
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-4">
          {trustItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card hover className="h-full border-primary/20">
                <div className="mb-4 w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-2xl font-bold">
                  ✓
                </div>
                <h3 className="text-xl font-bold text-[color:var(--text-primary)] mb-3">
                  {item.title}
                </h3>
                <p className="text-[color:var(--text-secondary)] leading-relaxed">
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
