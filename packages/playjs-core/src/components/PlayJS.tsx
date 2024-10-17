import { DIRECTION, DirectionType, LANGUAGE, LanguageType, THEME, ThemeType } from '../consts'

import { Core } from './Core'
import { Logo } from './Logo'

type Props = {
  code?: string,
  width?: string,
  height?: string,
  language?: LanguageType,
  direction?: DirectionType,
  theme?: ThemeType,
  onChange?: (code: string) => void
  ia?: boolean
}

export default function PlayJS({
  code = '',
  width = '100dvw',
  height = '100dvh',
  language = LANGUAGE.JAVASCRIPT,
  direction = DIRECTION.HORIZONTAL,
  theme = THEME.DARK,
  onChange = (code: string) => { },
  ia = false
}: Props) {
  return (
    <section style={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'monospace',
      width,
      height,
      backgroundColor: theme === THEME.DARK ? '#1e1e1e' : 'white'
    }}
    >
      <div style={{
        position: 'absolute',
        right: 12,
        bottom: 12,
        zIndex: 1,
        opacity: 0.3
      }}
      >
        <Logo theme={theme} language={language} />
      </div>
      <Core
        width={width}
        height={height}
        direction={direction}
        code={code}
        language={language}
        theme={theme}
        onChange={onChange}
        ia={ia}
      />
    </section>
  )
}
