import Main from './components/Main'
import { getHashFromURL } from './core/encode'
import Landing from './pages/Landing'

export default function App () {
  const url = new URL(window.location.href)
  const utmSource = url.searchParams.get('utm_source')
  if (
    utmSource === 'homescreen' ||
    getHashFromURL()
  ) {
    return <Main hashedCode={getHashFromURL()} />
  }

  return <Landing />
}
