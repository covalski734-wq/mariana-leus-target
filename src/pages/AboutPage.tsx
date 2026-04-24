import React from 'react';
import { Link } from 'react-router-dom';
import { IconArrow } from '@/components/Icons';
import { useLanguage } from '@/context/LanguageContext';

const TIMELINE = [
  { year: '2019', role: 'First paid media role', body: 'Joined a Warsaw-based e-commerce startup as their first in-house marketer. Ran Meta and Google campaigns from scratch — no playbook, no agency.' },
  { year: '2020–21', role: 'Agency side', body: "Managed €1M+ in annual spend across 15+ accounts at a boutique performance agency. Learned what scales and what doesn't across e-com, SaaS, and local service businesses." },
  { year: '2022', role: 'Going solo', body: 'Left the agency to work directly with founders. Smaller client roster, deeper involvement, and actual accountability for results.' },
  { year: '2023', role: 'Expanded to web & SEO', body: 'Added landing page builds and SEO retainers to close the loop between traffic and conversion. Clients were losing leads to bad pages — I fixed that.' },
  { year: '2024–now', role: 'Full-stack performance', body: 'Running a focused practice: Meta, Google, web, SMM, SEO. Based in Warsaw, working across Europe and remote-globally. 2 spots available for Q3.', current: true },
];

const PRINCIPLES = [
  { n: '01', t: 'Numbers over narratives', d: "I don't run ads to win awards. Every decision is tied to a measurable business outcome — ROAS, CPL, CAC, revenue. If the metric doesn't improve, the approach changes." },
  { n: '02', t: 'One client per niche', d: "If you're a dental clinic in Warsaw, no competitor works with me while you do. Conflict of interest is an integrity problem, not just a business one." },
  { n: '03', t: 'Honest before comfortable', d: "If a campaign isn't working, you hear it from me before you see it in the dashboard. I'd rather lose a client with honesty than keep one with spin." },
  { n: '04', t: 'Craft over volume', d: "I cap my client roster to keep quality high. I can't do good work for 20 accounts. So I don't try." },
  { n: '05', t: 'Long-term compounding', d: "The best results I've delivered came from clients who stayed long enough for strategies to mature. I don't optimise for quick wins that don't hold." },
  { n: '06', t: 'You own everything', d: "Ad accounts, creatives, data, code — all yours. Nothing is held hostage. If we stop working together, you keep all the assets and the knowledge." },
];

const TOOLS = [
  { group: 'Paid Media', chips: ['Meta Ads Manager', 'Google Ads', 'Google Analytics 4', 'Meta CAPI', 'Google Tag Manager', 'Looker Studio'] },
  { group: 'Creative & Design', chips: ['Figma', 'Canva Pro', 'CapCut', 'Adobe Lightroom'] },
  { group: 'Web & Landing Pages', chips: ['Webflow', 'Framer', 'React / Vite', 'HubSpot', 'Notion'] },
  { group: 'SEO & Content', chips: ['Ahrefs', 'Screaming Frog', 'Surfer SEO', 'Google Search Console'] },
];

// ── sub-components ─────────────────────────────────────────────────────────────

const AboutHero: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="ab-hero">
      <div className="hero-bgtype" style={{ fontSize: 'clamp(100px,22vw,320px)', opacity: 0.06 }}><span>MARIANA</span></div>
      <div className="mesh" style={{ opacity: 0.5 }}>
        <div className="blob b1" /><div className="blob b2" />
      </div>
      <div className="grid-overlay" />
      <div className="container">
        <div className="crumb" style={{ marginBottom: 32, font: '400 13px/1 var(--mono)', color: 'var(--fg-mute)', display: 'flex', gap: 8, alignItems: 'center' }}>
          <Link to="/">Home</Link>
          <span>/</span>
          <span>{t('aboutPage.crumb')}</span>
        </div>
        <div className="ab-hero-grid">
          <div>
            <div className="eyebrow" style={{ marginBottom: 28 }}>
              <span className="dot pulse" />
              Performance marketer · Warsaw
            </div>
            <h1>
              {t('aboutPage.heroTitle1')}{' '}
              <em className="italic">{t('aboutPage.heroItalic')}</em>{' '}
              {t('aboutPage.heroTitle2')}<br />
              {t('aboutPage.heroTitle3')}{' '}
              <span className="underline">{t('aboutPage.heroUnderline')}</span>
            </h1>
            <div style={{ marginTop: 32, display: 'flex', gap: 12 }}>
              <a href="/#contact" className="btn btn-primary">
                {t('aboutPage.ctaBook')} <IconArrow size={16} className="arrow" />
              </a>
              <Link to="/services" className="btn btn-ghost">
                {t('aboutPage.ctaServices')}
              </Link>
            </div>
          </div>
          <div className="ab-hero-photo">
            <img src="/mariana.jpg" alt="Mariana Leus" />
            <div className="ab-photo-cap">{t('aboutPage.photoCaption')}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AboutIntro: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="ab-intro container">
      <div className="label">{t('aboutPage.introLabel')}</div>
      <div className="prose">
        <p>{t('aboutPage.intro1')}</p>
        <p>{t('aboutPage.intro2')}</p>
        <p>{t('aboutPage.intro3')}</p>
      </div>
    </div>
  );
};

