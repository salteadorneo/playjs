import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
//Jsons
import LanguageESJSON from './language.es.json'
import LanguageENJSON from './language.en.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: LanguageENJSON,
      es: LanguageESJSON
    }
  })

export default i18n