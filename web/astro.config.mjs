import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'

export default defineConfig({
  site: 'https://www2.playjs.dev',
  integrations: [react(), tailwind()],
})
