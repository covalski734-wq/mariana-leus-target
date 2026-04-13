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
    <footer className={clsx('bg-dark-card border-t border-dark-border', 'transition-colors duration-300', 'mt-20 py-12')}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contact Links */}
        <div className="mb-12">
          <h3 className="text-lg font-bold text-white mb-6">{t('footer.contact')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {contacts.map((contact) => (
              <a
                key={contact.name}
                href={contact.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-lg bg-dark-border/30 hover:bg-dark-border/50 transition-colors duration-200"
              >
                <span className="text-2xl">{contact.icon}</span>
                <div>
                  <p className="text-xs text-gray-400">{contact.name}</p>
                  <p className="text-sm font-semibold text-white truncate">{contact.value}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Social Proof */}
        <div className="grid grid-cols-3 md:grid-cols-4 gap-8 py-12 border-y border-dark-border">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">150+</p>
            <p className="text-sm text-gray-400">Happy Clients</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">8+</p>
            <p className="text-sm text-gray-400">Years Experience</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">320%</p>
            <p className="text-sm text-gray-400">Avg ROI</p>
          </div>
          <div className="text-center hidden md:block">
            <p className="text-2xl font-bold text-primary">24/7</p>
            <p className="text-sm text-gray-400">Support</p>
          </div>
        </div>

        {/* Links and Copyright */}
        <div className="mt-12 pt-8 border-t border-dark-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex gap-8 text-sm text-gray-400">
              <a href="#" className="hover:text-primary transition-colors">
                {t('footer.privacy')}
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                {t('footer.terms')}
              </a>
            </div>
            <p className="text-sm text-gray-500">{t('footer.copyright')}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
