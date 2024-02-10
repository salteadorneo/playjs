import { LANGUAGE, THEME } from '../consts'
import { version } from '../../package.json'

export function Logo({
  theme = THEME.DARK,
  language = LANGUAGE.JAVASCRIPT
}) {
  return (
    <div style={{
      display: "flex",
      alignItems: "end",
      gap: 8,
      fontFamily: "monospace",
    }}>
      <a
        href='https://playjs.dev'
        target='_blank'
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          textDecoration: 'none'
        }}
        rel='noreferrer'
      >
        <div style={{
          width: '16px',
          height: '16px',
          backgroundColor: language === LANGUAGE.TYPESCRIPT ? '#007acc' : '#f0db4f'
        }}
        />
        <span
          style={{
            color: theme === THEME.DARK ? 'white' : 'black',
            fontSize: '16px',
            lineHeight: '16px',
            fontWeight: 100,
          }}
        >
          PlayJS
        </span>
      </a>
      <span
        style={{
          color: theme === THEME.DARK ? 'white' : 'black',
          opacity: 0.5,
          fontSize: '10px',
          fontWeight: 100,
        }}
      >v.{version}</span>
    </div>
  )
}
