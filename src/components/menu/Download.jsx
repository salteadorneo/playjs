import { useTranslation } from 'react-i18next'
import Button from '../atom/Button'
import { language } from '../../consts'
import { loadCode } from '../../core/storage'
import { decodeCode } from '../../core/encode'

export default function Download () {
  const { t } = useTranslation()

  function downloadCode () {
    const hashCode = loadCode()
    const code = decodeCode(hashCode)

    const blob = new window.Blob([code], {
      type: 'text/plain'
    })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.download = 'playjs.' + (language === 'javascript' ? 'js' : 'ts')
    link.href = url
    link.click()
  }

  return (
    <Button
      onClick={downloadCode}
      title={t('code.downloadTitle')}
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
          strokeWidth='1.25'
          d='M3.333 14.167v1.666c0 .92.747 1.667 1.667 1.667h10c.92 0 1.667-.746 1.667-1.667v-1.666M5.833 9.167 10 13.333l4.167-4.166M10 3.333v10'
        />
      </svg>
      {t('code.download')}
    </Button>
  )
}
