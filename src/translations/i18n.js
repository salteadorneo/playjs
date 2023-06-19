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
          },
          upload: {
            toast: 'File uploaded!',
            uploadTitle: 'Upload code from file',
            upload: 'Upload',
            instructions: 'Select or drop a file below',
            formCancel: 'Cancel',
            formUpload: 'Upload',
          },
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
          },
          upload: {
            toast: 'Fichero subido!',
            uploadTitle: 'Subir código de fichero',
            upload: 'Subir',
            instructions: 'Selecciona o arrastra un fichero',
            formCancel: 'Cancelar',
            formUpload: 'Subir',
          },
        }
      }
    }
  })

export default i18n