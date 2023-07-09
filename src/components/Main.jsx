import { version } from '../../package.json'

import { useState } from 'react'
import Split from 'react-split'

import { useWindowSize } from '@/hooks/useWindowSize'

import { Toaster } from 'sonner'

import { getResult } from '../core'
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
  const [result, setResult] = useState('')

  const onChange = async ({ code = '', language = 'javascript' }) => {
    if (!code) return

    const hashedCode = encodeCode(code)

    setLengthLimit(hashedCode.length + window.location.host.length >= 2000)

    window.history.replaceState(null, null, `/${hashedCode}`)

    saveCode(hashedCode)

    const result = await getResult({ code, language })

    setResult(result)
  }

  return (
    <>
      <Toaster position='top-center' />

      <div className='fixed top-0 left-0 z-10 w-full flex flex-wrap items-center gap-3 p-3 shadow-sm bg-[#1a1a1a]'>
        <Menu />

        <Logo />

        <span className='text-[#707070] text-sm space-x-2'>
          <span>v.{version}</span>
          <span className='text-[#1a1a1a] font-bold bg-[#3f3f3f] rounded py-[1px] px-2'>BETA</span>
        </span>

        {lengthLimit && <UrlLengthError />}
      </div>

      <div className='fixed top-3 right-4 z-10 flex items-center gap-4'>
        <DisplayOptions direction={direction} changeDirection={changeDirection} />
        <Share />
        <Embed />
      </div>

      {direction === 'horizontal' && (
        <Split
          className={`flex ${direction} h-screen ${lengthLimit ? 'pt-[135px] sm:pt-[80px]' : 'pt-14'}`}
          direction={direction}
          sizes={sizes}
          gutterSize={gutterSize}
          onDragEnd={handleDragEnd}
        >
          <Code onChange={onChange} />
          <Console result={result} direction={direction} />
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
          <Code onChange={onChange} />
          <Console result={result} direction={direction} />
        </Split>
      )}
    </>
  )
}
