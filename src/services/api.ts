import axios from 'axios'

interface FormData {
  name: string
  contact_method: string
  contact_value: string
  message: string
}

// Google Apps Script deployment URL - replace with your actual URL
const GOOGLE_APPS_SCRIPT_URL = import.meta.env.VITE_WEBHOOK_URL || 'https://script.google.com/macros/d/{YOUR_DEPLOYMENT_ID}/usercontent'

export const submitContactForm = async (data: FormData) => {
  try {
    const response = await axios.post(GOOGLE_APPS_SCRIPT_URL, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return {
      success: true,
      message: 'Form submitted successfully',
      data: response.data,
    }
  } catch (error) {
    console.error('Form submission error:', error)
    throw error
  }
}

// Fallback: Alternative submission method using Fetch API
export const submitContactFormFallback = async (data: FormData) => {
  try {
    await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    return {
      success: true,
      message: 'Form submitted successfully',
    }
  } catch (error) {
    console.error('Form submission error:', error)
    throw error
  }
}
