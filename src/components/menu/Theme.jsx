import { THEME } from '../../consts'
import Button from '../atom/Button'

export default function Theme ({ theme, changeTheme }) {
  return (
    <Button
      onClick={changeTheme}
    >
      {theme === THEME.DARK
        ? (
          <>
            <svg
              width={20}
              height={20}
              aria-hidden='true'
              focusable='false'
              viewBox='0 0 20 20'
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <g
                stroke='currentColor'
                strokeWidth='1.25'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path d='M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM10 4.167V2.5M14.167 5.833l1.166-1.166M15.833 10H17.5M14.167 14.167l1.166 1.166M10 15.833V17.5M5.833 14.167l-1.166 1.166M5 10H3.333M5.833 5.833 4.667 4.667' />
              </g>
            </svg>
            Modo claro
          </>
          )
        : (
          <>
            <svg
              width={20}
              height={20}
              aria-hidden='true'
              focusable='false'
              viewBox='0 0 20 20'
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path
                clipRule='evenodd'
                d='M10 2.5h.328a6.25 6.25 0 0 0 6.6 10.372A7.5 7.5 0 1 1 10 2.493V2.5Z' stroke='currentColor'
              />
            </svg>
            Modo oscuro
          </>
          )}
    </Button>

  )
}
