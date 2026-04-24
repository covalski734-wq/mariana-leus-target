import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { IconCheck, IconArrow } from '@/components/Icons';

const SERVICE = {
  id: 'smm', num: '04', kicker: 'Social', name: 'Social Media Management', sub: 'Content + community',
  lede: 'Editorial calendars, short-form video briefs, and community replies that feed retargeting audiences worth buying back.',
  deliverables: [
    { name: 'Monthly editorial calendar', note: 'Pillars, formats, posting cadence — aligned to launches and ads.' },
    { name: 'Short-form video briefs', note: 'Hooks, beats, shot lists for Reels / TikTok — you or a creator films.' },
    { name: 'Content production (optional)', note: 'Photo + video shoots with vetted creators, €2k–€6k add-on.' },
    { name: 'Community management', note: 'Reply within 2h in business hours, escalation flow for leads.' },
    { name: 'UGC sourcing', note: 'Briefs, whitelisting, rights — creator content that fuels paid.' },
    { name: 'Monthly analytics report', note: "Growth, saves, share rate, and what's worth repurposing." },
  ],
  pricing: [
    { label: 'Engagement', val: 'Retainer', unit: 'monthly' },
    { label: 'Management', val: '€1,400', unit: '/mo' },
    { label: 'Production', val: '+€2k', unit: 'optional' },
    { label: 'Commitment', val: '3 months', unit: 'then monthly' },
  ],
  proof: [
    { v: '+6.8k', l: 'IG followers', d: 'Fashion label · 4-month content sprint, €0 paid boost' },
    { v: '×3.2', l: 'UGC ad ROAS', d: 'Skincare · creator content fed into Meta retargeting' },
    { v: '2h', l: 'Avg reply time', d: 'Dental clinic · community mgmt during booking hours' },
  ],
};

export const SmmPage: React.FC = () => {
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
              <Link to="/">Home</Link>
              <span className="sep">/</span>
              <Link to="/services">Services</Link>
              <span className="sep">/</span>
              Social Media
            </div>
          </div>
          <div className="eyebrow" style={{ marginBottom: 20 }}>
            <span className="dot" style={{ background: '#25C55E' }} />
            {SERVICE.kicker} · {SERVICE.sub}
          </div>
          <h1>
            Content that <em className="italic">compounds</em><br />
            into <span className="accent">real audience.</span>
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
          <div className="blob b1" style={{ background: 'radial-gradient(circle, #25C55E22 0%, transparent 70%)' }} />
          <div className="blob b2" />
          <div className="blob b3" />
        </div>
        <div className="container">
          <div className="cta-band-inner">
            <h3>
              Build an audience<br />
              that <em className="italic">buys</em> <span className="accent">back.</span>
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
