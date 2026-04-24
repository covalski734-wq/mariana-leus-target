import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { IconCheck, IconArrow } from '@/components/Icons';
import { useLanguage } from '@/context/LanguageContext';

// ── data ──────────────────────────────────────────────────────────────────────

const SERVICE_DETAILS = [
  {
    id: 'meta', num: '01', kicker: 'Paid Social', name: 'Meta Ads', sub: 'Facebook & Instagram', tag: 'Revenue + leads',
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
  },
  {
    id: 'google', num: '02', kicker: 'Paid Search', name: 'Google Ads', sub: 'Search, PMax, Display', tag: 'High-intent traffic',
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
  },
  {
    id: 'web', num: '03', kicker: 'Conversion', name: 'Website & Landing Pages', sub: 'Designed to convert', tag: 'Ship in 2–3 weeks',
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
  },
  {
    id: 'smm', num: '04', kicker: 'Social', name: 'Social Media Management', sub: 'Content + community', tag: 'Organic that supports paid',
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
  },
  {
    id: 'seo', num: '05', kicker: 'Organic', name: 'SEO', sub: 'Technical + content', tag: 'Compound growth',
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
  },
];

const PROCESS_STEPS = [
  { n: '01', t: 'Audit', d: 'I review your current setup — ad accounts, landing pages, tracking — and identify the biggest leaks.', w: 'Week 1' },
  { n: '02', t: 'Strategy', d: "A written plan: what we run, what we cut, what we test first, and what we're measuring.", w: 'Week 1–2' },
  { n: '03', t: 'Build', d: 'Campaigns, creatives, and tracking built to the plan. No wasted clicks before launch.', w: 'Week 2–3' },
  { n: '04', t: 'Iterate', d: 'Weekly reviews, creative testing, and continuous optimisation against the agreed KPIs.', w: 'Ongoing' },
];

const FAQ_ITEMS = [
  { q: 'Do you work with clients outside Europe?', a: 'Yes. Most of my clients are European-based, but I work with brands globally — time zones permitting. I typically cover CET business hours plus some evenings.' },
  { q: 'What ad spend do you require?', a: 'It depends on the service. Meta Ads requires a minimum of €5k/month in spend for the economics to make sense. Google Ads starts at €3k. SEO and SMM have no spend floor — they are flat retainers.' },
  { q: 'Do you work with multiple clients in the same niche?', a: 'No. I take one client per niche at a time. If you are a dental clinic in Warsaw, no competitor will work with me while you are a client.' },
  { q: 'How do you report results?', a: "Weekly Loom video + written summary. No 50-tab dashboards. You get what changed, why, and what's next. If something isn't working, you hear it from me before you see it in the numbers." },
  { q: 'Can I hire you for a one-off project?', a: "For Web Dev — yes, I do fixed-scope projects. For paid media (Meta, Google), results compound over months, so I don't offer one-off campaign setups without a minimum 3-month commitment." },
  { q: 'What makes you different from an agency?', a: "You work directly with me, not an account manager. I cap the number of clients I take to keep quality high. And I have skin in the game — my reputation is my only business, so I won't inflate vanity metrics." },
];

// ── sub-components ─────────────────────────────────────────────────────────────

const SvcPills: React.FC<{ active: string; onSelect: (id: string) => void }> = ({ active, onSelect }) => (
  <div className="svc-pills">
    <div className="container">
      <div className="svc-pills-inner">
        {SERVICE_DETAILS.map(s => (
          <button
            key={s.id}
            className={'svc-pill' + (active === s.id ? ' active' : '')}
            onClick={() => onSelect(s.id)}
          >
            {s.num} {s.name}
          </button>
        ))}
      </div>
    </div>
  </div>
);

