import { useEffect, useState } from 'react'

import Language from './menu/Language'
import Report from './menu/Report'
import GitHub from './menu/GitHub'
import Theme from './menu/Theme'
import Upload from './menu/Upload'
import Download from './menu/Download'
import Languages from './menu/Languages'
import { LANGUAGE } from '../consts'
import { useCodeStore } from '../hooks/useCodeStore'

export default function Menu ({ theme, changeTheme }) {
  const { current, upsertCode, upsertCodeAndSelect } = useCodeStore()

  const [open, setOpen] = useState(false)

  useEffect(() => {
    const keyDown = (event) => {
      if (event.key === 's' && event.ctrlKey) {
        event.preventDefault()
        downloadCode()
      }
    }
    document.addEventListener('keydown', keyDown)

    return () => {
      document.removeEventListener('keydown', keyDown)
    }
  }, [])

  function downloadCode () {
    if (!current?.code) return

    const blob = new window.Blob([current?.code], {
      type: 'text/plain'
    })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.download = 'playjs.' + (current?.language === LANGUAGE.JAVASCRIPT ? 'js' : 'ts')
    link.href = url
    link.click()
  }

  function handleMenu () {
    setOpen(!open)
  }

  function handleDownload () {
    downloadCode()
    setOpen(false)
  }

  function handleUpload (code) {
    upsertCodeAndSelect({ code })
    setOpen(false)
  }

  function handleChangeLanguage (language) {
    upsertCode({
      ...current,
      language
    })
  }

  return (
    <section>
      <button
        onClick={handleMenu}
        className={`flex items-center border-none text-[#858585] hover:text-[#999] p-0.5 ${open ? 'bg-[#1a1a1a]' : ''}`}
      >
        <svg
          width={24}
          height={24}
          viewBox='0 0 512 512'
          xmlns='http://www.w3.org/2000/svg'
          fill='currentColor'
        >
          <path d='M64 96h384v48H64V96Zm0 136h384v48H64v-48Zm0 136h384v48H64v-48Z' />
        </svg>
      </button>
      {open && (
        <section
          className='absolute top-0 left-14 pt-4 pl-4 flex flex-col gap-3 w-72 bg-[#1a1a1a] p-2'
        >
          <Upload
            setCode={handleUpload}
          />
          <Download
            handleDownload={handleDownload}
          />
          <Languages
            language={current?.language}
            setLanguage={handleChangeLanguage}
          />
          <Theme
            theme={theme}
            changeTheme={changeTheme}
          />
          <Report />
          <GitHub />
          <Language />
        </section>
      )}
    </section>
  )
}
