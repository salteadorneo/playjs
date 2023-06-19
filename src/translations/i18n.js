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
            formatTitle: 'Format code',
            format: 'Format',
            downloadTitle: 'Download code as file',
            download: 'Download',
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
            formatTitle: 'Dar formato',
            format: 'Formato',
            downloadTitle: 'Descargar código en fichero',
            download: 'Descargar',
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