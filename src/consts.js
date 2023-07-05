export const language = typeof window !== 'undefined' && window.location.host === 'ts.playjs.dev'
  ? 'typescript'
  : 'javascript'

export const IS_IFRAME = typeof window !== 'undefined' && window.location !== window.parent.location

export const WIDTH_MOBILE = 640

const DEFAULT_VALUE = import('./javascript')

const DEFAULT_VALUE_TS = import('./typescript')

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
