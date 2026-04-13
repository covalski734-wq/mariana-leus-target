import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

export const ProcessSection: React.FC = () => {
  const { t } = useTranslation()
  const steps = t('process.steps', { returnObjects: true }) as Array<{ number: string; title: string; description: string }>

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="process" className="py-20 px-4 sm:px-6 lg:px-8 bg-surface">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-[color:var(--text)] mb-4">{t('process.title')}</h2>
          <p className="text-xl text-muted">{t('process.subtitle')}</p>
        </motion.div>

        {/* Steps */}
        <motion.div
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ x: 10 }}
              className="relative"
            >
              <div className="flex gap-6">
                {/* Step Number */}
                <motion.div
                  className="relative"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center font-bold text-xl text-white flex-shrink-0">
                    {step.number}
                  </div>
                  
                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-1 h-20 bg-gradient-to-b from-primary to-transparent"></div>
                  )}
                </motion.div>

                {/* Content */}
                <div className="flex-1 pt-2">
                  <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-lg">{step.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-16 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/30 rounded-lg p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-gray-300 mb-4">
            Ready to start your journey to higher ROI?
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            Schedule Your Free Audit Today
          </a>
        </motion.div>
      </div>
    </section>
  )
}
