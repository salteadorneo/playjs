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
import { useCodeStore } from '@/hooks/useCodeStore'

export default function App () {
  const { t, i18n } = useTranslation()
  const { current } = useCodeStore()

  const [code, setCode] = useState('')

  useEffect(() => {
    const hashFromURL = getHashFromURL()
    setCode(decodeCode(hashFromURL))
  }, [])

  useEffect(() => {
    document.documentElement.lang = i18n.resolvedLanguage || 'en'
  }, [i18n.resolvedLanguage])

  useEffect(() => {
    setTimeout(() => {
      const hashedCode = encodeCode(code)
      window.location.hash = hashedCode
    }, 1)
  }, [code])

  const size = useWindowSize()

  const [theme, setTheme] = useState(current?.theme || THEME.DARK)

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
        {!IS_IFRAME && (
          <div className='relative z-10 shadow-sm bg-[#1a1a1a]'>
            <div className='flex flex-col justify-between h-full'>
              <Menu
                theme={theme}
                setTheme={setTheme}
                setCode={setCode}
              />

              <div className='flex flex-col items-center gap-4'>
                <Button
                  onClick={changeDirection}
                  title={t('displayOptions.displayTitle')}
                >
                  <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className={`${direction === DIRECTION.VERTICAL ? 'rotate-90' : ''}`}><rect width='18' height='18' x='3' y='3' rx='2' /><path d='M3 12h18' /></svg>
                </Button>
                <Share />
                <Embed />
              </div>
            </div>
          </div>
        )}

        <div className='flex flex-col'>
          {!IS_IFRAME && <Tabs />}

          <PlayJS
            code={code}
            onChange={setCode}
            direction={direction}
            language={current?.language || LANGUAGE.JAVASCRIPT}
            theme={theme}
            width={!IS_IFRAME ? 'calc(100dvw - 50px)' : '100vw'}
            height={!IS_IFRAME ? 'calc(100dvh - 40px)' : '100dvh'}
            ia
          />
        </div>
      </main>
    </>
  )
}
