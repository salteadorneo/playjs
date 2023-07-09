import { useState } from 'react'

import Language from './menu/Language'
import Report from './menu/Report'
import GitHub from './menu/GitHub'
import Theme from './menu/Theme'
import Upload from './menu/Upload'

export default function Menu ({ theme, changeTheme, setCode }) {
  const [open, setOpen] = useState(false)

  function handleMenu () {
    setOpen(!open)
  }

  function handleUpload (code) {
    setCode(code)
    setOpen(false)
  }

  return (
    <section>
      <button
        onClick={handleMenu}
        className={`flex items-center border-none text-[#616161] hover:text-[#999] p-0.5 ${open ? 'bg-[#1a1a1a]' : ''}`}
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
          className='absolute top-14 left-0 flex flex-col gap-3 w-72 bg-[#1a1a1a] p-2'
        >
          <Upload setCode={handleUpload} />
          <Report />
          <Language />
          <Theme theme={theme} changeTheme={changeTheme} />
          <GitHub />
        </section>
      )}
    </section>
  )
}
