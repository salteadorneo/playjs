import { useState, useRef } from 'react'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { IconUpload } from './Icons'
import Button from './Button'
import { IS_IFRAME, language } from '../consts'

export default function Upload({ editor }) {
  const [modal, setModal] = useState(false)
  const fileInputRef = useRef(null)
  const { t } = useTranslation()

  function handleClose() {
    setModal(!modal)
  }

  function openUpload() {
    setModal(!modal)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const file = fileInputRef.current.files[0]
    if (!fileInputRef || !file) return
    const fileText = await file.text()
    editor.setValue(fileText);
    toast.success(t('upload.toast'))
    handleClose();
  }

  return (
    <>
      <Button
        onClick={openUpload}
        title={t('upload.uploadTitle')}
      >
        <IconUpload />
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
