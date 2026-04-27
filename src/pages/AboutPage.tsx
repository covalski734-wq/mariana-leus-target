import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IconArrow } from '@/components/Icons';

// ── Data (matches Claude Design exactly) ────────────────────────────────────

const TIMELINE = [
  {
    year: '2018',
    role: 'In-house growth · DTC skincare',
    title: 'The job that broke my agency beliefs',
    text: "Joined a skincare brand burning €40k/mo on lookalikes that weren't converting. Rebuilt the Meta account from scratch, scrapped the agency, and took the brand from break-even ROAS to 3.2× in four months. First time I realised most growth problems are creative problems disguised as algorithm problems.",
  },
  {
    year: '2020',
    role: 'Freelance · Kyiv',
    title: 'First 10 clients, first rule',
    text: "Went solo. Started taking on clients month-to-month — no annual contracts, no retainers dressed up as scope. Learned to say no quickly when the product or margins didn't support paid acquisition. That list of declined clients is as valuable as the list of accepted ones.",
  },
  {
    year: '2022',
    role: 'Relocation · Warsaw',
    title: 'Scaling across three markets',
    text: 'Moved to Warsaw. Started working across PL, DE, and UA markets simultaneously — three languages, three consumer psychologies, three ad account climates. Figured out how to structure campaigns that share creative pipelines but respect local shopping behaviour.',
  },
  {
    year: '2024',
    role: 'Solo practice, current',
    title: '€2.4M managed, 14-client cap',
    text: 'Formalised the practice around a hard cap of 14 concurrent clients and a flat retainer model. Every account is mine — no juniors, no white-label. Shipped a Telegram-first lead intake that now handles 40% of after-hours enquiries for service clients.',
    current: true,
  },
];

const PRINCIPLES = [
  { n: '01', t: 'Revenue is the only metric that matters', d: "ROAS, CTR, CPM — these are instruments, not goals. Every campaign I run is measured against the revenue line in your P&L. If it doesn't show up there, it doesn't count." },
  { n: '02', t: 'Creative is 70% of performance', d: 'The algorithm is commoditised. Everyone bids the same auctions with the same pixels. The edge is what you show, how you say it, and who shows up in the shot. I obsess about creative testing — not targeting tricks.' },
  { n: '03', t: 'Small, concentrated, slow', d: "I work with 10–14 clients, never more. I don't scale by hiring juniors or white-labelling. The brands I take on get my whole brain on their problem — that's the entire value proposition." },
  { n: '04', t: 'Say no quickly', d: "If your margins can't support paid acquisition, or your product-market fit is shaky, I'll tell you on the first call and refund the audit. Wasting your budget is worse than losing your retainer." },
  { n: '05', t: 'Plain-language reports', d: "Nobody reads 80-tab dashboards. Monday morning you get a 5-bullet note: what we ran, what moved, what I'm testing next. Charts are linked if you want them." },
  { n: '06', t: 'Telegram over email', d: 'For founders I trust, Telegram is the primary channel. Emails are for contracts and invoices. Quick questions get 2-hour replies — which is the fastest response most performance marketers can promise honestly.' },
];

const TOOLS = [
  { group: 'Ads & tracking', items: ['Meta Ads Manager', 'Google Ads', 'Google Tag Manager', 'GA4', 'Meta CAPI', 'Hyros', 'TripleWhale', 'Matomo'] },
  { group: 'Web & build', items: ['Webflow', 'Framer', 'Figma', 'Tilda', 'Next.js', 'Vercel', 'Shopify', 'WordPress'] },
  { group: 'Analytics & research', items: ['Looker Studio', 'Hotjar', 'Microsoft Clarity', 'Mixpanel', 'Ahrefs', 'Semrush', 'Amplitude'] },
  { group: 'Ops & comms', items: ['Notion', 'Telegram', 'Slack', 'Linear', 'Loom', 'HubSpot', 'Pipedrive'] },
];

// ── Sub-components ────────────────────────────────────────────────────────────

