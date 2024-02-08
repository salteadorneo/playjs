import ts from 'typescript'
import { LANGUAGES } from '../consts'

let codeWithDependencies = false

const TAG_CONSOLE_LOG = 'window.console.log'

export async function getResult ({ code, language = 'javascript' }) {
  if (!code) return ''

  if (codeWithDependencies) {
    window.location.reload()
  }

  let result = ''
  let prevResult = ''

  let wrappedCode = code

  const regex = /import\s+(\w+)\s+from\s+(['"])(.*?)\2\s*;?/g
  if (code.match(regex)) {
    const updatedCode = code.replace(regex, "const { default: $1 } = await import('https://cdn.skypack.dev/$3');")
    wrappedCode = `(async () => {
      ${updatedCode}
    })();`
    codeWithDependencies = true
  }

  const codeLines = wrappedCode
    .trimEnd()
    .split(/\r?\n|\r|\n/g)

  for (let i = 0; i < codeLines.length; i++) {
    const line = codeLines[i].trim()
    if (line === '') {
      result += '\n'
      continue
    }

    const lineCode = codeLines.slice(0, i + 1).join('\n')
    if (line.startsWith('//') || line.startsWith('/*') || line.endsWith('*/')) {
      result += '\n'
      continue
    }

    try {
      const lineCodeJS = language === LANGUAGES.TYPESCRIPT
        ? ts.transpile(lineCode)
        : lineCode

      // eslint-disable-next-line no-eval
      const html = await eval(lineCodeJS)
      if (i > 0 && line !== codeLines[i - 1].trim() && prevResult === html) {
        result += '\n'
      } else {
        result += await resolveHTML(html) + '\n'
      }
      prevResult = html
    } catch (err) {
      if (err instanceof ReferenceError) {
        result += err
      }
      result += '\n'
    }
  }

  // remove last \n
  result = result.slice(0, -1)

  return result
}

if (typeof window !== 'undefined') {
  window.console.log = async function (...args) {
    return TAG_CONSOLE_LOG + args.join('|||')
  }
}

export async function resolveHTML (html) {
  if (typeof html === 'object') {
    if (html instanceof Promise) {
      const resolvedValue = await html
      return await resolveHTML(resolvedValue)
    }
    return JSON.stringify(html)
  }
  if (typeof html === 'string') {
    if (html.startsWith(TAG_CONSOLE_LOG)) {
      const htmlParsed = html.replace(TAG_CONSOLE_LOG, '')
      return htmlParsed.split('|||').map(arg => {
        const value = isNumeric(arg)
        if (isNaN(value)) return `'${arg}'`
        return value
      }).join(' ')
    }
    // start or end with ' or "
    if (html.match(/^['"].*['"]$/)) return html
    return `'${html}'`
  }
  if (typeof html === 'function') {
    return html()
  }
  if (typeof html === 'symbol') {
    return html.toString()
  }
  if (typeof html === 'undefined') {
    return ''
  }
  return html
}

function isNumeric (str) {
  try {
    return parseFloat(str)
  } catch (err) {
    return str
  }
}
