import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { IconShare } from './Icons'
import Button from './Button'
import { IS_IFRAME } from '../consts'

export default function Share () {
  const { t } = useTranslation()

  function shareURL () {
    const url = window.location.href
    navigator.clipboard.writeText(url)

    toast.success(t('share.toast'))
  }

  return (
    <Button
      onClick={shareURL}
      title={t('share.shareTitle')}
    >
      <IconShare />
      {!IS_IFRAME && (
        <span className='hidden sm:block'>{t('share.share')}</span>
      )}
    </Button>
  )
}
