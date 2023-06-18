import { useState } from 'react'
import Split from 'react-split'

import { useWindowSize } from '@/hooks/useWindowSize'

import { Toaster } from 'sonner'

import { getResult } from './core'
import { setCodeToURL } from './core/encode'
import { WIDTH_MOBILE } from './consts'

import Logo from './components/Logo'
import Share from './components/Share'
import Footer from './components/Footer'
import Console from './components/Console'
import Embed from './components/Embed'
import Code from './components/Code'
import UrlLengthError from './components/UrlLengthError'
import DisplayOptions from './components/DisplayOptions'

export default function App () {
  const size = useWindowSize()

  const isMobile = size.width < WIDTH_MOBILE

  const [direction, setDirection] = useState(isMobile ? 'vertical' : 'horizontal')

  function changeDirection () {
    setDirection(direction === 'horizontal' ? 'vertical' : 'horizontal')
  }

  const gutterSize = isMobile ? 6 : 3

  const [lengthLimit, setLengthLimit] = useState(false)
  const [result, setResult] = useState('')

  const onChange = async ({ code = '', language = 'javascript' }) => {
    const setCodeToURLresult = setCodeToURL(code)
    setLengthLimit(!setCodeToURLresult)

    const result = await getResult({ code, language })

    setResult(result)
  }

  return (
    <>
      <Toaster position='top-center' />

      <div className='fixed top-0 z-10 w-full flex flex-wrap items-center gap-3 p-3 shadow-sm bg-[#1a1a1a]'>
        <Logo />
        {lengthLimit && <UrlLengthError />}
      </div>

      <div className='fixed top-3 right-4 z-10 flex items-center gap-4'>
        <DisplayOptions direction={direction} changeDirection={changeDirection} />
        <Share />
        <Embed />
      </div>

      {direction === 'horizontal' && (
        <Split
          className={`flex horizontal h-screen ${lengthLimit ? 'pt-[135px] sm:pt-[80px]' : 'pt-14'}`}
          direction='horizontal'
          gutterSize={gutterSize}
        >
          <Code onChange={onChange} />
          <Console result={result} direction={direction} />
        </Split>
      )}
      {direction === 'vertical' && (
        <Split
          className={`vertical h-screen ${lengthLimit ? 'pt-[135px] sm:pt-[80px]' : 'pt-14'}`}
          direction='vertical'
          gutterSize={gutterSize}
        >
          <Code onChange={onChange} />
          <Console result={result} direction={direction} />
        </Split>
      )}

      <Footer />
    </>
  )
}
