import { useEffect, useRef } from 'react'
import Editor from '@monaco-editor/react'

import { EDITOR_OPTIONS, LanguageType, ThemeType } from '../consts'

let throttlePause: any = null
const throttle = (callback: any, time: number) => {
  if (throttlePause) return
  throttlePause = true
  setTimeout(() => {
    callback()
    throttlePause = false
  }, time)
}

export default function Code(
  { code, language, theme, onChange }: {
    code: string,
    language: LanguageType,
    theme: ThemeType,
    onChange: (args: { code: string, language: string }) => void
  }) {
  const editorRef = useRef(null)

  useEffect(() => {
    if (code == null) return

    const editor = editorRef.current as any
    if (!editor) return
    if (code === editor.getValue()) return
    editor.setValue(code)
  }, [code])

  function handleChange() {
    if (!editorRef.current) return
    const editor = editorRef.current as any
    const code = editor.getValue()
    onChange({ code, language })
  }

  function onMount(editor: any) {
    editorRef.current = editor
    editor.focus()
    handleChange()
  }

  function handleEditorChange() {
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
