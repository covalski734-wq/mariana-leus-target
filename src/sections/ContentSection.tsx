import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Card } from '@/components/Card'

export const ContentSection: React.FC = () => {
  const { t } = useTranslation()
  const contentItems = t('blog.items', { returnObjects: true }) as Array<{ title: string; description: string; tag: string }>

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
          <h2 className="text-4xl lg:text-5xl font-bold text-[color:var(--text)] mb-4">{t('blog.title')}</h2>
          <p className="text-xl text-muted max-w-2xl mx-auto">{t('blog.subtitle')}</p>
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
              <Card hover className="group overflow-hidden">
                {/* IMAGE PROMPT: marketing reels preview block, dark neon analytics, premium B2B agency visual */}
                <div className="h-48 rounded-3xl bg-gradient-to-br from-primary/15 to-accent/15 mb-6 flex items-end p-6">
                  <div className="text-[color:var(--text)] text-sm uppercase tracking-[0.32em] font-semibold bg-[rgba(var(--surface-strong-rgb),0.2)] px-3 py-2 rounded-full">
                    {item.tag}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-[color:var(--text)] mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
