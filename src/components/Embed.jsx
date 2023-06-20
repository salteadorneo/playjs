import { useState } from 'react'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import Button from './Button'
import { IconEmbed } from './Icons'
import { IS_IFRAME } from '../consts'

export default function Embed () {
  const [modal, setModal] = useState(false)
  const { t } = useTranslation()

  const url = window.location.href
  const iframe = `<iframe src="${url}" width="100%" height="500" style="border:none;" allow="clipboard-read;clipboard-write"></iframe>`

  function handleClick () {
    setModal(status => !status)
  }

  function handleCopy () {
    navigator.clipboard.writeText(iframe)
    toast.success(t('embed.toast'))
    setModal(false)
  }

  const isMainDomain = window.location.hostname.match(/playjs.dev/) !== null || window.location.hostname === 'localhost'
  if (!isMainDomain) return null

  if (IS_IFRAME) return null

  return (
    <>
      <Button
        onClick={handleClick}
        title={t('embed.embedTitle')}
      >
        <IconEmbed />
        <span className='hidden sm:block'>{t('embed.embed')}</span>
      </Button>
      {modal && (
        <section className='modal fixed top-0 left-0 z-20 w-screen h-screen bg-black/80 grid place-content-center'>
          <div className='max-w-6xl w-screen px-4 space-y-2 text-right'>
            <textarea
              value={iframe}
              className='w-full h-60 bg-background text-primary border-none outline-none resize-none p-4'
              readOnly
            />
            <button
              className='text-primary px-4'
              onClick={handleClick}
            >
              {t('embed.embedClose')}
            </button>
            <button
              className='text-primary px-4'
              onClick={handleCopy}
            >
              {t('embed.embedCopy')}
            </button>
          </div>
        </section>
      )}
    </>
  )
}
