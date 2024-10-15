import { useTranslation } from 'react-i18next'

export default function Language () {
  const { t, i18n } = useTranslation()

  function changeLanguage () {
    const newLanguage = i18n.resolvedLanguage === 'en' ? 'es' : 'en'
    i18n.changeLanguage(newLanguage)
  }

  return (
    <div className='relative flex items-center gap-2 bg-none border border-[#858585] rounded-md text-[#858585] hover:text-[#999] hover:bg-[#252525] p-1.5 cursor-default'>
      <select
        value={i18n.resolvedLanguage}
        onChange={changeLanguage}
        title={t('language.globeTitle')}
        className='w-full text-[#858585] bg-transparent outline-none'
      >
        <option value='en' className='bg-[#1a1a1a]'>English</option>
        <option value='es' className='bg-[#1a1a1a]'>Español</option>
      </select>
    </div>
  )
}
