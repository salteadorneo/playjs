import { useTranslation } from 'react-i18next'
import Button from '../atom/Button'

export default function Download ({ handleDownload }) {
  const { t } = useTranslation()

  return (
    <Button
      onClick={handleDownload}
      title={t('code.downloadTitle')}
      className='flex justify-between'
    >
      <div className='flex items-center gap-2'>
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
      </div>
      <div className='flex items-center gap-1 text-[#858585]'>
        <span className='bg-[#3f3f3f] px-1 rounded text-sm'>Ctrl</span>
        <span className='bg-[#3f3f3f] px-1 rounded text-sm'>S</span>
      </div>
    </Button>
  )
}
