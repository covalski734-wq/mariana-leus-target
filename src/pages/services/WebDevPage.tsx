import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IconArrow, IconCheck } from '@/components/Icons';

interface Deliverable { name: string; note: string; }
interface PricingRow { label: string; val: string; unit: string; }
interface ProofCell { v: string; l: string; d: string; }
interface LighthouseScore { label: string; score: number; color: string; }

const STACK = ['Webflow', 'Framer', 'Next.js', 'React', 'Figma', 'Vercel', 'Shopify', 'HubSpot', 'GA4', 'GTM', 'Meta CAPI', 'Telegram Bot'];

// Animated Lighthouse score circle
const ScoreCircle: React.FC<{ score: number; label: string; color: string }> = ({ score, label, color }) => {
  const r = 36;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;

  return (
    <div className="lh-score">
      <svg width="88" height="88" viewBox="0 0 88 88">
        <circle cx="44" cy="44" r={r} fill="none" stroke="var(--border)" strokeWidth="5" />
        <circle
          cx="44" cy="44" r={r} fill="none"
          stroke={color} strokeWidth="5"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          transform="rotate(-90 44 44)"
          style={{ transition: 'stroke-dasharray 1.2s cubic-bezier(.2,.7,.2,1) .3s' }}
        />
        <text x="44" y="48" textAnchor="middle"
          style={{ font: '700 20px/1 var(--display)', fill: 'var(--fg)' }}
        >{score}</text>
      </svg>
      <div className="lh-label">{label}</div>
    </div>
  );
};

// Terminal-style build log (visual effect — intentionally kept hardcoded)
const BuildLog: React.FC = () => {
  const [lines, setLines] = useState<string[]>([]);
  const LOG = [
    '$ npm run build',
    '▲ Next.js 14.2.0',
    '',
    '✓ Compiled in 1.4s',
    '✓ Linting — passed',
    '✓ Images optimised — 94% smaller',
    '✓ Lighthouse mobile — 98',
    '',
    'Route (app)           Size',
    '/ (home)              4.2 kB',
    '/about                2.8 kB',
    '',
    'Build ready. 🚀',
  ];

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      if (i < LOG.length) {
        setLines(prev => [...prev, LOG[i++]]);
      } else {
        clearInterval(t);
      }
    }, 80);
    return () => clearInterval(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="webdev-terminal">
      <div className="terminal-bar">
        <span className="tdot" style={{ background: '#FF5F57' }} />
        <span className="tdot" style={{ background: '#FFBD2E' }} />
        <span className="tdot" style={{ background: '#28CA41' }} />
        <span className="terminal-title">build output</span>
      </div>
      <div className="terminal-body">
        {lines.map((l, i) => (
          <div key={i} className={
            l.startsWith('✓') ? 'tline ok' :
            l.startsWith('$') ? 'tline cmd' :
            l.startsWith('▲') ? 'tline meta' :
            l === '' ? 'tline empty' : 'tline'
          }>{l || ' '}</div>
        ))}
        <div className="tline cursor" />
      </div>
    </div>
  );
};

