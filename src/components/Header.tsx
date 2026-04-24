import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '@/hooks/useTheme'
import { Button } from '@/components/Button'
import clsx from 'clsx'

type NavItem =
  | { label: string; id: string; href?: undefined }
  | { label: string; href: string; id?: undefined }

export const Header: React.FC = () => {
  const { t, i18n } = useTranslation()
  const { theme, toggleTheme } = useTheme()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  const navItems: NavItem[] = [
    { label: t('header.services'), id: 'services' },
    { label: t('header.process'), id: 'process' },
    { label: t('header.results'), id: 'results' },
    { label: t('header.testimonials'), id: 'testimonials' },
    { label: t('header.faq'), id: 'faq' },
    { label: t('header.about'), href: '/about' },
  ]

  const handleLogoClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      window.location.href = '/'
    }
  }

  const languages = ['ua', 'ru', 'en']

  const scrollToSection = (id: string) => {
    if (location.pathname === '/') {
      const element = document.getElementById(id)
      element?.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.location.href = `/#${id}`
    }
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
        'backdrop-blur-sm border-b transition-colors duration-300',
        'border-surface'
      )}
      style={{ backgroundColor: 'rgba(var(--surface-rgb), 0.92)' }}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Brand */}
          <button onClick={handleLogoClick} className="flex items-center space-x-3 focus-visible:outline-none">
            <img src="/logo.svg" alt="Mariana Leus" className="w-10 h-10 hover:scale-110 transition-transform duration-300" />
            <div className="hidden sm:flex flex-col text-center">
              <span className="font-bold text-xxs tracking-widest text-[color:var(--text-primary)]">MARIANA LEUS</span>
              <div className="flex items-center space-x-2">
                <div className="h-px w-6 bg-primary"></div>
                <span className="text-xs text-primary font-medium tracking-wide mt-0.5 items-center">DIGITAL MARKETING</span>
                <div className="h-px w-6 bg-primary"></div>
              </div>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) =>
              item.href ? (
                <Link
                  key={item.href}
                  to={item.href}
                  className="px-3 py-2 text-sm font-medium text-[color:var(--text-secondary)] hover:text-primary transition-colors duration-200 rounded-md"
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id!)}
                  className="px-3 py-2 text-sm font-medium text-[color:var(--text-secondary)] hover:text-primary transition-colors duration-200 rounded-md"
                >
                  {item.label}
                </button>
              )
            )}
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
                      : 'text-[color:var(--text-secondary)] hover:text-primary'
                  )}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg transition-all duration-300 hover:bg-[rgba(var(--border),0.12)] group"
              aria-label="Toggle theme"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="5" fill="currentColor" />
                  <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-slate-700 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
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
              className="lg:hidden p-2 rounded-lg transition-colors duration-200 hover:bg-[rgba(var(--border),0.16)]"
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
            {navItems.map((item) =>
              item.href ? (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-left px-4 py-2 text-sm font-medium text-[color:var(--text-secondary)] hover:text-primary transition-colors duration-200 rounded-md"
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id!)}
                  className="block w-full text-left px-4 py-2 text-sm font-medium text-[color:var(--text-secondary)] hover:text-primary transition-colors duration-200 rounded-md"
                >
                  {item.label}
                </button>
              )
            )}
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
