import { useEffect, useRef, useState } from 'react'

import Editor from '@monaco-editor/react'

import { DIRECTION, EDITOR_OPTIONS } from '../consts'
import { getResult } from '../core'

export default function Console ({ code, language, theme, direction }) {
  const lineNumbers = direction === DIRECTION.HORIZONTAL ? 'off' : 'on'

  const editorRef = useRef(null)

  const [result, setResult] = useState('')

  useEffect(() => {
    getResult({ code, language }).then(result => {
      setResult(result)
    })
  }, [code, language])

  return (
    <>
      <Editor
        language={language}
        theme={theme}
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
