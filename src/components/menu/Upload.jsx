import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { LANGUAGE_BY_SUBDOMAIN } from '../../consts'

export default function Upload ({ setCode }) {
  const { t } = useTranslation()

  const fileInputRef = useRef(null)

  async function handleSubmit (event) {
    event.preventDefault()

    const file = fileInputRef.current.files[0]
    if (!fileInputRef || !file) return
    const fileText = await file.text()
    setCode(fileText)
  }

  return (
    <>
      <label htmlFor='file'>
        <div
          title={t('upload.uploadTitle')}
          className='flex items-center gap-2 bg-none border-none text-[#858585] hover:text-[#999] p-0'
        >
          <svg
            width={20}
            height={20}
            aria-hidden='true'
            focusable='false'
            role='img'
            viewBox='0 0 20 20'
            fill='none'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path
              d='m9.257 6.351.183.183H15.819c.34 0 .727.182 1.051.506.323.323.505.708.505 1.05v5.819c0 .316-.183.7-.52 1.035-.337.338-.723.522-1.037.522H4.182c-.352 0-.74-.181-1.058-.5-.318-.318-.499-.705-.499-1.057V5.182c0-.351.181-.736.5-1.054.32-.321.71-.503 1.057-.503H6.53l2.726 2.726Z'
              strokeWidth='1.25'
            />
          </svg>
          {t('upload.label')}
          <input
            type='file'
            id='file'
            className='hidden'
            accept={LANGUAGE_BY_SUBDOMAIN === 'javascript' ? '.js' : '.js, .ts'}
            ref={fileInputRef}
            onChange={handleSubmit}
          />
        </div>
      </label>
    </>
  )
}
