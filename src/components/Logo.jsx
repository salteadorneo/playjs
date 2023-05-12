import { version } from '../../package.json'

export default function Logo () {
  return (
    <div className='flex items-center gap-3 p-3 shadow-sm bg-[#1a1a1a]'>
      <div
        className='w-7 h-7 bg-secondary flex items-center justify-center'
      />
      <h1 className='text-white text-2xl font-extrabold'>
        PlayJS
      </h1>
      <span className='text-[#707070] text-sm space-x-2'>
        <span>v.{version}</span>
        <span className='text-[#1a1a1a] font-bold bg-[#3f3f3f] rounded py-[1px] px-2'>BETA</span>
      </span>
    </div>
  )
}
