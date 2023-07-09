import { useTranslation } from 'react-i18next'

export default function Language () {
  const { t, i18n } = useTranslation()

  function changeLanguage () {
    const newLanguage = i18n.resolvedLanguage === 'en' ? 'es' : 'en'
    i18n.changeLanguage(newLanguage)
  }

  return (
    <div className='relative text-[#858585]'>
      <svg
        width={18}
        height={18}
        viewBox='0 0 24 24'
        xmlns='http://www.w3.org/2000/svg'
        aria-labelledby='languageIconTitle'
        stroke='currentColor'
        strokeLinecap='square'
        fill='none'
        className='absolute top-1/2 left-0 -translate-y-1/2'
      >
        <circle cx={12} cy={12} r={10} />
        <path
          strokeLinecap='round'
          d='M12 22c2.667-2.424 4-5.758 4-10s-1.333-7.576-4-10C9.333 4.424 8 7.758 8 12s1.333 7.576 4 10ZM2.5 9h19m-19 6h19'
        />
      </svg>
      <select
        value={i18n.resolvedLanguage}
        onChange={changeLanguage}
        title={t('language.globeTitle')}
        className='pl-[20px] w-full text-[#858585] bg-[#1a1a1a] rounded-md border border-[#1a1a1a] outline-none'
      >
        <option value='en'>English</option>
        <option value='es'>Español</option>
      </select>
    </div>
  )
}
