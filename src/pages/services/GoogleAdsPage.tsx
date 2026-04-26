import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IconCheck, IconArrow } from '@/components/Icons';

const SERVICE = {
  id: 'google', num: '02', kicker: 'Paid Search', name: 'Google Ads', sub: 'Search, PMax, Display',
  lede: 'Capture every high-intent search, stop wasting budget on junk queries, and make PMax behave like an asset — not a black box.',
  deliverables: [
    { name: 'Search campaign rebuild', note: 'Single-theme ad groups, match-type hygiene, branded defense.' },
    { name: 'Negative keyword system', note: 'Ongoing — negative lists per campaign, reviewed weekly.' },
    { name: 'PMax asset groups that convert', note: 'Audience signals, brand exclusions, feed-based targeting for e-commerce.' },
    { name: 'Conversion tracking audit', note: 'GA4, enhanced conversions, offline imports — numbers you can trust.' },
    { name: 'Shopping feed optimisation', note: 'Title structure, custom labels, Merchant Center health.' },
    { name: 'Monthly strategic review', note: 'Where to scale, where to cut, what to test next quarter.' },
  ],
  pricing: [
    { label: 'Engagement', val: 'Retainer', unit: 'monthly' },
    { label: 'Starts at', val: '€1,900', unit: '/mo' },
    { label: 'Ad spend', val: '€3k+', unit: 'minimum' },
    { label: 'Commitment', val: '3 months', unit: 'then monthly' },
  ],
  proof: [
    { v: '62', l: 'Leads/month', d: 'B2B SaaS · LinkedIn + Search synced funnel' },
    { v: '−48%', l: 'CPA reduction', d: 'Online education · PMax asset group rebuild' },
    { v: '+184%', l: 'Enrolments', d: 'Online Education · webinar funnel at €40k/mo spend' },
  ],
};

export const GoogleAdsPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const goToContact = (e: React.MouseEvent) => { e.preventDefault(); sessionStorage.setItem('scrollTarget', 'contact'); navigate('/'); };

  return (
    <>
      {/* Page hero — gold/amber tones */}
      <section className="pg-hero">
        <div className="mesh">
          <div className="blob b1" style={{ background: 'radial-gradient(circle, #F7AD1A33 0%, transparent 70%)' }} />
          <div className="blob b2" style={{ background: 'radial-gradient(circle, #004AAD33 0%, transparent 70%)' }} />
          <div className="blob b3" />
          <div className="blob b4" />
        </div>
        <div className="hero-bgtype"><span>GOOGLE</span></div>
        <div className="grid-overlay" />
        <div className="container">
          <div className="eyebrow-row">
            <div className="crumb">
              <Link to="/">Home</Link>
              <span className="sep">/</span>
              <Link to="/services">Services</Link>
              <span className="sep">/</span>
              Google Ads
            </div>
          </div>
          <div className="eyebrow" style={{ marginBottom: 20 }}>
            <span className="dot" style={{ background: '#F7AD1A' }} />
            {SERVICE.kicker} · {SERVICE.sub}
          </div>
          <h1>
            Google Ads<br />
            built on <em className="italic">intent</em>, not <span className="accent">guesswork.</span>
          </h1>
          <p className="lede">{SERVICE.lede}</p>
        </div>
      </section>

      {/* Intent callout */}
      <div style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '24px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <span style={{ font: '600 13px/1 var(--mono)', color: '#F7AD1A', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Why intent matters
            </span>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            <span style={{ font: '400 14px/1.5 var(--display)', color: 'var(--fg-dim)', maxWidth: 480 }}>
              Search ads reach people the moment they decide to buy. That single fact makes search 3–8× more efficient than social for B2B and high-consideration purchases.
            </span>
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
              <a href="/#contact" onClick={goToContact} className="btn btn-primary sc-cta" style={{ marginTop: 16, width: '100%', justifyContent: 'center' }}>
                {t('servicesPage.ctaBookBtn')} <IconArrow size={14} className="arrow" />
              </a>
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
          <div className="blob b1" style={{ background: 'radial-gradient(circle, #F7AD1A22 0%, transparent 70%)' }} />
          <div className="blob b2" />
          <div className="blob b3" />
        </div>
        <div className="container">
          <div className="cta-band-inner">
            <h3>
              Stop paying for clicks<br />
              that <em className="italic">never</em> <span className="accent">convert.</span>
            </h3>
            <div className="ctas">
              <a href="/#contact" onClick={goToContact} className="btn btn-primary">
                {t('servicesPage.ctaBookBtn')} <IconArrow size={14} className="arrow" />
              </a>
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
