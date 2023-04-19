// @ts-check

export default function viteImportWithType() {
	/** @type {ResolvedConfig} */
	let resolvedConfig

	/** @type {{ [importee: string]: [ string, string | undefined, ResolveIdOptions, string ] }} */
	let resolvers

	/** @type {Plugin} */
	let plugin = {
		name: 'vite:import-constructable-stylesheets',
		enforce: 'pre',
		configResolved(config) {
			resolvedConfig = config
			resolvers = {}
		},
		resolveId(importee, importer, options) {
			if (importee in importWithTypeCode) {
				return importee
			}

			if (importee.includes('withtype')) {
				const [ importeeId, { withtype, ...params } ] = getParams(importee)

				if (withtype !== undefined) {
					const id = withParams(importeeId, params)

					resolvers[id] = [ importeeId, importer, options, withtype ]

					return id
				}
			}
		},
		async load(loadImportee) {
			if (loadImportee in resolvers) {
				const [ importee, importer, options, withtype ] = resolvers[loadImportee]

				const { id } = await this.resolve(importee, importer, options) || {}

				return {
					code: getCodeWithType(/** @type {string} */ (id), withtype)
				}
			}

			if (loadImportee in importWithTypeCode) {
				return {
					code: importWithTypeCode[loadImportee],
				}
			}
		},
	}

	return plugin
}

/** Returns the separated importee and its query parameters. */
const getParams = /** @type {{ (importee: string): [string, Params] }} */ (importee) => {
	const [ , href, params ] = importee.match(matchURI) || []

	return [ href, Object.fromEntries(new URLSearchParams(params)) ]
}

/** Returns the modified importee with any additional query parameters reattached. */
const withParams = /** @type {{ (importee: string, params: Params): string }} */ (importee, params) => {
	const paramsString = new URLSearchParams(params).toString()

	return `\0${importee}.withtype.js${paramsString ? `?${paramsString}` : ''}`
}

const getCodeWithType = /** @type {{ (importee: string, type: string): string }} */ (importee, type) => {
	switch (type) {
		case 'fragment':
			return [
				`import mutate from ${JSON.stringify(importWithTypeURIs.fragment)}`,
				`import source from ${JSON.stringify(importee + '?raw')}`,
				`export default mutate(source)`,
			].join('\n')

		case 'style':
			return [
				`import mutate from ${JSON.stringify(importWithTypeURIs.style)}`,
				`import source from ${JSON.stringify(importee + '?raw')}`,
				`export default mutate(source)`,
			].join('\n')

		default:
			return `export default Object.create(null)`
	}
}

/** Regular expression used to match URIs with optional query parameters. */
const matchURI = /^([^?]*)(?:\?(.*))?/s

const importWithTypeURIs = {
	fragment: `\0import-with-type:fragment`,
	style: `\0import-with-type:style`,
}

const importWithTypeCode = {
	[importWithTypeURIs.fragment]: `export default (e=>(e.selectNodeContents(document.createElement('template')),e.createContextualFragment.bind(e)))(new Range)`,
	[importWithTypeURIs.style]: `export default (e,t=new CSSStyleSheet)=>(t.replaceSync(e),t)`,
}

/** @typedef {{ [name: string]: string }} Params */
/** @typedef {import('vite').Plugin} Plugin */
/** @typedef {{ assertions: Record<string, string>, custom?: import('rollup').CustomPluginOptions, ssr?: boolean, isEntry: boolean, skipSelf?: boolean }} ResolveIdOptions */
/** @typedef {import('vite').ResolvedConfig} ResolvedConfig */
/** @typedef {import('postcss').AcceptedPlugin[]} PostCSSPlugins */
