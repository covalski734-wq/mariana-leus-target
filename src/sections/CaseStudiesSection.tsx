import React from 'react';
import { IconArrowUp } from '@/components/Icons';
import { useTranslation } from 'react-i18next';

interface CaseItem {
  niche: string;
  result: string;
  unit: string;
  title: string;
  desc: string;
  gradient: [string, string];
}

export const CaseStudiesSection: React.FC = () => {
  const { t } = useTranslation();
  const cases = t('cases.items', { returnObjects: true }) as CaseItem[];

  return (
    <section className="cases" id="work">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="section-num">{t('cases.sectionNum')}</div>
            <h2>{t('cases.title').split('\n').map((line: string, i: number, arr: string[]) => (
              <React.Fragment key={i}>{line}{i < arr.length - 1 && <br />}</React.Fragment>
            ))}</h2>
          </div>
          <p className="side">{t('cases.desc')}</p>
        </div>

        <div className="cases-grid">
          {cases.map((c, i) => (
            <div key={i} className="case reveal">
              <div className="case-top">
                <span className="case-niche">{c.niche}</span>
                <div className="case-arrow">
                  <IconArrowUp size={14} />
                </div>
              </div>

              <div className="preview">
                <div
                  className="preview-mesh"
                  style={{
                    background: `radial-gradient(circle at 30% 40%, ${c.gradient[0]}66, transparent 50%),
                                 radial-gradient(circle at 70% 70%, ${c.gradient[1]}99, transparent 60%)`,
                  }}
                />
              </div>

              <div className="case-result">
                {c.result.startsWith('+') || c.result.startsWith('×') || c.result.startsWith('€') || c.result.startsWith('$') || c.result.startsWith('≈')
                  ? <><span className="plus">{c.result.charAt(0)}</span>{c.result.slice(1)}</>
                  : c.result
                }
                {' '}<span style={{ fontSize: '0.45em', opacity: 0.55, fontWeight: 400 }}>{c.unit}</span>
              </div>

              <h4>{c.title}</h4>
              <p>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
