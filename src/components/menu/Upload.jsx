import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../atom/Button'
import { LANGUAGE } from '../../consts'

export default function Upload ({ setCode, setLanguage }) {
  const { t } = useTranslation()

  const fileInputRef = useRef(null)

  async function handleSubmit (e) {
    e.preventDefault()

    const file = fileInputRef.current.files[0]
    if (!fileInputRef || !file) {
      return
    }

    const ext = file.name.split('.').pop()
    if (ext === 'ts') {
      setLanguage(LANGUAGE.TYPESCRIPT)
    }

    const fileText = await file.text()
    setCode(fileText)
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
