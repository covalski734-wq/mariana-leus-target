import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { IconTelegram, IconWhatsApp, IconInstagram, IconMail, IconArrow, IconCheck } from '@/components/Icons';
import { useTranslation } from 'react-i18next';

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string | undefined;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactMethod = 'phone' | 'telegram' | 'whatsapp' | 'email';

interface FormValues {
  name: string;
  contact_method: ContactMethod;
  contact_value: string;
  message: string;
}

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;

const PHONE_COUNTRIES = [
  'us', 'ca', 'ua',
  'at', 'be', 'bg', 'hr', 'cy', 'cz', 'dk', 'ee', 'fi', 'fr', 'de', 'gr', 'hu', 'ie', 'it',
  'lv', 'lt', 'lu', 'mt', 'nl', 'pl', 'pt', 'ro', 'sk', 'si', 'es', 'se',
] as const;

const METHOD_LABELS: Record<ContactMethod, Record<string, string>> = {
  phone:    { EN: 'Phone', UA: 'Телефон', RU: 'Телефон' },
  telegram: { EN: 'Telegram', UA: 'Telegram', RU: 'Telegram' },
  whatsapp: { EN: 'WhatsApp', UA: 'WhatsApp', RU: 'WhatsApp' },
  email:    { EN: 'Email', UA: 'Email', RU: 'Email' },
};

