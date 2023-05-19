import { defineConfig } from 'astro/config'
import astroPlugins from './.vscode/astro-plugins.js'
import astroSitemapIntegration from '@astrojs/sitemap'
import astroWebComponentPolyfills from '@astropub/webcomponent-polyfills'
import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
  site: 'https://www.astrouxds.com/',
  trailingSlash: 'always',
  server: {
    host: true,
    port: 3000
  },
  integrations: [ astroPlugins(), astroSitemapIntegration(), astroWebComponentPolyfills(), tailwind() ]
})
