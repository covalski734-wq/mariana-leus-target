import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'

interface FAQItem {
  q: string
  a: string
}

const FAQRow: React.FC<{ item: FAQItem; index: number }> = ({ item, index }) => {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      viewport={{ once: true }}
      className="border-b border-surface last:border-b-0"
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
        aria-expanded={open}
      >
        <span className="text-base font-semibold text-[color:var(--text-primary)] group-hover:text-primary transition-colors duration-200">
          {item.q}
        </span>
        <span
          className="flex-shrink-0 w-8 h-8 rounded-full border border-surface flex items-center justify-center text-[color:var(--text-secondary)] group-hover:border-primary group-hover:text-primary transition-all duration-200"
          style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.25s ease, color 0.2s, border-color 0.2s' }}
          aria-hidden="true"
        >
          +
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-[color:var(--text-secondary)] leading-relaxed">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export const FAQSection: React.FC = () => {
  const { t } = useTranslation()
  const items = t('faq.items', { returnObjects: true }) as FAQItem[]

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-surface">
      <div className="max-w-[800px] mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: -18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-sm uppercase tracking-[0.32em] text-primary mb-3">{t('faq.label')}</p>
          <h2 className="text-4xl lg:text-5xl font-bold text-[color:var(--text-primary)] mb-4">
            {t('faq.title')}
          </h2>
          <p className="text-lg text-[color:var(--text-secondary)]">{t('faq.subtitle')}</p>
        </motion.div>

        <div
          className="rounded-2xl border border-surface px-6 sm:px-8"
          style={{ background: 'rgba(var(--surface-rgb), 0.6)', backdropFilter: 'blur(12px)' }}
        >
          {items.map((item, i) => (
            <FAQRow key={i} item={item} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.p
          className="text-center mt-10 text-[color:var(--text-secondary)]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          {t('faq.cta')}{' '}
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-primary font-semibold hover:underline"
          >
            {t('faq.ctaLink')}
          </button>
        </motion.p>
      </div>
    </section>
  )
}
