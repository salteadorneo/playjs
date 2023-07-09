import { useTranslation } from 'react-i18next'

export default function Language () {
  const { t, i18n } = useTranslation()

  function changeLanguage () {
    const newLanguage = i18n.resolvedLanguage === 'en' ? 'es' : 'en'
    i18n.changeLanguage(newLanguage)
  }

  return (
    <select
      value={i18n.resolvedLanguage}
      onChange={changeLanguage}
      title={t('language.globeTitle')}
      className='py-1.5 px-2 text-white/70 bg-[#3f3f3f] rounded-md border border-[#3f3f3f] outline-none'
    >
      <option value='en'>English</option>
      <option value='es'>Español</option>
    </select>
  )
}
