import { IS_IFRAME } from '../consts'
import Button from './Button'

export default function DisplayOptions ({ direction, changeDirection }) {
  return (
    <>
      <Button
        onClick={changeDirection}
        title='Change direction'
      >
        <svg
          width={20}
          height={20}
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
          fill='currentColor'
          className={`${direction === 'vertical' ? 'rotate-90' : ''}`}
        >
          <path
            fillRule='evenodd'
            d='M19 13a3 3 0 0 1 3 3v3a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-3a3 3 0 0 1 3-3h14Zm0 2H5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1Zm0-13a3 3 0 0 1 3 3v3a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h14Zm0 2H5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1Z'
          />
        </svg>
        {!IS_IFRAME && (
          <span className='hidden sm:block'>View</span>
        )}
      </Button>
    </>
  )
}
