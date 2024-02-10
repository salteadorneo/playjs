import { useTranslation } from 'react-i18next'
import { version } from '../../package.json'

export default function Landing () {
  const { t } = useTranslation()

  return (
    <>
      <section className='font-sans'>
        <div
          className='mx-auto max-w-screen-xl px-4 py-20 lg:flex lg:items-center'
        >
          <div className='mx-auto text-center'>
            <h1
              className='relative z-10 text-white text-3xl font-medium sm:text-8xl'
            >
              {t('title.part1')}{' '}
              <span className='block leading-tight'>{t('title.part2')}</span>
            </h1>

            <p className='relative z-10 mx-auto text-white mt-8 text-2xl'>
              {t('slogan')}
            </p>

            <section className='relative my-12'>
              <iframe
                src='/Ly8gQmllbnZlbmlkbyBhIFBsYXlKUwoKY29uc3QgaG9sYU11bmRvID0gKCkgPT4gJ/CfkYvwn4yOJwoKaG9sYU11bmRvKCkK'
                width='100%'
                height='400'
                allow='clipboard-read;clipboard-write'
                className='relative z-10 max-w-7xl mx-auto shadow-[0_5px_20px_2px_#0000004d]'
              />
              <div className='absolute inset-0 bg-[radial-gradient(circle_at_100%,var(--secondary)_0%,var(--secondary)_100%)] blur-[75px]' />
            </section>

            <a
              href='/Ly8gQmllbnZlbmlkbyBhIFBsYXlKUwoKY29uc3QgaG9sYU11bmRvID0gKCkgPT4gJ/CfkYvwn4yOJwoKaG9sYU11bmRvKCkK'
              className='relative z-10 rounded bg-white text-black hover:bg-secondary transition-all px-12 py-3 font-bold'
            >
              {t('try_it_now')}
            </a>

            <section>
              <a
                href='https://github.com/salteadorneo/playjs'
                target='_blank' rel='noreferrer'
                className='relative z-10 inline-flex items-center gap-2 bg-white text-gray-800 font-semibold rounded-full px-4 py-1.5 mt-10 hover:scale-95 transition-all'
              >
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 256 256'
                  fill='currentColor'
                  xmlns='http://www.w3.org/2000/svg'
                  preserveAspectRatio='xMidYMid'
                >
                  <path d='M128.001 0C57.317 0 0 57.307 0 128.001c0 56.554 36.676 104.535 87.535 121.46 6.397 1.185 8.746-2.777 8.746-6.158 0-3.052-.12-13.135-.174-23.83-35.61 7.742-43.124-15.103-43.124-15.103-5.823-14.795-14.213-18.73-14.213-18.73-11.613-7.944.876-7.78.876-7.78 12.853.902 19.621 13.19 19.621 13.19 11.417 19.568 29.945 13.911 37.249 10.64 1.149-8.272 4.466-13.92 8.127-17.116-28.431-3.236-58.318-14.212-58.318-63.258 0-13.975 5-25.394 13.188-34.358-1.329-3.224-5.71-16.242 1.24-33.874 0 0 10.749-3.44 35.21 13.121 10.21-2.836 21.16-4.258 32.038-4.307 10.878.049 21.837 1.47 32.066 4.307 24.431-16.56 35.165-13.12 35.165-13.12 6.967 17.63 2.584 30.65 1.255 33.873 8.207 8.964 13.173 20.383 13.173 34.358 0 49.163-29.944 59.988-58.447 63.157 4.591 3.972 8.682 11.762 8.682 23.704 0 17.126-.148 30.91-.148 35.126 0 3.407 2.304 7.398 8.792 6.14C219.37 232.5 256 184.537 256 128.002 256 57.307 198.691 0 128.001 0Zm-80.06 182.34c-.282.636-1.283.827-2.194.39-.929-.417-1.45-1.284-1.15-1.922.276-.655 1.279-.838 2.205-.399.93.418 1.46 1.293 1.139 1.931Zm6.296 5.618c-.61.566-1.804.303-2.614-.591-.837-.892-.994-2.086-.375-2.66.63-.566 1.787-.301 2.626.591.838.903 1 2.088.363 2.66Zm4.32 7.188c-.785.545-2.067.034-2.86-1.104-.784-1.138-.784-2.503.017-3.05.795-.547 2.058-.055 2.861 1.075.782 1.157.782 2.522-.019 3.08Zm7.304 8.325c-.701.774-2.196.566-3.29-.49-1.119-1.032-1.43-2.496-.726-3.27.71-.776 2.213-.558 3.315.49 1.11 1.03 1.45 2.505.701 3.27Zm9.442 2.81c-.31 1.003-1.75 1.459-3.199 1.033-1.448-.439-2.395-1.613-2.103-2.626.301-1.01 1.747-1.484 3.207-1.028 1.446.436 2.396 1.602 2.095 2.622Zm10.744 1.193c.036 1.055-1.193 1.93-2.715 1.95-1.53.034-2.769-.82-2.786-1.86 0-1.065 1.202-1.932 2.733-1.958 1.522-.03 2.768.818 2.768 1.868Zm10.555-.405c.182 1.03-.875 2.088-2.387 2.37-1.485.271-2.861-.365-3.05-1.386-.184-1.056.893-2.114 2.376-2.387 1.514-.263 2.868.356 3.061 1.403Z' fill='currentColor' />
                </svg>
                {t('star_github')}
              </a>
            </section>
          </div>
        </div>
      </section>

      <section className='font-sans text-white'>
        <div
          className='mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8'
        >
          <h2 className='text-3xl font-bold sm:text-4xl text-center'>
            {t('features')}
          </h2>

          <div className='mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
            <Item
              title={t('feature1.title')}
              description={t('feature1.description')}
              image={
                <img src='/features/typescript.png' alt='' />
              }
            />
            <Item
              title={t('feature2.title')}
              description={t('feature2.description')}
              image={
                <img src='/features/autocompletion.png' alt='' />
              }
            />
            <Item
              title={t('feature3.title')}
              description={t('feature3.description')}
              image={
                <img src='/features/npm.png' alt='' />
              }
            />
            <Item
              title={t('feature4.title')}
              description={t('feature4.description')}
              image={
                <img src='/features/async.png' alt='' />
              }
            />
            <Item
              title={t('feature5.title')}
              description={t('feature5.description')}
              image={
                <img src='/features/download.png' alt='' />
              }
            />
            <Item
              title={t('feature6.title')}
              description={t('feature6.description')}
              image={
                <img src='/features/share.png' alt='' />
              }
            />
          </div>
        </div>
      </section>

      <section className='font-sans bg-secondary p-8 my-6 text-center'>
        <form action={`https://magic.beehiiv.com/v1/b85e29c4-ff81-4f2a-a246-adc349927c0a?utm_source=landing&redirect_to=${encodeURIComponent('https://playjs.dev')}`}>
          <h2 className='text-4xl font-bold mb-3'>
            {t('subscribe_title')}
          </h2>
          <p>
            {t('subscribe_description')}
          </p>
          <div className='flex flex-wrap items-center justify-center gap-4 py-8'>
            <input
              type='email'
              name='email'
              placeholder={t('subscribe_placeholder')}
              required
              className='bg-background text-white px-4 py-3 rounded'
            />
            <button
              type='submit'
              className='bg-background text-white hover:text-secondary px-12 py-3 font-bold rounded'
            >
              {t('subscribe_button')}
            </button>
          </div>
        </form>
      </section>

      <footer>
        <div className='flex items-center justify-center gap-4 py-8'>
          <a
            href='https://github.com/salteadorneo/playjs'
            target='_blank'
            rel='noreferrer'
            className='text-[#858585] hover:text-[#999]'
          >
            <svg
              width='20'
              height='20'
              viewBox='0 0 256 256'
              fill='currentColor'
              xmlns='http://www.w3.org/2000/svg'
              preserveAspectRatio='xMidYMid'
            >
              <path d='M128.001 0C57.317 0 0 57.307 0 128.001c0 56.554 36.676 104.535 87.535 121.46 6.397 1.185 8.746-2.777 8.746-6.158 0-3.052-.12-13.135-.174-23.83-35.61 7.742-43.124-15.103-43.124-15.103-5.823-14.795-14.213-18.73-14.213-18.73-11.613-7.944.876-7.78.876-7.78 12.853.902 19.621 13.19 19.621 13.19 11.417 19.568 29.945 13.911 37.249 10.64 1.149-8.272 4.466-13.92 8.127-17.116-28.431-3.236-58.318-14.212-58.318-63.258 0-13.975 5-25.394 13.188-34.358-1.329-3.224-5.71-16.242 1.24-33.874 0 0 10.749-3.44 35.21 13.121 10.21-2.836 21.16-4.258 32.038-4.307 10.878.049 21.837 1.47 32.066 4.307 24.431-16.56 35.165-13.12 35.165-13.12 6.967 17.63 2.584 30.65 1.255 33.873 8.207 8.964 13.173 20.383 13.173 34.358 0 49.163-29.944 59.988-58.447 63.157 4.591 3.972 8.682 11.762 8.682 23.704 0 17.126-.148 30.91-.148 35.126 0 3.407 2.304 7.398 8.792 6.14C219.37 232.5 256 184.537 256 128.002 256 57.307 198.691 0 128.001 0Zm-80.06 182.34c-.282.636-1.283.827-2.194.39-.929-.417-1.45-1.284-1.15-1.922.276-.655 1.279-.838 2.205-.399.93.418 1.46 1.293 1.139 1.931Zm6.296 5.618c-.61.566-1.804.303-2.614-.591-.837-.892-.994-2.086-.375-2.66.63-.566 1.787-.301 2.626.591.838.903 1 2.088.363 2.66Zm4.32 7.188c-.785.545-2.067.034-2.86-1.104-.784-1.138-.784-2.503.017-3.05.795-.547 2.058-.055 2.861 1.075.782 1.157.782 2.522-.019 3.08Zm7.304 8.325c-.701.774-2.196.566-3.29-.49-1.119-1.032-1.43-2.496-.726-3.27.71-.776 2.213-.558 3.315.49 1.11 1.03 1.45 2.505.701 3.27Zm9.442 2.81c-.31 1.003-1.75 1.459-3.199 1.033-1.448-.439-2.395-1.613-2.103-2.626.301-1.01 1.747-1.484 3.207-1.028 1.446.436 2.396 1.602 2.095 2.622Zm10.744 1.193c.036 1.055-1.193 1.93-2.715 1.95-1.53.034-2.769-.82-2.786-1.86 0-1.065 1.202-1.932 2.733-1.958 1.522-.03 2.768.818 2.768 1.868Zm10.555-.405c.182 1.03-.875 2.088-2.387 2.37-1.485.271-2.861-.365-3.05-1.386-.184-1.056.893-2.114 2.376-2.387 1.514-.263 2.868.356 3.061 1.403Z' fill='currentColor' />
            </svg>
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
