import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
import { useTranslation } from 'react-i18next';

const scrollToTop = (e: React.MouseEvent) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const navToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      sessionStorage.setItem('scrollTarget', id);
      navigate('/');
    }
  };

  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="brand">
              <Logo size={30} />
              <div className="brand-name">Mariana Leus<span className="dim">&nbsp;· performance</span></div>
            </div>
            <p>{t('footer.tagline')}</p>
          </div>
          <div className="footer-col">
            <h5>{t('footer.services')}</h5>
            <Link to="/services/meta-ads">Meta Ads</Link>
            <Link to="/services/google-ads">Google Ads</Link>
            <Link to="/services/web-dev">Web Dev</Link>
            <Link to="/services/smm">SMM</Link>
            <Link to="/services/seo">SEO</Link>
          </div>
          <div className="footer-col">
            <h5>{t('footer.studio')}</h5>
            <a href="/#work" onClick={navToSection('work')}>{t('footer.caseStudies')}</a>
            <Link to="/about">{t('footer.about') || 'About'}</Link>
            <a href="/#testimonials" onClick={navToSection('testimonials')}>{t('footer.clients')}</a>
            <a href="/#contact" onClick={navToSection('contact')}>{t('footer.contact') || 'Contact'}</a>
          </div>
          <div className="footer-col">
            <h5>{t('footer.elsewhere')}</h5>
            <a href="https://t.me/marianaleus" target="_blank" rel="noopener noreferrer">Telegram</a>
            <a href="https://instagram.com/marianaleus" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://facebook.com/marianaleus" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://wa.me/" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
        </div>
        <div className="giant-type">
          <span className="giant-desktop">Mariana Leus</span>
          <span className="giant-mobile">Mariana L.</span>
        </div>
        <div className="footer-bottom">
          <div>{t('footer.copyright')}</div>
          <div>{t('footer.location')}</div>
          <div><a href="#top" onClick={scrollToTop}>{t('footer.backToTop')}</a></div>
        </div>
      </div>
    </footer>
  );
};
