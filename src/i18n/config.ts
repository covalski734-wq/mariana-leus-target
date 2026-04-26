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

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('language') || 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
