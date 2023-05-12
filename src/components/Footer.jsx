import { IconGitHub } from '../Icons'

export default function Footer () {
  return (
    <section className='fixed bottom-0 right-0 z-10 p-4'>
      <a
        href='https://github.com/salteadorneo/playjs'
        target='_blank'
        rel='noreferrer'
        className='text-[#616161] hover:text-[#999]'
      >
        <IconGitHub />
      </a>
    </section>
  )
}
