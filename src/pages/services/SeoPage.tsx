import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IconCheck, IconArrow } from '@/components/Icons';

interface Deliverable { name: string; note: string; }
interface PricingRow { label: string; val: string; unit: string; }
interface ProofCell { v: string; l: string; d: string; }
interface OrganicStat { label: string; value: string; note: string; }

export const SeoPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const goToContact = (e: React.MouseEvent) => { e.preventDefault(); sessionStorage.setItem('scrollTarget', 'contact'); navigate('/'); };

  const deliverables = t('seoPage.deliverables', { returnObjects: true }) as Deliverable[];
  const pricing = t('seoPage.pricing', { returnObjects: true }) as PricingRow[];
  const proof = t('seoPage.proof', { returnObjects: true }) as ProofCell[];
  const organicStats = t('seoPage.organicStats', { returnObjects: true }) as OrganicStat[];

  const serviceDetails = t('servicesPage.serviceDetails', { returnObjects: true }) as Array<{ id: string; kicker: string; sub: string; }>;
  const seoDetail = serviceDetails.find(s => s.id === 'seo');

  return (
    <>
      {/* Page hero — cyan / data-analytics aesthetic */}
      <section className="pg-hero">
        <div className="mesh">
          <div className="blob b1" style={{ background: 'radial-gradient(circle, #00B8D933 0%, transparent 70%)' }} />
          <div className="blob b2" style={{ background: 'radial-gradient(circle, #004AAD22 0%, transparent 70%)' }} />
          <div className="blob b3" />
          <div className="blob b4" />
        </div>
        <div className="hero-bgtype"><span>SEO</span></div>
        <div className="grid-overlay" />
        <div className="container">
          <div className="eyebrow-row">
            <div className="crumb">
              <Link to="/">{t('aboutPage.home')}</Link>
              <span className="sep">/</span>
              <Link to="/services">{t('servicesPage.crumb')}</Link>
              <span className="sep">/</span>
              {t('seoPage.crumb')}
            </div>
          </div>
          {seoDetail && (
            <div className="eyebrow" style={{ marginBottom: 20 }}>
              <span className="dot" style={{ background: '#00B8D9' }} />
              {seoDetail.kicker} · {seoDetail.sub}
            </div>
          )}
          <h1>
            {t('seoPage.heroLine1')}<br />
            <em className="italic">{t('seoPage.heroItalic')}</em> <span className="accent">{t('seoPage.heroAccent')}</span>
          </h1>
        </div>
      </section>

      {/* Organic growth stats bar */}
      <div style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '28px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
            {organicStats.map((s, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ font: '400 11px/1 var(--mono)', color: '#00B8D9', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>
                  {s.label}
                </div>
                <div style={{ font: '700 clamp(1.5rem,3vw,2.25rem)/1 var(--display)', letterSpacing: '-0.04em', color: 'var(--fg)' }}>
                  {s.value}
                </div>
                <div style={{ font: '400 12px/1.4 var(--mono)', color: 'var(--fg-mute)' }}>
                  {s.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Service block */}
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
              <div className="sc-head">{t('servicesPage.engagement')}</div>
              {pricing.map((p, i) => (
                <div key={i} className="sc-row">
                  <div className="sc-label">{p.label}</div>
                  <div className="sc-val">{p.val}<span className="unit">{p.unit}</span></div>
                </div>
              ))}
              <a href="/#contact" onClick={goToContact} className="btn btn-primary sc-cta" style={{ marginTop: 16, width: '100%', justifyContent: 'center' }}>
                {t('servicesPage.ctaBookBtn')} <IconArrow size={14} className="arrow" />
              </a>
              <div style={{ font: '400 12px/1.5 var(--mono)', color: 'var(--fg-mute)', marginTop: 12 }}>
                {t('seoPage.replyNote')}
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

      {/* CTA band */}
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
                {t('servicesPage.ctaBookBtn')} <IconArrow size={14} className="arrow" />
              </a>
              <Link to="/services" className="btn btn-ghost">
                {t('servicesPage.allServices')} <IconArrow size={14} className="arrow" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
