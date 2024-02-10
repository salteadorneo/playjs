import { useEffect, useState } from 'react'

import { useWindowSize } from '@/hooks/useWindowSize'

import { Toaster } from 'sonner'

import { DIRECTION, IS_IFRAME, LANGUAGE, THEME, WIDTH_MOBILE } from '../consts'

import Share from './Share'
import Embed from './Embed'
import DisplayOptions from './DisplayOptions'
import Menu from './Menu'
import { PlayJS } from 'playjs-core'
import { useCodeStore } from '../hooks/useCodeStore'
import { decodeCode, encodeCode } from '../core/encode'

export default function Main ({ hashedCode }) {
  const { current, setCurrent, codes, upsertCode, removeCode } = useCodeStore()

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

  const onChange = async (code) => {
    const hashedCode = encodeCode(code)
    window.history.replaceState(null, null, `/${hashedCode}`)

    upsertCode({
      ...current,
      code,
      hashedCode
    })
  }

  function changeTheme () {
    const newTheme = theme === THEME.DARK ? THEME.LIGHT : THEME.DARK
    setTheme(newTheme)
    window.localStorage.setItem('theme', newTheme)
  }

  function handleNewCode () {
    upsertCode({})
  }

  function handleChangeLanguage (language) {
    upsertCode({
      ...current,
      language
    })
  }

  function handleUpload (code) {
    upsertCode({ code })
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
              code={current?.code}
              setCode={handleUpload}
              language={current?.language || LANGUAGE.JAVASCRIPT}
              setLanguage={handleChangeLanguage}
            />

            <div className='flex flex-col items-center gap-4'>
              <DisplayOptions direction={direction} changeDirection={changeDirection} />
              <Share />
              <Embed />
            </div>
          </div>
        </div>

        <div className='flex flex-col'>
          {!isEmbed && (
            <section className='basis-12 flex items-center bg-[#1a1a1a]'>
              {codes.map((code) => (
                current?.id === code.id
                  ? (
                    <div
                      key={code.id}
                      className='group relative flex items-center text-primary h-full min-w-24 text-left pl-4 pr-8 hover:bg-background bg-background'
                    >
                      {code.title}
                      <button
                        className='opacity-0 group-hover:opacity-100 absolute right-3 transition-opacity duration-300 delay-300'
                        onClick={() => removeCode(code.id)}
                      >
                        x
                      </button>
                    </div>
                    )
                  : (
                    <button
                      key={code.id}
                      onClick={() => setCurrent(code)}
                      className='text-primary h-full min-w-24 text-left pl-4 pr-8 hover:bg-background'
                    >
                      {code.title}
                    </button>
                    )
              ))}
              <button
                onClick={handleNewCode}
                className='text-primary h-full text-left px-4 hover:bg-background'
              >
                +
              </button>
            </section>
          )}

          <PlayJS
            code={current?.code}
            direction={direction}
            language={current?.language || LANGUAGE.JAVASCRIPT}
            theme={theme}
            onChange={onChange}
            width='calc(100dvw - 48px)'
            height={isEmbed ? '100dvh' : 'calc(100dvh - 40px)'}
          />
        </div>
      </main>
    </>
  )
}
