import { describe, it, expect } from 'vitest'
import { getResult } from '../core'

describe('expect helpers', () => {
  it('eq pass', async () => {
    const output = await getResult({ code: 'expect(2 + 2).eq(4)' })
    const expected = "'✓' 4 'eq' 4"
    expect(output).eq(expected)
  })

  it('eq fail', async () => {
    const output = await getResult({ code: 'expect(2 + 2).eq(5)' })
    const expected = "'✗' 4 'eq' 5"
    expect(output).eq(expected)
  })

  it('neq pass', async () => {
    const output = await getResult({ code: 'expect(2 + 2).neq(5)' })
    const expected = "'✓' 4 'neq' 5"
    expect(output).eq(expected)
  })

  it('truthy pass', async () => {
    const output = await getResult({ code: "expect('x').truthy()" })
    const expected = "'✓' 'x' 'truthy' true"
    expect(output).eq(expected)
  })

  it('falsy pass', async () => {
    const output = await getResult({ code: 'expect(0).falsy()' })
    const expected = "'✓' 0 'falsy' false"
    expect(output).eq(expected)
  })

  it('cases multiple rows', async () => {
    const output = await getResult({
      code: `function double(n){return n*2}
cases(double, [[1,2],[3,6],[5,10]])`
    })
    const expected = `
'✓' 2 'eq' 2 ┊ '✓' 6 'eq' 6 ┊ '✓' 10 'eq' 10`
    expect(output).eq(expected)
  })
})
