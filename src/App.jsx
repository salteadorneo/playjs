import { useState } from 'react'
import Split from 'react-split'

import { useWindowSize } from '@/hooks/useWindowSize'

import { Toaster } from 'sonner'

import { getResult } from './core'
import { updateURL } from './core/encode'
import { WIDTH_MOBILE } from './consts'

import Logo from './components/Logo'
import Share from './components/Share'
import Footer from './components/Footer'
import Console from './components/Console'
import Embed from './components/Embed'
import Code from './components/Code'

export default function App () {
  const size = useWindowSize()

  const isMobile = size.width < WIDTH_MOBILE

  const direction = isMobile ? 'vertical' : 'horizontal'
  const gutterSize = isMobile ? 6 : 3

  const [lines, setLines] = useState(0)
  const [result, setResult] = useState('')

  const onChange = async ({ code = '', language = 'javascript' }) => {
    updateURL(code)

    setLines(code?.split(/\r?\n|\r|\n/g).length)

    const result = await getResult({ code, language })

    setResult(result)
  }

  return (
    <>
      <Toaster position='top-center' />

      <Logo />

      <div className='fixed top-3 right-4 z-10 flex items-center gap-4'>
        <Share />
        <Embed />
      </div>

      <Split
        className='split pt-12 h-screen'
        direction={direction}
        gutterSize={gutterSize}
      >
        <Code onChange={onChange} />

        <Console lines={lines} result={result} />
      </Split>

      <Footer />
    </>
  )
}
