import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/hooks/useTheme'
import { Button } from '@/components/Button'
import clsx from 'clsx'

export const Header: React.FC = () => {
  const { t, i18n } = useTranslation()
  const { theme, toggleTheme } = useTheme()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { label: t('header.hero'), id: 'hero' },
    { label: t('header.services'), id: 'services' },
    { label: t('header.process'), id: 'process' },
    { label: t('header.results'), id: 'results' },
    { label: t('header.trust'), id: 'trust' },
    { label: t('header.testimonials'), id: 'testimonials' },
    { label: t('header.blog'), id: 'blog' },
  ]

  const languages = ['ua', 'ru', 'en']

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
    setIsMobileMenuOpen(false)
  }

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
    localStorage.setItem('language', lang)
  }

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-50',
        'bg-dark-card/90 dark:bg-dark-card/90 light:bg-light-card/90',
        'backdrop-blur-sm border-b border-dark-border/50 dark:border-dark-border/50 light:border-light-border',
        'transition-colors duration-300'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center font-bold text-white">
              T
            </div>
            <span className="hidden sm:inline font-bold text-lg text-white">{t('common.tagline')}</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-primary transition-colors duration-200 rounded-md"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="flex gap-1">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => changeLanguage(lang)}
                  className={clsx(
                    'px-2 py-1 text-xs font-semibold rounded transition-colors duration-200',
                    i18n.language === lang
                      ? 'bg-primary text-white'
                      : 'text-gray-400 hover:text-primary'
                  )}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-dark-border transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l-2.828-2.829a1 1 0 00-1.414 1.414l2.828 2.829a1 1 0 001.414-1.414zM2.05 6.464a1 1 0 00-1.414 1.414l2.828 2.829a1 1 0 101.414-1.414L2.05 6.464zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 17.464l-2.828-2.829a1 1 0 00-1.414 1.414l2.828 2.829a1 1 0 001.414-1.414zM5 7a1 1 0 000 2H4a1 1 0 000-2h1zm7-4a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            {/* Contact CTA */}
            <Button
              variant="primary"
              size="sm"
              onClick={() => scrollToSection('contact')}
              className="hidden sm:inline-block"
            >
              {t('contact.title')}
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-dark-border transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden pb-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-300 hover:text-primary transition-colors duration-200 rounded-md"
              >
                {item.label}
              </button>
            ))}
            <Button
              variant="primary"
              size="sm"
              onClick={() => scrollToSection('contact')}
              className="w-full"
            >
              {t('contact.title')}
            </Button>
          </nav>
        )}
      </div>
    </header>
  )
}
