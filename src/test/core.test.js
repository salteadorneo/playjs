import { describe, expect, it } from 'vitest'
import { getResult } from '../core'
import { DEFAULT_CODE } from '../consts'

describe('test code results', () => {
  it('console.log', async () => {
    const output = await getResult({ code: DEFAULT_CODE })
    const expected = `



'👋🌎'`
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
})
