import Main from './components/Main'
import { getHashFromURL } from './core/encode'
import { useCodeStore } from './hooks/useCodeStore'
import Landing from './pages/Landing'

export default function App () {
  const { codes } = useCodeStore()

  const url = new URL(window.location.href)
  const utmSource = url.searchParams.get('utm_source')
  if (
    utmSource === 'homescreen' ||
    getHashFromURL() ||
    codes.length > 1
  ) {
    return <Main />
  }

  return <Landing />
}
