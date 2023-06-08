import ts from 'typescript'

export async function transpileTS (code) {
  return ts.transpile(code)
}
