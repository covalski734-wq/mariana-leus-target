import React from 'react';
import { useTranslation } from 'react-i18next';

interface TestimonialItem {
  name: string;
  role: string;
  text: string;
  stars: number;
  init: string;
}

export const TestimonialsSection: React.FC = () => {
  const { t } = useTranslation();
  const testimonials = t('testimonials.items', { returnObjects: true }) as TestimonialItem[];
  const all = [...testimonials, ...testimonials];

  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="section-num">{t('testimonials.sectionNum')}</div>
            <h2>{t('testimonials.title').split('\n').map((line: string, i: number, arr: string[]) => (
              <React.Fragment key={i}>{line}{i < arr.length - 1 && <br />}</React.Fragment>
            ))}</h2>
          </div>
          <p className="side">{t('testimonials.desc')}</p>
        </div>
      </div>

      <div style={{ overflow: 'hidden' }}>
        <div className="marquee">
          {all.map((item, i) => (
            <div key={i} className="t-card">
              <div className="t-stars">{'★'.repeat(item.stars)}</div>
              <p>"{item.text}"</p>
              <div className="t-who">
                <div className="t-avatar">{item.init}</div>
                <div>
                  <div className="t-name">{item.name}</div>
                  <div className="t-role">{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
