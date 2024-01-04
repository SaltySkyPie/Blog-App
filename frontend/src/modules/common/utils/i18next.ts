import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import messagesCs from '@app/assets/localization/cs.json'
import messagesEn from '@app/assets/localization/en.json'

export async function initI18next() {
  await i18n.use(initReactI18next).init({
    resources: {
      en: {
        translation: messagesEn,
      },
      cs: {
        translation: messagesCs,
      },
    },
    lng: localStorage.getItem('lang') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })
}

export function getLanguage() {
  return i18n.language
}

export function setLanguage(lang: string) {
  localStorage.setItem('lang', lang)
  return i18n.changeLanguage(lang)
}

export function getLanguages() {
  return i18n.languages
}
