import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'

export default defineConfig({
  site: 'https://salteadorneo.github.io',
  base: '/playjs-web',
  integrations: [react(), tailwind()],
})
