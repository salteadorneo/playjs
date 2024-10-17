import { THEME } from '../../consts'

export default function Theme ({ theme, setTheme }) {
  return (
    <section
      className='flex items-center justify-between gap-2 bg-none border-none text-[#858585] p-1 cursor-default'
    >
      <span>Tema</span>
      <div className='flex gap-1'>
        <button
          onClick={() => setTheme(THEME.LIGHT)}
          className={`text-[#858585] hover:text-[#999] hover:bg-[#252525] cursor-default p-1 rounded-md ${theme === THEME.LIGHT && 'bg-[#252525] rounded-md'}`}
        >
          <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><circle cx='12' cy='12' r='4' /><path d='M12 2v2' /><path d='M12 20v2' /><path d='m4.93 4.93 1.41 1.41' /><path d='m17.66 17.66 1.41 1.41' /><path d='M2 12h2' /><path d='M20 12h2' /><path d='m6.34 17.66-1.41 1.41' /><path d='m19.07 4.93-1.41 1.41' /></svg>
        </button>
        <button
          onClick={() => setTheme(THEME.DARK)}
          className={`text-[#858585] hover:text-[#999] hover:bg-[#252525] cursor-default p-1 rounded-md ${theme === THEME.DARK && 'bg-[#252525] rounded-md'}`}
        >
          <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z' /></svg>
        </button>
      </div>
    </section>
  )
}