export const WebDevPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const goToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    sessionStorage.setItem('scrollTarget', 'contact');
    navigate('/');
  };

  const deliverables = t('webDevPage.deliverables', { returnObjects: true }) as Deliverable[];
  const pricing = t('webDevPage.pricing', { returnObjects: true }) as PricingRow[];
  const proof = t('webDevPage.proof', { returnObjects: true }) as ProofCell[];
  const lighthouse = t('webDevPage.lighthouse', { returnObjects: true }) as LighthouseScore[];

  return (
    <>
      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="webdev-hero">
        <div className="mesh">
          <div className="blob b1" style={{ background: 'radial-gradient(circle, #6B2FF755 0%, transparent 65%)' }} />
          <div className="blob b2" style={{ background: 'radial-gradient(circle, #004AAD44 0%, transparent 65%)' }} />
          <div className="blob b3" /><div className="blob b4" />
        </div>
        <div className="hero-bgtype webdev-bgtype"><span>WEB</span></div>
        <div className="grid-overlay" />

        <div className="container">
          <div className="crumb" style={{ font: '500 11px/1 var(--mono)', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--fg-mute)', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 40 }}>
            <Link to="/">{t('aboutPage.home')}</Link><span style={{ opacity: .4 }}>/</span>
            <Link to="/services">{t('servicesPage.crumb')}</Link><span style={{ opacity: .4 }}>/</span>
            <span>{t('webDevPage.crumb')}</span>
          </div>

          <div className="webdev-hero-grid">
            <div className="webdev-hero-left">
              <div className="webdev-kicker">
                <span className="webdev-kicker-dot" />
                {t('webDevPage.kicker')}
              </div>
              <h1 className="webdev-headline">
                <span className="webdev-comment">{t('webDevPage.heroComment')}</span>{t('webDevPage.heroLine1')}<br />
                <em className="italic">{t('webDevPage.heroItalic')}</em><br />
                {t('webDevPage.heroLine2')} <span className="accent">{t('webDevPage.heroAccent')}</span>
              </h1>
              <p className="webdev-lede">
                {t('webDevPage.heroLede')}
              </p>
              <div className="webdev-hero-ctas">
                <a href="/#contact" onClick={goToContact} className="btn btn-primary">
                  {t('webDevPage.heroCta')} <IconArrow size={14} className="arrow" />
                </a>
                <Link to="/services" className="btn btn-ghost">
                  {t('webDevPage.allServices')}
                </Link>
              </div>
            </div>

            <div className="webdev-hero-right">
              <BuildLog />
              <div className="lh-panel">
                <div className="lh-title">{t('webDevPage.lighthouseLabel')}</div>
                <div className="lh-scores">
                  {lighthouse.map(s => <ScoreCircle key={s.label} {...s} />)}
                </div>
              </div>
            </div>
          </div>

          {/* Speed stat bar */}
          <div className="webdev-speed-bar reveal">
            <div className="speed-item">
              <div className="speed-label">{t('webDevPage.speedBefore')}</div>
              <div className="speed-track">
                <div className="speed-fill before" style={{ width: '100%' }} />
              </div>
              <div className="speed-val slow">4.8s</div>
            </div>
            <div className="speed-item">
              <div className="speed-label">{t('webDevPage.speedAfter')}</div>
              <div className="speed-track">
                <div className="speed-fill after" style={{ width: '29%' }} />
              </div>
              <div className="speed-val fast">1.4s</div>
            </div>
            <div className="speed-caption">{t('webDevPage.speedCaption')}</div>
          </div>
        </div>
      </section>

      {/* ── Tech stack ──────────────────────────────────────────────── */}
      <section className="webdev-stack">
        <div className="container">
          <div className="webdev-stack-label">{t('webDevPage.stackLabel')}</div>
          <div className="webdev-stack-chips reveal">
            {STACK.map(s => <span key={s} className="stack-chip">{s}</span>)}
          </div>
        </div>
      </section>

      {/* ── Deliverables + sidecard ─────────────────────────────────── */}
      <section className="svc-block webdev-block">
        <div className="container">
          <div className="webdev-section-head reveal">
            <div className="webdev-num">03</div>
            <div>
              <div className="webdev-kicker" style={{ marginBottom: 12 }}>
                <span className="webdev-kicker-dot" />{t('webDevPage.sectionKicker')}
              </div>
              <h2 className="webdev-block-title">
                {t('webDevPage.sectionTitle').split('\n').map((line: string, i: number, arr: string[]) => (
                  <React.Fragment key={i}>{line}{i < arr.length - 1 && <br />}</React.Fragment>
                ))}
              </h2>
              <p style={{ font: '400 16px/1.6 var(--display)', color: 'var(--fg-dim)', marginTop: 16, maxWidth: 480 }}>
                {t('webDevPage.sectionDesc')}
              </p>
            </div>
          </div>

          <div className="svc-body reveal">
            <div className="svc-deliverables">
              {deliverables.map((d, i) => (
                <div key={i} className="svc-deliv webdev-deliv">
                  <div className="idx" style={{ color: '#6B2FF7', fontFamily: 'var(--mono)' }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="name">
                    {d.name}
                    <small>{d.note}</small>
                  </div>
                  <div className="chk" style={{ borderColor: '#6B2FF755', color: '#6B2FF7' }}>
                    <IconCheck size={12} />
                  </div>
                </div>
              ))}
            </div>

            <aside className="svc-sidecard webdev-sidecard">
              <div className="sc-head">{t('servicesPage.engagement')}</div>
              {pricing.map((p, i) => (
                <div key={i} className="sc-row">
                  <div className="sc-label">{p.label}</div>
                  <div className="sc-val">{p.val}<span className="unit">{p.unit}</span></div>
                </div>
              ))}
              <a href="/#contact" onClick={goToContact} className="btn btn-primary sc-cta"
                style={{ marginTop: 16, width: '100%', justifyContent: 'center', background: 'linear-gradient(135deg, #6B2FF7, #004AAD)' }}>
                {t('servicesPage.ctaBookBtn')} <IconArrow size={14} className="arrow" />
              </a>
              <div style={{ font: '400 12px/1.5 var(--mono)', color: 'var(--fg-mute)', marginTop: 12 }}>
                {t('webDevPage.replyNote')}
              </div>
            </aside>
          </div>

          {/* Proof */}
          <div className="svc-proof reveal">
            {proof.map((p, i) => (
              <div key={i} className="svc-proof-cell webdev-proof-cell">
                <div className="metric-label">{p.l}</div>
                <div className="metric-value" style={{ color: '#6B2FF7' }}>
                  {['+', '×', '−'].some(s => p.v.startsWith(s)) && <span className="plus">{p.v[0]}</span>}
                  {['+', '×', '−'].some(s => p.v.startsWith(s)) ? p.v.slice(1) : p.v}
                </div>
                <div className="metric-desc">{p.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="cta-band">
        <div className="mesh">
          <div className="blob b1" style={{ background: 'radial-gradient(circle, #6B2FF733 0%, transparent 70%)' }} />
          <div className="blob b2" /><div className="blob b3" />
        </div>
        <div className="container">
          <div className="cta-band-inner">
            <h3>
              {t('webDevPage.ctaLine1')}<br />
              {t('webDevPage.ctaLine2')}<br />
              <em className="italic">{t('webDevPage.ctaItalic')}</em>
            </h3>
            <div className="ctas">
              <a href="/#contact" onClick={goToContact} className="btn btn-primary"
                style={{ background: 'linear-gradient(135deg, #6B2FF7, #004AAD)' }}>
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
