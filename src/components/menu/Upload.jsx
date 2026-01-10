import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import Button from '@/components/atom/Button'
import { LANGUAGE } from '@/consts'

const MAX_FILE_SIZE = 1024 * 1024 // 1MB
const ALLOWED_EXTENSIONS = ['js', 'ts']
const ALLOWED_MIME_TYPES = ['text/javascript', 'application/javascript', 'text/plain', 'application/x-typescript']

export default function Upload ({ setCode, current, setCurrent }) {
  const { t } = useTranslation()

  const fileInputRef = useRef(null)

  async function handleSubmit (e) {
    e.preventDefault()

    const file = fileInputRef.current.files[0]
    if (!fileInputRef || !file) {
      return
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error('El archivo es demasiado grande. Máximo 1MB permitido.')
      fileInputRef.current.value = ''
      return
    }

    const ext = file.name.split('.').pop()?.toLowerCase()
    if (!ext || !ALLOWED_EXTENSIONS.includes(ext)) {
      toast.error('Solo se permiten archivos .js o .ts')
      fileInputRef.current.value = ''
      return
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type) && file.type !== '') {
      toast.error('Tipo de archivo no válido')
      fileInputRef.current.value = ''
      return
    }

    try {
      const fileText = await file.text()

      if (!fileText.trim()) {
        toast.error('El archivo está vacío')
        fileInputRef.current.value = ''
        return
      }

      if (fileText.length > MAX_FILE_SIZE) {
        toast.error('El contenido del archivo es demasiado grande')
        fileInputRef.current.value = ''
        return
      }

      const suspiciousPatterns = [
        /document\.cookie/gi,
        /localStorage\.getItem/gi,
        /sessionStorage\.getItem/gi,
        /<script[^>]*>[\s\S]*?<\/script>/gi
      ]

      const hasSuspiciousContent = suspiciousPatterns.some(pattern => pattern.test(fileText))

      if (hasSuspiciousContent) {
        toast.warning('⚠️ El archivo contiene código potencialmente peligroso. Usa con precaución.')
      }

      if (ext === 'ts') {
        setCurrent({ ...current, language: LANGUAGE.TYPESCRIPT })
      }

      setCode(fileText)
      toast.success('Archivo cargado correctamente')
      fileInputRef.current.value = ''
    } catch (error) {
      toast.error('Error al leer el archivo')
      fileInputRef.current.value = ''
    }
  }

  return (
    <Button
      title={t('upload.uploadTitle')}
      onClick={() => fileInputRef.current.click()}
    >
      <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z' /></svg>
      {t('upload.label')}
      <input
        type='file'
        id='file'
        className='hidden'
        accept='.js,.ts'
        ref={fileInputRef}
        onChange={handleSubmit}
      />
    </Button>
  )
}
