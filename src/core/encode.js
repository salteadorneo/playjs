import { encode, decode } from 'js-base64'

export function updateURL (code) {
  const hashedCode = encode(code)
  window.history.replaceState(null, null, `/${hashedCode}`)
}

export function getCodeFromURL () {
  try {
    const { pathname } = window.location
    const hashCode = pathname.slice(1)
    return hashCode ? decode(hashCode) : null
  } catch {
    return null
  }
}
