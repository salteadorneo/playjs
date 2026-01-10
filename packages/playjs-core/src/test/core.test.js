import { describe, expect, it } from 'vitest'
import { getResult, resolveHTML } from '../core'
import { LANGUAGE } from '../consts'

describe('test code results', () => {
  it('console.log', async () => {
    const output = await getResult({
      code: `const holaMundo = () => '👋🌎'
holaMundo()`
    })
    const expected = `
'👋🌎'`
    expect(output).eq(expected)
  })

  it('typescript', async () => {
    const output = await getResult({
      code: `const holaMundo = (greeting: string) => greeting
holaMundo('👋🌎')`, language: LANGUAGE.TYPESCRIPT
    })
    const expected = `
'👋🌎'`
    expect(output).eq(expected)
  })

  it('console.log multiple args', async () => {
    const output = await getResult({ code: 'console.log("a", "b")' })
    const expected = "'a' 'b'"
    expect(output).eq(expected)
  })

  it('empty code returns empty string', async () => {
    const output = await getResult({ code: '' })
    expect(output).eq('')
  })

  it('ignores comments and blank lines', async () => {
    const output = await getResult({ code: '// comment only\n\n2 + 2' })
    const expected = `

4`
    expect(output).eq(expected)
  })

  it('exposes reference errors', async () => {
    const output = await getResult({ code: 'missingVar' })
    expect(output).toContain('missingVar is not defined')
  })

  it('resolves async function results', async () => {
    const output = await getResult({
      code: `async function wait () { return 'done' }
wait()`
    })
    const expected = `
'done'`
    expect(output).eq(expected)
  })

  it('stringifies object output', async () => {
    const output = await getResult({
      code: `const obj = { a: 1, nested: { b: 2 } }
obj`
    })
    const expected = `
{"a":1,"nested":{"b":2}}`
    expect(output).eq(expected)
  })

  it('await fetch', async () => {
    const output = await getResult({
      code: `async function getFetch() {
    return await fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(res => res.json())
}
getFetch()`
    })
    const expected = `



{"userId":1,"id":1,"title":"delectus aut autem","completed":false}`
    expect(output).eq(expected)
  })

  // TODO: fix this test
  /*
  it('import from', async () => {
    const output = await getResult({
      code: `import confetti from 'canvas-confetti'

function getParty() {
    confetti({
        particleCount: 100,
        startVelocity: 30,
        spread: 360,
        origin: {
            x: Math.random(),
            y: Math.random() - 0.2
        }
    });
    setTimeout(getParty, 2000)
}
getParty()`
    })
    const expected = `













`
    expect(output).eq(expected)
  })
  */
})

describe('resolveHTML helpers', () => {
  it('wraps plain strings', () => {
    expect(resolveHTML('hello')).eq("'hello'")
  })

  it('passes through quoted strings unchanged', () => {
    expect(resolveHTML('"hello"')).eq('"hello"')
  })

  it('executes functions and handles symbols', () => {
    expect(resolveHTML(() => 'done')).eq('done')
    expect(resolveHTML(Symbol('id'))).eq('Symbol(id)')
  })

  it('serializes promises and undefined', async () => {
    const promiseResult = await resolveHTML(Promise.resolve('ready'))
    expect(promiseResult).eq("'ready'")
    expect(resolveHTML(undefined)).eq('')
  })
})
