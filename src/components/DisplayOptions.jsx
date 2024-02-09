import { useTranslation } from 'react-i18next'
import Button from './atom/Button'
import { DIRECTION } from '../consts'

export default function DisplayOptions ({ direction, changeDirection }) {
  const { t } = useTranslation()

  return (
    <>
      <Button
        onClick={changeDirection}
        title={t('displayOptions.displayTitle')}
      >
        <svg
          width={20}
          height={20}
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
          fill='currentColor'
          className={`${direction === DIRECTION.VERTICAL ? '' : 'rotate-90'}`}
        >
          <path
            fillRule='evenodd'
            d='M5 22a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H5Zm6-18H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h6V4Zm8 0h-6v16h6a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1Z'
          />
        </svg>
      </Button>
    </>
  )
}
