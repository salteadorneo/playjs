import { encode, decode } from 'js-base64'

export function setCodeToURL (code) {
  const hashedCode = encode(code)
  const host = window.location.host

  if (hashedCode.length + host.length >= 2000) {
    return false
  } else {
    window.history.replaceState(null, null, `/${hashedCode}`)
    return true
  }
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
