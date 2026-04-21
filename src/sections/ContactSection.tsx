import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { isValidPhoneNumber } from 'libphonenumber-js'
import { Button } from '@/components/Button'
import { submitContactForm } from '@/services/api'
import {
  Telegram as TelegramIcon,
  WhatsApp as WhatsAppIcon,
  Phone as PhoneIcon,
  Instagram as InstagramIcon,
} from '@mui/icons-material';

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string | undefined

interface ContactFormValues {
  name: string
  contact_method: string
  contact_value: string
  message: string
}

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const

export const ContactSection: React.FC = () => {
  const { t } = useTranslation()
  const methods = t('contact.methods', { returnObjects: true }) as Record<string, string>

  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    defaultValues: {
      contact_method: 'phone',
      contact_value: '',
    },
  })

  const selectedMethod = watch('contact_method')
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [captchaReady, setCaptchaReady] = useState(false)

  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY || typeof window === 'undefined') {
      return
    }

    const scriptId = 'recaptcha-v3-script'
    if (document.getElementById(scriptId)) {
      setCaptchaReady(true)
      return
    }

    const script = document.createElement('script')
    script.id = scriptId
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`
    script.async = true
    script.defer = true
    script.onload = () => setCaptchaReady(true)
    document.body.appendChild(script)
  }, [])

  const executeRecaptcha = async () => {
    const grecaptcha = typeof window !== 'undefined' ? (window as any).grecaptcha : null
    if (!RECAPTCHA_SITE_KEY || !grecaptcha) {
      throw new Error('reCAPTCHA is not available')
    }

    return await grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'contact_form' })
  }

  const ALLOWED_PHONE_COUNTRIES: string[] = [
    'us', 'ca', 'ua',
    'at', 'be', 'bg', 'hr', 'cy', 'cz', 'dk', 'ee', 'fi', 'fr', 'de', 'gr', 'hu', 'ie', 'it', 'lv', 'lt', 'lu', 'mt', 'nl', 'pl', 'pt', 'ro', 'sk', 'si', 'es', 'se',
  ]

  const onSubmit = async (data: ContactFormValues) => {
    setStatus(null)

    try {
      const token = RECAPTCHA_SITE_KEY ? await executeRecaptcha() : undefined
      const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null
      const initialUtm = searchParams
        ? Object.fromEntries(
            UTM_KEYS.map((key) => [key, searchParams.get(key) || undefined])
          )
        : {}

      if (typeof window !== 'undefined' && searchParams) {
        UTM_KEYS.forEach((key) => {
          const value = searchParams.get(key)
          if (value) {
            window.localStorage.setItem(key, value)
          }
        })
      }

      const storedUtm = typeof window !== 'undefined'
        ? Object.fromEntries(
            UTM_KEYS.map((key) => [key, window.localStorage.getItem(key) || undefined])
          )
        : {}

      const payload = {
        ...data,
        ...storedUtm,
        ...initialUtm,
        recaptchaToken: token,
      }

      await submitContactForm(payload)
      setStatus({ type: 'success', message: t('contact.form.success') })
      reset({ name: '', contact_method: 'telegram', contact_value: '', message: '' })
    } catch (error) {
      setStatus({ type: 'error', message: t('contact.form.error') })
    }
  }

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-surface">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-sm uppercase tracking-[0.32em] text-primary mb-4">{t('contact.title')}</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-[color:var(--text)] mb-6">{t('contact.subtitle')}</h2>
            <p className="text-gray-400 leading-relaxed max-w-xl">
              {t('contact.explanation') || 'Fill in your info and I will review your ad account with a conversion-first plan.'}
            </p>

            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              <a
                href="tel:+1234567890"
                className="flex items-center gap-3 p-5 rounded-3xl bg-surface-strong border border-surface transition-colors hover:border-primary/50"
              >
                <span className="text-2xl"><PhoneIcon /></span>
                <div>
                  <p className="text-sm text-muted">Phone</p>
                  <p className="font-semibold text-[color:var(--text)]">+48 795 069 922</p>
                </div>
              </a>
              <a
                href="https://t.me/mariana_01_0"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-5 rounded-3xl bg-surface-strong border border-surface transition-colors hover:border-primary/50"
              >
                <span className="text-2xl"><TelegramIcon /></span>
                <div>
                  <p className="text-sm text-muted">Telegram</p>
                  <p className="font-semibold text-[color:var(--text)]">@‌mariana_01_0</p>
                </div>
              </a>
              <a
                href="https://www.instagram.com/mariana_leus_/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-5 rounded-3xl bg-surface-strong border border-surface transition-colors hover:border-primary/50"
              >
                <span className="text-2xl"><InstagramIcon /></span>
                <div>
                  <p className="text-sm text-muted">Instagram</p>
                  <p className="font-semibold text-[color:var(--text)]">@mariana_leus_</p>
                </div>
              </a>
              <a
                href="https://wa.me/48795069922"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-5 rounded-3xl bg-surface-strong border border-surface transition-colors hover:border-primary/50"
              >
                <span className="text-2xl items-end"><WhatsAppIcon /></span>
                <div>
                  <p className="text-sm text-muted">WhatsApp</p>
                  <p className="font-semibold text-[color:var(--text)]">+48 795 069 922</p>
                </div>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="rounded-3xl bg-surface border border-surface p-8 shadow-xl shadow-black/10">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2" htmlFor="name">
                    {t('contact.form.name')}
                  </label>
                  <input
                    id="name"
                    type="text"
                    {...register('name', { required: true })}
                    className="w-full rounded-2xl border border-surface bg-surface px-4 py-3 text-[color:var(--text)] outline-none focus:border-primary"
                  />
                  {errors.name && <p className="mt-2 text-sm text-red-400">{t('contact.form.nameError') || 'Name is required'}</p>}
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2" htmlFor="contact_method">
                    {t('contact.form.contact_method')}
                  </label>
                  <select
                    id="contact_method"
                    {...register('contact_method', { required: true })}
                    className="w-full rounded-2xl border border-surface bg-surface px-4 py-3 text-[color:var(--text)] outline-none focus:border-primary"
                  >
                    {Object.entries(methods).map(([key, value]) => (
                      <option key={key} value={key}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2" htmlFor="contact_value">
                    {t('contact.form.contact_value')}
                  </label>
                  {selectedMethod === 'phone' ? (
                    <Controller
                      name="contact_value"
                      control={control}
                      rules={{
                        required: true,
                        validate: (value) => {
                          const normalized = value?.toString().startsWith('+') ? value.toString() : `+${value}`
                          return isValidPhoneNumber(normalized) || t('contact.form.phoneError')
                        },
                      }}
                      render={({ field }) => (
                        <PhoneInput
                          {...field}
                          country="us"
                          onlyCountries={ALLOWED_PHONE_COUNTRIES}
                          enableSearch
                          countryCodeEditable
                          inputClass="w-full rounded-2xl border border-surface bg-surface px-4 py-3 text-[color:var(--text)] outline-none focus:border-primary"
                          buttonClass="border border-surface bg-surface"
                          dropdownClass="rounded-2xl border border-surface bg-surface text-[color:var(--text)]"
                          searchClass="px-4 py-3 text-[color:var(--text)] bg-surface"
                          containerClass="w-full"
                          specialLabel=""
                          placeholder={t('contact.form.phonePlaceholder')}
                        />
                      )}
                    />
                  ) : (
                    <input
                      id="contact_value"
                      type="text"
                      {...register('contact_value', { required: true })}
                      className="w-full rounded-2xl border border-surface bg-surface px-4 py-3 text-[color:var(--text)] outline-none focus:border-primary"
                    />
                  )}
                  {errors.contact_value && (
                    <p className="mt-2 text-sm text-red-400">
                      {selectedMethod === 'phone'
                        ? String(errors.contact_value.message || t('contact.form.phoneError'))
                        : t('contact.form.contactValueError')}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2" htmlFor="message">
                    {t('contact.form.message')}
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    {...register('message', { required: true })}
                    className="w-full rounded-2xl border border-surface bg-surface px-4 py-3 text-[color:var(--text)] outline-none focus:border-primary"
                  />
                  {errors.message && <p className="mt-2 text-sm text-red-400">{t('contact.form.messageError') || 'Message is required'}</p>}
                </div>

                {status && (
                  <div className={status.type === 'success' ? 'text-green-400' : 'text-red-400'}>
                    {status.message}
                  </div>
                )}
                {RECAPTCHA_SITE_KEY && !captchaReady && (
                  <div className="text-yellow-300 text-sm">Loading anti-spam protection...</div>
                )}
                {RECAPTCHA_SITE_KEY && captchaReady && (
                  <div className="text-gray-400 text-sm">Protected by reCAPTCHA v3.</div>
                )}

                <Button type="submit" isLoading={isSubmitting} variant="primary" size="lg" className="w-full">
                  {isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
