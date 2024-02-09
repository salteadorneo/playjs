import ts from 'typescript'

import { LANGUAGE, LanguageType } from '../consts'

let codeWithDependencies = false

export async function getResult({ code, language = LANGUAGE.JAVASCRIPT }: {
  code: string,
  language: LanguageType
}) {
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

  const logs = getConsoleLogs(wrappedCode)

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

    const logsLine = logs.filter((log) => log.line === i + 1)
    if (logsLine.length > 0) {
      const logsGrouped = logsLine.reduce((acc, log) => {
        const lastLog = acc[acc.length - 1]
        if (lastLog && lastLog.id === log.id) {
          lastLog.message += ' ' + log.message
        } else {
          acc.push(log)
        }
        return acc
      }, [] as Log[])
      result += logsGrouped.map((log) => log.message).join(' ┊ ')
      result += '\n'
      continue
    }

    try {
      const lineCodeJS = language === LANGUAGE.TYPESCRIPT
        ? ts.transpile(lineCode)
        : lineCode

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

export function resolveHTML(html: any): any {
  if (typeof html === 'object') {
    if (html instanceof Promise) {
      return html
        .then((resolvedValue: any) => resolveHTML(resolvedValue));
    }
    return JSON.stringify(html);
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

interface Log {
  id: string;
  message: string;
  line: number | null;
}

function getConsoleLogs(codigo: string): Log[] {
  let logs: Log[] = [];

  console.log = function (...args: any[]) {
    const callerLineNumber = (new Error().stack?.split("\n")[2].split(":").slice(-2)[0]) || null;
    const line = callerLineNumber != null ? parseInt(callerLineNumber) - 2 : null

    const id = Math.random().toString(36).substr(2, 9);

    args.forEach((arg) => {
      logs.push({
        id, message: resolveHTML(arg), line,
      });
    });
  };

  try {
    const auxFunction = new Function(codigo);
    auxFunction();
  } catch (error: any) {
    const callerLineNumber = error.stack?.split("\n")[1].split(":").slice(-2)[0];
    const line = callerLineNumber != null ? parseInt(callerLineNumber) - 2 : null

    logs.push({ id: '', message: error.message, line });
  }

  return logs;
}