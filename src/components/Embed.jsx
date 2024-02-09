import { useState } from 'react'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import Button from './atom/Button'
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
        <svg
          height='24'
          width='24'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 512 512'
          xmlSpace='preserve'
        >
          <path
            d='M153.527 138.934c-.29 0-.581.088-.826.258L.641 242.995A1.465 1.465 0 0 0 0 244.213v27.921c0 .484.238.943.641 1.21l152.06 103.811c.246.17.536.258.826.258.238 0 .468-.064.686-.169.484-.258.782-.758.782-1.306V331.46c0-.476-.238-.936-.641-1.202L48.769 258.166l105.585-72.068a1.49 1.49 0 0 0 .641-1.226V140.41c0-.548-.298-1.049-.782-1.299a1.403 1.403 0 0 0-.686-.177zm357.831 104.061-152.06-103.803a1.464 1.464 0 0 0-.827-.258c-.238 0-.467.056-.685.177-.484.25-.782.751-.782 1.299v44.478c0 .484.238.936.641 1.21l105.586 72.068-105.586 72.092a1.452 1.452 0 0 0-.641 1.217v44.462c0 .548.298 1.049.782 1.306.218.105.448.169.685.169.291 0 .581-.088.827-.258l152.06-103.811a1.45 1.45 0 0 0 .642-1.21v-27.921c0-.491-.238-.942-.642-1.217zM325.507 114.594h-42.502a1.46 1.46 0 0 0-1.387.984l-96.517 279.885a1.46 1.46 0 0 0 .194 1.322c.278.387.722.621 1.198.621h42.506c.625 0 1.182-.395 1.387-.992l96.513-279.868a1.493 1.493 0 0 0-.193-1.339 1.497 1.497 0 0 0-1.199-.613z'
            style={{
              fill: 'currentColor'
            }}
          />
        </svg>
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
