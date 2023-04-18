/** @typedef {import('astro').AstroIntegration} AstroIntegration */
/** @typedef {import('astro').AstroConfig} AstroConfig */

// astro integrations
import astroSitemapIntegration from '@astrojs/sitemap'

// remark plugins
import remarkDirective from 'remark-directive'
import remarkDirectives from './remark-plugins/remark-directives.js'
import remarkDoDontFigures from './remark-plugins/remark-do-dont-figures.js'
import remarkGfm from 'remark-gfm'
import remarkHeadingLinks from './remark-plugins/remark-heading-links.js'
import remarkImplicitFigures from './remark-plugins/remark-implicit-figures.js'
import remarkLazyImages from './remark-plugins/remark-lazy-images.js'
import remarkLists from './remark-plugins/remark-lists.js'
import remarkSmartyPants from 'remark-smartypants'

// vite plugins
import { viteImportYaml } from './vite-plugins/vite-import-yaml.js'
import { viteMinifyRaw } from './vite-plugins/vite-minify-raw.js'
import { vitePostCSS } from './vite-plugins/vite-postcss.js'
import viteImportWithType from './vite-plugins/vite-import-with-type.js'

export default () => [
	astroWWWIntegration()
]

function astroWWWIntegration() {
	/** @type {AstroIntegration} */
	const integration = {
		name: 'Astro WWW Integrations',
		hooks: {
			'astro:config:setup'({ config, updateConfig }) {
				updateConfig({
					markdown: {
						remarkPlugins: [
							remarkGfm,
							remarkSmartyPants,
							remarkDirective,
							remarkDirectives,
							remarkLazyImages({ publicDir: config.publicDir }),
							remarkImplicitFigures,
							remarkDoDontFigures,
							remarkLists,
							remarkHeadingLinks,
						],
					},
					integrations: [
						astroSitemapIntegration(),
					],
					vite: {
						build: {
							assetsInlineLimit: 0,
						},
						logLevel: 'error',
						plugins: [
							viteImportWithType(),
							vitePostCSS(),
							viteImportYaml(),
							viteMinifyRaw(),
						],
					},
				})
			},
		},
	}

	return integration
}
