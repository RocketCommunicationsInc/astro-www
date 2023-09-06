import { defineConfig } from 'astro/config'
import astroPlugins from './.vscode/astro-plugins.js'
import astroSitemapIntegration from '@astrojs/sitemap'
import astroWebComponentPolyfills from '@astropub/webcomponent-polyfills'
import lit from '@astrojs/lit'
import NetlifyCMS from 'astro-netlify-cms'


import sitemap from '@astrojs/sitemap'

// https://astro.build/config
export default defineConfig({
  site: 'https://www.astrouxds.com/',
  trailingSlash: 'always',
  server: {
    host: true,
    port: 3000
  },
  markdown: {
    drafts: true,
  },
  integrations: [ astroPlugins(), astroSitemapIntegration(), astroWebComponentPolyfills(), lit(), sitemap(),
    NetlifyCMS({
      adminPath: '/wp-admin',
      config: {
        backend: {
          name: 'git-gateway',
          branch: 'main',
        },
        publish_mode: 'editorial_workflow',
        collections: [
          {
            name: 'components',
            label: 'Components',
            folder: 'src/pages/components',
            create: true,
            delete: true,
            fields: [
              { name: 'title', widget: 'string', label: 'Post Title' },
              { name: 'body', widget: 'markdown', label: 'Post Body' },
            ],
          },
          // Content collections
        ],
      },
    }),
   ]
})