const AboutHero: React.FC = () => {
  const navigate = useNavigate();
  const goToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    sessionStorage.setItem('scrollTarget', 'contact');
    navigate('/');
  };
  return (
    <section className="ab-hero">
      <div className="mesh" aria-hidden="true">
        <div className="blob b1" /><div className="blob b2" />
        <div className="blob b3" /><div className="blob b4" />
      </div>
      <div className="hero-bgtype"><span>ABOUT</span></div>
      <div className="container">
        <div style={{ position: 'relative', zIndex: 3, marginBottom: 32 }}>
          <div className="crumb" style={{ font: '500 11px/1 var(--mono)', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--fg-mute)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <Link to="/">Home</Link>
            <span style={{ margin: '0 6px', opacity: .5 }}>/</span>
            About
          </div>
        </div>
        <div className="ab-hero-grid">
          <h1>
            Seven years of watching<br />
            <span className="italic">other people's</span> ad accounts,<br />
            so you don't <span className="underline">have to.</span>
          </h1>
          <div className="ab-hero-photo">
            <img src="/mariana.jpg" alt="Mariana Leus portrait" loading="lazy" />
            <div className="ab-photo-cap">Warsaw · 2025 · 14-client cap</div>
          </div>
        </div>
        <div style={{ marginTop: 40, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a href="/#contact" onClick={goToContact} className="btn btn-primary">
            Book a 30-min call <IconArrow size={14} className="arrow" />
          </a>
          <Link to="/services" className="btn btn-ghost">
            See services <IconArrow size={14} className="arrow" />
          </Link>
        </div>
      </div>
    </section>
  );
};

const AboutIntro: React.FC = () => (
  <section className="ab-intro">
    <div className="container">
      <div>
        <div className="label">/ Introduction</div>
      </div>
      <div className="prose">
        <p>I started in-house at a skincare brand that was hemorrhaging budget on lookalikes that didn't convert. After rebuilding the account from scratch and scaling it to €1.2M in annual revenue, founders started asking me to do the same for them. I've been solo ever since — and I've kept it that way on purpose.</p>
        <p>Today I run a quiet, boring practice: 10–14 clients at a time, flat monthly retainers, no junior staff, no account managers, no sales funnel dressed up as a dashboard. If you're reading this page, the only person between you and your campaigns is me.</p>
        <p>Performance marketing rewards the patient and the specific. Most of what agencies sell as "strategy" is a slideshow. The actual work is unglamorous: writing better ads, rebuilding tracking that never worked, killing audiences that never converted, and telling founders honestly when their product isn't ready to scale.</p>
      </div>
    </div>
  </section>
);

const TimelineSection: React.FC = () => (
  <section className="ab-timeline">
    <div className="container">
      <div className="section-head reveal">
        <div>
          <div className="section-num">/ Trajectory</div>
          <h2>How I got here.</h2>
        </div>
        <div className="side">Edited-down version. Full CV on request — but trajectory matters less than the shape of the practice now.</div>
      </div>
      <div className="tl-list reveal">
        {TIMELINE.map((item, i) => (
          <div key={i} className={'tl-item' + (item.current ? ' current' : '')}>
            <div className="tl-year">{item.year}</div>
            <div className="tl-body">
              <div className="tl-role">{item.role}</div>
              <h4>{item.title}</h4>
              <p>{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const PrinciplesSection: React.FC = () => (
  <section className="ab-principles">
    <div className="container">
      <div className="section-head reveal">
        <div>
          <div className="section-num">/ Principles</div>
          <h2>Six things I won't bend on.</h2>
        </div>
        <div className="side">If any of these feel like friction, I'm probably not the right marketer for you — and that's fine. I'll recommend someone who is.</div>
      </div>
      <div className="pr-grid reveal">
        {PRINCIPLES.map(p => (
          <div key={p.n} className="pr-cell">
            <div className="n">{p.n}</div>
            <div className="t">{p.t}</div>
            <div className="d">{p.d}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ToolkitSection: React.FC = () => (
  <section className="ab-tools">
    <div className="container">
      <div className="section-head reveal">
        <div>
          <div className="section-num">/ Toolkit</div>
          <h2>What's in the stack.</h2>
        </div>
        <div className="side">Tools are disposable. I care about the thinking, not the logos — but here's what I actually use day-to-day.</div>
      </div>
      <div className="tool-groups reveal">
        {TOOLS.map(g => (
          <div key={g.group} className="tool-group">
            <h4>{g.group}</h4>
            <div className="tool-chips">
              {g.items.map(item => <span key={item} className="tool-chip">{item}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const AboutQuote: React.FC = () => (
  <section className="ab-quote">
    <div className="container">
      <div className="reveal">
        <div className="q-mark">&ldquo;</div>
        <blockquote>The edge isn't in the auction. It's in the ad.</blockquote>
        <cite>— Working belief, repeated weekly</cite>
      </div>
    </div>
  </section>
);

const AboutCta: React.FC = () => {
  const navigate = useNavigate();
  const goToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    sessionStorage.setItem('scrollTarget', 'contact');
    navigate('/');
  };
  return (
    <section className="cta-band">
      <div className="mesh" aria-hidden="true">
        <div className="blob b1" /><div className="blob b2" /><div className="blob b3" />
      </div>
      <div className="container">
        <div className="cta-band-inner">
          <h3>
            Want to see what<br />
            working together<br />
            would <span className="italic">actually</span> look like?
          </h3>
          <div className="ctas">
            <a href="/#contact" onClick={goToContact} className="btn btn-primary">
              Book a 30-min call <IconArrow size={14} className="arrow" />
            </a>
            <Link to="/services" className="btn btn-ghost">
              See services <IconArrow size={14} className="arrow" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

// ── Page ─────────────────────────────────────────────────────────────────────

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
