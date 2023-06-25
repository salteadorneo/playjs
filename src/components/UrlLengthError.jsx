import { useTranslation } from 'react-i18next'

export default function UrlLengthError () {
  const { t } = useTranslation()

  return (
    <div className='text-[#825c0f] bg-[#fbf2de] w-full text-left p-[10px] pl-[15px] rounded-md'>
      <p>{t('urlLengthError.warning')}</p>
    </div>
  )
}