export const ContactSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language.toUpperCase() as 'EN' | 'UA' | 'RU';
  const [status, setStatus] = useState<'success' | 'error' | null>(null);

  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    clearErrors,
  } = useForm<FormValues>({
    defaultValues: { contact_method: 'telegram', contact_value: '', name: '', message: '' },
    shouldUnregister: true,
  });

  const selectedMethod = watch('contact_method');

  // Reset contact value when method changes
  useEffect(() => {
    setValue('contact_value', '');
    clearErrors('contact_value');
  }, [selectedMethod, setValue, clearErrors]);

  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY || document.getElementById('recaptcha-v3-script')) return;
    const script = document.createElement('script');
    script.id = 'recaptcha-v3-script';
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);


  const executeRecaptcha = async (): Promise<string | undefined> => {
    const g = (window as unknown as { grecaptcha?: { execute: (k: string, o: { action: string }) => Promise<string> } }).grecaptcha;
    if (!RECAPTCHA_SITE_KEY || !g) return undefined;
    try {
      return await Promise.race([
        g.execute(RECAPTCHA_SITE_KEY, { action: 'contact_form' }),
        new Promise<undefined>((resolve) => setTimeout(() => resolve(undefined), 3000)),
      ]);
    } catch {
      return undefined;
    }
  };

  const onSubmit = async (data: FormValues) => {
    setStatus(null);
    try {
      // In dev, skip the real API call
      if (import.meta.env.DEV) {
        console.log('[DEV] form submit:', data);
        await new Promise(r => setTimeout(r, 600));
        setStatus('success');
        reset({ name: '', contact_method: 'telegram', contact_value: '', message: '' });
        return;
      }
      const token = await executeRecaptcha();
      const sp = new URLSearchParams(window.location.search);
      const utm = Object.fromEntries(
        UTM_KEYS.map(k => [k, sp.get(k) ?? localStorage.getItem(k) ?? undefined])
          .filter(([, v]) => v)
      );
      UTM_KEYS.forEach(k => { const v = sp.get(k); if (v) localStorage.setItem(k, v); });

      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, ...utm, recaptchaToken: token }),
      });
      if (!res.ok) throw new Error('failed');
      setStatus('success');
      reset({ name: '', contact_method: 'phone', contact_value: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const contactValueError = errors.contact_value?.message;

  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <div className="section-num">{t('contact.sectionNum')}</div>
            <h2>{t('contact.title').split('\n').map((line: string, i: number, a: string[]) => (
              <React.Fragment key={i}>{line}{i < a.length - 1 && <br />}</React.Fragment>
            ))}</h2>
          </div>
          <p className="side">{t('contact.desc')}</p>
        </div>

        <div className="contact-grid">
          {/* Channels */}
          <div className="channels reveal">
            <a href="https://t.me/mariana_01_0" target="_blank" rel="noopener noreferrer" className="channel primary">
              <div className="ico"><IconTelegram size={22} /></div>
              <div className="meta">
                <div className="name">{t('contact.telegramName')}</div>
                <div className="handle">@mariana_01_0</div>
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

          {/* Form */}
          <div className="lead-form reveal">
            {status === 'success' ? (
              <div className="form-success">
                <IconCheck size={20} />
                <span>{t('contact.successMsg')}</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className='flex gap-1.5' noValidate>
                {/* Name */}
                <div className="field">
                  <label htmlFor="cf-name">{t('contact.nameLabel')}</label>
                  <input
                    id="cf-name"
                    type="text"
                    placeholder={t('contact.namePlaceholder')}
                    className={errors.name ? 'error' : ''}
                    {...register('name', {
                      required: { value: true, message: t('contact.errorRequired') },
                    })}
                  />
                  {errors.name && <div className="field-error">{errors.name.message}</div>}
                </div>

                {/* Contact method pills */}
                <div className="field">
                  <label>{t('contact.contactMethodLabel')}</label>
                  <Controller
                    name="contact_method"
                    control={control}
                    render={({ field }) => (
                      <div className="method-pills">
                        {(Object.keys(METHOD_LABELS) as ContactMethod[]).map(m => (
                          <button
                            key={m}
                            type="button"
                            className={'method-pill' + (field.value === m ? ' active' : '')}
                            onClick={() => field.onChange(m)}
                          >
                            {METHOD_LABELS[m][lang] ?? METHOD_LABELS[m].EN}
                          </button>
                        ))}
                      </div>
                    )}
                  />
                </div>

                {/* Contact value */}
                <div className="field">
                  <label htmlFor="cf-contact">
                    {METHOD_LABELS[selectedMethod]?.[lang] ?? METHOD_LABELS[selectedMethod]?.EN}
                  </label>

                  <Controller
                    key={selectedMethod}
                    name="contact_value"
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: t('contact.errorRequired'),
                      },
                      validate: (v) => {
                        if (selectedMethod === 'phone' || selectedMethod === 'whatsapp') {
                          try {
                            return isValidPhoneNumber('+' + v) || t('contact.errorPhone');
                          } catch {
                            return t('contact.errorPhone');
                          }
                        }

                        if (selectedMethod === 'telegram') {
                          return /^@[\w]{4,}$/.test(v) || t('contact.errorTelegram');
                        }

                        if (selectedMethod === 'email') {
                          return EMAIL_RE.test(v) || t('contact.errorEmail');
                        }

                        return true;
                      },
                    }}
                    render={({ field }) => {
                      if (selectedMethod === 'phone' || selectedMethod === 'whatsapp') {
                        return (
                          <PhoneInput
                            country="pl"
                            onlyCountries={[...PHONE_COUNTRIES]}
                            value={field.value}
                            onChange={field.onChange}
                            inputProps={{ id: 'cf-contact', required: true }}
                            containerClass={'phone-input-container' + (contactValueError ? ' error' : '')}
                          />
                        );
                      }

                      return (
                        <input
                          id="cf-contact"
                          type={selectedMethod === 'email' ? 'email' : 'text'}
                          placeholder={selectedMethod === 'telegram' ? '@username' : 'you@example.com'}
                          value={field.value}
                          onChange={field.onChange}
                          className={contactValueError ? 'error' : ''}
                        />
                      );
                    }}
                  />

                  {contactValueError && <div className="field-error">{contactValueError}</div>}
                </div>

                {/* Message */}
                <div className="field">
                  <label htmlFor="cf-msg">{t('contact.messageLabel')}</label>
                  <textarea
                    id="cf-msg"
                    placeholder={t('contact.messagePlaceholder')}
                    className={errors.message ? 'error' : ''}
                    {...register('message', {
                      required: { value: true, message: t('contact.errorRequired') },
                      minLength: {
                        value: 10,
                        message: t('contact.errorMinLength'),
                      },
                    })}
                  />
                  {errors.message && <div className="field-error">{errors.message.message}</div>}
                </div>

                {status === 'error' && (
                  <div className="form-server-error">
                    {t('contact.errorServer')}
                  </div>
                )}

                <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                  {isSubmitting ? '…' : t('contact.submitBtn')}
                  {!isSubmitting && <IconArrow size={16} className="arrow" />}
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
