import { useState } from 'react'
import Split from 'react-split'
import { encode } from 'js-base64'

import { useWindowSize } from '@/hooks/useWindowSize'

import { Toaster } from 'sonner'

import { WIDTH_MOBILE } from './consts'

import Logo from './components/Logo'
import Share from './components/Share'
import Footer from './components/Footer'
import Console from './components/Console'
import Embed from './components/Embed'
import Code from './components/Code'

function updateURL (code) {
  const hashedCode = `${encode(code)}`
  window.history.replaceState(null, null, `/${hashedCode}`)
}

export default function App () {
  const size = useWindowSize()
  const isMobile = size.width < WIDTH_MOBILE

  const direction = isMobile ? 'vertical' : 'horizontal'
  const gutterSize = isMobile ? 6 : 3

  const [lines, setLines] = useState(0)
  const [result, setResult] = useState('')

  window.console.log = function (...data) {
    return parseResultHTML(...data)
  }

  const onChange = ({ code }) => {
    updateURL(code)

    if (!code) {
      setResult('')
      return
    }

    setLines(code.split(/\r?\n|\r|\n/g).length)

    let result = ''
    let prevResult = ''
    const codeLines = code.trimEnd().split(/\r?\n|\r|\n/g)

    for (let i = 0; i < codeLines.length; i++) {
      const line = codeLines[i].trim()
      if (line === '') {
        result += '\n'
        continue
      }

      const lineCode = codeLines.slice(0, i + 1).join('\n')
      if (line.startsWith('//') || line.startsWith('/*')) {
        result += '\n'
        continue
      }

      try {
        // eslint-disable-next-line no-eval
        const html = eval(lineCode)
        if (i > 0 && line !== codeLines[i - 1].trim() && prevResult === html) {
          result += '\n'
        } else {
          result += parseResultHTML(html) + '\n'
        }
        prevResult = html
      } catch (err) {
        if (err instanceof ReferenceError) {
          result += err
        }
        result += '\n'
      }
    }

    setResult(result)
  }

  function parseResultHTML (html) {
    if (typeof html === 'object') {
      return JSON.stringify(html)
    }
    if (typeof html === 'string') {
      // start o end with ' or "
      if (html.match(/^['"].*['"]$/)) return html
      return `'${html}'`
    }
    if (typeof html === 'function') {
      return html()
    }
    if (typeof html === 'symbol') {
      return html.toString()
    }
    if (typeof html === 'undefined') {
      return ''
    }
    return html
  }

  return (
    <>
      <Toaster position='top-center' />

      <Logo />

      <div className='toolbar'>
        <Share />
        <Embed />
      </div>

      <Split
        className='split'
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
