import Main from './components/Main'
import { getCodeFromURL } from './core/encode'
import { loadCode } from './core/storage'
import Landing from './pages/Landing'

export default function App () {
  const url = new URL(window.location.href)
  const utmSource = url.searchParams.get('utm_source')
  if (
    utmSource === 'homescreen' ||
    getCodeFromURL() ||
    loadCode()
  ) {
    return <Main />
  }

  return <Landing />
}
