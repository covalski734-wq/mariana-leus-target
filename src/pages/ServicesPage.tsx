import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { IconCheck, IconArrow } from '@/components/Icons';
import { useTranslation } from 'react-i18next';

// ── types ─────────────────────────────────────────────────────────────────────

interface Deliverable { name: string; note: string; }
interface PricingRow { label: string; val: string; unit: string; }
interface ProofCell { v: string; l: string; d: string; }
interface ServiceDetail {
  id: string; num: string; kicker: string; name: string; sub: string; tag: string;
  lede: string;
  deliverables: Deliverable[];
  pricing: PricingRow[];
  proof: ProofCell[];
}
interface ProcessStep { n: string; t: string; d: string; w: string; }
interface FaqItem { q: string; a: string; }

// ── sub-components ─────────────────────────────────────────────────────────────

const SvcPills: React.FC<{ active: string; onSelect: (id: string) => void; services: ServiceDetail[] }> = ({ active, onSelect, services }) => (
  <div className="svc-pills">
    <div className="container">
      <div className="svc-pills-inner">
        {services.map(s => (
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

const SvcBlock: React.FC<{ svc: ServiceDetail }> = ({ svc }) => {
  const { t } = useTranslation();
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
            <div className="sc-head">{t('servicesPage.investment')}</div>
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
  const { t } = useTranslation();
  const processSteps = t('servicesPage.processSteps', { returnObjects: true }) as ProcessStep[];
  return (
    <div className="svc-process">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="section-num">{t('servicesPage.processNum')}</div>
            <h2>{t('servicesPage.processTitle').split('\n').map((line: string, i: number, arr: string[]) => (
              <React.Fragment key={i}>{line}{i < arr.length - 1 && <br />}</React.Fragment>
            ))}</h2>
          </div>
          <p className="side">{t('servicesPage.processDesc')}</p>
        </div>
        <div className="proc-steps">
          {processSteps.map((s, i) => (
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
  const { t } = useTranslation();
  const faqItems = t('servicesPage.faqItems', { returnObjects: true }) as FaqItem[];
  return (
    <div className="faq">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="section-num">{t('servicesPage.faqNum')}</div>
            <h2>{t('servicesPage.faqTitle').split('\n').map((line: string, i: number, arr: string[]) => (
              <React.Fragment key={i}>{line}{i < arr.length - 1 && <br />}</React.Fragment>
            ))}</h2>
          </div>
          <p className="side">{t('servicesPage.faqDesc')}</p>
        </div>
        <div className="faq-list">
          {faqItems.map((item, i) => (
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
  const { t } = useTranslation();
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
          <h3>{t('servicesPage.ctaTitle').split('\n').map((line: string, i: number, arr: string[]) => (
            <React.Fragment key={i}>{line}{i < arr.length - 1 && <br />}</React.Fragment>
          ))}</h3>
          <div className="ctas">
            <a href="#contact" onClick={scrollTo} className="btn btn-primary">
              {t('servicesPage.ctaBookBtn')} <IconArrow size={16} className="arrow" />
            </a>
            <Link to="/" className="btn btn-ghost">{t('servicesPage.backHome')}</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── page ───────────────────────────────────────────────────────────────────────

export const ServicesPage: React.FC = () => {
  const { t } = useTranslation();
  const serviceDetails = t('servicesPage.serviceDetails', { returnObjects: true }) as ServiceDetail[];
  const [activeId, setActiveId] = useState(serviceDetails[0]?.id ?? 'meta');
  const blockRefs = useRef<Record<string, HTMLDivElement | null>>({});

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
              <Link to="/">{t('aboutPage.home')}</Link>
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
      <SvcPills active={activeId} onSelect={handlePillSelect} services={serviceDetails} />

      {/* Service blocks */}
      {serviceDetails.map(svc => (
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
