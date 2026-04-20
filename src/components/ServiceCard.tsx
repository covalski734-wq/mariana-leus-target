import React from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'

export interface ServiceItem {
  key: string
  icon: React.ReactNode
  name: string
  description: string
  details: string
  benefits: string[]
}

interface ServiceCardProps {
  service: ServiceItem
  active: boolean
  isMobile: boolean
  onToggle: () => void
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, active, isMobile, onToggle }) => {
  return (
    <motion.button
      type="button"
      layout
      onClick={onToggle}
      whileHover={{ y: active ? 0 : -3 }}
      className={clsx(
        'relative flex flex-col rounded-2xl border border-surface card-shell p-5 text-left shadow-sm transition-all duration-300 h-full',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70',
        active ? 'border-primary ring-1 ring-primary/25 shadow-md bg-surface' : 'hover:shadow-md hover:border-surface',
        isMobile ? 'min-h-auto' : 'min-h-[280px]'
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="text-4xl service-icon">{service.icon}</div>
        <span className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs uppercase tracking-[0.32em] text-primary">
          {service.key === 'webDev' ? 'Web Dev' : service.name}
        </span>
      </div>

      <div className="mt-6 space-y-4 flex-1">
        <h3 className="text-2xl font-semibold text-[color:var(--text-primary)]">{service.name}</h3>
        <p className="text-sm leading-relaxed text-[color:var(--text-secondary)]">{service.description}</p>
      </div>

      <div className="mt-6 flex items-end justify-between gap-4">
        <span className="text-sm font-semibold text-primary">{active ? 'Selected' : 'Learn more →'}</span>
        <span className="text-xs uppercase tracking-[0.3em] text-[color:var(--text-secondary)]">{isMobile ? 'Tap for details' : 'Details'}</span>
      </div>

      {isMobile && active && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-6 overflow-hidden rounded-3xl border border-surface p-4 bg-surface-strong"
        >
          <p className="text-sm font-semibold text-[color:var(--text-primary)] mb-3">{service.details}</p>
          <ul className="space-y-2 text-sm text-[color:var(--text-secondary)] list-disc list-inside">
            {service.benefits.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.button>
  )
}
