import { toast } from 'sonner'
import { IconShare } from '../Icons'
import Button from './Button'

export default function Share () {
  function shareURL () {
    const url = window.location.href
    navigator.clipboard.writeText(url)

    toast.success('Copied to clipboard!')
  }

  return (
    <Button
      onClick={shareURL}
      title='Share code'
    >
      <IconShare />
      <span className='hidden sm:block'>Share</span>
    </Button>
  )
}
