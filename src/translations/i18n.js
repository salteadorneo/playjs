import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

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
      en: {
        translation: {
          code: {
            format: 'Format',
          },
          language: {
            globeTitle: 'Change language',
            toast: 'Language changed!',
          }
        }
      },
      es: {
        translation: {
          code: {
            format: 'Formato',
          },
          language: {
            globeTitle: 'Cambiar idioma',
            toast: 'Idioma cambiado!',
          }
        }
      }
    }
  })

export default i18n