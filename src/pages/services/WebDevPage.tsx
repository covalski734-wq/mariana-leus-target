import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { IconCheck, IconArrow } from '@/components/Icons';

const SERVICE = {
  id: 'web', num: '03', kicker: 'Conversion', name: 'Website & Landing Pages', sub: 'Designed to convert',
  lede: 'Pages built around one promise, one action, and one measurable outcome. Fast, accessible, CRM-wired.',
  deliverables: [
    { name: 'Conversion-led design', note: 'Wireframe → hi-fi → build, all against a measurable hypothesis.' },
    { name: 'Webflow, Framer, or custom', note: 'Depending on CMS needs, team skill, and integration surface.' },
    { name: 'Page-speed engineering', note: 'Targets Lighthouse 95+ on mobile; image + font hygiene baked in.' },
    { name: 'Form + CRM wiring', note: 'Telegram bot, email, HubSpot, Notion, Sheets — whatever your stack is.' },
    { name: 'Analytics + tagging', note: 'GA4, Meta CAPI, Google Tag Manager; events aligned to ad campaigns.' },
    { name: 'A/B test setup', note: 'Hero, offer, and CTA variants with a clear statistical plan.' },
  ],
  pricing: [
    { label: 'Engagement', val: 'Project', unit: 'fixed' },
    { label: 'Landing page', val: '€2,800', unit: 'starts at' },
    { label: 'Full site', val: '€6,500', unit: 'starts at' },
    { label: 'Timeline', val: '2–3 wk', unit: 'typical' },
  ],
  proof: [
    { v: '+41%', l: 'Form-fill rate', d: 'Dental clinic · rebuild with Telegram-bot booking' },
    { v: '1.4s', l: 'Time to interactive', d: 'DTC skincare · from 4.8s to 1.4s mobile' },
    { v: '×2.1', l: 'Trial-to-paid', d: 'SaaS · pricing page rework + activation email flow' },
  ],
};

export const WebDevPage: React.FC = () => {
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
      {/* Page hero — purple / monospace aesthetic */}
      <section className="pg-hero" data-aesthetic="mono">
        <div className="mesh">
          <div className="blob b1" style={{ background: 'radial-gradient(circle, #6B2FF733 0%, transparent 70%)' }} />
          <div className="blob b2" style={{ background: 'radial-gradient(circle, #004AAD33 0%, transparent 70%)' }} />
          <div className="blob b3" />
          <div className="blob b4" />
        </div>
        <div className="hero-bgtype"><span>WEB</span></div>
        <div className="grid-overlay" />
        <div className="container">
          <div className="eyebrow-row">
            <div className="crumb">
              <Link to="/">Home</Link>
              <span className="sep">/</span>
              <Link to="/services">Services</Link>
              <span className="sep">/</span>
              Web Dev
            </div>
          </div>
          <div className="eyebrow" style={{ marginBottom: 20 }}>
            <span className="dot" style={{ background: '#6B2FF7' }} />
            {SERVICE.kicker} · {SERVICE.sub}
          </div>
          <h1 style={{ fontFamily: 'var(--mono)', letterSpacing: '-0.04em' }}>
            <span style={{ color: '#6B2FF7', opacity: 0.6 }}>{'// '}</span>Pages that<br />
            <em className="italic" style={{ fontFamily: 'var(--serif)' }}>actually</em>{' '}
            <span className="accent">ship revenue.</span>
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
                  <span className="idx" style={{ fontFamily: 'var(--mono)', color: '#6B2FF7' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
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
          <div className="blob b1" style={{ background: 'radial-gradient(circle, #6B2FF722 0%, transparent 70%)' }} />
          <div className="blob b2" />
          <div className="blob b3" />
        </div>
        <div className="container">
          <div className="cta-band-inner">
            <h3>
              A landing page that<br />
              <em className="italic">earns</em> its <span className="accent">place.</span>
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
