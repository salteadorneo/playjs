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
          embed: {
            toast: 'Copied to clipboard!',
            embedTitle: 'Get HTML',
            embed: 'Embed',
            embedClose: 'Close',
            embedCopy: 'Copy',
          },
          language: {
            globeTitle: 'Change language',
            toast: 'Language changed!',
          },
          report: {
            responseOk: 'Thanks for your report!',
            responseError: 'Oops! There was a problem submitting your form',
            reportTitle: 'Report a bug',
            report: 'Report bug',
            formEmail: 'Email (optional)',
            formDescription: 'Description',
            formCancel: 'Cancel',
            formSend: 'Send',
            reportClose: 'Close',
          },
          share: {
            toast: 'Copied to clipboard!',
            shareTitle: 'Share code',
            share: 'Share',
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
          embed: {
            toast: 'Copiado al portapapeles!',
            embedTitle: 'Obtener HTML',
            embed: 'Insertar',
            embedClose: 'Cerrar',
            embedCopy: 'Copiar',
          },
          language: {
            globeTitle: 'Cambiar idioma',
            toast: 'Idioma cambiado!',
          },
          report: {
            responseOk: 'Gracias por tu reporte!',
            responseError: 'Ups! Ha habido un problema enviando el formulario',
            reportTitle: 'Reportar error',
            report: 'Reportar error',
            formEmail: 'Email (opcional)',
            formDescription: 'Descripción',
            formCancel: 'Cancelar',
            formSend: 'Enviar',
            reportClose: 'Cerrar',
          },
          share: {
            toast: 'Copiado al portapapeles!',
            shareTitle: 'Compartir código',
            share: 'Compartir',
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