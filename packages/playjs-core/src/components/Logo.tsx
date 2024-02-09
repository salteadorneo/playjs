import { LANGUAGE, THEME } from '../consts'

export function Logo({
  theme = THEME.DARK,
  language = LANGUAGE.JAVASCRIPT
}) {
  const Wrapper = ({ children }: {
    children: React.ReactNode
  }) => (
    <a
      href='https://playjs.dev'
      target='_blank'
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.3rem'
      }}
      rel='noreferrer'
    >
      {children}
    </a>
  )

  return (
    <Wrapper>
      <div style={{
        width: '.8rem',
        height: '.8rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: language === LANGUAGE.TYPESCRIPT ? '#007acc' : '#f0db4f'
      }}
      />
      <h1
        style={{
          color: theme === THEME.DARK ? '#fff' : '#000',
          fontSize: '1rem',
          fontWeight: 100
        }}
      >
        PlayJS
      </h1>
    </Wrapper>
  )
}
