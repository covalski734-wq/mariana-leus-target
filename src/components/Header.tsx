import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { IconSun, IconMoon, IconArrow } from './Icons';
import { useLanguage } from '@/context/LanguageContext';

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
  const { lang, setLang, t } = useLanguage();
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

  // Apply reveal animation on scroll
  useEffect(() => {
    const els = document.querySelectorAll('.reveal:not(.in)');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  });

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      sessionStorage.setItem('scrollTarget', id);
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
              <button key={l} className={lang === l ? 'active' : ''} onClick={() => setLang(l)}>{l}</button>
            ))}
          </div>
          <button className="icon-btn" aria-label="Toggle theme" onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? <IconSun size={16} /> : <IconMoon size={16} />}
          </button>
          <a href="/#contact" onClick={scrollTo('contact')} className="btn btn-primary" style={{ padding: '10px 16px', fontSize: 13 }}>
            {t('header.bookCall')} <IconArrow size={14} className="arrow" />
          </a>
        </div>
      </div>
    </header>
  );
};
