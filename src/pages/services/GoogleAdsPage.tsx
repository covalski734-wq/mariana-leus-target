import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IconCheck, IconArrow, IconArrowUp } from '@/components/Icons';

interface Deliverable { name: string; note: string; }
interface SidecardItem { label: string; val: string; }
interface CaseItem { niche: string; result: string; unit: string; title: string; instagram?: string; tags?: string[]; }

export const GoogleAdsPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const goToContact = (e: React.MouseEvent) => { e.preventDefault(); sessionStorage.setItem('scrollTarget', 'contact'); navigate('/'); };
  const goToServices = (e: React.MouseEvent) => { e.preventDefault(); sessionStorage.setItem('scrollTarget', 'services'); navigate('/'); };

  const deliverables = t('googleAdsPage.deliverables', { returnObjects: true }) as Deliverable[];
  const sidecard = t('googleAdsPage.sidecard', { returnObjects: true }) as SidecardItem[];
  const cases = (t('cases.items', { returnObjects: true }) as CaseItem[]).filter(c => c.tags?.includes('google'));

  return (
    <>
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
              <Link to="/">{t('aboutPage.home')}</Link>
              <span className="sep">/</span>
              <a href="/#services" onClick={goToServices}>{t('servicesPage.crumb')}</a>
              <span className="sep">/</span>
              {t('googleAdsPage.crumb')}
            </div>
          </div>
          <h1>
            {t('googleAdsPage.heroLine1')}<br />
            {t('googleAdsPage.heroLine2')} <em className="italic">{t('googleAdsPage.heroItalic')}</em>, {t('googleAdsPage.heroLine2b')} <span className="accent">{t('googleAdsPage.heroAccent')}</span>
          </h1>
        </div>
      </section>

      <div style={{ background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '24px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <span style={{ font: '600 13px/1 var(--mono)', color: '#F7AD1A', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {t('googleAdsPage.intentLabel')}
            </span>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            <span style={{ font: '400 14px/1.5 var(--display)', color: 'var(--fg-dim)', maxWidth: 480 }}>
              {t('googleAdsPage.intentDesc')}
            </span>
          </div>
        </div>
      </div>

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
              <div className="sc-head" style={{ marginBottom: 16 }}>/ Google Ads</div>
              {sidecard.map((item, i) => (
                <div key={i} style={{ borderBottom: '1px solid var(--border)', padding: '12px 0' }}>
                  <div style={{ font: '500 10px/1 var(--mono)', color: '#F7AD1A', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>
                    {item.label}
                  </div>
                  <div style={{ font: '400 13px/1.5 var(--display)', color: 'var(--fg-dim)' }}>
                    {item.val}
                  </div>
                </div>
              ))}
              <a href="/#contact" onClick={goToContact} className="btn btn-primary sc-cta" style={{ marginTop: 20, width: '100%', justifyContent: 'center' }}>
                {t('servicesPage.ctaBookBtn')} <IconArrow size={14} className="arrow" />
              </a>
              <div style={{ font: '400 12px/1.5 var(--mono)', color: 'var(--fg-mute)', marginTop: 12 }}>
                {t('googleAdsPage.replyNote')}
              </div>
            </aside>
          </div>

          <div className="svc-proof-4 reveal">
            {cases.map((c, i) => (
              <div key={i} className="svc-proof-cell">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <div className="metric-label">{c.niche}</div>
                  <a
                    href={c.instagram ?? 'https://www.instagram.com/mariana_leus_/'}
                    target="_blank" rel="noopener noreferrer"
                    className="case-arrow"
                    style={{ width: 26, height: 26, flexShrink: 0 }}
                  >
                    <IconArrowUp size={12} />
                  </a>
                </div>
                <div className="metric-value">
                  {['+','×','€','$','≈'].some(s => c.result.startsWith(s))
                    ? <><span className="plus">{c.result[0]}</span>{c.result.slice(1)}</>
                    : c.result}
                  {' '}<span style={{ fontSize: '0.45em', opacity: 0.55, fontWeight: 400 }}>{c.unit}</span>
                </div>
                <div className="metric-desc">{c.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="mesh">
          <div className="blob b1" style={{ background: 'radial-gradient(circle, #F7AD1A22 0%, transparent 70%)' }} />
          <div className="blob b2" />
          <div className="blob b3" />
        </div>
        <div className="container">
          <div className="cta-band-inner">
            <h3>
              {t('googleAdsPage.ctaLine1')}<br />
              {t('googleAdsPage.ctaLine2')} <em className="italic">{t('googleAdsPage.ctaItalic')}</em> <span className="accent">{t('googleAdsPage.ctaAccent')}</span>
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
