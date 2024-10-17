import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import Button from './atom/Button'

export default function Share () {
  const { t } = useTranslation()

  function share () {
    if (navigator.share) {
      navigator.share({
        title: t('share.title'),
        text: t('share.text'),
        url: window.location.href
      })
    } else {
      const url = window.location.href
      navigator.clipboard.writeText(url)

      toast.success(t('share.toast'))
    }
  }

  return (
    <Button
      onClick={share}
      title={t('share.label')}
    >
      <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><circle cx='18' cy='5' r='3' /><circle cx='6' cy='12' r='3' /><circle cx='18' cy='19' r='3' /><line x1='8.59' x2='15.42' y1='13.51' y2='17.49' /><line x1='15.41' x2='8.59' y1='6.51' y2='10.49' /></svg>
    </Button>
  )
}
