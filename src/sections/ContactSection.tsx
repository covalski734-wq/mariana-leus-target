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
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material'

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string | undefined

interface ContactFormValues {
  name: string
  contact_method: string
  contact_value: string
  message: string
}

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const inputClass =
  'w-full rounded-xl border border-[var(--border)] bg-[rgba(var(--surface-strong-rgb),0.5)] px-4 py-3 text-[color:var(--text-primary)] placeholder-[color:var(--text-muted)] outline-none transition-colors duration-200 focus:border-primary focus:ring-2 focus:ring-[rgba(var(--primary-rgb),0.15)]'

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
    setValue,
    clearErrors,
  } = useForm<ContactFormValues>({
    defaultValues: {
      contact_method: 'phone',
      contact_value: '',
    },
  })

  const selectedMethod = watch('contact_method')
  const [status, setStatus] = useState<'success' | 'error' | null>(null)
  const [captchaReady, setCaptchaReady] = useState(false)

  // Clear contact value when method switches
  useEffect(() => {
    setValue('contact_value', '')
    clearErrors('contact_value')
  }, [selectedMethod, setValue, clearErrors])

  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY || typeof window === 'undefined') return

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
    if (!RECAPTCHA_SITE_KEY || !grecaptcha) throw new Error('reCAPTCHA is not available')
    return await grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'contact_form' })
  }

  const ALLOWED_PHONE_COUNTRIES: string[] = [
    'us', 'ca', 'ua',
    'at', 'be', 'bg', 'hr', 'cy', 'cz', 'dk', 'ee', 'fi', 'fr', 'de', 'gr', 'hu', 'ie', 'it',
    'lv', 'lt', 'lu', 'mt', 'nl', 'pl', 'pt', 'ro', 'sk', 'si', 'es', 'se',
  ]

  const onSubmit = async (data: ContactFormValues) => {
    setStatus(null)

    try {
      const token = RECAPTCHA_SITE_KEY ? await executeRecaptcha() : undefined
      const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null
      const initialUtm = searchParams
        ? Object.fromEntries(UTM_KEYS.map((key) => [key, searchParams.get(key) || undefined]))
        : {}

      if (typeof window !== 'undefined' && searchParams) {
        UTM_KEYS.forEach((key) => {
          const value = searchParams.get(key)
          if (value) window.localStorage.setItem(key, value)
        })
      }

      const storedUtm = typeof window !== 'undefined'
        ? Object.fromEntries(UTM_KEYS.map((key) => [key, window.localStorage.getItem(key) || undefined]))
        : {}

      await submitContactForm({ ...data, ...storedUtm, ...initialUtm, recaptchaToken: token })
      setStatus('success')
      reset({ name: '', contact_method: 'phone', contact_value: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const isPhoneMethod = selectedMethod === 'phone' || selectedMethod === 'whatsapp'
  const isEmailMethod = selectedMethod === 'email'

  const valuePlaceholder: Record<string, string> = {
    phone: t('contact.form.phonePlaceholder'),
    whatsapp: t('contact.form.phonePlaceholder'),
    email: 'your@email.com',
    telegram: '@username',
    instagram: '@handle',
  }

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-surface">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-start">

          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-sm uppercase tracking-[0.32em] text-primary mb-4">{t('contact.title')}</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-[color:var(--text-primary)] mb-6">
              {t('contact.subtitle')}
            </h2>
            <p className="text-[color:var(--text-secondary)] leading-relaxed max-w-xl">
              {t('contact.explanation') || 'Fill in your info and I will review your ad account with a conversion-first plan.'}
            </p>

            <div className="mt-12 grid gap-3 sm:grid-cols-2">
              <a
                href="tel:+48795069922"
                className="flex items-center gap-3 p-4 rounded-2xl bg-surface-strong border border-surface transition-colors hover:border-primary/50"
              >
                <span className="text-primary"><PhoneIcon /></span>
                <div>
                  <p className="text-xs text-[color:var(--text-muted)]">Phone</p>
                  <p className="font-semibold text-[color:var(--text-primary)]">+48 795 069 922</p>
                </div>
              </a>
              <a
                href="https://t.me/mariana_01_0"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-4 rounded-2xl bg-surface-strong border border-surface transition-colors hover:border-primary/50"
              >
                <span className="text-primary"><TelegramIcon /></span>
                <div>
                  <p className="text-xs text-[color:var(--text-muted)]">Telegram</p>
                  <p className="font-semibold text-[color:var(--text-primary)]">@mariana_01_0</p>
                </div>
              </a>
              <a
                href="https://www.instagram.com/mariana_leus_/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-4 rounded-2xl bg-surface-strong border border-surface transition-colors hover:border-primary/50"
              >
                <span className="text-primary"><InstagramIcon /></span>
                <div>
                  <p className="text-xs text-[color:var(--text-muted)]">Instagram</p>
                  <p className="font-semibold text-[color:var(--text-primary)]">@mariana_leus_</p>
                </div>
              </a>
              <a
                href="https://wa.me/48795069922"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-4 rounded-2xl bg-surface-strong border border-surface transition-colors hover:border-primary/50"
              >
                <span className="text-primary"><WhatsAppIcon /></span>
                <div>
                  <p className="text-xs text-[color:var(--text-muted)]">WhatsApp</p>
                  <p className="font-semibold text-[color:var(--text-primary)]">+48 795 069 922</p>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Right — form (opacity-only animation to avoid stacking-context from transform) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div
              className="rounded-2xl border border-surface p-8 shadow-xl"
              style={{ background: 'rgba(var(--surface-rgb), 0.9)' }}
            >
              {/* Success state */}
              {status === 'success' ? (
                <div className="text-center py-8">
                  <CheckCircleIcon
                    style={{ fontSize: 56, color: 'var(--primary)' }}
                    className="mx-auto mb-4"
                  />
                  <h3 className="text-xl font-bold text-[color:var(--text-primary)] mb-2">
                    {t('contact.form.successTitle') || 'Request received!'}
                  </h3>
                  <p className="text-[color:var(--text-secondary)]">
                    {t('contact.form.successBody') ||
                      'Thank you! We received your request and will contact you soon.'}
                  </p>
                  <button
                    onClick={() => setStatus(null)}
                    className="mt-6 text-sm text-primary hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>

                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-[color:var(--text-secondary)] mb-1.5" htmlFor="name">
                      {t('contact.form.name')}
                    </label>
                    <input
                      id="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Jane Smith"
                      {...register('name', { required: true })}
                      className={inputClass}
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-sm text-red-400">
                        {t('contact.form.nameError') || 'Name is required'}
                      </p>
                    )}
                  </div>

                  {/* Contact method */}
                  <div>
                    <label className="block text-sm font-medium text-[color:var(--text-secondary)] mb-1.5" htmlFor="contact_method">
                      {t('contact.form.contact_method')}
                    </label>
                    <select
                      id="contact_method"
                      {...register('contact_method', { required: true })}
                      className={inputClass}
                    >
                      {Object.entries(methods).map(([key, value]) => (
                        <option key={key} value={key}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Contact value */}
                  <div>
                    <label className="block text-sm font-medium text-[color:var(--text-secondary)] mb-1.5" htmlFor="contact_value">
                      {t(`contact.form.valueLabelFor.${selectedMethod}`) ||
                        t('contact.form.contact_value')}
                    </label>

                    {isPhoneMethod ? (
                      <div style={{ position: 'relative', zIndex: 9999 }}>
                      <Controller
                        name="contact_value"
                        control={control}
                        rules={{
                          required: true,
                          validate: (value) => {
                            const normalized = value?.toString().startsWith('+') ? value.toString() : `+${value}`
                            try {
                              return isValidPhoneNumber(normalized) || (t('contact.form.phoneError') as string)
                            } catch {
                              return t('contact.form.phoneError') as string
                            }
                          },
                        }}
                        render={({ field }) => (
                          <PhoneInput
                            {...field}
                            country="ua"
                            onlyCountries={ALLOWED_PHONE_COUNTRIES}
                            enableSearch
                            countryCodeEditable
                            containerClass="w-full"
                            specialLabel=""
                            placeholder={valuePlaceholder[selectedMethod]}
                          />
                        )}
                      />
                      </div>
                    ) : isEmailMethod ? (
                      <input
                        id="contact_value"
                        type="email"
                        autoComplete="email"
                        placeholder="your@email.com"
                        {...register('contact_value', {
                          required: true,
                          pattern: {
                            value: EMAIL_RE,
                            message: t('contact.form.emailError') || 'Please enter a valid email address',
                          },
                        })}
                        className={inputClass}
                      />
                    ) : (
                      // Telegram / Instagram — accept any text, no format validation
                      <input
                        id="contact_value"
                        type="text"
                        placeholder={valuePlaceholder[selectedMethod] ?? ''}
                        {...register('contact_value', { required: t('contact.form.contactValueError') as string })}
                        className={inputClass}
                      />
                    )}

                    {/* Helper text */}
                    <p className="mt-1.5 text-xs text-[color:var(--text-muted)]">
                      {t('contact.form.helperText') || 'Please double-check your contact details'}
                    </p>

                    {errors.contact_value && (
                      <p className="mt-1 text-sm text-red-400">
                        {isPhoneMethod
                          ? String(errors.contact_value.message || t('contact.form.phoneError'))
                          : isEmailMethod
                          ? String(errors.contact_value.message || t('contact.form.emailError'))
                          : t('contact.form.contactValueError')}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-[color:var(--text-secondary)] mb-1.5" htmlFor="message">
                      {t('contact.form.message')}
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      placeholder={t('contact.form.messagePlaceholder') || 'Tell me about your business and goals…'}
                      {...register('message', { required: true })}
                      className={inputClass}
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-sm text-red-400">
                        {t('contact.form.messageError') || 'Please describe your project or goal'}
                      </p>
                    )}
                  </div>

                  {/* Error banner */}
                  {status === 'error' && (
                    <div className="rounded-xl bg-red-500/10 border border-red-500/25 px-4 py-3 text-sm text-red-400">
                      {t('contact.form.error')}
                    </div>
                  )}

                  {/* reCAPTCHA notices */}
                  {RECAPTCHA_SITE_KEY && !captchaReady && (
                    <p className="text-xs text-[color:var(--text-muted)]">Loading anti-spam protection…</p>
                  )}

                  <Button type="submit" isLoading={isSubmitting} variant="primary" size="lg" className="w-full">
                    {isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
                  </Button>

                  {/* Trust signal */}
                  <p className="text-center text-xs text-[color:var(--text-muted)]">
                    {t('contact.form.trustText') || 'We will get back to you within 12 hours'}
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
