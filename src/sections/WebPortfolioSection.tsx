import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IconArrow, IconArrowUp } from '@/components/Icons';

interface Project {
  id: string; name: string; url: string; niche: string; type: string;
  summary: string; work: string; benefit: string; platform: string; detailCaption: string;
}

export const WebPortfolioSection: React.FC = () => {
  const { t } = useTranslation();
  const projects = t('webPortfolio.items', { returnObjects: true }) as Project[];
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = projects.find(p => p.id === selectedId);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!selectedId || !dialog.current) return;
    const element = dialog.current;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    element.showModal();
    element.scrollTop = 0;
    return () => {
      element.close();
      document.body.style.overflow = overflow;
    };
  }, [selectedId]);

  const close = () => setSelectedId(null);
  return (
    <section className="web-portfolio" id="our-work">
      <div className="container">
        <div className="section-head">
          <div><div className="section-num">/ Portfolio</div><h2>{t('webPortfolio.title')}</h2></div>
          <p className="side">{t('webPortfolio.intro')}</p>
        </div>
        <div className="web-portfolio-grid">
          {projects.map(project => (
            <article className="web-project" key={project.id}>
              <button className={`web-project-preview project-${project.id}`} onClick={() => setSelectedId(project.id)}
                aria-label={`${t('webPortfolio.details')}: ${project.name}`} aria-haspopup="dialog">
                <div className="browser-frame"><div className="browser-dots" aria-hidden="true"><i /><i /><i /></div><span>{new URL(project.url).hostname}</span></div>
                <img src={`/portfolio/${project.id}-desktop.jpg`} alt={`${project.name}: ${t('webPortfolio.desktop')}`} width="1440" height="1000" loading="lazy" />
              </button>
              <div className="web-project-body">
                <p className="web-project-niche">{project.niche}</p>
                <h3>{project.name}</h3>
                <span className="web-project-type">{project.type}</span>
                <p className="web-project-technology">{t('webPortfolio.technology')}: <strong>{project.platform}</strong></p>
                <p className="web-project-summary">{project.summary}</p>
                <button className="web-project-more" onClick={() => setSelectedId(project.id)} aria-haspopup="dialog">
                  {t('webPortfolio.details')}<IconArrow size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
      <dialog ref={dialog} className="project-dialog" aria-labelledby="project-title" onClose={close}
        onClick={e => { if (e.target === e.currentTarget) close(); }}>
        {selected && <div className="project-dialog-content">
          <div className="project-dialog-bar">
            <span>{selected.name}</span>
            <button onClick={close} className="project-close" aria-label={t('webPortfolio.close')} autoFocus>×</button>
          </div>
          <div className="project-dialog-body">
            <p className="web-project-niche">{selected.niche}</p>
            <h2 id="project-title">{selected.name}</h2>
            <div className="project-tags"><span className="web-project-type">{selected.type}</span><span>{t('webPortfolio.technology')}: {selected.platform}</span></div>
            <img className="project-hero-image" src={`/portfolio/${selected.id}-desktop.jpg`} alt={`${selected.name}: ${t('webPortfolio.desktop')}`} width="1440" height="1000" />
            <div className="project-description-grid">
              <div><h3>{t('webPortfolio.work')}</h3><p>{selected.work}</p></div>
              <div><h3>{t('webPortfolio.benefit')}</h3><p>{selected.benefit}</p></div>
            </div>
            <div className="project-screen-grid">
              <figure><img src={`/portfolio/${selected.id}-detail.jpg`} alt={`${selected.name}: ${selected.detailCaption}`} width="1440" height="1000" loading="lazy" /><figcaption>{selected.detailCaption}</figcaption></figure>
              <figure className="project-mobile-screen"><img src={`/portfolio/${selected.id}-mobile.jpg`} alt={`${selected.name}: ${t('webPortfolio.mobile')}`} width="390" height="844" loading="lazy" /><figcaption>{t('webPortfolio.mobile')}</figcaption></figure>
            </div>
            <a className="btn btn-primary" href={selected.url} target="_blank" rel="noopener noreferrer">
              {t('webPortfolio.visit')} <IconArrowUp size={15} />
            </a>
          </div>
        </div>}
      </dialog>
    </section>
  );
};
