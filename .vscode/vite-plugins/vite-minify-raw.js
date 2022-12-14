// @ts-check

import { default as postcss } from 'postcss'

export function viteMinifyRaw() {
	/** @type {PostCSSPlugins} */
	let postcssPlugins

	/** @type {Plugin} */
	let plugin = {
		name: 'vite:minify-raw',
		enforce: 'pre',
		configResolved(config) {
			postcssPlugins = Object(config.css?.postcss).plugins || []
		},
		transform(code, importee) {
			const matchingExtension = getMatchingExtension(importee)

			if (matchingExtension === 'css') {
				return getMinifiedCSL(code, postcssPlugins)
			}

			if (matchingExtension) {
				code = getMinifiedTML(code)

				return { code }
			}
		},
	}

	return plugin
}

/** Returns HTML that is minified. */
const getMinifiedTML = (code = '') => {
	code = code.replace(/=\\"([^"\s]+)\\"/g, '=$1')
	code = code.replace(/\\n(\s|\\s|\\t)*/g, '').trim()

	return code
}

/** Returns CSS that is PostCSS processed and minified. */
const getMinifiedCSL = (code = '', /** @type {any} */ postcssPlugins) => {
	try {
		const isolatedCSS = JSON.parse(code.slice(15))
		const preparedCSS = postcss(postcssPlugins).process(isolatedCSS).css
		const minifiedCSS = preparedCSS.replace(/[\n\t ]+/g, ' ').trim()
		const returnedESM = 'export default ' + JSON.stringify(minifiedCSS)

		return returnedESM
	} catch {
		return code
	}
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
