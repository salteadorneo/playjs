import { encode } from 'js-base64'

export function updateURL (code) {
  const hashedCode = `${encode(code)}`
  window.history.replaceState(null, null, `/${hashedCode}`)
}
export async function getResult (code) {
  if (!code) {
    return ''
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
    if (line.startsWith('//') || line.startsWith('/*')) {
      result += '\n'
      continue
    }

    try {
      // eslint-disable-next-line no-eval
      const html = eval(lineCode)
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

  return result
}

window.console.log = async function (...data) {
  return await resolveHTML(...data)
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
