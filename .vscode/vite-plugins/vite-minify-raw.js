// @ts-check

import { default as postcss } from 'postcss'
import { transform as lightningcss } from 'lightningcss'

export function viteMinifyRaw() {
	let resolvedConfig

	/** @type {Plugin} */
	let plugin = {
		name: 'vite:minify-raw',
		enforce: 'pre',
		configResolved(config) {
			resolvedConfig = config
		},
		transform(code, importee) {
			const matchingExtension = getMatchingExtension(importee)

			if (matchingExtension === 'css') {
				code = getMinifiedCSS(code, importee, resolvedConfig.css.postcss.plugins)

				return {
					code,
					moduleSideEffects: false,
				}
			}

			if (matchingExtension) {
				code = getMinifiedHTM(code)

				return {
					code,
					moduleSideEffects: false,
				}
			}
		},
	}

	return plugin
}

/** Returns HTML that is minified. */
const getMinifiedHTM = (code = '') => {
	code = code.replace(/=\\"([^"\s]+)\\"/g, '=$1')
	code = code.replace(/\\n(\s|\\s|\\t)*/g, '')
	code = code.replace(/\s{2,}/g, ' ')
	code = code.trim()

	return code
}

/** Returns CSS that is PostCSS processed and LightningCSS minified. */
const getMinifiedCSS = (code = '', filename = '', /** @type {any} */ postcssPlugins) => {
	let isolatedCSS = ''
	try {
		isolatedCSS = JSON.parse(code.slice(15))
	} catch {}

	let preparedCSS = isolatedCSS
	try {
		preparedCSS = postcss(postcssPlugins).process(isolatedCSS).css
	} catch {}

	let minifiedCSS = preparedCSS
	try {
		minifiedCSS = lightningcss({
			filename,
			code: Buffer.from(preparedCSS),
			minify: true,
			sourceMap: true,
			targets: {},
			errorRecovery: true,
		}).code.toString()
	} catch {}

	return 'export default ' + JSON.stringify(minifiedCSS)
}

/** Returns a matching file extension from an importee, otherwise null. */
const getMatchingExtension = (importee = '') => {
	const [ , matchingExtension ] = importee.match(matchImportee) || []

	return matchingExtension || null
}

/** Regular expression used to match minifiable importees. */
const matchImportee = /(css|html)\?(?:used&)?raw$/

/** @typedef {import('vite').Plugin} Plugin */
/** @typedef {import('postcss').AcceptedPlugin[]} PostCSSPlugins */
