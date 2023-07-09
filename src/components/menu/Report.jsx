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
        <svg
          width={20}
          height={20}
          viewBox='0 0 16 16'
          xmlns='http://www.w3.org/2000/svg'
          fill='currentColor'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M10.877 4.5v-.582a2.918 2.918 0 1 0-5.836 0V4.5h-.833L2.545 2.829l-.593.59 1.611 1.619-.019.049a8.03 8.03 0 0 0-.503 2.831c0 .196.007.39.02.58l.003.045H1v.836h2.169l.006.034c.172.941.504 1.802.954 2.531l.034.055L2.2 13.962l.592.592 1.871-1.872.058.066c.868.992 2.002 1.589 3.238 1.589 1.218 0 2.336-.579 3.199-1.544l.057-.064 1.91 1.92.593-.591-1.996-2.006.035-.056c.467-.74.81-1.619.986-2.583l.006-.034h2.171v-.836h-2.065l.003-.044a8.43 8.43 0 0 0 .02-.58 8.02 8.02 0 0 0-.517-2.866l-.019-.05 1.57-1.57-.592-.59L11.662 4.5h-.785zm-5 0v-.582a2.082 2.082 0 1 1 4.164 0V4.5H5.878zm5.697.837.02.053c.283.753.447 1.61.447 2.528 0 1.61-.503 3.034-1.274 4.037-.77 1.001-1.771 1.545-2.808 1.545-1.036 0-2.037-.544-2.807-1.545-.772-1.003-1.275-2.427-1.275-4.037 0-.918.164-1.775.448-2.528l.02-.053h7.229z'
          />
        </svg>
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
