import { useEffect, useState } from 'react'
import { IconBug } from '../Icons'
import Button from './Button'
import { IS_IFRAME } from '../consts'

export default function Report () {
  const [modal, setModal] = useState(false)
  const [status, setStatus] = useState(null)

  useEffect(() => {
    if (modal) {
      setStatus(null)
    }
  }, [modal])

  function handleClick () {
    setModal(status => !status)
  }

  function reportBug () {
    setModal(status => !status)

    const url = window.location.href
    console.log(url)
  }

  function handleSubmit (event) {
    event.preventDefault()
    const form = event.target
    const data = new FormData(form)

    fetch(event.target.action, {
      method: form.method,
      body: data,
      headers: {
        Accept: 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        setStatus('Thanks for your report!')
        form.reset()
      } else {
        response.json().then(data => {
          if (Object.hasOwn(data, 'errors')) {
            setStatus(data.errors.map(error => error.message).join(', '))
          } else {
            setStatus('Oops! There was a problem submitting your form')
          }
        })
      }
    }).catch(error => {
      setStatus('Oops! There was a problem submitting your form')
      console.error(error)
    })
  }

  return (
    <>
      <Button
        onClick={reportBug}
        title='Report a bug'
      >
        <IconBug />
        {!IS_IFRAME && (
          <span className='hidden sm:block'>Report bug</span>
        )}
      </Button>
      {modal && (
        <section className='fixed top-0 left-0 z-10 w-screen h-screen bg-black/80 grid place-content-center'>
          <div className='max-w-xl w-screen px-4'>
            {!status && (
              <form
                action='https://formspree.io/f/mbjeboog'
                method='POST'
                className='space-y-2 text-right'
                onSubmit={handleSubmit}
              >
                <input type='hidden' name='_subject' value='Bug report' />
                <input type='hidden' name='url' value={window.location.href} />
                <input
                  type='email'
                  name='email'
                  className='w-full bg-background text-primary border-none outline-none resize-none px-4 py-2'
                  placeholder='Email (optional)'
                />
                <textarea
                  name='reason'
                  className='w-full h-32 bg-background text-primary border-none outline-none resize-none p-4'
                  placeholder='Reason'
                  required
                />
                <button
                  type='button'
                  className='text-primary px-4'
                  onClick={handleClick}
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='text-primary px-4'
                >
                  Send
                </button>
              </form>
            )}
            {status && (
              <div className='flex flex-col justify-center'>
                <p className='text-center text-primary'>
                  {status}
                </p>
                <button
                  type='button'
                  className='text-primary px-4'
                  onClick={handleClick}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  )
}
