export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const {
    name,
    contact_method,
    contact_value,
    message,
    utm_source,
    utm_medium,
    utm_campaign,
    utm_term,
    utm_content,
    recaptchaToken,
  } = req.body || {}

  if (!name || !contact_method || !contact_value || !message) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  // reCAPTCHA v3 — optional: skip if token absent or secret not configured
  const recaptchaSecret = process.env.RECAPTCHA_SECRET
  if (recaptchaSecret && recaptchaToken) {
    try {
      const controller = new AbortController()
      const tid = setTimeout(() => controller.abort(), 4000)
      const recaptchaResponse = await fetch(
        `https://www.google.com/recaptcha/api/siteverify`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({ secret: recaptchaSecret, response: recaptchaToken }),
          signal: controller.signal,
        }
      )
      clearTimeout(tid)
      const recaptchaData = await recaptchaResponse.json()
      // Lowered threshold to 0.3 — mobile devices often score 0.3–0.5
      if (!recaptchaData.success || recaptchaData.score < 0.3) {
        return res.status(403).json({ message: 'Failed reCAPTCHA verification', score: recaptchaData.score })
      }
    } catch {
      // reCAPTCHA timeout or network error — allow the submission through
    }
  }

  const utmLines = [
    utm_source   ? `<b>UTM Source:</b> ${utm_source}`   : '',
    utm_medium   ? `<b>UTM Medium:</b> ${utm_medium}`   : '',
    utm_campaign ? `<b>UTM Campaign:</b> ${utm_campaign}` : '',
    utm_term     ? `<b>UTM Term:</b> ${utm_term}`       : '',
    utm_content  ? `<b>UTM Content:</b> ${utm_content}` : '',
  ].filter(Boolean).join('\n')

  const text = `<b>📩 New Lead</b>

<b>Name:</b> ${name}
<b>Contact:</b> ${contact_method} — ${contact_value}
<b>Message:</b> ${message}${utmLines ? `\n\n${utmLines}` : ''}`

  try {
    const controller = new AbortController()
    const tid = setTimeout(() => controller.abort(), 8000)
    const response = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text,
          parse_mode: 'HTML',
        }),
        signal: controller.signal,
      }
    )
    clearTimeout(tid)

    const data = await response.json()
    if (!response.ok) {
      return res.status(response.status).json({ success: false, error: data })
    }
    return res.status(200).json({ success: true })
  } catch (error) {
    return res.status(500).json({ success: false, error: String(error) })
  }
}
