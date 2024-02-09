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
      <svg
        width='18'
        height='18'
        viewBox='0 0 24 24'
        fill='currentColor'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M5.671 6.178a5.67 5.67 0 1 0 5.67 5.67 5.67 5.67 0 0 0-5.67-5.67Zm0 1.693a3.978 3.978 0 1 1-3.978 3.978 3.978 3.978 0 0 1 3.978-3.978Z'
          fillRule='evenodd'
        />
        <path
          d='M20.069 15.826a3.935 3.935 0 1 0 3.935 3.935 3.936 3.936 0 0 0-3.935-3.935Zm0 1.693a2.242 2.242 0 1 1-2.242 2.243 2.244 2.244 0 0 1 2.242-2.243Z'
          fillRule='evenodd'
        />
        <path
          d='m9.787 14.303 7.078 4.719a.846.846 0 0 0 .939-1.408l-7.078-4.719a.846.846 0 0 0-.939 1.408Z'
          fillRule='evenodd'
        />
        <path
          d='M20.069 0a3.935 3.935 0 1 0 3.935 3.935A3.936 3.936 0 0 0 20.069 0Zm0 1.693a2.242 2.242 0 1 1-2.242 2.242 2.243 2.243 0 0 1 2.242-2.242Z'
          fillRule='evenodd'
        />
        <path
          d='m10.661 10.894 7.133-4.618a.846.846 0 0 0-.92-1.421l-7.13 4.618a.846.846 0 1 0 .92 1.42Z'
          fillRule='evenodd'
        />
      </svg>
    </Button>
  )
}
