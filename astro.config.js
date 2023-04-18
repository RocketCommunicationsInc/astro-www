import { defineConfig } from 'astro/config'

import astroPlugins from './.vscode/astro-plugins.js'

export default defineConfig({
	site: 'https://www.astrouxds.com/',
	trailingSlash: 'always',
	server: {
		host: true,
		port: 3000,
	},
	integrations: [
		astroPlugins(),
	],
})
