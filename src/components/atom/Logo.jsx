import { IS_IFRAME } from '../../consts'

export default function Logo ({ language }) {
  const Wrapper = ({ children }) =>
    IS_IFRAME
      ? <a href={window.location.href} target='_blank' className='flex items-center gap-3' rel='noreferrer'>{children}</a>
      : <div className='flex items-center gap-3'>{children}</div>

  return (
    <Wrapper>
      <div className={`w-6 h-6 flex items-center justify-center ${language === 'typescript' ? 'bg-typescript' : 'bg-secondary'}`} />
      <h1 className='text-white text-2xl font-extrabold'>
        PlayJS
      </h1>
    </Wrapper>
  )
}
