import React, { useState } from 'react';
import { IconTelegram, IconWhatsApp, IconInstagram, IconMail, IconArrow, IconCheck } from '@/components/Icons';
import { useLanguage } from '@/context/LanguageContext';

type ContactMethod = 'telegram' | 'whatsapp' | 'phone' | 'email';

interface FormState {
  name: string;
  contact_method: ContactMethod;
  contact_value: string;
  message: string;
}

interface FormErrors {
  name?: string;
  contact_value?: string;
  message?: string;
}

declare const grecaptcha: {
  execute: (siteKey: string, opts: { action: string }) => Promise<string>;
};

const SITE_KEY = '6LedO7ssAAAAADmjthPzGMpcAJS0av8QBizOHEOK';

const METHODS: { value: ContactMethod; label: Record<string, string>; placeholder: Record<string, string>; pattern?: RegExp }[] = [
  {
    value: 'telegram',
    label: { EN: 'Telegram', UA: 'Telegram', RU: 'Telegram' },
    placeholder: { EN: '@username', UA: '@username', RU: '@username' },
    pattern: /^@[\w]{4,}$/,
  },
  {
    value: 'whatsapp',
    label: { EN: 'WhatsApp', UA: 'WhatsApp', RU: 'WhatsApp' },
    placeholder: { EN: '+48 000 000 000', UA: '+48 000 000 000', RU: '+48 000 000 000' },
    pattern: /^\+?[\d\s\-()]{7,}$/,
  },
  {
    value: 'phone',
    label: { EN: 'Phone', UA: 'Телефон', RU: 'Телефон' },
    placeholder: { EN: '+48 000 000 000', UA: '+48 000 000 000', RU: '+48 000 000 000' },
    pattern: /^\+?[\d\s\-()]{7,}$/,
  },
  {
    value: 'email',
    label: { EN: 'Email', UA: 'Email', RU: 'Email' },
    placeholder: { EN: 'you@example.com', UA: 'ви@example.com', RU: 'вы@example.com' },
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
];

const validate = (form: FormState, lang: string): FormErrors => {
  const errors: FormErrors = {};
  const method = METHODS.find(m => m.value === form.contact_method)!;

  const required = { EN: 'Required', UA: 'Обовʼязкове', RU: 'Обязательное' };
  const req = (required as Record<string, string>)[lang] ?? required.EN;

  if (!form.name.trim()) errors.name = req;

  if (!form.contact_value.trim()) {
    errors.contact_value = req;
  } else if (method.pattern && !method.pattern.test(form.contact_value.trim())) {
    const fmt = {
      EN: 'Invalid format',
      UA: 'Невірний формат',
      RU: 'Неверный формат',
    };
    errors.contact_value = (fmt as Record<string, string>)[lang] ?? fmt.EN;
  }

  const minMsg = {
    EN: 'Please write at least 10 characters',
    UA: 'Напишіть хоча б 10 символів',
    RU: 'Напишите хотя бы 10 символов',
  };
  if (!form.message.trim()) errors.message = req;
  else if (form.message.trim().length < 10)
    errors.message = (minMsg as Record<string, string>)[lang] ?? minMsg.EN;

  return errors;
};

export const ContactSection: React.FC = () => {
  const { t, lang } = useLanguage();
  const [form, setForm] = useState<FormState>({
    name: '',
    contact_method: 'telegram',
    contact_value: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [serverError, setServerError] = useState('');

  const currentMethod = METHODS.find(m => m.value === form.contact_method)!;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');
    const errs = validate(form, lang);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setSending(true);

    try {
      const recaptchaToken = await grecaptcha.execute(SITE_KEY, { action: 'contact_form' });

      const utm: Record<string, string> = {};
      const params = new URLSearchParams(window.location.search);
      ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(k => {
        const v = params.get(k);
        if (v) utm[k] = v;
      });

      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          contact_method: form.contact_method,
          contact_value: form.contact_value.trim(),
          message: form.message.trim(),
          recaptchaToken,
          ...utm,
        }),
      });

      if (!res.ok) {
        const d = await res.json().catch(() => null);
        throw new Error(d?.message || 'Submission failed');
      }

      setSent(true);
    } catch (err) {
      const errMsg = { EN: 'Something went wrong. Please try again or contact via Telegram.', UA: 'Щось пішло не так. Спробуйте ще раз або напишіть у Telegram.', RU: 'Что-то пошло не так. Попробуйте ещё раз или напишите в Telegram.' };
      setServerError((errMsg as Record<string, string>)[lang] ?? errMsg.EN);
    } finally {
      setSending(false);
    }
  };

  const set = <K extends keyof FormState>(k: K) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(f => ({ ...f, [k]: e.target.value }));
    if (errors[k as keyof FormErrors]) setErrors(prev => ({ ...prev, [k]: undefined }));
  };

  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <div className="section-num">{t('contact.sectionNum')}</div>
            <h2>{t('contact.title').split('\n').map((line, i, arr) => (
              <React.Fragment key={i}>{line}{i < arr.length - 1 && <br />}</React.Fragment>
            ))}</h2>
          </div>
          <p className="side">{t('contact.desc')}</p>
        </div>

        <div className="contact-grid">
          {/* Left — channels */}
          <div className="channels reveal">
            <a href="https://t.me/marianaleus" target="_blank" rel="noopener noreferrer" className="channel primary">
              <div className="ico"><IconTelegram size={22} /></div>
              <div className="meta">
                <div className="name">{t('contact.telegramName')}</div>
                <div className="handle">@marianaleus</div>
              </div>
              <div className="arr"><IconArrow size={16} /></div>
            </a>
            <a href="https://wa.me/48795069922" target="_blank" rel="noopener noreferrer" className="channel">
              <div className="ico"><IconWhatsApp size={22} /></div>
              <div className="meta">
                <div className="name">{t('contact.whatsappName')}</div>
                <div className="handle">{t('contact.whatsappHandle')}</div>
              </div>
              <div className="arr"><IconArrow size={16} /></div>
            </a>
            <a href="https://instagram.com/mariana_leus_" target="_blank" rel="noopener noreferrer" className="channel">
              <div className="ico"><IconInstagram size={22} /></div>
              <div className="meta">
                <div className="name">{t('contact.instagramName')}</div>
                <div className="handle">@mariana_leus_</div>
              </div>
              <div className="arr"><IconArrow size={16} /></div>
            </a>
            <a href="mailto:marianaleus8@gmail.com" className="channel">
              <div className="ico"><IconMail size={22} /></div>
              <div className="meta">
                <div className="name">{t('contact.emailName')}</div>
                <div className="handle">marianaleus8@gmail.com</div>
              </div>
              <div className="arr"><IconArrow size={16} /></div>
            </a>
          </div>

          {/* Right — form */}
          <div className="lead-form reveal">
            {sent ? (
              <div className="form-success">
                <IconCheck size={20} />
                <span>{t('contact.successMsg')}</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {/* Name */}
                <div className="field">
                  <label htmlFor="cf-name">{t('contact.nameLabel')}</label>
                  <input
                    id="cf-name"
                    type="text"
                    placeholder={t('contact.namePlaceholder')}
                    value={form.name}
                    onChange={set('name')}
                    className={errors.name ? 'error' : ''}
                  />
                  {errors.name && <div className="field-error">{errors.name}</div>}
                </div>

                {/* Contact method selector */}
                <div className="field">
                  <label>{t('contact.contactMethodLabel')}</label>
                  <div className="method-pills">
                    {METHODS.map(m => (
                      <button
                        key={m.value}
                        type="button"
                        className={'method-pill' + (form.contact_method === m.value ? ' active' : '')}
                        onClick={() => setForm(f => ({ ...f, contact_method: m.value, contact_value: '' }))}
                      >
                        {m.label[lang] ?? m.label.EN}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contact value */}
                <div className="field">
                  <label htmlFor="cf-contact">
                    {currentMethod.label[lang] ?? currentMethod.label.EN}
                  </label>
                  <input
                    id="cf-contact"
                    type={form.contact_method === 'email' ? 'email' : 'text'}
                    placeholder={currentMethod.placeholder[lang] ?? currentMethod.placeholder.EN}
                    value={form.contact_value}
                    onChange={set('contact_value')}
                    className={errors.contact_value ? 'error' : ''}
                    autoComplete={form.contact_method === 'email' ? 'email' : 'off'}
                  />
                  {errors.contact_value && <div className="field-error">{errors.contact_value}</div>}
                </div>

                {/* Message */}
                <div className="field">
                  <label htmlFor="cf-msg">{t('contact.messageLabel')}</label>
                  <textarea
                    id="cf-msg"
                    placeholder={t('contact.messagePlaceholder')}
                    value={form.message}
                    onChange={set('message')}
                    className={errors.message ? 'error' : ''}
                  />
                  {errors.message && <div className="field-error">{errors.message}</div>}
                </div>

                {serverError && (
                  <div className="form-server-error">{serverError}</div>
                )}

                <button type="submit" disabled={sending} className="btn btn-primary">
                  {sending ? '…' : t('contact.submitBtn')}
                  {!sending && <IconArrow size={16} className="arrow" />}
                </button>

                <div className="form-foot">{t('contact.formFoot')}</div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
