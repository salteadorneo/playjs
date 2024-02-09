export const LANGUAGE = {
  JAVASCRIPT: 'javascript',
  TYPESCRIPT: 'typescript'
}

export const LANGUAGE_BY_SUBDOMAIN = typeof window !== 'undefined' && window.location.host === 'ts.playjs.dev'
  ? LANGUAGE.TYPESCRIPT
  : LANGUAGE.JAVASCRIPT

export const DIRECTION = {
  VERTICAL: 'vertical',
  HORIZONTAL: 'horizontal'
}

export const THEME = {
  LIGHT: 'light',
  DARK: 'vs-dark'
}

export const IS_IFRAME = typeof window !== 'undefined' && window.location !== window.parent.location

export const WIDTH_MOBILE = 640
