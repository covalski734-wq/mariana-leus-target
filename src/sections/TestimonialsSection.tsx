import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface TestimonialItem {
  name: string;
  role: string;
  text: string;
  stars: number;
  init: string;
  services?: string[];
}

export const TestimonialsSection: React.FC = () => {
  const { t } = useTranslation();
  const testimonials = t('testimonials.items', { returnObjects: true }) as TestimonialItem[];
  const all = [...testimonials, ...testimonials];

  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);
  const speed = 0.6;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const tick = () => {
      if (!isDragging.current && track) {
        track.scrollLeft += speed;
        if (track.scrollLeft >= track.scrollWidth / 2) {
          track.scrollLeft = 0;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX;
    scrollStart.current = trackRef.current?.scrollLeft ?? 0;
    trackRef.current?.classList.add('dragging');
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const delta = e.pageX - startX.current;
    if (trackRef.current) trackRef.current.scrollLeft = scrollStart.current - delta;
  };

  const stopDrag = () => {
    isDragging.current = false;
    trackRef.current?.classList.remove('dragging');
  };

  const onTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    startX.current = e.touches[0].pageX;
    scrollStart.current = trackRef.current?.scrollLeft ?? 0;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const delta = e.touches[0].pageX - startX.current;
    if (trackRef.current) trackRef.current.scrollLeft = scrollStart.current - delta;
  };

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

      <div
        ref={trackRef}
        className="marquee-track"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={stopDrag}
      >
        <div className="marquee">
          {all.map((item, i) => (
            <div key={i} className="t-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <div className="t-stars">{'★'.repeat(item.stars)}</div>
                {item.services?.map(s => (
                  <span key={s} style={{
                    font: '500 10px/1 var(--mono)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--brand)',
                    border: '1px solid color-mix(in srgb, var(--brand) 30%, transparent)',
                    borderRadius: 4,
                    padding: '3px 7px',
                  }}>{s}</span>
                ))}
              </div>
              <p>
                &ldquo;{item.text.split('\n').map((line, j, arr) => (
                  <React.Fragment key={j}>
                    {line}
                    {j < arr.length - 1 && (line === '' ? <><br /><br /></> : <br />)}
                  </React.Fragment>
                ))}&rdquo;
              </p>
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
