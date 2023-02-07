import postcssrc from 'postcss-load-config'

export function vitePostCSS() {
	/** @type {Plugin} */
	let plugin = {
		name: 'vite:postcss',
		enforce: 'pre',
		async configResolved(config) {
			const { options, plugins } = await postcssrc({
				cwd: config.root,
				env: config.mode,
			})

			config.css = Object(config.css)
			config.css.postcss = Object(config.css.postcss)

			Object.assign(config.css.postcss, { options, plugins })
		},
	}

	return plugin
}

/** @typedef {import('vite').Plugin} Plugin */
