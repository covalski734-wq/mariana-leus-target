interface FormData {
  name: string
  contact_method: string
  contact_value: string
  message: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
  recaptchaToken?: string
}

export const submitContactForm = async (data: FormData) => {
  if (!data.recaptchaToken) {
    throw new Error('reCAPTCHA token missing')
  }

  const response = await fetch('/api/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => null)
    throw new Error(errorData?.message || 'Form submission failed')
  }

  return await response.json()
}

export const submitContactFormFallback = submitContactForm
