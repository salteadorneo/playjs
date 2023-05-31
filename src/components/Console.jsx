import { useEffect, useRef } from 'react'

import Editor from '@monaco-editor/react'

import { useWindowSize } from '@/hooks/useWindowSize'

import { EDITOR_OPTIONS, WIDTH_MOBILE } from '../consts'

export default function Console ({ result }) {
  const size = useWindowSize()

  const isMobile = size.width < WIDTH_MOBILE

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
          lineNumbers: isMobile ? 'on' : 'off',
          readOnly: true,
          renderLineHighlight: 'none'
        }}
      />
    </>
  )
}
