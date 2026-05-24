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
  image?: string;
  instagram?: string;
  mainPage?: boolean;
}

export const CaseStudiesSection: React.FC = () => {
  const { t } = useTranslation();
  const cases = (t('cases.items', { returnObjects: true }) as CaseItem[]).filter(c => c.mainPage !== false);

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
                <a
                  href={c.instagram ?? 'https://www.instagram.com/mariana_leus_/'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="case-arrow"
                >
                  <IconArrowUp size={14} />
                </a>
              </div>

              <div className="preview">
                <div
                  className="preview-mesh"
                  style={c.image ? {
                    backgroundImage: `url(${c.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                  } : {
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

        <p style={{
          marginTop: 32,
          marginBottom: 0,
          font: `400 italic clamp(1.25rem, 2.5vw, 2rem)/1.2 var(--serif)`,
          color: 'var(--fg-dim)',
          textAlign: 'center',
          letterSpacing: '-0.01em',
        }}>
          {t('cases.moreNote')}
        </p>
      </div>
    </section>
  );
};
