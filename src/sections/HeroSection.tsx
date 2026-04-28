import React, { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Counter } from '@/components/Counter';
import { IconArrow } from '@/components/Icons';
import { useTranslation } from 'react-i18next';
import { Logo } from '@/components/Logo';

// Mobile-only entrance curtain — shown once per session
const HeroCurtain: React.FC = () => {
  const [visible, setVisible] = useState(() => !sessionStorage.getItem('hero-seen'));

  useEffect(() => {
    if (!visible) return;
    sessionStorage.setItem('hero-seen', '1');
    // Remove from DOM after animation finishes (panel lifts at 0.55s + 0.85s = ~1.45s)
    const t = setTimeout(() => setVisible(false), 1600);
    return () => clearTimeout(t);
  }, [visible]);

  if (!visible) return null;
  return createPortal(
    <div className="hero-curtain" aria-hidden="true">
      <div className="hero-curtain-logo">
        <Logo size={56} />
      </div>
      <div className="hero-curtain-panel" />
    </div>,
    document.body
  );
};

export const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const [scrollPct, setScrollPct] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    const onScroll = () => {
      const h = heroRef.current?.offsetHeight ?? window.innerHeight;
      const pct = Math.min(1, window.scrollY / h);
      setScrollPct(pct);
      document.documentElement.style.setProperty('--sp', String(pct));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
    <HeroCurtain />
    <section className="hero" id="top" ref={heroRef}>
      {/* Animated scan lines */}
      <div className="hero-lines">
        <span /><span /><span /><span /><span />
      </div>

      {/* Gradient mesh */}
      <div className="mesh">
        <div className="blob b1" />
        <div className="blob b2" />
        <div className="blob b3" />
        <div className="blob b4" />
      </div>

      {/* Grid overlay */}
      <div className="grid-overlay" />

      {/* Giant background wordmark */}
      <div className="hero-bgtype"><span>PERFORMANCE</span></div>

      <div className="container hero-stack">
        {/* Eyebrow rail */}
        <div className="hero-meta-rail reveal in">
          <div className="eyebrow">
            <span className="dot pulse" />
            {t('hero.eyebrow')}
          </div>
          <div className="rule" />
          <span className="hero-sig">{t('hero.sig')}</span>
        </div>

        {/* Main headline */}
        <h1 className="hero-headline reveal in">
          <span className="line">{t('hero.line1')} <em className="italic">{t('hero.italic')}</em></span>
          <span className="line">{t('hero.line2')} <span className="accent">{t('hero.accent')}</span>.</span>
        </h1>

        {/* Sub-row: description + CTAs */}
        <div className="hero-sub-row">
          <p className="hero-sub reveal in">
            {t('hero.sub')}
          </p>
          <div className="hero-cta reveal in">
            <a href="/#contact" onClick={scrollTo('contact')} className="btn btn-primary">
              {t('hero.ctaPrimary')} <IconArrow size={16} className="arrow" />
            </a>
            <a href="/#work" onClick={scrollTo('work')} className="btn btn-ghost">
              {t('hero.ctaSecondary')}
            </a>
          </div>
        </div>

        {/* Ribbon metrics */}
        <div className="hero-ribbon reveal in">
          <div className="ribbon-cell">
            <div className="metric-label">{t('hero.roas')}</div>
            <div className="metric-value">
              <Counter to={4.7} suffix="×" />
            </div>
            <div className="metric-delta">{t('hero.roasDelta')}</div>
          </div>
          <div className="ribbon-divider" />
          <div className="ribbon-cell">
            <div className="metric-label">{t('hero.leads')}</div>
            <div className="metric-value">
              <Counter to={840} suffix="+" />
            </div>
            <div className="metric-delta">{t('hero.leadsDelta')}</div>
          </div>
          <div className="ribbon-divider" />
          <div className="ribbon-cell">
            <div className="metric-label">{t('hero.managed')}</div>
            <div className="metric-value">
              €<Counter to={2.4} suffix="M" />
            </div>
            <div className="metric-delta">{t('hero.managedDelta')}</div>
          </div>
          <div className="ribbon-divider" />
          <div className="ribbon-cell">
            <div className="metric-label">{t('hero.reply')}</div>
            <div className="metric-value">{t('hero.replyValue')}</div>
            <div className="metric-delta">{t('hero.replyDelta')}</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator" style={{ opacity: 1 - scrollPct * 3 }}>
        <span className="si-label">{t('hero.scroll')}</span>
        <div className="si-track"><div className="si-dot" /></div>
      </div>
    </section>
    </>
  );
};
