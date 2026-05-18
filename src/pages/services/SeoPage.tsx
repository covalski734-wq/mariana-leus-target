import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IconCheck, IconArrow } from '@/components/Icons';

interface Deliverable { name: string; note: string; }
interface ConsultCard { num: string; title: string; desc: string; }
interface ConsultStep { n: string; label: string; }

const ConsultWidget: React.FC = () => {
  const { t } = useTranslation();
  const steps = t('seoPage.consultSteps', { returnObjects: true }) as ConsultStep[];
  const [active, setActive] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => setActive(p => (p + 1) % steps.length), 1800);
    return () => clearInterval(iv);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [steps.length]);

  return (
    <div style={{ padding: '20px 0 4px' }}>
      <div style={{ font: '500 10px/1 var(--mono)', color: '#00B8D9', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 20 }}>
        ◉ Consultation flow
      </div>
      {steps.map((s, i) => (
        <div key={s.n} style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '10px 12px', marginBottom: 6,
          background: active === i ? 'color-mix(in srgb, #00B8D9 8%, transparent)' : 'transparent',
          border: `1px solid ${active === i ? '#00B8D944' : 'var(--border)'}`,
          borderRadius: 6,
          transition: 'all 0.4s ease',
        }}>
          <span style={{ font: '600 11px/1 var(--mono)', color: active === i ? '#00B8D9' : 'var(--fg-mute)', minWidth: 20 }}>
            {s.n}
          </span>
          <span style={{ font: '400 13px/1 var(--display)', color: active === i ? 'var(--fg)' : 'var(--fg-dim)' }}>
            {s.label}
          </span>
          {active === i && (
            <span style={{ marginLeft: 'auto', width: 6, height: 6, borderRadius: '50%', background: '#00B8D9', flexShrink: 0, boxShadow: '0 0 6px #00B8D9' }} />
          )}
        </div>
      ))}
      <div style={{ marginTop: 16, padding: '12px 14px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6 }}>
        <div style={{ font: '400 10px/1.4 var(--mono)', color: 'var(--fg-mute)', marginBottom: 6 }}>{t('seoPage.supportLabel')}</div>
        <div style={{ font: '500 13px/1 var(--mono)', color: '#00B8D9' }}>{t('seoPage.supportDays')}</div>
      </div>
    </div>
  );
};

export const SeoPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const goToContact = (e: React.MouseEvent) => { e.preventDefault(); sessionStorage.setItem('scrollTarget', 'contact'); navigate('/'); };
  const goToServices = (e: React.MouseEvent) => { e.preventDefault(); sessionStorage.setItem('scrollTarget', 'services'); navigate('/'); };

  const deliverables = t('seoPage.deliverables', { returnObjects: true }) as Deliverable[];
  const consultCards = t('seoPage.consultCards', { returnObjects: true }) as ConsultCard[];

  return (
    <>
      <section className="pg-hero">
        <div className="mesh">
          <div className="blob b1" style={{ background: 'radial-gradient(circle, #00B8D933 0%, transparent 70%)' }} />
          <div className="blob b2" style={{ background: 'radial-gradient(circle, #004AAD22 0%, transparent 70%)' }} />
          <div className="blob b3" />
          <div className="blob b4" />
        </div>
        <div className="hero-bgtype"><span>{t('seoPage.heroBg')}</span></div>
        <div className="grid-overlay" />
        <div className="container">
          <div className="eyebrow-row">
            <div className="crumb">
              <Link to="/">{t('aboutPage.home')}</Link>
              <span className="sep">/</span>
              <a href="/#services" onClick={goToServices}>{t('servicesPage.crumb')}</a>
              <span className="sep">/</span>
              {t('seoPage.crumb')}
            </div>
          </div>
          <div className="eyebrow" style={{ marginBottom: 20 }}>
            <span className="dot" style={{ background: '#00B8D9' }} />
            {t('seoPage.eyebrowText')}
          </div>
          <h1>
            {t('seoPage.heroLine1')}<br />
            <em className="italic">{t('seoPage.heroItalic')}</em> <span className="accent">{t('seoPage.heroAccent')}</span>
          </h1>
        </div>
      </section>

      <section className="svc-block" style={{ borderTop: 0 }}>
        <div className="container">
          <div className="svc-body reveal">
            <div className="svc-deliverables">
              {deliverables.map((d, i) => (
                <div key={i} className="svc-deliv">
                  <span className="idx">{String(i + 1).padStart(2, '0')}</span>
                  <div className="name">{d.name}<small>{d.note}</small></div>
                  <div className="chk"><IconCheck size={12} /></div>
                </div>
              ))}
            </div>
            <aside className="svc-sidecard">
              <div className="sc-head">{t('seoPage.sidecardHead')}</div>
              <ConsultWidget />
              <a href="/#contact" onClick={goToContact} className="btn btn-primary sc-cta" style={{ marginTop: 20, width: '100%', justifyContent: 'center' }}>
                {t('servicesPage.ctaBookConsultBtn')} <IconArrow size={14} className="arrow" />
              </a>
              <div style={{ font: '400 12px/1.5 var(--mono)', color: 'var(--fg-mute)', marginTop: 12 }}>
                {t('seoPage.replyNote')}
              </div>
            </aside>
          </div>          <div className="svc-proof reveal">
            {consultCards.map((c, i) => (
              <div key={i} className="svc-proof-cell">
                <div className="metric-label" style={{ color: '#00B8D9' }}>{c.num}</div>
                <div style={{ font: '600 clamp(13px,1.4vw,15px)/1.3 var(--mono)', letterSpacing: '0.04em', margin: '10px 0 8px', color: 'var(--fg)' }}>
                  {c.title}
                </div>
                <div className="metric-desc">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="mesh">
          <div className="blob b1" style={{ background: 'radial-gradient(circle, #00B8D922 0%, transparent 70%)' }} />
          <div className="blob b2" />
          <div className="blob b3" />
        </div>
        <div className="container">
          <div className="cta-band-inner">
            <h3>
              {t('seoPage.ctaLine1')}<br />
              <em className="italic">{t('seoPage.ctaItalic')}</em> <span className="accent">{t('seoPage.ctaAccent')}</span>
            </h3>
            <div className="ctas">
              <a href="/#contact" onClick={goToContact} className="btn btn-primary">
                {t('servicesPage.ctaBookConsultBtn2')} <IconArrow size={14} className="arrow" />
              </a>
              <a href="/#services" onClick={goToServices} className="btn btn-ghost">
                {t('servicesPage.allServices')} <IconArrow size={14} className="arrow" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
