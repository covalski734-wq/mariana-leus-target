import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IconArrow } from '@/components/Icons';
import { useTranslation } from 'react-i18next';

// ── Sub-components ────────────────────────────────────────────────────────────

const AboutHero: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const goToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    sessionStorage.setItem('scrollTarget', 'contact');
    navigate('/');
  };
  const goToServices = (e: React.MouseEvent) => {
    e.preventDefault();
    sessionStorage.setItem('scrollTarget', 'services');
    navigate('/');
  };
  return (
    <section className="ab-hero">
      <div className="mesh" aria-hidden="true">
        <div className="blob b1" /><div className="blob b2" />
        <div className="blob b3" /><div className="blob b4" />
      </div>
      <div className="hero-bgtype"><span>ABOUT</span></div>
      <div className="container">
        <div style={{ position: 'relative', zIndex: 3, marginBottom: 32 }}>
          <div className="crumb" style={{ font: '500 11px/1 var(--mono)', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--fg-mute)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <Link to="/">{t('aboutPage.home')}</Link>
            <span style={{ margin: '0 6px', opacity: .5 }}>/</span>
            {t('aboutPage.crumb')}
          </div>
        </div>
        <div className="ab-hero-grid">
          <div>
            <h1 style={{ marginBottom: 16 }}>
              {t('aboutPage.heroPrefix')}<span className="italic">{t('aboutPage.heroItalic')}</span>{t('aboutPage.heroMiddle')}<span className="underline">{t('aboutPage.heroUnderline')}</span>
            </h1>
            <p style={{ font: '400 clamp(1rem,2vw,1.25rem)/1.5 var(--display)', color: 'var(--fg-dim)', maxWidth: 480 }}>
              {t('aboutPage.heroSub')}
            </p>
          </div>
          <div className="ab-hero-photo">
            <img src="/mariana.jpg" alt="Mariana Leus portrait" loading="lazy" />
            <div className="ab-photo-cap">{t('aboutPage.photoCaption')}</div>
          </div>
        </div>
        <div style={{ marginTop: 40, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a href="/#contact" onClick={goToContact} className="btn btn-primary">
            {t('aboutPage.ctaBook')} <IconArrow size={14} className="arrow" />
          </a>
          <a href="/#services" onClick={goToServices} className="btn btn-ghost">
            {t('aboutPage.ctaServices')} <IconArrow size={14} className="arrow" />
          </a>
        </div>
      </div>
    </section>
  );
};

const AboutIntro: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="ab-intro">
      <div className="container">
        <div>
          <div className="label">{t('aboutPage.introLabel')}</div>
        </div>
        <div className="prose">
          <p>{t('aboutPage.intro1')}</p>
          <p>{t('aboutPage.intro2')}</p>
          <p>{t('aboutPage.intro3')}</p>
        </div>
      </div>
    </section>
  );
};

const TimelineSection: React.FC = () => {
  const { t } = useTranslation();
  const timeline = t('aboutPage.timeline', { returnObjects: true }) as Array<{
    year: string; role: string; title: string; text: string; current?: boolean;
  }>;
  return (
    <section className="ab-timeline">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <div className="section-num">{t('aboutPage.timelineNum')}</div>
            <h2>{t('aboutPage.timelineTitle')}</h2>
          </div>
          <div className="side">{t('aboutPage.timelineDesc')}</div>
        </div>
        <div className="tl-list reveal">
          {timeline.map((item, i) => (
            <div key={i} className={'tl-item' + (item.current ? ' current' : '')}>
              <div className="tl-year">{item.year}</div>
              <div className="tl-body">
                <div className="tl-role">{item.role}</div>
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PrinciplesSection: React.FC = () => {
  const { t } = useTranslation();
  const principles = t('aboutPage.principles', { returnObjects: true }) as Array<{
    n: string; t: string; d: string;
  }>;
  return (
    <section className="ab-principles">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <div className="section-num">{t('aboutPage.principlesNum')}</div>
            <h2>{t('aboutPage.principlesTitle')}</h2>
          </div>
          <div className="side">{t('aboutPage.principlesDesc')}</div>
        </div>
        <div className="pr-grid reveal">
          {principles.map((p, i) => (
            <div key={i} className="pr-cell">
              <div className="n">{p.n}</div>
              <div className="t">{p.t}</div>
              <div className="d">{p.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ToolkitSection: React.FC = () => {
  const { t } = useTranslation();
  const tools = t('aboutPage.tools', { returnObjects: true }) as Array<{
    group: string; items: string[];
  }>;
  return (
    <section className="ab-tools">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <div className="section-num">{t('aboutPage.toolkitNum')}</div>
            <h2>{t('aboutPage.toolkitTitle')}</h2>
          </div>
          <div className="side">{t('aboutPage.toolkitDesc')}</div>
        </div>
        <div className="tool-groups reveal">
          {tools.map((g, i) => (
            <div key={i} className="tool-group">
              <h4>{g.group}</h4>
              <div className="tool-chips">
                {g.items.map((item: string) => <span key={item} className="tool-chip">{item}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutQuote: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="ab-quote">
      <div className="container">
        <div className="reveal">
          <div className="q-mark">&ldquo;</div>
          <blockquote>{t('aboutPage.quote')}</blockquote>
          <cite>{t('aboutPage.quoteSource')}</cite>
        </div>
      </div>
    </section>
  );
};

const AboutCta: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const goToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    sessionStorage.setItem('scrollTarget', 'contact');
    navigate('/');
  };
  const goToServices = (e: React.MouseEvent) => {
    e.preventDefault();
    sessionStorage.setItem('scrollTarget', 'services');
    navigate('/');
  };
  return (
    <section className="cta-band">
      <div className="mesh" aria-hidden="true">
        <div className="blob b1" /><div className="blob b2" /><div className="blob b3" />
      </div>
      <div className="container">
        <div className="cta-band-inner">
          <h3>
            {t('aboutPage.ctaTitle1')}<br />
            {t('aboutPage.ctaTitle2')}<br />
            {t('aboutPage.ctaTitle3')} <span className="italic">{t('aboutPage.ctaItalic')}</span> {t('aboutPage.ctaTitle4')}
          </h3>
          <div className="ctas">
            <a href="/#contact" onClick={goToContact} className="btn btn-primary">
              {t('aboutPage.ctaBook')} <IconArrow size={14} className="arrow" />
            </a>
            <a href="/#services" onClick={goToServices} className="btn btn-ghost">
              {t('aboutPage.ctaServices')} <IconArrow size={14} className="arrow" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// ── Page ─────────────────────────────────────────────────────────────────────

export const AboutPage: React.FC = () => (
  <>
    <AboutHero />
    <AboutIntro />
    <TimelineSection />
    <PrinciplesSection />
    <ToolkitSection />
    <AboutQuote />
    <AboutCta />
  </>
);
