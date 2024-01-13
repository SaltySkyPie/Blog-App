import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import messagesCs from '@app/assets/localization/cs.json'
import messagesEn from '@app/assets/localization/en.json'
import timeAgoCs from 'timeago.js/lib/lang/cs'
import timeAgoEn from 'timeago.js/lib/lang/en_US'

const resources = {
      en: {
        translation: messagesEn,
        timeAgo: timeAgoEn,
      },
      cs: {
        translation: messagesCs,
        timeAgo: timeAgoCs,
      },
    }

export async function initI18next() {
  await i18n.use(initReactI18next).init({
    resources: resources,
    lng: localStorage.getItem('lang') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    cache: {
      enabled: true,
    },
  })
}

export function getLanguage() {
  return i18n.language
}

export function getLanguageResource() {
  return resources[i18n.language as keyof typeof resources]
}

export function setLanguage(lang: string) {
  localStorage.setItem('lang', lang)
  return i18n.changeLanguage(lang)
}

export function getLanguages() {
  return Object.keys(resources)
}
