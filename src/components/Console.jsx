import { useEffect, useRef } from 'react'

import Editor from '@monaco-editor/react'

import { EDITOR_OPTIONS, language } from '../consts'

export default function Console ({ result, direction }) {
  const lineNumbers = direction === 'horizontal' ? 'off' : 'on'

  const editorRef = useRef(null)

  useEffect(() => {
    if (!editorRef.current) return
    editorRef.current.setValue(result)
  }, [result])

  return (
    <>
      <Editor
        className='pt-4'
        language={language}
        theme='vs-dark'
        loading=''
        value={result}
        onMount={(editor) => {
          editorRef.current = editor
        }}
        options={{
          ...EDITOR_OPTIONS,
          lineNumbers,
          readOnly: true,
          renderLineHighlight: 'none'
        }}
      />
    </>
  )
}
