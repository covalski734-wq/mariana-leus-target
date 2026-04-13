import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ServiceItem } from './ServiceCard'

interface ServiceDetailsPanelProps {
  service: ServiceItem
}

export const ServiceDetailsPanel: React.FC<ServiceDetailsPanelProps> = ({ service }) => {
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
      </motion.section>
    </AnimatePresence>
  )
}
