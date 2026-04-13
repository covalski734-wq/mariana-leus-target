import React from 'react'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'

export const Footer: React.FC = () => {
  const { t } = useTranslation()
  const contacts = [
    {
      name: 'Phone',
      icon: '📱',
      link: 'tel:+1234567890',
      value: '+1 (234) 567-890',
    },
    {
      name: 'Telegram',
      icon: '✈️',
      link: 'https://t.me/targetologist',
      value: '@targetologist',
    },
    {
      name: 'Instagram',
      icon: '📸',
      link: 'https://instagram.com/targetologist',
      value: '@targetologist',
    },
    {
      name: 'Email',
      icon: '📧',
      link: 'mailto:info@targetologist.com',
      value: 'info@targetologist.com',
    },
    {
      name: 'WhatsApp',
      icon: '💬',
      link: 'https://wa.me/1234567890',
      value: '+1 (234) 567-890',
    },
  ]

  return (
    <footer className={clsx('bg-surface-strong border-t border-surface', 'transition-colors duration-300', 'mt-20 py-12')}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contact Links */}
        <div className="mb-12">
          <h3 className="text-lg font-bold text-[color:var(--text-primary)] mb-6">{t('footer.contact')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {contacts.map((contact) => (
              <a
                key={contact.name}
                href={contact.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-lg bg-surface border border-surface transition-all duration-200 hover:border-primary/40 hover:bg-[rgba(var(--primary-rgb),0.05)]"
              >
                <span className="text-2xl">{contact.icon}</span>
                <div>
                  <p className="text-xs text-[color:var(--text-secondary)]">{contact.name}</p>
                  <p className="text-sm font-semibold text-[color:var(--text-primary)] truncate">{contact.value}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Social Proof */}
        <div className="grid grid-cols-3 md:grid-cols-4 gap-6 lg:gap-8 py-10 lg:py-12 border-y border-surface">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">150+</p>
            <p className="text-sm text-[color:var(--text-secondary)]">Happy Clients</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">8+</p>
            <p className="text-sm text-[color:var(--text-secondary)]">Years Experience</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">320%</p>
            <p className="text-sm text-[color:var(--text-secondary)]">Avg ROI</p>
          </div>
          <div className="text-center hidden md:block">
            <p className="text-2xl font-bold text-primary">24/7</p>
            <p className="text-sm text-[color:var(--text-secondary)]">Support</p>
          </div>
        </div>

        {/* Links and Copyright */}
        <div className="mt-10 lg:mt-12 pt-6 lg:pt-8 border-t border-surface/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex gap-6 lg:gap-8 text-sm text-[color:var(--text-secondary)]">
              <a href="#" className="hover:text-primary transition-colors duration-200">
                {t('footer.privacy')}
              </a>
              <a href="#" className="hover:text-primary transition-colors duration-200">
                {t('footer.terms')}
              </a>
            </div>
            <p className="text-sm text-[color:var(--text-secondary)]">© 2024 Targetologist. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
