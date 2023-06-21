import Main from './components/Main'
import Landing from './pages/Landing'
import { getCodeFromURL } from './core/encode'

export default function App () {
  const codeFromURL = getCodeFromURL()
  if (codeFromURL) return <Main />

  return <Landing />
}
