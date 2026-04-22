import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ServiceCard, ServiceItem } from '@/components/ServiceCard'
import { ServiceDetailsPanel } from '@/components/ServiceDetailsPanel'

const SERVICE_SLUG: Record<string, string> = {
  metaAds: 'meta-ads',
  googleAds: 'google-ads',
  smm: 'smm',
  audit: 'audit',
  webDev: 'web-dev',
}
import {
  Campaign as CampaignIcon,
  Facebook as FacebookIcon,
  Google as GoogleIcon,
  QueryStats as QueryStatsIcon,
  ImportantDevices as ImportantDevicesIcon,
} from '@mui/icons-material'

const serviceIcons: Record<string, React.ReactNode> = {
  metaAds: <FacebookIcon />,
  googleAds: <GoogleIcon />,
  smm: <CampaignIcon />,
  audit: <QueryStatsIcon />,
  webDev: <ImportantDevicesIcon />,
}

export const ServicesSection: React.FC = () => {
  const { t } = useTranslation()
  const services = useMemo(() => {
    const items = t('services.items', { returnObjects: true }) as ServiceItem[]
    return items.map((item) => ({
      ...item,
      icon: serviceIcons[item.key] ?? '⭐',
      details: t(`services.details.${item.key}`),
      benefits: t(`services.benefits.${item.key}`, { returnObjects: true }) as string[],
    }))
  }, [t])

  const [activeKey, setActiveKey] = useState<string>('webDev')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)')
    const update = (event: MediaQueryListEvent | MediaQueryList) => setIsMobile(event.matches)
    update(mediaQuery)
    mediaQuery.addEventListener('change', update)
    return () => mediaQuery.removeEventListener('change', update)
  }, [])

  const activeService = services.find((service) => service.key === activeKey) ?? services[0]

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-surface-strong">
      <div className="max-w-[1440px] mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-sm uppercase tracking-[0.32em] text-primary mb-4">{t('services.label')}</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-[color:var(--text-primary)] mb-4">{t('services.title')}</h2>
          <p className="text-lg md:text-xl text-[color:var(--text-secondary)] max-w-3xl mx-auto">{t('services.subtitle')}</p>
        </motion.div>

        <div className="rounded-t-[2rem] border border-surface bg-surface-strong overflow-hidden">
          <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-5 p-6">
            {services.map((service) => (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <ServiceCard
                  service={service}
                  active={activeKey === service.key}
                  isMobile={isMobile}
                  onToggle={() => setActiveKey((current) => (current === service.key ? '' : service.key))}
                />
              </motion.div>
            ))}
          </div>

          {isMobile && activeKey && SERVICE_SLUG[activeKey] && (
            <div className="px-6 pb-6 text-center">
              <Link
                to={`/services/${SERVICE_SLUG[activeKey]}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:opacity-80 transition-opacity"
              >
                {t('services.viewPage')}
              </Link>
            </div>
          )}

          {!isMobile && activeService && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-surface px-6 py-8 rounded-b-[2rem] bg-surface"
            >
              <ServiceDetailsPanel service={activeService} />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
