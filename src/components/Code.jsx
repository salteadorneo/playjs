import { useEffect, useRef } from 'react'
import Editor from '@monaco-editor/react'

import { EDITOR_OPTIONS, language } from '../consts'
import { decodeCode, getCodeFromURL } from '../core/encode'
import { loadCode } from '../core/storage'

let throttlePause
const throttle = (callback, time) => {
  if (throttlePause) return
  throttlePause = true
  setTimeout(() => {
    callback()
    throttlePause = false
  }, time)
}

export default function Code ({ code, theme, onChange }) {
  const editorRef = useRef(null)

  const localCode = loadCode()

  const defaultValue = getCodeFromURL() || decodeCode(localCode)

  useEffect(() => {
    if (!code) return
    const editor = editorRef.current
    if (!editor) return
    editor.setValue(code)
  }, [code])

  function handleChange () {
    if (!editorRef.current) return
    const editor = editorRef.current
    const code = editor.getValue()
    onChange({ code, language })
  }

  function onMount (editor) {
    editorRef.current = editor

    editor.focus()

    handleChange()
  }

  function handleEditorChange () {
    throttle(handleChange, 800)
  }

  return (
    <div>
      <Editor
        language={language}
        theme={theme}
        defaultValue={defaultValue}
        onMount={onMount}
        onChange={handleEditorChange}
        loading=''
        options={{
          ...EDITOR_OPTIONS,
          lineNumbers: 'on'
        }}
      />
    </div>
  )
}
