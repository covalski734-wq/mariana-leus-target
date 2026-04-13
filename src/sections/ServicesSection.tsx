import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Card } from '@/components/Card'

export const ServicesSection: React.FC = () => {
  const { t } = useTranslation()
  const services = t('services.items', { returnObjects: true }) as Array<{ name: string; description: string }>

  const serviceIcons = {
    'Meta Ads': '📱',
    'Google Ads': '🔍',
    'SMM': '📲',
    'Аудит': '📊',
    'Audit': '📊',
  } as Record<string, string>

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
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-card/30">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">{t('services.title')}</h2>
          <p className="text-xl text-gray-400">{t('services.subtitle')}</p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants} whileHover={{ scale: 1.05 }}>
              <Card hover className="h-full flex flex-col">
                <motion.div
                  className="text-5xl mb-4"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  {serviceIcons[service.name] || '⭐'}
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-2">{service.name}</h3>
                <p className="text-gray-400 text-sm flex-grow">{service.description}</p>
                <div className="mt-4 pt-4 border-t border-dark-border/50">
                  <a href="#contact" className="text-primary hover:text-primary/80 text-sm font-semibold">
                    Learn more →
                  </a>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
