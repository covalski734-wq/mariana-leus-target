import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IconCheck, IconArrow } from '@/components/Icons';

interface Deliverable { name: string; note: string; }
interface PricingRow { label: string; val: string; unit: string; }
interface ProofCell { v: string; l: string; d: string; }

export const SmmPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const goToContact = (e: React.MouseEvent) => { e.preventDefault(); sessionStorage.setItem('scrollTarget', 'contact'); navigate('/'); };

  const deliverables = t('smmPage.deliverables', { returnObjects: true }) as Deliverable[];
  const pricing = t('smmPage.pricing', { returnObjects: true }) as PricingRow[];
  const proof = t('smmPage.proof', { returnObjects: true }) as ProofCell[];

  // kicker and sub come from the first serviceDetail matching smm (for the eyebrow)
  const serviceDetails = t('servicesPage.serviceDetails', { returnObjects: true }) as Array<{ id: string; kicker: string; sub: string; }>;
  const smmDetail = serviceDetails.find(s => s.id === 'smm');

  return (
    <>
      {/* Page hero — green / content-card feel */}
      <section className="pg-hero">
        <div className="mesh">
          <div className="blob b1" style={{ background: 'radial-gradient(circle, #25C55E33 0%, transparent 70%)' }} />
          <div className="blob b2" style={{ background: 'radial-gradient(circle, #004AAD22 0%, transparent 70%)' }} />
          <div className="blob b3" />
          <div className="blob b4" />
        </div>
        <div className="hero-bgtype"><span>SMM</span></div>
        <div className="grid-overlay" />
        <div className="container">
          <div className="eyebrow-row">
            <div className="crumb">
              <Link to="/">{t('aboutPage.home')}</Link>
              <span className="sep">/</span>
              <Link to="/services">{t('servicesPage.crumb')}</Link>
              <span className="sep">/</span>
              {t('smmPage.crumb')}
            </div>
          </div>
          {smmDetail && (
            <div className="eyebrow" style={{ marginBottom: 20 }}>
              <span className="dot" style={{ background: '#25C55E' }} />
              {smmDetail.kicker} · {smmDetail.sub}
            </div>
          )}
          <h1>
            {t('smmPage.heroLine1')} <em className="italic">{t('smmPage.heroItalic')}</em><br />
            {t('smmPage.heroLine2')} <span className="accent">{t('smmPage.heroAccent')}</span>
          </h1>
        </div>
      </section>

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
                {t('smmPage.replyNote')}
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
          <div className="blob b1" style={{ background: 'radial-gradient(circle, #25C55E22 0%, transparent 70%)' }} />
          <div className="blob b2" />
          <div className="blob b3" />
        </div>
        <div className="container">
          <div className="cta-band-inner">
            <h3>
              {t('smmPage.ctaLine1')}<br />
              {t('smmPage.ctaLine2')} <em className="italic">{t('smmPage.ctaItalic')}</em> <span className="accent">{t('smmPage.ctaAccent')}</span>
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
