import { version } from '../../package.json'
import { IS_IFRAME, language } from '../consts'

export default function Logo () {
  const Wrapper = ({ children }) =>
    IS_IFRAME
      ? <a href={window.location.href} target='_blank' className='flex items-center gap-3' rel='noreferrer'>{children}</a>
      : children

  return (
    <div className='fixed top-0 z-10 w-full flex items-center gap-3 p-3 shadow-sm bg-[#1a1a1a]'>
      <Wrapper>
        <div className={`w-6 h-6 flex items-center justify-center ${language === 'typescript' ? 'bg-typescript' : 'bg-secondary'}`} />
        <h1 className='text-white text-2xl font-extrabold'>
          PlayJS
        </h1>
      </Wrapper>
      <span className='text-[#707070] text-sm space-x-2'>
        <span>v.{version}</span>
        <span className='text-[#1a1a1a] font-bold bg-[#3f3f3f] rounded py-[1px] px-2'>BETA</span>
      </span>
    </div>
  )
}
