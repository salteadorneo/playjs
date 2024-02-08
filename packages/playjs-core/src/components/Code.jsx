import { useEffect, useRef } from 'react'
import Editor from '@monaco-editor/react'

import { EDITOR_OPTIONS } from '../consts'

let throttlePause
const throttle = (callback, time) => {
  if (throttlePause) return
  throttlePause = true
  setTimeout(() => {
    callback()
    throttlePause = false
  }, time)
}

export default function Code ({ code, language, theme, onChange }) {
  const editorRef = useRef(null)

  useEffect(() => {
    if (code == null) return

    const editor = editorRef.current
    if (!editor) return
    if (code === editor.getValue()) return
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
    <Editor
      language={language}
      theme={theme}
      defaultValue={code}
      onMount={onMount}
      onChange={handleEditorChange}
      loading=''
      options={{
        ...EDITOR_OPTIONS,
        lineNumbers: 'on'
      }}
    />
  )
}