const TimelineSection: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="ab-timeline">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="section-num">{t('aboutPage.timelineNum')}</div>
            <h2>{t('aboutPage.timelineTitle')}</h2>
          </div>
          <p className="side">{t('aboutPage.timelineDesc')}</p>
        </div>
        <div className="tl-list">
          {TIMELINE.map((item, i) => (
            <div key={i} className={'tl-item' + ('current' in item && item.current ? ' current' : '')}>
              <div className="tl-year">{item.year}</div>
              <div className="tl-body">
                <h4>{item.role}</h4>
                <div className="tl-role">{item.year}</div>
                <p>{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const PrinciplesSection: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="ab-principles">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="section-num">{t('aboutPage.principlesNum')}</div>
            <h2>{t('aboutPage.principlesTitle')}</h2>
          </div>
          <p className="side">{t('aboutPage.principlesDesc')}</p>
        </div>
        <div className="pr-grid">
          {PRINCIPLES.map((p, i) => (
            <div key={i} className="pr-cell">
              <div className="n">{p.n}</div>
              <div className="t">{p.t}</div>
              <div className="d">{p.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ToolkitSection: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="ab-tools">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="section-num">{t('aboutPage.toolkitNum')}</div>
            <h2>{t('aboutPage.toolkitTitle')}</h2>
          </div>
          <p className="side">{t('aboutPage.toolkitDesc')}</p>
        </div>
        <div className="tool-groups">
          {TOOLS.map((g, i) => (
            <div key={i} className="tool-group">
              <h4>{g.group}</h4>
              <div className="tool-chips">
                {g.chips.map((c, j) => (
                  <span key={j} className="tool-chip">{c}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AboutQuote: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="ab-quote">
      <div className="container">
        <div className="q-mark">"</div>
        <blockquote>{t('aboutPage.quote')}</blockquote>
        <cite>{t('aboutPage.quoteSource')}</cite>
      </div>
    </div>
  );
};

const AboutCta: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="cta-band">
      <div className="mesh" style={{ opacity: 0.4 }}>
        <div className="blob b1" /><div className="blob b2" />
      </div>
      <div className="container">
        <div className="cta-band-inner">
          <h3>
            {t('aboutPage.ctaTitle1')}<br />
            {t('aboutPage.ctaTitle2')}{' '}
            {t('aboutPage.ctaTitle3')}{' '}
            <em className="italic">{t('aboutPage.ctaItalic')}</em>{' '}
            {t('aboutPage.ctaTitle4')}
          </h3>
          <div className="ctas">
            <a
              href="/#contact"
              onClick={e => { e.preventDefault(); window.location.href = '/#contact'; }}
              className="btn btn-primary"
            >
              {t('aboutPage.ctaBook')} <IconArrow size={16} className="arrow" />
            </a>
            <Link to="/services" className="btn btn-ghost">{t('aboutPage.ctaServices')}</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── page ───────────────────────────────────────────────────────────────────────

export const AboutPage: React.FC = () => (
  <>
    <AboutHero />
    <AboutIntro />
    <TimelineSection />
    <PrinciplesSection />
    <ToolkitSection />
    <AboutQuote />
    <AboutCta />
  </>
);
