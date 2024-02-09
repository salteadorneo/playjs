export const LANGUAGES = {
  JAVASCRIPT: 'javascript',
  TYPESCRIPT: 'typescript'
}

export const LANGUAGE_BY_SUBDOMAIN = typeof window !== 'undefined' && window.location.host === 'ts.playjs.dev'
  ? LANGUAGES.TYPESCRIPT
  : LANGUAGES.JAVASCRIPT

export const IS_IFRAME = typeof window !== 'undefined' && window.location !== window.parent.location

export const WIDTH_MOBILE = 640