const SvcBlock: React.FC<{ svc: typeof SERVICE_DETAILS[0] }> = ({ svc }) => {
  const { t } = useLanguage();
  const scrollTo = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="svc-block" id={`svc-${svc.id}`}>
      <div className="container">
        <div className="svc-head">
          <p className="num">{svc.num}</p>
          <div className="right">
            <div className="kicker"><span className="d" />{svc.kicker}</div>
            <h2>{svc.name}</h2>
            <p>{svc.lede}</p>
          </div>
        </div>

        <div className="svc-body">
          {/* Deliverables */}
          <div className="svc-deliverables">
            {svc.deliverables.map((d, i) => (
              <div key={i} className="svc-deliv">
                <span className="idx">{String(i + 1).padStart(2, '0')}</span>
                <div className="name">
                  {d.name}
                  <small>{d.note}</small>
                </div>
                <div className="chk"><IconCheck size={12} /></div>
              </div>
            ))}
          </div>

          {/* Side card */}
          <div className="svc-sidecard">
            <div className="sc-head">Investment</div>
            {svc.pricing.map((p, i) => (
              <div key={i} className="sc-row">
                <span className="sc-label">{p.label}</span>
                <span className="sc-val">{p.val}<span className="unit">{p.unit}</span></span>
              </div>
            ))}
            <div className="sc-cta">
              <a href="#contact" onClick={scrollTo} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                {t('servicesPage.ctaBookBtn')} <IconArrow size={14} className="arrow" />
              </a>
            </div>
          </div>
        </div>

        {/* Proof cells */}
        <div className="svc-proof">
          {svc.proof.map((p, i) => (
            <div key={i} className="svc-proof-cell">
              <div className="metric-value">
                <span className="plus">{p.v.charAt(0) === '+' || p.v.charAt(0) === '×' ? p.v.charAt(0) : ''}</span>
                {p.v.charAt(0) === '+' || p.v.charAt(0) === '×' ? p.v.slice(1) : p.v}
              </div>
              <div className="metric-label">{p.l}</div>
              <div className="metric-desc">{p.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProcessSection: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="svc-process">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="section-num">{t('servicesPage.processNum')}</div>
            <h2>{t('servicesPage.processTitle').split('\n').map((line, i, arr) => (
              <React.Fragment key={i}>{line}{i < arr.length - 1 && <br />}</React.Fragment>
            ))}</h2>
          </div>
          <p className="side">{t('servicesPage.processDesc')}</p>
        </div>
        <div className="proc-steps">
          {PROCESS_STEPS.map((s, i) => (
            <div key={i} className="proc-step">
              <div className="pn">{s.n}</div>
              <div className="pt">{s.t}</div>
              <div className="pd">{s.d}</div>
              <div className="pw">{s.w}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const FaqSection: React.FC = () => {
  const [open, setOpen] = useState<number | null>(null);
  const { t } = useLanguage();
  return (
    <div className="faq">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="section-num">{t('servicesPage.faqNum')}</div>
            <h2>{t('servicesPage.faqTitle').split('\n').map((line, i, arr) => (
              <React.Fragment key={i}>{line}{i < arr.length - 1 && <br />}</React.Fragment>
            ))}</h2>
          </div>
          <p className="side">{t('servicesPage.faqDesc')}</p>
        </div>
        <div className="faq-list">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} className={'faq-item' + (open === i ? ' open' : '')}>
              <button className="faq-q" onClick={() => setOpen(open === i ? null : i)}>
                {item.q}
                <span className="pm">+</span>
              </button>
              <div className="faq-a">
                <div className="faq-a-inner"><p>{item.a}</p></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CtaBand: React.FC = () => {
  const { t } = useLanguage();
  const scrollTo = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <div className="cta-band">
      <div className="mesh" style={{ opacity: 0.4 }}>
        <div className="blob b1" /><div className="blob b2" />
      </div>
      <div className="container">
        <div className="cta-band-inner">
          <h3>{t('servicesPage.ctaTitle').split('\n').map((line, i, arr) => (
            <React.Fragment key={i}>{line}{i < arr.length - 1 && <br />}</React.Fragment>
          ))}</h3>
          <div className="ctas">
            <a href="#contact" onClick={scrollTo} className="btn btn-primary">
              {t('servicesPage.ctaBookBtn')} <IconArrow size={16} className="arrow" />
            </a>
            <Link to="/" className="btn btn-ghost">← Back home</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── page ───────────────────────────────────────────────────────────────────────

export const ServicesPage: React.FC = () => {
  const [activeId, setActiveId] = useState(SERVICE_DETAILS[0].id);
  const blockRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const { t } = useLanguage();

  const handlePillSelect = (id: string) => {
    setActiveId(id);
    const el = document.getElementById(`svc-${id}`);
    if (el) {
      const offset = 120;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Page hero */}
      <div className="pg-hero">
        <div className="hero-bgtype"><span>SERVICES</span></div>
        <div className="mesh">
          <div className="blob b1" /><div className="blob b2" /><div className="blob b3" />
        </div>
        <div className="grid-overlay" />
        <div className="container">
          <div className="eyebrow-row">
            <div className="crumb">
              <Link to="/">Home</Link>
              <span className="sep">/</span>
              {t('servicesPage.crumb')}
            </div>
          </div>
          <h1>
            {t('servicesPage.heroTitle1')}<br />
            <em className="italic">{t('servicesPage.heroItalic')}</em>{' '}
            <span className="accent">{t('servicesPage.heroTitle2')}</span>
          </h1>
          <p className="lede">{t('servicesPage.heroLede')}</p>
        </div>
      </div>

      {/* Sticky pills */}
      <SvcPills active={activeId} onSelect={handlePillSelect} />

      {/* Service blocks */}
      {SERVICE_DETAILS.map(svc => (
        <div key={svc.id} ref={el => { blockRefs.current[svc.id] = el; }}>
          <SvcBlock svc={svc} />
        </div>
      ))}

      {/* Process */}
      <ProcessSection />

      {/* FAQ */}
      <FaqSection />

      {/* CTA band */}
      <CtaBand />

      {/* Contact section anchor */}
      <div id="contact" style={{ display: 'none' }} />
    </>
  );
};
