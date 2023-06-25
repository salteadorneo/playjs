import { useState, useRef } from 'react'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import Button from './atom/Button'
import { IS_IFRAME, language } from '../consts'

export default function Upload ({ editor }) {
  const [modal, setModal] = useState(false)
  const fileInputRef = useRef(null)
  const { t } = useTranslation()

  function handleClose () {
    setModal(!modal)
  }

  function openUpload () {
    setModal(!modal)
  }

  async function handleSubmit (event) {
    event.preventDefault()
    const file = fileInputRef.current.files[0]
    if (!fileInputRef || !file) return
    const fileText = await file.text()
    editor.setValue(fileText)
    toast.success(t('upload.toast'))
    handleClose()
  }

  if (IS_IFRAME) return null

  return (
    <>
      <Button
        onClick={openUpload}
        title={t('upload.uploadTitle')}
      >
        <svg
          viewBox='0 0 0.72 0.72'
          height='24'
          width='24'
          xmlns='http://www.w3.org/2000/svg'
          fill='currentColor'
        >
          <path
            d='M0.63 0.48a0.03 0.03 0 0 1 0.03 0.026L0.66 0.51v0.06a0.09 0.09 0 0 1 -0.085 0.09L0.57 0.66H0.15a0.09 0.09 0 0 1 -0.09 -0.085L0.06 0.57v-0.06a0.03 0.03 0 0 1 0.06 -0.004L0.12 0.51v0.06a0.03 0.03 0 0 0 0.026 0.03L0.15 0.6h0.42a0.03 0.03 0 0 0 0.03 -0.026L0.6 0.57v-0.06a0.03 0.03 0 0 1 0.03 -0.03ZM0.356 0.06l0.002 0L0.36 0.06l0.002 0 0.004 0.001 0.003 0.001 0.003 0.001 0.003 0.002 0.003 0.002 0.002 0.002 0.09 0.09a0.03 0.03 0 1 1 -0.042 0.042L0.39 0.162V0.45a0.03 0.03 0 0 1 -0.06 0V0.162L0.291 0.201a0.03 0.03 0 0 1 -0.042 -0.042l0.09 -0.09c0.001 -0.001 0.002 -0.002 0.003 -0.003l0.003 -0.002 0.003 -0.002 0.003 -0.001 0.004 -0.001Z'
            fillRule='evenodd'
          />
        </svg>
        {!IS_IFRAME && (
          <span className='hidden sm:block'>{t('upload.upload')}</span>
        )}
      </Button>
      {modal && (
        <section className='fixed top-0 left-0 z-10 w-screen h-screen bg-black/80 grid place-content-center'>
          <div className='max-w-xl w-screen px-4'>
            <form
              className='space-y-2 text-right'
              onSubmit={handleSubmit}
            >
              <label
                className='block text-primary text-center text-lg'
                htmlFor='file'
              >
                {t('upload.instructions')}
              </label>
              <input
                type='file'
                id='file'
                className='w-full bg-background text-primary border-none outline-none resize-none px-4 py-2'
                accept={language === 'javascript' ? '.js' : '.js, .ts'}
                ref={fileInputRef}
              />
              <button
                type='button'
                className='text-primary px-4'
                onClick={handleClose}
              >
                {t('upload.formCancel')}
              </button>
              <button
                type='submit'
                className='text-primary px-4'
              >
                {t('upload.formUpload')}
              </button>
            </form>
          </div>
        </section>
      )}
    </>
  )
}
