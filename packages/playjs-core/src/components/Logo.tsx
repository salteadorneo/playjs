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
        gap: '0.3rem',
        textDecoration: 'none'
      }}
      rel='noreferrer'
    >
      {children}
    </a>
  )

  return (
    <Wrapper>
      <div style={{
        width: '1rem',
        height: '1rem',
        backgroundColor: language === LANGUAGE.TYPESCRIPT ? '#007acc' : '#f0db4f'
      }}
      />
      <h1
        style={{
          color: theme === THEME.DARK ? 'white' : 'black',
          fontSize: '1rem',
          lineHeight: '1rem',
          fontWeight: 100,
          letterSpacing: '-.05rem',
        }}
      >
        PlayJS
      </h1>
    </Wrapper>
  )
}
