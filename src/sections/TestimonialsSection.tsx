import React from 'react';
import { TESTIMONIALS } from '@/data';
import { useLanguage } from '@/context/LanguageContext';

const all = [...TESTIMONIALS, ...TESTIMONIALS];

export const TestimonialsSection: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="section-num">{t('testimonials.sectionNum')}</div>
            <h2>{t('testimonials.title').split('\n').map((line, i, arr) => (
              <React.Fragment key={i}>{line}{i < arr.length - 1 && <br />}</React.Fragment>
            ))}</h2>
          </div>
          <p className="side">{t('testimonials.desc')}</p>
        </div>
      </div>

      <div style={{ overflow: 'hidden' }}>
        <div className="marquee">
          {all.map((t, i) => (
            <div key={i} className="t-card">
              <div className="t-stars">{'★'.repeat(t.stars)}</div>
              <p>"{t.text}"</p>
              <div className="t-who">
                <div className="t-avatar">{t.init}</div>
                <div>
                  <div className="t-name">{t.name}</div>
                  <div className="t-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
