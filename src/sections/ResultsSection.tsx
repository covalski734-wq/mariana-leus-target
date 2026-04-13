import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Card } from '@/components/Card'

export const ResultsSection: React.FC = () => {
  const { t } = useTranslation()
  const metrics = t('results.metrics', { returnObjects: true }) as Array<{ value: string; label: string }>

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="results" className="py-20 px-4 sm:px-6 lg:px-8 bg-surface">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-[color:var(--text)] mb-4">{t('results.title')}</h2>
          <p className="text-xl text-muted">{t('results.subtitle')}</p>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {metrics.map((metric, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card hover className="text-center h-full flex flex-col justify-center">
                <motion.p
                  className="text-5xl font-bold text-primary mb-2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  {metric.value}
                </motion.p>
                <p className="text-gray-300 text-lg font-medium">{metric.label}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonial Preview */}
        <motion.div
          className="mt-16 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/30 rounded-lg p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-gray-300 italic mb-4">
            "The best return on investment I've ever had. Increased our revenue by 280% in just 3 months!"
          </p>
          <p className="text-sm font-semibold text-primary">John Smith - CEO, TechStart</p>
        </motion.div>
      </div>
    </section>
  )
}
