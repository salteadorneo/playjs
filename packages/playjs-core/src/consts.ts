export const LANGUAGE = {
  JAVASCRIPT: 'javascript',
  TYPESCRIPT: 'typescript'
}
export type LanguageType = typeof LANGUAGE[keyof typeof LANGUAGE];

export const DIRECTION = {
  VERTICAL: 'vertical',
  HORIZONTAL: 'horizontal'
}
export type DirectionType = typeof DIRECTION[keyof typeof DIRECTION];

export const THEME = {
  LIGHT: 'light',
  DARK: 'vs-dark'
}
export type ThemeType = typeof THEME[keyof typeof THEME];

export const WIDTH_MOBILE = 640

export const EDITOR_OPTIONS = {
  padding: { top: 10 },
  automaticLayout: true,
  lineNumbers: 'off',
  fontFamily: 'monospace',
  fontLigatures: true,
  formatOnPaste: true,
  minimap: {
    enabled: false
  },
  inlineSuggest: {
    enabled: true
  },
  overviewRulerLanes: 0,
  scrollBeyondLastLine: false
}
