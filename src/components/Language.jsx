import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { IconGlobe } from './Icons'
import Button from './Button'
import { IS_IFRAME } from '../consts'

export default function Language () {
  const { t, i18n } = useTranslation();

  function changeLanguage () {
    const newLanguage = i18n.resolvedLanguage === 'en' ? 'es' : 'en'
    i18n.changeLanguage(newLanguage)

    toast.success(t('language.toast'))
  }

  if (IS_IFRAME) return null

  return (
    <Button
      onClick={changeLanguage}
      title={t('language.globeTitle')}
    >
      <IconGlobe />
      {!IS_IFRAME && (
        <span className='hidden sm:block'>{i18n.resolvedLanguage.toUpperCase()}</span>
      )}
    </Button>
  )
}
