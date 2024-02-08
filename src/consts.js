export const LANGUAGES = {
  JAVASCRIPT: 'javascript',
  TYPESCRIPT: 'typescript'
}

export const LANGUAGE_BY_SUBDOMAIN = typeof window !== 'undefined' && window.location.host === 'ts.playjs.dev'
  ? LANGUAGES.TYPESCRIPT
  : LANGUAGES.JAVASCRIPT

export const IS_IFRAME = typeof window !== 'undefined' && window.location !== window.parent.location

export const WIDTH_MOBILE = 640

const DEFAULT_VALUE = import('./javascript')

const DEFAULT_VALUE_TS = import('./typescript')

export const DEFAULT_CODE =
  LANGUAGE_BY_SUBDOMAIN === LANGUAGES.TYPESCRIPT
    ? DEFAULT_VALUE_TS
    : DEFAULT_VALUE

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
