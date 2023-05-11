import { useRef, useState } from 'react'
import Split from 'react-split'
import Editor from '@monaco-editor/react'
import { encode, decode } from 'js-base64'

import { useWindowSize } from '@/hooks/useWindowSize'

import { Toaster } from 'sonner'

import { DEFAULT_VALUE, WIDTH_MOBILE, EDITOR_OPTIONS } from './consts'
import { IconDownload, IconFormat } from './Icons'

import Logo from './components/Logo'
import Button from './components/Button'
import Share from './components/Share'
import Footer from './components/Footer'
import Console from './components/Console'
import Embed from './components/Embed'

function updateURL (code) {
  const hashedCode = `${encode(code)}`
  window.history.replaceState(null, null, `/${hashedCode}`)
}

function getCodeFromURL () {
  try {
    const { pathname } = window.location
    const hashCode = pathname.slice(1)
    return hashCode ? decode(hashCode) : null
  } catch {
    return null
  }
}

let throttlePause
const throttle = (callback, time) => {
  if (throttlePause) return
  throttlePause = true
  setTimeout(() => {
    callback()
    throttlePause = false
  }, time)
}

export default function App () {
  const editorRef = useRef(null)
  const size = useWindowSize()
  const isMobile = size.width < WIDTH_MOBILE

  const isMainDomain = window.location.hostname === 'playjs.dev'

  const direction = isMobile ? 'vertical' : 'horizontal'

  const [lines, setLines] = useState(0)
  const [result, setResult] = useState('')

  window.console.log = function (...data) {
    return parseResultHTML(...data)
  }

  function handleInit (editor, monaco) {
    editorRef.current = editor

    editor.focus()

    if (editor.getValue()) {
      showResult()
    }
  }

  function formatDocument () {
    const editor = editorRef.current
    editor.getAction('editor.action.formatDocument').run()
  }

  function downloadCode () {
    const editor = editorRef.current
    const code = editor.getValue()
    const blob = new window.Blob([code], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.download = 'playjs.js'
    link.href = url
    link.click()
  }

  const showResult = () => {
    const editor = editorRef.current

    const code = editor.getValue()

    updateURL(code)

    if (!code) {
      setResult('')
      return
    }

    setLines(code.split(/\r?\n|\r|\n/g).length)

    let result = ''
    let prevLine = ''
    let prevResult = ''

    code
      .trimEnd()
      .split(/\r?\n|\r|\n/g)
      .reduce((acc, line) => {
        if (line.trim() === '') {
          result += '\n'
          return acc + '\n'
        }

        const lineCode = acc + line

        if (line || !line.startsWith(/\/\//) || !line.startsWith(/\/*/)) {
          try {
            // eslint-disable-next-line no-eval
            const html = eval(lineCode)
            if (
              prevLine !== '' &&
              line !== '' &&
              prevLine !== line &&
              prevResult === html
            ) {
              result += '\n'
            } else {
              result += parseResultHTML(html) + '\n'
            }
            prevResult = html
          } catch (err) {
            if (err.toString().match(/ReferenceError/gi)) {
              result += err
            }
            result += '\n'
          }
        }

        prevLine = line

        return lineCode + '\n'
      }, '')

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

  function handleEditorChange (value, event) {
    throttle(showResult, 800)
  }

  return (
    <>
      <Toaster position='top-center' />

      <Logo />

      <div className='toolbar'>
        <Share />
        {isMainDomain && (
          <Embed />
        )}
      </div>

      <Split
        className='split'
        direction={direction}
        gutterSize={isMobile ? 6 : 3}
      >
        <div>
          <Editor
            className='editor'
            language='javascript'
            theme='vs-dark'
            defaultValue={getCodeFromURL() || DEFAULT_VALUE}
            onMount={handleInit}
            onChange={handleEditorChange}
            loading=''
            options={EDITOR_OPTIONS}
          />
          <div className='editor-toolbar'>
            <Button
              onClick={formatDocument}
              title='Format code'
            >
              <IconFormat /> Format
            </Button>
            <Button
              onClick={downloadCode}
              title='Download code as file'
            >
              <IconDownload /> Download
            </Button>
          </div>
        </div>

        <Console lines={lines} result={result} />
      </Split>

      <Footer />
    </>
  )
}
