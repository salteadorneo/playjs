import { useRef } from 'react'
import Editor from '@monaco-editor/react'
import { useTranslation } from 'react-i18next'

import { DEFAULT_CODE, EDITOR_OPTIONS, IS_IFRAME, language } from '../consts'
import { getCodeFromURL } from '../core/encode'

import Button from './atom/Button'
import Report from './Report'

import Upload from './Upload'

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
  const { t } = useTranslation()

  const defaultValue = getCodeFromURL() ?? DEFAULT_CODE

  function handleChange () {
    if (!editorRef.current) return
    const editor = editorRef.current
    const code = editor.getValue()
    onChange({ code, language })
  }

  function onMount (editor, monaco) {
    editorRef.current = editor

    editor.focus()

    handleChange()
  }

  function handleEditorChange () {
    throttle(handleChange, 800)
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
    link.download = 'playjs.' + (language === 'javascript' ? 'js' : 'ts')
    link.href = url
    link.click()
  }

  return (
    <div>
      <Editor
        className='pt-4'
        language={language}
        theme='vs-dark'
        defaultValue={defaultValue}
        onMount={onMount}
        onChange={handleEditorChange}
        loading=''
        options={{
          ...EDITOR_OPTIONS,
          lineNumbers: 'on'
        }}
      />
      <div className='fixed bottom-0 left-2 z-10 p-3 flex gap-4'>
        {!IS_IFRAME && (
          <Button
            onClick={formatDocument}
            title={t('code.formatTitle')}
          >
            <svg
              width='24'
              height='24'
              viewBox='0 0 32 32'
              xmlns='http://www.w3.org/2000/svg'
              fill='currentColor'
            >
              <path d='M14 6h14v2H14zm0 6h14v2H14zm-7 6h21v2H7zm0 6h21v2H7zM4 13.59 7.29 10 4 6.41 5.42 5l4.62 5-4.62 5L4 13.59z' />
              <path
                d='M0 0h32v32H0z'
                fill='none'
              />
            </svg>
            <span className='hidden sm:block'>{t('code.format')}</span>
          </Button>
        )}
        <Button
          onClick={downloadCode}
          title={t('code.downloadTitle')}
        >
          <svg
            width='24px'
            height='24px'
            viewBox='0 0 0.72 0.72'
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M0.63 0.48a0.03 0.03 0 0 1 0.03 0.026L0.66 0.51v0.06a0.09 0.09 0 0 1 -0.085 0.09L0.57 0.66H0.15a0.09 0.09 0 0 1 -0.09 -0.085L0.06 0.57v-0.06a0.03 0.03 0 0 1 0.06 -0.004L0.12 0.51v0.06a0.03 0.03 0 0 0 0.026 0.03L0.15 0.6h0.42a0.03 0.03 0 0 0 0.03 -0.026L0.6 0.57v-0.06a0.03 0.03 0 0 1 0.03 -0.03ZM0.36 0.06a0.03 0.03 0 0 1 0.03 0.03v0.288l0.039 -0.039a0.03 0.03 0 0 1 0.04 -0.002l0.003 0.002a0.03 0.03 0 0 1 0.002 0.04l-0.002 0.003 -0.09 0.09 -0.001 0.001 -0.002 0.002 -0.003 0.002 -0.003 0.002 -0.003 0.001 -0.004 0.001L0.36 0.48l-0.002 0 -0.004 -0.001 -0.003 -0.001 -0.003 -0.001 -0.003 -0.002 -0.003 -0.002a0.03 0.03 0 0 1 -0.003 -0.002l-0.09 -0.09a0.03 0.03 0 0 1 0.04 -0.045l0.003 0.002L0.33 0.378V0.09a0.03 0.03 0 0 1 0.03 -0.03Z'
            />
          </svg>
          {!IS_IFRAME && (
            <span className='hidden sm:block'>{t('code.download')}</span>
          )}
        </Button>
        <Upload editor={editorRef.current} />
        <Report />
      </div>
    </div>
  )
}
