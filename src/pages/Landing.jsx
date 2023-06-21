import { version } from '../../package.json'

import { IconGitHub } from '../components/Icons'

export default function Landing () {
  return (
    <>
      <section className='font-sans'>
        <div
          className='mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:items-center'
        >
          <div className='mx-auto text-center'>
            <h1
              className='relative z-10 text-white text-3xl font-medium sm:text-8xl'
            >
              The JavaScript playground{' '}
              <span className='block leading-tight'>on your browser</span>
            </h1>

            <p className='relative z-10 mx-auto text-white mt-8 text-2xl'>
              Test your code, view result, share it and embed it on your website.
            </p>

            <section className='relative my-12'>
              <iframe
                src='/Ly8gQmllbnZlbmlkbyBhIFBsYXlKUwoKY29uc3QgaG9sYU11bmRvID0gKCkgPT4gJ/CfkYvwn4yOJwoKaG9sYU11bmRvKCkK'
                width='100%'
                height='500'
                allow='clipboard-read;clipboard-write'
                className='relative z-10 max-w-6xl mx-auto shadow-[0_5px_20px_2px_#0000004d]'
              />
              <div className='absolute inset-0 bg-[radial-gradient(circle_at_100%,var(--secondary)_0%,var(--secondary)_100%)] blur-[75px]' />
            </section>

            <a
              href='/Ly8gQmllbnZlbmlkbyBhIFBsYXlKUwoKY29uc3QgaG9sYU11bmRvID0gKCkgPT4gJ/CfkYvwn4yOJwoKaG9sYU11bmRvKCkK'
              className='relative z-10 rounded bg-white/80 text-black hover:bg-secondary px-12 py-3 font-bold'
            >
              Open full screen
            </a>
          </div>
        </div>
      </section>
      <section className='font-sans text-white'>
        <div
          className='mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8'
        >
          <h2 className='text-3xl font-bold sm:text-4xl text-center'>Features</h2>

          <div className='mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
            <Item
              title='TypeScript support'
              description=''
              image={
                <img src='/features/typescript.png' alt='' />
              }
            />
            <Item
              title='Autocomplete'
              description='Code suggestions while you type'
              image={
                <img src='/features/autocompletion.png' alt='' />
              }
            />
            <Item
              title='NPM packages'
              description='Work with dependencies (Experimental)'
              image={
                <img src='/features/npm.png' alt='' />
              }
            />
            <Item
              title='Asychronous requests to APIs'
              description=''
              image={
                <img src='/features/async.png' alt='' />
              }
            />
            <Item
              title='Download / upload files'
              description=''
              image={
                <img src='/features/download.png' alt='' />
              }
            />
            <Item
              title='Share / embed your code'
              description=''
              image={
                <img src='/features/share.png' alt='' />
              }
            />
          </div>
        </div>
      </section>
      <footer>
        <div className='flex items-center justify-center gap-4 py-8'>
          <a
            href='https://github.com/salteadorneo/playjs'
            target='_blank'
            rel='noreferrer'
            className='text-[#616161] hover:text-[#999]'
          >
            <IconGitHub />
          </a>
          <span className='text-[#707070] text-sm space-x-2'>
            <span>v.{version}</span>
            <span className='text-[#1a1a1a] font-bold bg-[#3f3f3f] rounded py-[1px] px-2'>BETA</span>
          </span>
        </div>
      </footer>
    </>
  )
}

const Item = ({ title, description, image }) => (
  <div
    className='flex flex-col items-center rounded-xl border border-white/10 p-4 transition'
  >
    <h2 className='mt-4 text-3xl font-medium text-white'>
      {title}
    </h2>
    <p className='mt-1 mb-6 text-gray-300'>
      {description}
    </p>
    {image}
  </div>
)
