import React, { useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IconArrow } from '@/components/Icons';
import { useTranslation } from 'react-i18next';

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Set initial hidden state before scroll handler runs
  useEffect(() => {
    if (photoRef.current) photoRef.current.style.setProperty('--ap', '1');
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current || !photoRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      // Start animating when section enters bottom of viewport, complete when section center reaches 60% of viewport
      const progress = Math.max(0, Math.min(1, (vh - rect.top) / (vh * 0.7)));
      photoRef.current.style.setProperty('--ap', String(1 - progress));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleWorkWithMe = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.location.pathname === '/') {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      sessionStorage.setItem('scrollTarget', 'contact');
      navigate('/');
    }
  };

  return (
    <section className="about" id="about" ref={sectionRef}>
      <div className="container">
        <div className="about-grid">
          {/* Photo column */}
          <div className="about-photo" ref={photoRef}>
            <img src="/mariana.jpg" alt="Mariana Leus" />
            <div className="about-badge">
              <span className="dot" />
              {t('about.badge')}
            </div>
          </div>

          {/* Text column */}
          <div className="about-text reveal">
            <div className="section-num">{t('about.sectionNum')}</div>
            <h2>{t('about.title')}</h2>
            <p>{t('about.p1')}</p>
            <p>{t('about.p2')}</p>
            <p>{t('about.p3')}</p>

            <div className="about-stats">
              <div className="about-stat">
                <div className="v">{t('about.yearsVal')}</div>
                <div className="l">{t('about.yearsLabel')}</div>
              </div>
              <div className="about-stat">
                <div className="v">{t('about.managedVal')}</div>
                <div className="l">{t('about.managedLabel')}</div>
              </div>
              <div className="about-stat">
                <div className="v">{t('about.brandsVal')}</div>
                <div className="l">{t('about.brandsLabel')}</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="/#contact" onClick={handleWorkWithMe} className="btn btn-ghost">
                {t('about.cta')} <IconArrow size={16} className="arrow" />
              </a>
              <Link to="/about" className="btn btn-ghost">
                {t('about.ctaAbout')} <IconArrow size={16} className="arrow" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
