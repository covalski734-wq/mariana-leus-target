import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import ua from './locales/ua.json'
import ru from './locales/ru.json'
import en from './locales/en.json'

const resources = {
  ua: { translation: ua },
  ru: { translation: ru },
  en: { translation: en },
}

const SUPPORTED = ['en', 'ua', 'ru'] as const
type SupportedLang = (typeof SUPPORTED)[number]

function getBrowserLang(): SupportedLang {
  const raw = navigator.language || navigator.languages?.[0] || ''
  const prefix = raw.split('-')[0].toLowerCase()
  if (prefix === 'uk') return 'ua'
  if (prefix === 'ru') return 'ru'
  return 'en'
}

function getInitialLang(): SupportedLang {
  const saved = localStorage.getItem('language') as SupportedLang | null
  if (saved && SUPPORTED.includes(saved)) return saved
  return getBrowserLang()
}

i18n.use(initReactI18next).init({
  resources,
  lng: getInitialLang(),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

i18n.on('languageChanged', (lng) => {
  localStorage.setItem('language', lng)
})

export default i18n
