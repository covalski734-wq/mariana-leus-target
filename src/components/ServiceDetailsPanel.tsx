import React from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ServiceItem } from './ServiceCard'

const SERVICE_SLUG: Record<string, string> = {
  metaAds: 'meta-ads',
  googleAds: 'google-ads',
  smm: 'smm',
  audit: 'audit',
  webDev: 'web-dev',
}

interface ServiceDetailsPanelProps {
  service: ServiceItem
}

export const ServiceDetailsPanel: React.FC<ServiceDetailsPanelProps> = ({ service }) => {
  const { t } = useTranslation()
  return (
    <AnimatePresence mode="wait">
      <motion.section
        key={service.key}
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
        className="overflow-hidden rounded-[2rem] border border-surface bg-surface-strong p-8 shadow-2xl"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.26em] text-primary/80">{service.name}</p>
            <h3 className="mt-3 text-3xl font-semibold text-[color:var(--text-primary)] sm:text-4xl">
              {service.details}
            </h3>
            <p className="mt-4 max-w-2xl text-base leading-8 text-[color:var(--text-secondary)]">
              {service.description}
            </p>
          </div>
          <div className="rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 text-sm text-[color:var(--text-secondary)]">
            <p className="font-semibold text-[color:var(--text-primary)]">What you get:</p>
            <ul className="mt-4 space-y-3 list-disc pl-5">
              {service.benefits.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-surface flex justify-end">
          <Link
            to={`/services/${SERVICE_SLUG[service.key] ?? service.key}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:opacity-80 transition-opacity"
          >
            {t('services.viewPage')}
          </Link>
        </div>
      </motion.section>
    </AnimatePresence>
  )
}
