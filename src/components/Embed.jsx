import { useRef, useState } from 'react'
import Button from './Button'
import { toast } from 'sonner'
import { IconEmbed } from '../Icons'

export default function Embed () {
  const textareaRef = useRef(null)
  const [modal, setModal] = useState(false)

  const url = window.location.href

  function handleClick () {
    setModal(status => !status)
  }

  function handleCopy () {
    navigator.clipboard.writeText(textareaRef.current.value)

    toast.success('Copied to clipboard!')

    setModal(false)
  }

  const isMainDomain = window.location.hostname === 'playjs.dev' || window.location.hostname === 'localhost'
  if (!isMainDomain) return null

  return (
    <>
      <Button
        onClick={handleClick}
        title=''
      >
        <IconEmbed />
        <span className='hidden sm:block'>Embed</span>
      </Button>
      {modal && (
        <section className='modal fixed top-0 left-0 z-20 w-screen h-screen bg-black/80 grid place-content-center'>
          <div className='max-w-xl w-screen px-4 space-y-2 text-right'>
            <textarea
              ref={textareaRef}
              value={`<iframe src="${url}" width="100%" height="100%" style="border: none;"></iframe>`}
              onClick={handleCopy}
              className='w-full h-48 bg-background text-primary border-none outline-none resize-none p-4'
              readOnly
            />
            <button
              className='text-primary px-4'
              onClick={handleClick}
            >
              Close
            </button>
            <button
              className='text-primary px-4'
              onClick={handleCopy}
            >
              Copy
            </button>
          </div>
        </section>
      )}
    </>
  )
}
