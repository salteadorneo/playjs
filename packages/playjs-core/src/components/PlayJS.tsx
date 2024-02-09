import { DIRECTION, DirectionType, LANGUAGE, LanguageType, THEME, ThemeType } from '../consts'

import { Core } from './Core'

export default function PlayJS({
  code = '',
  width = '100vw',
  height = '100dvh',
  language = LANGUAGE.JAVASCRIPT,
  direction = DIRECTION.HORIZONTAL,
  theme = THEME.DARK
}: {
  code?: string,
  width?: string,
  height?: string,
  language?: LanguageType,
  direction?: DirectionType,
  theme?: ThemeType
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
        height={height}
        direction={direction}
        code={code}
        language={language}
        theme={theme}
      />
    </section>
  )
}
