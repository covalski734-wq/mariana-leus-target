import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { IconCheck, IconArrow } from '@/components/Icons';

const SERVICE = {
  id: 'meta', num: '01', kicker: 'Paid Social', name: 'Meta Ads', sub: 'Facebook & Instagram',
  lede: 'Full-funnel campaigns that hit purchase and lead objectives — engineered around creative, not just audiences.',
  deliverables: [
    { name: 'Account audit + structure rebuild', note: 'Week 1. New campaigns, CBO hygiene, pixel + CAPI verification.' },
    { name: 'Creative testing framework', note: 'Weekly testing of 6–12 new creatives against clear hypotheses.' },
    { name: 'Buyer-stage creative pipeline', note: 'Awareness · Consideration · Conversion creative, not one-size messaging.' },
    { name: 'Audience ladder', note: 'Interest → Lookalike → Retargeting, with daily spend caps and negative overlap.' },
    { name: 'Weekly performance reports', note: "Plain-language notes on what changed and what's next — no 80-tab dashboards." },
    { name: 'Landing page split tests', note: 'Coordinated with the Website service when needed.' },
  ],
  pricing: [
    { label: 'Engagement', val: 'Retainer', unit: 'monthly' },
    { label: 'Starts at', val: '€2,400', unit: '/mo' },
    { label: 'Ad spend', val: '€5k+', unit: 'minimum' },
    { label: 'Commitment', val: '3 months', unit: 'then monthly' },
  ],
  proof: [
    { v: '+312%', l: 'ROAS lift', d: 'DTC Skincare · 90 days · rebuild + creative system' },
    { v: '€47', l: 'Cost per lead', d: 'Premium Dental Clinic · Warsaw · Meta lead gen' },
    { v: '×2.4', l: 'AOV increase', d: 'Fashion e-commerce · bundle + retargeting strategy' },
  ],
};

export const MetaAdsPage: React.FC = () => {
  const { t } = useLanguage();

  useEffect(() => {
    const els = document.querySelectorAll('.reveal:not(.in)');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  });

  return (
    <>
      {/* Page hero */}
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
              <Link to="/">Home</Link>
              <span className="sep">/</span>
              <Link to="/services">Services</Link>
              <span className="sep">/</span>
              Meta Ads
            </div>
          </div>
          <div className="eyebrow" style={{ marginBottom: 20 }}>
            <span className="dot" style={{ background: 'var(--brand)' }} />
            {SERVICE.kicker} · {SERVICE.sub}
          </div>
          <h1>
            Meta Ads<br />
            <em className="italic">that</em> <span className="accent">convert.</span>
          </h1>
          <p className="lede">{SERVICE.lede}</p>
        </div>
      </section>

      {/* Service block */}
      <section className="svc-block" style={{ borderTop: 0 }}>
        <div className="container">
          <div className="svc-body reveal">
            <div className="svc-deliverables">
              {SERVICE.deliverables.map((d, i) => (
                <div key={i} className="svc-deliv">
                  <span className="idx">{String(i + 1).padStart(2, '0')}</span>
                  <div className="name">{d.name}<small>{d.note}</small></div>
                  <div className="chk"><IconCheck size={12} /></div>
                </div>
              ))}
            </div>
            <aside className="svc-sidecard">
              <div className="sc-head">/ Engagement</div>
              {SERVICE.pricing.map((p, i) => (
                <div key={i} className="sc-row">
                  <div className="sc-label">{p.label}</div>
                  <div className="sc-val">{p.val}<span className="unit">{p.unit}</span></div>
                </div>
              ))}
              <Link to="/#contact" className="btn btn-primary sc-cta" style={{ marginTop: 16, width: '100%', justifyContent: 'center' }}>
                {t('servicesPage.ctaBookBtn')} <IconArrow size={14} className="arrow" />
              </Link>
              <div style={{ font: '400 12px/1.5 var(--mono)', color: 'var(--fg-mute)', marginTop: 12 }}>
                Typical reply in under 2 hours · EN / UA / RU
              </div>
            </aside>
          </div>

          <div className="svc-proof reveal">
            {SERVICE.proof.map((p, i) => (
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
          <div className="blob b1" style={{ background: 'radial-gradient(circle, #004AAD33 0%, transparent 70%)' }} />
          <div className="blob b2" />
          <div className="blob b3" />
        </div>
        <div className="container">
          <div className="cta-band-inner">
            <h3>
              Ready to scale<br />
              your <em className="italic">Meta</em> results?
            </h3>
            <div className="ctas">
              <Link to="/#contact" className="btn btn-primary">
                {t('servicesPage.ctaBookBtn')} <IconArrow size={14} className="arrow" />
              </Link>
              <Link to="/services" className="btn btn-ghost">
                All services <IconArrow size={14} className="arrow" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
