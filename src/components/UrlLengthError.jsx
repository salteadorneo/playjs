import { useTranslation } from 'react-i18next'

export default function UrlLengthError () {
  const { t } = useTranslation()

  return (
    <div className='fixed bottom-14 z-10 text-black bg-yellow-200 w-full text-left p-2'>
      <p>{t('urlLengthError.warning')}</p>
    </div>
  )
}
