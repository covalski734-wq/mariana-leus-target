import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Card } from '@/components/Card'

export const TestimonialsSection: React.FC = () => {
  const { t } = useTranslation()
  const testimonials = t('testimonials.items', { returnObjects: true }) as Array<{ name: string; company: string; text: string }>

  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-surface">
      <div className="max-w-[1440px] mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-[color:var(--text)] mb-4">{t('testimonials.title')}</h2>
          <p className="text-xl text-muted max-w-2xl mx-auto">{t('blog.subtitle')}</p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card hover className="h-full bg-gradient-to-br from-surface-strong to-surface/80 border-primary/20">
                <div className="mb-6 flex items-center gap-3 text-primary">
                  <span className="text-3xl">“</span>
                  <p className="text-sm uppercase tracking-[0.24em] font-semibold">{item.company}</p>
                </div>
                <p className="text-gray-300 leading-relaxed mb-6">{item.text}</p>
                <p className="text-[color:var(--text)] font-semibold">{item.name}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
