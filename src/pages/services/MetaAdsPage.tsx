import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IconCheck, IconArrow } from '@/components/Icons';

interface Deliverable { name: string; note: string; }
interface ProofCell { v: string; l: string; d: string; }

const META_BARS = [
  { label: 'ROAS', pct: 88 },
  { label: 'CTR', pct: 73 },
  { label: 'Conv.', pct: 91 },
  { label: 'Reach', pct: 65 },
  { label: 'CPL', pct: 82 },
];

const MetaWidget: React.FC = () => {
  const [animated, setAnimated] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ padding: '20px 0 4px' }}>
      <div style={{ font: '500 10px/1 var(--mono)', color: '#004AAD', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 20 }}>
        ◉ Live performance
      </div>
      {META_BARS.map((b, i) => (
        <div key={b.label} style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, font: '400 11px/1 var(--mono)', color: 'var(--fg-dim)' }}>
            <span>{b.label}</span>
            <span style={{ color: 'var(--fg)' }}>{b.pct}%</span>
          </div>
          <div style={{ height: 3, background: 'var(--border)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: animated ? `${b.pct}%` : '0%',
              background: 'linear-gradient(90deg, #004AAD, #00B8D9)',
              borderRadius: 2,
              transition: `width 0.9s cubic-bezier(.2,.7,.2,1) ${i * 0.12}s`,
            }} />
          </div>
        </div>
      ))}
      <div style={{ marginTop: 20, padding: '12px 14px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 6 }}>
        <div style={{ font: '400 10px/1.4 var(--mono)', color: 'var(--fg-mute)', marginBottom: 6 }}>
          CAMPAIGN STATUS
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{
            display: 'inline-block', width: 7, height: 7, borderRadius: '50%',
            background: '#25C55E',
            boxShadow: '0 0 6px #25C55E88',
            animation: 'pulse 2s ease-in-out infinite',
          }} />
          <span style={{ font: '500 11px/1 var(--mono)', color: '#25C55E' }}>Active · Optimising</span>
        </div>
      </div>
    </div>
  );
};

export const MetaAdsPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const goToContact = (e: React.MouseEvent) => { e.preventDefault(); sessionStorage.setItem('scrollTarget', 'contact'); navigate('/'); };
  const goToServices = (e: React.MouseEvent) => { e.preventDefault(); sessionStorage.setItem('scrollTarget', 'services'); navigate('/'); };

  const deliverables = t('metaAdsPage.deliverables', { returnObjects: true }) as Deliverable[];
  const proof = t('metaAdsPage.proof', { returnObjects: true }) as ProofCell[];

  return (
    <>
      <section className="pg-hero">
        <div className="mesh">
          <div className="blob b1" style={{ background: 'radial-gradient(circle, #004AAD44 0%, transparent 70%)' }} />
          <div className="blob b2" style={{ background: 'radial-gradient(circle, #00B8D944 0%, transparent 70%)' }} />
          <div className="blob b3" />
          <div className="blob b4" />
        </div>
        <div className="hero-bgtype"><span>META</span></div>
        <div className="grid-overlay" />
        <div className="container">
          <div className="eyebrow-row">
            <div className="crumb">
              <Link to="/">{t('aboutPage.home')}</Link>
              <span className="sep">/</span>
              <a href="/#services" onClick={goToServices}>{t('servicesPage.crumb')}</a>
              <span className="sep">/</span>
              {t('metaAdsPage.crumb')}
            </div>
          </div>
          <div className="eyebrow" style={{ marginBottom: 20 }}>
            <span className="dot" style={{ background: '#004AAD' }} />
            {t('metaAdsPage.kicker')}
          </div>
          <h1>
            {t('metaAdsPage.heroLine1')}<br />
            <em className="italic">{t('metaAdsPage.heroItalic')}</em> <span className="accent">{t('metaAdsPage.heroAccent')}</span>
          </h1>
          <p style={{ font: '400 clamp(0.95rem,1.6vw,1.125rem)/1.6 var(--display)', color: 'var(--fg-dim)', marginTop: 20, maxWidth: 560 }}>
            {t('metaAdsPage.lede')}
          </p>
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
              <div className="sc-head">/ Meta Ads</div>
              <MetaWidget />
              <a href="/#contact" onClick={goToContact} className="btn btn-primary sc-cta" style={{ marginTop: 20, width: '100%', justifyContent: 'center' }}>
                {t('servicesPage.ctaBookBtn')} <IconArrow size={14} className="arrow" />
              </a>
              <div style={{ font: '400 12px/1.5 var(--mono)', color: 'var(--fg-mute)', marginTop: 12 }}>
                {t('metaAdsPage.replyNote')}
              </div>
            </aside>
          </div>

          <div className="svc-proof reveal">
            {proof.map((p, i) => (
              <div key={i} className="svc-proof-cell">
                <div className="metric-label">{p.l}</div>
                <div className="metric-value">
                  {['+', '×', '−'].some(s => p.v.startsWith(s)) && <span className="plus">{p.v[0]}</span>}
                  {['+', '×', '−'].some(s => p.v.startsWith(s)) ? p.v.slice(1) : p.v}
                </div>
                <div className="metric-desc">{p.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="mesh">
          <div className="blob b1" style={{ background: 'radial-gradient(circle, #004AAD33 0%, transparent 70%)' }} />
          <div className="blob b2" />
          <div className="blob b3" />
        </div>
        <div className="container">
          <div className="cta-band-inner">
            <h3>
              {t('metaAdsPage.ctaTitle1')}<br />
              {t('metaAdsPage.ctaTitle2')} <em className="italic">{t('metaAdsPage.ctaItalic')}</em> {t('metaAdsPage.ctaTitle3')}
            </h3>
            <div className="ctas">
              <a href="/#contact" onClick={goToContact} className="btn btn-primary">
                {t('servicesPage.ctaBookBtn')} <IconArrow size={14} className="arrow" />
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
