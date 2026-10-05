import React from 'react';
import { useTranslation } from 'react-i18next';
import { IconArrowUp } from './Icons';

export interface CaseItem {
  niche: string;
  result: string;
  unit: string;
  title: string;
  desc: string;
  instagram?: string;
  tags?: string[];
}

export const CaseCell: React.FC<{ c: CaseItem }> = ({ c }) => {
  const { t } = useTranslation();
  return (
    <article className="svc-proof-cell short-case">
      <div className="short-case-top">
        <div className="metric-label">{c.niche}</div>
        {c.instagram && <a href={c.instagram} target="_blank" rel="noopener noreferrer"
          className="case-arrow" aria-label={`${t('cases.viewCase')}: ${c.niche}`}>
          <IconArrowUp size={14} />
        </a>}
      </div>
      <div className="metric-value">{c.result} <span className="short-case-unit">{c.unit}</span></div>
      <h3 className="metric-desc">{c.title}</h3>
      <p className="short-case-description">{c.desc}</p>
    </article>
  );
};
