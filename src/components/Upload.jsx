import { useState, useRef } from 'react'
import { toast } from 'sonner'
import { IconUpload } from './Icons'
import Button from './Button'
import { IS_IFRAME, language } from '../consts'

export default function Upload({ editor }) {
  const [modal, setModal] = useState(false)
  const fileInputRef = useRef(null)

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
    toast.success('File uploaded!')
    handleClose();
  }

  if (IS_IFRAME) return null

  return (
    <>
      <Button
        onClick={openUpload}
        title='Upload code from file'
      >
        <IconUpload />
        {!IS_IFRAME && (
          <span className='hidden sm:block'>Upload</span>
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
                >Select or drop a file below</label>
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
                Cancel
              </button>
              <button
                type='submit'
                className='text-primary px-4'
              >
                Upload
              </button>
            </form>
          </div>
        </section>
      )}
    </>
  )
}
