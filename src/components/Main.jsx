import { useEffect, useState } from 'react'

import { PlayJS } from 'playjs-core'

import { Toaster } from 'sonner'

import { useWindowSize } from '@/hooks/useWindowSize'
import { useCodeStore } from '../hooks/useCodeStore'
import { useDebounce } from '../hooks/useDebounce'

import { DIRECTION, IS_IFRAME, LANGUAGE, THEME, WIDTH_MOBILE } from '../consts'
import { decodeCode, encodeCode } from '../core/encode'

import Share from './Share'
import Embed from './Embed'
import DisplayOptions from './DisplayOptions'
import Menu from './Menu'
import Tabs from './Tabs'

export default function Main ({ hashedCode }) {
  const { current, setCurrent, codes, upsertCode } = useCodeStore()

  const [value, setValue] = useState('')

  const debouncedValue = useDebounce(value, 100)

  const isEmbed = IS_IFRAME && hashedCode

  useEffect(() => {
    if (!hashedCode) return

    const current = codes.find((c) => c.hashedCode === hashedCode)
    setTimeout(() => {
      if (current) {
        setCurrent(current)
      } else {
        upsertCode({
          code: decodeCode(hashedCode),
          hashedCode
        })
      }
    }, 500)
  }, [hashedCode])

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
    const { id, code } = debouncedValue

    const hashedCode = encodeCode(code)
    window.history.replaceState(null, null, `/${hashedCode}`)

    upsertCode({
      id,
      code,
      hashedCode
    })
  }, [debouncedValue])

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
          {!isEmbed && <Tabs />}

          <PlayJS
            code={current?.code}
            direction={direction}
            language={current?.language || LANGUAGE.JAVASCRIPT}
            theme={theme}
            onChange={(code) => setValue({
              ...current,
              code
            })}
            width='calc(100dvw - 48px)'
            height={isEmbed ? '100dvh' : 'calc(100dvh - 40px)'}
          />
        </div>
      </main>
    </>
  )
}
