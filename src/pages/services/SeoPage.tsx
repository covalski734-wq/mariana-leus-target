import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { IconCheck, IconArrow } from '@/components/Icons';

const SERVICE = {
  id: 'seo', num: '05', kicker: 'Organic', name: 'SEO', sub: 'Technical + content',
  lede: 'Technical hygiene, topic clusters, and an internal-link map that keeps paying you back after the retainer ends.',
  deliverables: [
    { name: 'Technical audit', note: 'Crawl, index coverage, Core Web Vitals, structured data — with a fix-priority list.' },
    { name: 'Keyword + topic research', note: 'Cluster map tied to buyer intent and business outcomes.' },
    { name: 'Content brief system', note: 'SERP-aligned briefs your writers (or mine) ship against.' },
    { name: 'On-page optimisation', note: 'Title/meta, internal linking, schema, image alts.' },
    { name: 'Link acquisition', note: 'Digital PR and partner outreach — budget-optional, no PBNs.' },
    { name: 'Quarterly strategy review', note: 'What moved, what plateaued, what to double down on.' },
  ],
  pricing: [
    { label: 'Engagement', val: 'Retainer', unit: 'monthly' },
    { label: 'Starts at', val: '€1,200', unit: '/mo' },
    { label: 'Content', val: '+€k', unit: 'per brief' },
    { label: 'Commitment', val: '6 months', unit: 'min. for results' },
  ],
  proof: [
    { v: '×3.8', l: 'Organic traffic', d: 'B2B SaaS · 9 months · cluster strategy + PR' },
    { v: '+214%', l: 'Non-brand clicks', d: 'E-commerce · technical + content sprint · 6 months' },
    { v: '#1–3', l: 'SERP rank', d: 'Dental clinic · "stomatolog Warszawa" cluster, 12 terms' },
  ],
};

const ORGANIC_STATS = [
  { label: 'Avg. organic traffic growth', value: '×3.8', note: 'after 9-month engagement' },
  { label: 'Non-brand click lift', value: '+214%', note: 'technical + content sprint' },
  { label: 'Top SERP positions', value: '#1–3', note: 'cluster-based targeting' },
];

export const SeoPage: React.FC = () => {
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
              <Link to="/">Home</Link>
              <span className="sep">/</span>
              <Link to="/services">Services</Link>
              <span className="sep">/</span>
              SEO
            </div>
          </div>
          <div className="eyebrow" style={{ marginBottom: 20 }}>
            <span className="dot" style={{ background: '#00B8D9' }} />
            {SERVICE.kicker} · {SERVICE.sub}
          </div>
          <h1>
            Organic growth that<br />
            <em className="italic">compounds</em> <span className="accent">for years.</span>
          </h1>
          <p className="lede">{SERVICE.lede}</p>
        </div>
      </section>

      {/* Organic growth stats bar */}
      <div style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '28px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
            {ORGANIC_STATS.map((s, i) => (
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
          <div className="blob b1" style={{ background: 'radial-gradient(circle, #00B8D922 0%, transparent 70%)' }} />
          <div className="blob b2" />
          <div className="blob b3" />
        </div>
        <div className="container">
          <div className="cta-band-inner">
            <h3>
              Traffic that keeps<br />
              <em className="italic">growing</em> <span className="accent">after month one.</span>
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
