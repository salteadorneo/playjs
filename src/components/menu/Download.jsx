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
        <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' /><polyline points='7 10 12 15 17 10' /><line x1='12' x2='12' y1='15' y2='3' /></svg>
        {t('code.download')}
      </div>
      <div className='flex items-center gap-1 text-[#858585]'>
        <span className='bg-[#3f3f3f] px-1 rounded text-sm'>Ctrl</span>
        <span className='bg-[#3f3f3f] px-1 rounded text-sm'>S</span>
      </div>
    </Button>
  )
}
