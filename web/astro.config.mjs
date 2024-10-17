import { defineConfig } from 'astro/config'
import deno from '@deno/astro-adapter';
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'

export default defineConfig({
  integrations: [react(), tailwind()],
  output: 'server',
  adapter: deno(),
})
