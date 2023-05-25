export const IS_IFRAME = window.location !== window.parent.location

export const WIDTH_MOBILE = 480

export const DEFAULT_VALUE = `// Bienvenido a PlayJS

const holaMundo = () => '👋🌎'

holaMundo()
`

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
  scrollbar: {
    vertical: 'hidden',
    horizontal: 'hidden',
    handleMouseWheel: false
  }
}
