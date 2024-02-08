import { DIRECTION, LANGUAGE, THEME } from '../consts'

import { Core } from './Core'

export default function PlayJS ({
  code = '',
  width = '100vw',
  height = '100dvh',
  language = LANGUAGE.JAVASCRIPT,
  direction = DIRECTION.HORIZONTAL,
  theme = THEME.DARK
}) {
  return (
    <section style={{
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'monospace',
      width,
      height,
      backgroundColor: theme === THEME.DARK ? '#1E1E1E' : 'white'
    }}
    >
      <Core
        width={width}
        height='100dvh'
        direction={direction}
        code={code}
        language={language}
        theme={theme}
      />
    </section>
  )
}
