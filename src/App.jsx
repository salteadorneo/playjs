import { useEffect, useState } from 'react'

import { PlayJS } from 'playjs-core'

import { Toaster } from 'sonner'

import { useWindowSize } from '@/hooks/useWindowSize'

import { DIRECTION, IS_IFRAME, LANGUAGE, THEME, WIDTH_MOBILE } from '@/consts'
import { decodeCode, encodeCode, getHashFromURL } from '@/core/encode'

import Share from '@/components/Share'
import Embed from '@/components/Embed'
import Button from '@/components/atom/Button'
import Menu from '@/components/Menu'
import Tabs from '@/components/Tabs'
import { useTranslation } from 'react-i18next'

export default function App () {
  const { t } = useTranslation()

  const [code, setCode] = useState('')

  useEffect(() => {
    const hashFromURL = getHashFromURL()
    setCode(decodeCode(hashFromURL))
  }, [])

  useEffect(() => {
    setTimeout(() => {
      const hashedCode = encodeCode(code)
      window.location.hash = hashedCode
    }, 1)
  }, [code])

  const size = useWindowSize()

  const [theme, setTheme] = useState(() => {
    const theme = window.localStorage.getItem('theme')
    if (theme) return theme
    return THEME.DARK
  })

  const [language, setLanguage] = useState(() => {
    const language = window.localStorage.getItem('language')
    if (language) return language
    return LANGUAGE.JAVASCRIPT
  })

  const isMobile = size.width < WIDTH_MOBILE

  const [direction, setDirection] = useState(() => {
    const direction = window.localStorage.getItem('split-direction')
    if (direction) return direction
    return isMobile ? DIRECTION.VERTICAL : DIRECTION.HORIZONTAL
  })

  function changeDirection () {
    const newDirection = direction === DIRECTION.HORIZONTAL ? DIRECTION.VERTICAL : DIRECTION.HORIZONTAL
    setDirection(newDirection)
    window.localStorage.setItem('split-direction', newDirection)
  }

  return (
    <>
      <Toaster position='top-center' />

      <main className='flex'>
        <div className='relative z-10 shadow-sm bg-[#1a1a1a]'>
          <div className='flex flex-col justify-between h-full'>
            <Menu
              theme={theme}
              setTheme={setTheme}
              language={language}
              setLanguage={setLanguage}
              setCode={setCode}
            />

            <div className='flex flex-col items-center gap-4'>
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
              <Share />
              <Embed />
            </div>
          </div>
        </div>

        <div className='flex flex-col'>
          {!IS_IFRAME && <Tabs />}

          <PlayJS
            code={code}
            onChange={setCode}
            direction={direction}
            language={language || LANGUAGE.JAVASCRIPT}
            theme={theme}
            width='calc(100dvw - 50px)'
            height={IS_IFRAME ? '100dvh' : 'calc(100dvh - 40px)'}
            ia
          />
        </div>
      </main>
    </>
  )
}
