export const language = typeof window !== 'undefined' && window.location.host === 'ts.playjs.dev'
  ? 'typescript'
  : 'javascript'

export const IS_IFRAME = typeof window !== 'undefined' && window.location !== window.parent.location

export const WIDTH_MOBILE = 640

const DEFAULT_VALUE = `// Bienvenido a PlayJS

const holaMundo = () => '👋🌎'

holaMundo()
`

const DEFAULT_VALUE_TS = `// Bienvenido a PlayJS con soporte para TypeScript

const holaMundo = (greeting: string) => greeting

holaMundo('👋🌎')
`

export const DEFAULT_CODE = language === 'typescript' ? DEFAULT_VALUE_TS : DEFAULT_VALUE

export const EDITOR_OPTIONS = {
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
