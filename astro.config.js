import remarkPlugins from './.vscode/remark-plugins.js'
import vitePlugins from './.vscode/vite-plugins.js'
import { defineConfig } from 'astro/config'

export default defineConfig({
	site: 'https://astro-astro-www.netlify.app/',
	trailingSlash: 'always',
	markdown: {
		remarkPlugins: remarkPlugins()
	},
	server: {
		host: true,
		port: 3000,
	},
	vite: {
		plugins: vitePlugins(),
	}
})
