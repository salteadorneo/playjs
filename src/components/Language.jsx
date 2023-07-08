import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import Button from './atom/Button'

export default function Language () {
  const { t, i18n } = useTranslation()

  function changeLanguage () {
    const newLanguage = i18n.resolvedLanguage === 'en' ? 'es' : 'en'
    i18n.changeLanguage(newLanguage)

    toast.success(t('language.toast'))
  }

  return (
    <Button
      onClick={changeLanguage}
      title={t('language.globeTitle')}
    >
      <svg
        fill='currentColor'
        width={20}
        height={20}
        viewBox='0 0 0.72 0.72'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fillRule='evenodd'
          d='M0.36 0.06c0.166 0 0.3 0.134 0.3 0.3s-0.134 0.3 -0.3 0.3S0.06 0.526 0.06 0.36 0.194 0.06 0.36 0.06Zm0.089 0.33H0.271c0.003 0.06 0.017 0.115 0.037 0.155C0.326 0.583 0.347 0.6 0.36 0.6c0.013 0 0.034 -0.017 0.052 -0.055 0.02 -0.04 0.033 -0.095 0.037 -0.155Zm0.149 0h-0.089c-0.004 0.073 -0.02 0.138 -0.045 0.186a0.24 0.24 0 0 0 0.134 -0.186Zm-0.387 0H0.122a0.24 0.24 0 0 0 0.134 0.186c-0.024 -0.045 -0.04 -0.105 -0.045 -0.173l-0.001 -0.014Zm0.045 -0.246 -0.001 0A0.24 0.24 0 0 0 0.122 0.33h0.089c0.004 -0.073 0.02 -0.138 0.045 -0.186ZM0.36 0.12l-0.002 0c-0.013 0.002 -0.032 0.019 -0.05 0.055C0.287 0.215 0.274 0.27 0.271 0.33h0.178c-0.003 -0.06 -0.017 -0.115 -0.037 -0.155C0.394 0.137 0.373 0.12 0.36 0.12Zm0.104 0.024 0.001 0.001c0.025 0.048 0.041 0.113 0.045 0.185h0.089a0.24 0.24 0 0 0 -0.134 -0.186Z'
        />
      </svg>
      {i18n.resolvedLanguage.toUpperCase()}
    </Button>
  )
}
