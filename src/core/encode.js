import { encode, decode } from 'js-base64'

export function encodeCode (code) {
  return encode(code)
}

export function decodeCode (code) {
  return decode(code)
}

export function getCodeFromURL () {
  try {
    const { pathname } = window.location
    if (pathname.length <= 1) return false
    const hashCode = pathname.slice(1)
    return hashCode ? decode(hashCode) : false
  } catch {
    return false
  }
}
