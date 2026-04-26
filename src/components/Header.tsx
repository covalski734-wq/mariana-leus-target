import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { IconSun, IconMoon, IconArrow } from './Icons';
import { useTranslation } from 'react-i18next';

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
  const { t, i18n } = useTranslation();
  const lang = i18n.language.toUpperCase() as 'EN' | 'UA' | 'RU';
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileOpen(false);
    if (location.pathname !== '/') {
      sessionStorage.setItem('scrollTarget', id);
      navigate('/');
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header className={'nav' + (scrolled ? ' scrolled' : '')}>
      <div className="container nav-inner">
        <Link to="/" className="brand">
          <Logo size={26} />
          <div className="brand-name">Mariana Leus<span className="dim">&nbsp;· performance</span></div>
        </Link>
        <nav className="links" aria-label="Primary">
          <Link to="/services">{t('header.services')}</Link>
          <a href="/#work" onClick={scrollTo('work')}>{t('header.work')}</a>
          <Link to="/about">{t('header.about')}</Link>
          <a href="/#contact" onClick={scrollTo('contact')}>{t('header.contact')}</a>
        </nav>
        <div className="nav-right">
          <div className="lang" role="tablist" aria-label="Language">
            {(['EN', 'UA', 'RU'] as const).map(l => (
              <button key={l} className={lang === l ? 'active' : ''} onClick={() => i18n.changeLanguage(l.toLowerCase())}>{l}</button>
            ))}
          </div>
          <button className="icon-btn" aria-label="Toggle theme" onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? <IconSun size={16} /> : <IconMoon size={16} />}
          </button>
          <a href="/#contact" onClick={scrollTo('contact')} className="btn btn-primary" style={{ padding: '10px 16px', fontSize: 13 }}>
            {t('header.bookCall')} <IconArrow size={14} className="arrow" />
          </a>
          <button className="hamburger" aria-label="Menu" onClick={() => setMobileOpen(o => !o)}>
            <span /><span /><span />
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="mobile-nav">
          <button className="mobile-nav-close" onClick={() => setMobileOpen(false)} aria-label="Close menu">✕</button>
          <div className="mobile-nav-links">
            <Link to="/services" onClick={() => setMobileOpen(false)}>{t('header.services')}</Link>
            <button className="mobile-link" onClick={scrollTo('work')}>{t('header.work')}</button>
            <Link to="/about" onClick={() => setMobileOpen(false)}>{t('header.about')}</Link>
            <button className="mobile-link" onClick={scrollTo('contact')}>{t('header.contact')}</button>
          </div>
          <div className="mobile-nav-bottom">
            <div className="mobile-lang">
              {(['EN', 'UA', 'RU'] as const).map(l => (
                <button
                  key={l}
                  className={lang === l ? 'active' : ''}
                  onClick={() => { i18n.changeLanguage(l.toLowerCase()); setMobileOpen(false); }}
                >
                  {l}
                </button>
              ))}
            </div>
            <div className="mobile-nav-cta">
              <a href="/#contact" onClick={scrollTo('contact')} className="btn btn-primary">
                {t('header.bookCall')} <IconArrow size={14} className="arrow" />
              </a>
            </div>
            <button
              className="icon-btn"
              aria-label="Toggle theme"
              style={{ marginTop: 4 }}
              onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <IconSun size={18} /> : <IconMoon size={18} />}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
