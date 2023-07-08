export const saveCode = (code) => {
  window.localStorage.setItem('code', code)
}

export const loadCode = () => {
  return window.localStorage.getItem('code')
}
