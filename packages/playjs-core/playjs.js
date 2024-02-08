#!/usr/bin/env node
'use strict'

async function main () {
  return import('./index.es.js')
    .then(({ cli }) => cli(process.argv))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}

main()
  .then(() => process.exit(0))
  .catch(() => process.exit(1))
