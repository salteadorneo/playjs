import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IconBug } from './Icons'
import Button from './Button'
import { IS_IFRAME } from '../consts'

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
        <IconBug />
        {!IS_IFRAME && (
          <span className='hidden sm:block'>{t('report.report')}</span>
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
