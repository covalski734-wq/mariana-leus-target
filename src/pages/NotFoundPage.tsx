import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IconArrow } from '@/components/Icons';

export const NotFoundPage: React.FC = () => {
  useTranslation(); // ensures i18n is initialised
  return (
    <section className="pg-hero" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
      <div className="container">
        <div className="section-num">404</div>
        <h1 style={{ font: '600 clamp(48px,10vw,120px)/0.94 var(--display)', letterSpacing: '-0.045em', margin: '0 0 24px' }}>
          Page not<br /><em style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 300 }}>found.</em>
        </h1>
        <p style={{ font: '400 18px/1.55 var(--display)', color: 'var(--fg-dim)', marginBottom: 40 }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn btn-primary">
          Back to home <IconArrow size={14} className="arrow" />
        </Link>
      </div>
    </section>
  );
};
