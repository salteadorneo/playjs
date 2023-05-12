import Editor from '@monaco-editor/react'
import { decode } from 'js-base64'

import { IconDownload, IconFormat } from '../Icons'
import { DEFAULT_VALUE, EDITOR_OPTIONS } from '../consts'

import Button from './Button'
import Report from './Report'
import { useRef } from 'react'

let throttlePause
const throttle = (callback, time) => {
  if (throttlePause) return
  throttlePause = true
  setTimeout(() => {
    callback()
    throttlePause = false
  }, time)
}

export default function Code ({ onChange }) {
  const editorRef = useRef(null)

  function handleChange () {
    const editor = editorRef.current
    const code = editor.getValue()
    onChange({ code })
  }

  function onMount (editor, monaco) {
    editorRef.current = editor

    editor.focus()

    handleChange()
  }

  function handleEditorChange () {
    throttle(handleChange, 800)
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

  return (
    <div>
      <Editor
        className='w-full h-full pt-6 pb-12'
        language='javascript'
        theme='vs-dark'
        defaultValue={getCodeFromURL() || DEFAULT_VALUE}
        onMount={onMount}
        onChange={handleEditorChange}
        loading=''
        options={EDITOR_OPTIONS}
      />
      <div className='fixed bottom-0 left-0 z-10 p-3 flex gap-4'>
        <Button
          onClick={formatDocument}
          title='Format code'
        >
          <IconFormat />
          <span className='hidden sm:block'>Format</span>
        </Button>
        <Button
          onClick={downloadCode}
          title='Download code as file'
        >
          <IconDownload />
          <span className='hidden sm:block'>Download</span>
        </Button>
        <Report />
      </div>
    </div>
  )
}
