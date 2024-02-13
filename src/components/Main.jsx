import { useEffect, useState } from 'react'

import { PlayJS } from 'playjs-core'

import { Toaster } from 'sonner'

import { useWindowSize } from '@/hooks/useWindowSize'
import { useCodeStore } from '../hooks/useCodeStore'

import { DIRECTION, IS_IFRAME, LANGUAGE, THEME, WIDTH_MOBILE } from '../consts'
import { decodeCode, encodeCode, getHashFromURL } from '../core/encode'

import Share from './Share'
import Embed from './Embed'
import DisplayOptions from './DisplayOptions'
import Menu from './Menu'
import Tabs from './Tabs'

export default function Main () {
  const { current, setCurrent, codes, upsertCode, upsertCodeAndSelect } = useCodeStore()

  useEffect(() => {
    const hashFromURL = getHashFromURL()

    if (!hashFromURL) return

    const current = codes.find((c) => c.hashedCode === hashFromURL)
    if (current) {
      setCurrent(current)
    } else {
      upsertCodeAndSelect({
        code: decodeCode(hashFromURL),
        hashFromURL
      })
    }
  }, [])

  const size = useWindowSize()

  const [theme, setTheme] = useState(() => {
    const theme = window.localStorage.getItem('theme')
    if (theme) return theme
    return THEME.DARK
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

  useEffect(() => {
    if (!current) return

    const { id, code } = current

    const hashedCode = encodeCode(code)
    window.history.replaceState(null, null, `/${hashedCode}`)

    upsertCode({
      id,
      code,
      hashedCode
    })
  }, [current?.code])

  function changeTheme () {
    const newTheme = theme === THEME.DARK ? THEME.LIGHT : THEME.DARK
    setTheme(newTheme)
    window.localStorage.setItem('theme', newTheme)
  }

  return (
    <>
      <Toaster position='top-center' />

      <main className='flex'>
        <div className='relative z-10 p-3 shadow-sm bg-[#1a1a1a]'>
          <div className='flex flex-col justify-between h-full'>
            <Menu
              theme={theme}
              changeTheme={changeTheme}
            />

            <div className='flex flex-col items-center gap-4'>
              <DisplayOptions direction={direction} changeDirection={changeDirection} />
              <Share />
              <Embed />
            </div>
          </div>
        </div>

        <div className='flex flex-col'>
          {!IS_IFRAME && <Tabs />}

          <PlayJS
            code={current?.code}
            direction={direction}
            language={current?.language || LANGUAGE.JAVASCRIPT}
            theme={theme}
            onChange={(code) => setCurrent({
              ...current,
              code
            })}
            width='calc(100dvw - 48px)'
            height={IS_IFRAME ? '100dvh' : 'calc(100dvh - 40px)'}
          />
        </div>
      </main>
    </>
  )
}
