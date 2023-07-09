import { version } from '../../package.json'

import { useEffect, useState } from 'react'
import Split from 'react-split'

import { useWindowSize } from '@/hooks/useWindowSize'

import { Toaster } from 'sonner'

import { encodeCode } from '../core/encode'
import { saveCode } from '../core/storage'
import { WIDTH_MOBILE } from '../consts'

import Logo from './atom/Logo'
import Share from './Share'
import Console from './Console'
import Embed from './Embed'
import Code from './Code'
import UrlLengthError from './UrlLengthError'
import DisplayOptions from './DisplayOptions'
import Menu from './Menu'

export default function Chore () {
  const size = useWindowSize()

  const [code, setCode] = useState('')

  const [language, setLanguage] = useState(() => {
    const language = window.localStorage.getItem('language')
    if (language) return language
    return 'javascript'
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
    setSizes([50, 50])
  }

  const [sizes, setSizes] = useState(() => {
    const sizes = window.localStorage.getItem('split-sizes')
    if (sizes) return JSON.parse(sizes)
    return [50, 50]
  })

  function handleDragEnd (e) {
    const [left, right] = e
    setSizes([left, right])
    window.localStorage.setItem('split-sizes', JSON.stringify([left, right]))
  }
  const gutterSize = isMobile ? 6 : 3

  const [lengthLimit, setLengthLimit] = useState(false)

  const onChange = async ({ code = '' }) => {
    if (!code) return

    const hashedCode = encodeCode(code)

    setLengthLimit(hashedCode.length + window.location.host.length >= 2000)

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

      <div className='fixed top-0 left-0 z-10 w-full p-3 shadow-sm bg-[#1a1a1a]'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <Menu
              theme={theme}
              changeTheme={changeTheme}
              setCode={setCode}
              language={language}
              setLanguage={setLanguage}
            />

            <Logo language={language} />

            <span className='text-[#707070] text-sm space-x-2'>
              <span>v.{version}</span>
              <span className='text-[#1a1a1a] font-bold bg-[#3f3f3f] rounded py-[1px] px-2'>BETA</span>
            </span>
          </div>

          <div className='flex items-center gap-4'>
            <DisplayOptions direction={direction} changeDirection={changeDirection} />
            <Share />
            <Embed />
          </div>
        </div>
      </div>

      {lengthLimit && <UrlLengthError />}

      {direction === 'horizontal' && (
        <Split
          className={`flex ${direction} h-screen ${lengthLimit ? 'pt-[135px] sm:pt-[80px]' : 'pt-14'}`}
          direction={direction}
          sizes={sizes}
          gutterSize={gutterSize}
          onDragEnd={handleDragEnd}
        >
          <Code code={code} language={language} onChange={onChange} theme={theme} />
          <Console code={code} direction={direction} theme={theme} />
        </Split>
      )}
      {direction === 'vertical' && (
        <Split
          className={`${direction} h-screen ${lengthLimit ? 'pt-[135px] sm:pt-[80px]' : 'pt-14'}`}
          direction={direction}
          sizes={sizes}
          gutterSize={gutterSize}
          onDragEnd={handleDragEnd}
        >
          <Code code={code} language={language} onChange={onChange} theme={theme} />
          <Console code={code} direction={direction} theme={theme} />
        </Split>
      )}
    </>
  )
}
