import { defineConfig } from 'astro/config'
import astroPlugins from './.vscode/astro-plugins.js'
import astroSitemapIntegration from '@astrojs/sitemap'
import astroWebComponentPolyfills from '@astropub/webcomponent-polyfills'
import lit from '@astrojs/lit'
import netlify from '@astrojs/netlify'
import sitemap from '@astrojs/sitemap'

// https://astro.build/config
export default defineConfig({
  site: 'https://www.astrouxds.com/',
  trailingSlash: 'always',
  output: 'hybrid', // Enable SSR for auth pages
  adapter: netlify({
    edgeMiddleware: true,
    functionPerRoute: false
  }),
  server: {
    host: true,
    port: 3000
  },
  markdown: {
    drafts: true,
  },
  integrations: [ astroPlugins(), astroSitemapIntegration(), astroWebComponentPolyfills(), lit(), sitemap() ]
})
