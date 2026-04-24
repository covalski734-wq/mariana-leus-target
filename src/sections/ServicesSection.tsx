import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { SERVICES } from '@/data';
import { IconMeta, IconGoogle, IconCode, IconSocial, IconSearch, IconArrow } from '@/components/Icons';
import { useLanguage } from '@/context/LanguageContext';

const iconMap: Record<string, React.FC<{ size?: number }>> = {
  meta: IconMeta,
  google: IconGoogle,
  code: IconCode,
  social: IconSocial,
  search: IconSearch,
};

// Map service id to translation key
const svcKeyMap: Record<string, string> = {
  meta: 'meta',
  google: 'google',
  web: 'web',
  smm: 'smm',
  seo: 'seo',
};

export const ServicesSection: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = (e.currentTarget as HTMLDivElement);
    const glow = card.querySelector('.glow') as HTMLElement | null;
    if (!glow) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mx', x + '%');
    card.style.setProperty('--my', y + '%');
  };

  return (
    <section className="services" id="services">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="section-num">{t('services.sectionNum')}</div>
            <h2>{t('services.title').split('\n').map((line, i, arr) => (
              <React.Fragment key={i}>{line}{i < arr.length - 1 && <br />}</React.Fragment>
            ))}</h2>
          </div>
          <p className="side">{t('services.desc')}</p>
        </div>

        <div className="services-grid" ref={gridRef}>
          {SERVICES.map((svc) => {
            const Icon = iconMap[svc.icon] ?? IconCode;
            const key = svcKeyMap[svc.id] ?? svc.id;
            const name = t(`services.${key}.name`);
            const sub = t(`services.${key}.sub`);
            const desc = t(`services.${key}.desc`);
            return (
              <div
                key={svc.id}
                className="svc reveal"
                onMouseMove={handleMouseMove}
              >
                <div className="glow" />
                <div className="svc-icon">
                  <Icon size={20} />
                </div>
                <span className="svc-num">{svc.num}</span>
                <h3>{name}<br /><small style={{ fontSize: '0.6em', opacity: 0.55, fontWeight: 400 }}>{sub}</small></h3>
                <p>{desc}</p>
                <Link to="/services" className="learn">
                  {t('services.learnMore')} <IconArrow size={14} className="arrow" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
