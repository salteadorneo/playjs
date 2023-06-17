import { useEffect, useState, useRef } from 'react'
import { IconDownload } from './Icons'
import Button from './Button'
import { IS_IFRAME } from '../consts'

export default function Upload() {
  const [modal, setModal] = useState(false)
  const [status, setStatus] = useState(null)

  useEffect(() => {
    if (modal) {
      setStatus(null)
    }
  }, [modal])

  function handleClose() {
    setModal(!modal)
  }

  function openUpload() {
    setModal(!modal)
  }

  function handleSubmit(event) {
    event.preventDefault()
    handleClose();
  }

  return (
    <>
      <Button
        onClick={openUpload}
        title='Upload code from file'
      >
        <IconDownload className='rotate-90' />
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
              <input
                type='file'
                name='file'
                className='w-full bg-background text-primary border-none outline-none resize-none px-4 py-2'
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
