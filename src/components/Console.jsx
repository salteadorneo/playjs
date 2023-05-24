import Editor from '@monaco-editor/react'
import { useEffect, useRef } from 'react'
import { EDITOR_OPTIONS } from '../consts'

export default function Console ({ lines, result }) {
  const editorRef = useRef(null)

  useEffect(() => {
    if (!editorRef.current) return
    editorRef.current.setValue(result)
  }, [result])

  return (
    <>
      <Editor
        className='w-full h-full pt-6'
        language='javascript'
        theme='vs-dark'
        loading=''
        value={result}
        onMount={(editor) => {
          editorRef.current = editor
        }}
        options={{
          ...EDITOR_OPTIONS,
          readOnly: true,
          renderLineHighlight: 'none'
        }}
      />
    </>
  )
}
