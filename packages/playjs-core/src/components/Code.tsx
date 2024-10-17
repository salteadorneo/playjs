import { useEffect, useRef, useState } from 'react'
import Editor from '@monaco-editor/react'
import { registerCompletion, type Monaco, type StandaloneCodeEditor } from 'monacopilot';

import { EDITOR_OPTIONS, LanguageType, ThemeType } from '../consts'

let throttlePause: any = null
const debounce = (callback: any, time: number) => {
  if (throttlePause) return
  throttlePause = true
  setTimeout(() => {
    callback()
    throttlePause = false
  }, time)
}

type Props = {
  code: string,
  language: LanguageType,
  theme: ThemeType,
  onChange: (args: { code: string, language: string }) => void
  ia?: boolean
}

export default function Code({ code, language, theme, onChange, ia = false }: Props) {
  const editorRef = useRef(null)
  const [editor, setEditor] = useState<StandaloneCodeEditor | null>(null);
  const [monaco, setMonaco] = useState<Monaco | null>(null);

  useEffect(() => {
    if (!monaco || !editor || !ia) return;

    const completion = registerCompletion(monaco, editor, {
      endpoint: 'https://good-spider-26.deno.dev/complete',
      language,
      maxContextLines: 60,
    });

    return () => {
      completion.deregister();
    };
  }, [monaco, editor, language]);

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

  function onMount(editor: any, monaco: any) {
    editorRef.current = editor
    editor.focus()
    handleChange()

    setEditor(editor)
    setMonaco(monaco)
  }

  function handleEditorChange() {
    debounce(handleChange, 800)
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
