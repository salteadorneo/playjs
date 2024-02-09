import { useEffect, useState } from 'react'

import { useWindowSize } from '@/hooks/useWindowSize'

import { Toaster } from 'sonner'

import { encodeCode } from '../core/encode'
import { saveCode } from '../core/storage'
import { LANGUAGE_BY_SUBDOMAIN, WIDTH_MOBILE } from '../consts'

import Share from './Share'
import Embed from './Embed'
import DisplayOptions from './DisplayOptions'
import Menu from './Menu'
import { PlayJS } from 'playjs-core'

export default function Main ({ code: defaultCode = '' }) {
  const size = useWindowSize()

  const [code, setCode] = useState(defaultCode)

  const [language, setLanguage] = useState(() => {
    const language = window.localStorage.getItem('language')
    if (language) return language
    return LANGUAGE_BY_SUBDOMAIN
  })

  useEffect(() => {
    window.localStorage.setItem('language', language)
  }, [language])

  const [theme, setTheme] = useState(() => {
    const theme = window.localStorage.getItem('theme')
    if (theme) return theme
    return 'vs-dark'
  })

  const isMobile = size.width < WIDTH_MOBILE

  const [direction, setDirection] = useState(() => {
    const direction = window.localStorage.getItem('split-direction')
    if (direction) return direction
    return isMobile ? 'vertical' : 'horizontal'
  })

  function changeDirection () {
    const newDirection = direction === 'horizontal' ? 'vertical' : 'horizontal'
    setDirection(newDirection)
    window.localStorage.setItem('split-direction', newDirection)
  }

  const onChange = async (code) => {
    if (!code) return

    const hashedCode = encodeCode(code)

    window.history.replaceState(null, null, `/${hashedCode}`)

    saveCode(hashedCode)

    setCode(code)
  }

  function changeTheme () {
    const newTheme = theme === 'vs-dark' ? 'light' : 'vs-dark'
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
              setCode={setCode}
              language={language}
              setLanguage={setLanguage}
            />

            <div className='flex flex-col items-center gap-4'>
              <DisplayOptions direction={direction} changeDirection={changeDirection} />
              <Share />
              <Embed />
            </div>
          </div>
        </div>

        <PlayJS
          code={code}
          direction={direction}
          language={language}
          theme={theme}
          onChange={onChange}
          width='100%'
        />
      </main>
    </>
  )
}
