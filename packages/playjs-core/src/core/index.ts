import ts from 'typescript'

import { LANGUAGE, LanguageType } from '../consts'

let codeWithDependencies = false

export async function getResult({ code, language = LANGUAGE.JAVASCRIPT }: {
  code: string,
  language: LanguageType
}) {
  if (!code) return ''

  const prelude = "var __tests=[];function expect(actual){function out(ok,op,expected){console.log(ok?'✓':'✗',actual,op,expected);__tests.push({ok:ok,actual:actual,expected:expected,op:op});return ok}return{eq:function(expected){return out(actual===expected,'eq',expected)},neq:function(expected){return out(actual!==expected,'neq',expected)},truthy:function(){return out(!!actual,'truthy',true)},falsy:function(){return out(!actual,'falsy',false)}}}function cases(fn,table){for(var i=0;i<table.length;i++){var row=table[i];var input=row[0];var expected=row[1];var res=fn(input);expect(res).eq(expected)}}";
  try { eval(prelude) } catch {}

  if (codeWithDependencies) {
    window.location.reload()
  }

  let result = ''
  let prevResult = ''

  let wrappedCode = code

  const regex = /import\s+(\w+)\s+from\s+(['"])(.*?)\2\s*;?/g
  if (code.match(regex)) {
    const updatedCode = code.replace(regex, "const { default: $1 } = await import('https://cdn.skypack.dev/$3');")
    wrappedCode = `(async () => {\n      ${updatedCode}\n    })();`
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

    const logsThisLine: Log[] = []
    const originalLog = console.log
    console.log = function (...args: any[]) {
      const id = Math.random().toString(36).substr(2, 9)
      args.forEach((arg) => {
        logsThisLine.push({ id, message: resolveHTML(arg), line: i + 1 })
      })
    }

    try {
      const combined = prelude + '\n' + lineCode
      const lineCodeJS = language === LANGUAGE.TYPESCRIPT
        ? ts.transpile(combined)
        : combined

      const html = await eval(lineCodeJS)
      if (logsThisLine.length > 0) {
        const logsGrouped = logsThisLine.reduce((acc, log) => {
          const lastLog = acc[acc.length - 1]
          if (lastLog && lastLog.id === log.id) {
            lastLog.message += ' ' + log.message
          } else {
            acc.push(log)
          }
          return acc
        }, [] as Log[])
        result += logsGrouped.map((log) => log.message).join(' ┊ ') + '\n'
      } else {
        if (i > 0 && line !== codeLines[i - 1].trim() && prevResult === html) {
          result += '\n'
        } else {
          result += await resolveHTML(html) + '\n'
        }
        prevResult = html
      }
    } catch (err) {
      if (err instanceof ReferenceError) {
        result += err
      }
      result += '\n'
    } finally {
      console.log = originalLog as any
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

  const prelude = "var __tests=[];function expect(actual){function out(ok,op,expected){console.log(ok?'✓':'✗',actual,op,expected);__tests.push({ok:ok,actual:actual,expected:expected,op:op});return ok}return{eq:function(expected){return out(actual===expected,'eq',expected)},neq:function(expected){return out(actual!==expected,'neq',expected)},truthy:function(){return out(!!actual,'truthy',true)},falsy:function(){return out(!actual,'falsy',false)}}}function cases(fn,table){for(var i=0;i<table.length;i++){var row=table[i];var input=row[0];var expected=row[1];var res=fn(input);expect(res).eq(expected)}}";

  console.log = function (...args: any[]) {
    const stack = new Error().stack?.split("\n") || [];
    let frame: string | undefined = undefined;
    for (let i = stack.length - 1; i >= 0; i--) {
      if (stack[i].includes(":")) { frame = stack[i]; break }
    }
    const callerLineNumber = frame ? frame.split(":").slice(-2)[0] : null;
    let line = callerLineNumber != null ? parseInt(callerLineNumber) - 2 : null
    if (line == null || !isFinite(line) || line < 1) line = 1

    const id = Math.random().toString(36).substr(2, 9);

    args.forEach((arg) => {
      logs.push({
        id, message: resolveHTML(arg), line,
      });
    });
  };

  try {
    const auxFunction = new Function(prelude + "\n" + codigo);
    auxFunction();
  } catch (error: any) {
    const stack = error.stack?.split("\n") || [];
    let frame: string | undefined = undefined;
    for (let i = stack.length - 1; i >= 0; i--) {
      if (stack[i].includes(":")) { frame = stack[i]; break }
    }
    const callerLineNumber = frame ? frame.split(":").slice(-2)[0] : undefined;
    let line = callerLineNumber != null ? parseInt(callerLineNumber) - 2 : null
    if (line == null || !isFinite(line) || line < 1) line = 1

    logs.push({ id: '', message: error.message, line });
  }

  return logs;
}