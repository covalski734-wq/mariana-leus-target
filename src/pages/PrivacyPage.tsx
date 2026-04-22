import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="text-xl font-bold text-[color:var(--text-primary)] mb-3">{title}</h2>
    <div className="text-[color:var(--text-secondary)] leading-relaxed space-y-3">{children}</div>
  </div>
)

export const PrivacyPage: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      {/* Top bar */}
      <div className="border-b border-surface">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
          <Link
            to="/"
            className="text-sm text-[color:var(--text-secondary)] hover:text-primary transition-colors duration-200"
          >
            {t('privacy.backHome')}
          </Link>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <h1 className="text-4xl font-bold text-[color:var(--text-primary)] mb-2">
          {t('privacy.title')}
        </h1>
        <p className="text-sm text-[color:var(--text-muted)] mb-12">{t('privacy.lastUpdated')}</p>

        <Section title="1. Who We Are">
          <p>
            This website is operated by Mariana Leus, a paid advertising specialist offering Meta
            Ads, Google Ads, and digital marketing services. When we refer to "we", "us", or "our"
            in this policy, we mean Mariana Leus and this website.
          </p>
          <p>
            If you have questions about how your data is handled, you can contact us at{' '}
            <a href="mailto:marianaleus8@gmail.com" className="text-primary hover:underline">
              marianaleus8@gmail.com
            </a>
            .
          </p>
        </Section>

        <Section title="2. What Data We Collect">
          <p>We collect data in two ways:</p>
          <p>
            <strong className="text-[color:var(--text-primary)]">Information you provide:</strong>{' '}
            When you fill in the contact form, we collect your name, your preferred contact method
            and contact details (phone number, WhatsApp, email, Telegram username, or Instagram
            handle), and the message you write. We do not collect payment data.
          </p>
          <p>
            <strong className="text-[color:var(--text-primary)]">Technical data:</strong> Our
            hosting and analytics tools may automatically collect your IP address, browser type,
            operating system, referring URL, and pages visited. This is used only to understand
            aggregate website traffic patterns.
          </p>
          <p>
            <strong className="text-[color:var(--text-primary)]">UTM parameters:</strong> If you
            arrive via an advertising link, UTM tracking parameters (source, medium, campaign) may
            be stored in your browser's local storage to help us understand which of our own ads
            lead to enquiries.
          </p>
        </Section>

        <Section title="3. How We Use Your Data">
          <p>We use the data you submit through the contact form solely to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Respond to your enquiry</li>
            <li>Discuss potential collaboration or services</li>
            <li>Follow up if you have not received a reply</li>
          </ul>
          <p>
            We do not use your contact details for unsolicited marketing. We will not add you to
            any mailing list without your explicit consent.
          </p>
        </Section>

        <Section title="4. Legal Basis for Processing (GDPR)">
          <p>
            If you are located in the European Economic Area, our legal basis for processing your
            personal data is your consent (Article 6(1)(a) GDPR), provided when you voluntarily
            submit the contact form. You may withdraw consent at any time by contacting us.
          </p>
        </Section>

        <Section title="5. Data Sharing">
          <p>
            We do not sell, rent, or trade your personal data. We may share it with trusted
            third-party service providers (such as email or messaging platforms) only to the extent
            necessary to respond to your enquiry.
          </p>
          <p>
            We may also disclose your data if required to do so by law or in response to valid
            requests by public authorities.
          </p>
        </Section>

        <Section title="6. Cookies">
          <p>
            This website may use essential cookies required for site functionality, and analytics
            cookies (e.g., Google Analytics) that collect anonymised usage statistics. You can
            control cookies through your browser settings. Disabling cookies may affect some site
            functionality.
          </p>
        </Section>

        <Section title="7. Data Retention">
          <p>
            We retain your contact form submissions for up to 12 months, after which they are
            deleted. If we enter into a working relationship, relevant data may be kept for longer
            to fulfil our contractual obligations.
          </p>
        </Section>

        <Section title="8. Your Rights">
          <p>Depending on your location, you may have the right to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Withdraw consent for processing</li>
            <li>Lodge a complaint with your local data protection authority</li>
          </ul>
          <p>
            To exercise any of these rights, email us at{' '}
            <a href="mailto:marianaleus8@gmail.com" className="text-primary hover:underline">
              marianaleus8@gmail.com
            </a>
            .
          </p>
        </Section>

        <Section title="9. Security">
          <p>
            We take reasonable technical and organisational measures to protect your data from
            unauthorised access, alteration, or loss. However, no data transmission over the
            internet is completely secure.
          </p>
        </Section>

        <Section title="10. Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. The "Last updated" date at the
            top of this page will reflect any changes. We encourage you to review this page
            periodically.
          </p>
        </Section>

        <div className="mt-12 pt-8 border-t border-surface">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-surface text-sm text-[color:var(--text-secondary)] hover:border-primary hover:text-primary transition-colors duration-200"
          >
            ← Back to home
          </Link>
        </div>
      </main>
    </div>
  )
}
