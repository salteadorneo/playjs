import { version } from '../../package.json'

export default function Logo () {
  return (
    <div className='logo'>
      <div className='square' />
      <h1 className='title'>PlayJS</h1>
      <span className='version'>v.{version} <span className='badge'>BETA</span></span>
    </div>
  )
}
