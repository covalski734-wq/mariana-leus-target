import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const PrivacyPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="pg-hero" style={{ minHeight: 'auto', paddingBottom: 80 }}>
      <div className="container" style={{ maxWidth: '52rem', paddingTop: 80 }}>
        {/* Breadcrumb */}
        <div className="crumb" style={{ marginBottom: 40, font: '400 13px/1 var(--mono)', color: 'var(--fg-mute)', display: 'flex', gap: 8, alignItems: 'center' }}>
          <Link to="/">{t('aboutPage.home')}</Link>
          <span>/</span>
          <span>{t('privacy.title')}</span>
        </div>

        <h1 style={{ fontSize: 'clamp(1.5rem,5vw,3rem)', fontWeight: 700, marginBottom: '0.5rem', letterSpacing: '-0.03em', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
          {t('privacy.title')}
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--fg-mute)', marginBottom: '3rem', fontFamily: 'var(--mono)' }}>
          {t('privacy.updated')}
        </p>

        <p style={{ color: 'var(--fg-dim)', lineHeight: 1.8, marginBottom: '2.5rem' }}>
          {t('privacy.intro')}
        </p>

        {[
          { title: t('privacy.s1Title'), body: t('privacy.s1') },
          { title: t('privacy.s2Title'), body: t('privacy.s2') },
          { title: t('privacy.s3Title'), body: t('privacy.s3') },
          { title: t('privacy.s4Title'), body: t('privacy.s4') },
          { title: t('privacy.s5Title'), body: t('privacy.s5'), isContact: true },
        ].map((section, i) => {
          const email = 'marianaleus8@gmail.com';
          const parts = section.body.split(email);
          return (
            <div key={i} style={{ marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.75rem', letterSpacing: '-0.01em' }}>
                {section.title}
              </h2>
              <p style={{ color: 'var(--fg-dim)', lineHeight: 1.8 }}>
                {section.isContact && parts.length > 1 ? (
                  <>
                    {parts[0]}
                    <a href={`mailto:${email}`} style={{ color: 'var(--brand)', textDecoration: 'underline', textUnderlineOffset: 3 }}>
                      {email}
                    </a>
                    {parts[1]}
                  </>
                ) : section.body}
              </p>
            </div>
          );
        })}

        <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
          <Link to="/" className="btn btn-ghost" style={{ fontSize: 14 }}>
            {t('privacy.backHome')}
          </Link>
        </div>
      </div>
    </div>
  );
};
