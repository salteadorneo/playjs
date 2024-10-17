import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../atom/Button'

export default function Report () {
  const [modal, setModal] = useState(false)
  const [status, setStatus] = useState(null)
  const { t } = useTranslation()

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
        setStatus(t('report.responseOk'))
        form.reset()
      } else {
        response.json().then(data => {
          if (Object.hasOwn(data, 'errors')) {
            setStatus(data.errors.map(error => error.message).join(', '))
          } else {
            setStatus(t('report.responseError'))
          }
        })
      }
    }).catch(() => {
      setStatus(t('report.responseError'))
    })
  }

  return (
    <>
      <Button
        onClick={reportBug}
        title={t('report.reportTitle')}
      >
        <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='m8 2 1.88 1.88' /><path d='M14.12 3.88 16 2' /><path d='M9 7.13v-1a3.003 3.003 0 1 1 6 0v1' /><path d='M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6' /><path d='M12 20v-9' /><path d='M6.53 9C4.6 8.8 3 7.1 3 5' /><path d='M6 13H2' /><path d='M3 21c0-2.1 1.7-3.9 3.8-4' /><path d='M20.97 5c0 2.1-1.6 3.8-3.5 4' /><path d='M22 13h-4' /><path d='M17.2 17c2.1.1 3.8 1.9 3.8 4' /></svg>
        {t('report.report')}
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
                  placeholder={t('report.formEmail')}
                />
                <textarea
                  name='reason'
                  className='w-full h-32 bg-background text-primary border-none outline-none resize-none p-4'
                  placeholder={t('report.formDescription')}
                  required
                />
                <button
                  type='button'
                  className='text-primary px-4'
                  onClick={handleClick}
                >
                  {t('report.formCancel')}
                </button>
                <button
                  type='submit'
                  className='text-primary px-4'
                >
                  {t('report.formSend')}
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
                  {t('report.close')}
                </button>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  )
}
