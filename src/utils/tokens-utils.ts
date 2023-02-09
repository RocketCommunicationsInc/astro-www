import { DesignToken, JSONToken, TokenCatalog } from './tokens-types'

/** Object of key-value pairs representing a category and its normalized counterpart. */
const normalizedCategoryMap = {
	borderRadius: 'radius',
	fontFamilies: 'fontFamily',
	fontSizes: 'fontSize',
	fontWeights: 'fontWeight',
	lineHeights: 'lineHeight',
}

const categoryDescriptions = {
	fontSize: `Astro UXDS font size tokens define the font size of text styles and elements. The tokens are based on a t-shirt sizing system where the font-size-base token equals 1 rem (16px by default), and font sizes are either smaller (sm, xs) or larger (lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl) than the base.`,
	spacing: `Astro UXDS spacing tokens define increments of 4px used in all dimensions, padding, and margins for components, containers, grids, and other UI elements. The tokens are based on a 4px system where 1 token step equals .25rem, which equals 4 px by default. For example, the spacing-4 token equals 1rem (16px by default).`,
	lineHeight: `Astro UXDS line height tokens use increments of four to define the spacing and line height of text styles and elements. The tokens are based on a t-shirt sizing system where the line-height-base token equals 1.5 rem (24 px by default), and line heights are either smaller (sm, xs, 2xs) or larger (lg, xl, 2xl, 3xl, 4xl) than the base.`
}

const categoryNotes = {
	fontFamily: `The following typography tokens are mostly for reference. We recommend that developers use our typography utility classes instead.`
}

/** Returns the given string, with each key-value pair in the object used to update the string. */
const replaceSet = (
	value: string,
	replacements: {
		[replacee: string]: string
	}
) => Object.entries(replacements).reduce(
	(value, [ replacee, replacer ]) => value.replace(replacee, replacer),
	value
)

/** Returns whether a Design Token is a spacing token. */
const isSpacingToken = (token: DesignToken) => /^spacing-\d+$/.test(token.id)

/** Returns whether a Design Token is a color palette neutral token. */
const isColorPaletteNeutralToken = (token: DesignToken) => /^color-palette-neutral-\d+$/.test(token.id)

/** Returns a Category ID as a URL slug. */
const toCategorySlug = (id: string) => id.replace(/[A-Z]/, (letter) => `-${letter.toLowerCase()}`)

/** Returns a Category ID as a URL hash. */
const toCategoryHash = (id: string) => '#' + toCategorySlug(id)

/** Returns a Token ID as a URL hash. */
const toTokenHash = (id: string) => '#' + id

/** Returns a Category ID as a Title Cased name. */
const toCategoryName = (id: string) => id[0].toUpperCase() + id.slice(1).replace(/[A-Z]/g, ' $&')

/** Returns a Component ID as a Title Cased name. */
const toComponentName = (id: string) => id[0].toUpperCase() + id.slice(1).replace(/-([a-z0-9])/g, (_string, letter) => ` ${letter.toUpperCase()}`).replace(
	// correct GSB
	/^Gsb$/,
	'GSB'
)

/** Returns a Token ID as a Title Cased name, with additional corrections applied by working knowledge. */
const toTitleCasedTokenName = (id: string) => toComponentName(
	id
).replace(
	// correct t-shirt size suffixes
	/ (sm|lg|\d*x[ls])$/i,
	$0 => $0.toUpperCase()
).replace(
	// correct Top-Secret suffixes
	/ Topsecret(sci)?$/,
	' Top-Secret'
).replace(
	// correct CUI suffix
	/ Cui$/,
	' CUI'
).replace(
	// correct color suffixes
	/(Bright|Dark|Hot)(\w+)/,
	(_string, word1, word2) => `${word1}-${word2[0].toUpperCase()}${word2.slice(1)}`
).replace(
	// correct GSB prefix
	/^Gsb /,
	'GSB '
)

/** Returns the given token description, with corrections applied by working knowledge. */
const toNormalizedTokenDescription = (description: string) => description.replace(
	// correct the first letter of the description to be capitalized
	/^[a-z]/,
	$0 => $0.toUpperCase()
).replace(
	// correct incomplete sentences in opacity descriptions to be complete
	/^Used in/,
	'Opacity used in'
).replace(
	// correct sentences beginning with "A" or "The" to omit them
	/^(?:A|The) (\w)/,
	(_string, letter) => letter.toUpperCase()
).replace(
	// correct trailing periods and spaces to omit them
	/\.? ?$/,
	''
).replace(
	// correct descriptions of "Protected" to be empty
	/^Protected$/,
	''
)

/** Returns the token type, with corrections appied by working knowledge. */
const normalizeTokenType = (type: string, name: string) => (
	// correct font tokens not necessarily listed as System Tokens
	/^font-((control-)?body-|display)/.test(name)
		? 'system'
	// correct font monospace tokens not necessarily listed as Reference Tokens
	: /^font-monospace/.test(name)
		? 'reference'
	: type
)

/** Returns a System Category ID, with corrections applied by working knowledge. */
const normalizeSystemCategory = (categoryId: string, propertyId: string | undefined) => (
	// correct categories with these properties to include them as a prefix
	propertyId === 'background' ||
	propertyId === 'border' ||
	propertyId === 'classification' ||
	propertyId === 'status' ||
	propertyId === 'text'
		? propertyId + categoryId[0].toUpperCase() + categoryId.slice(1)
	: categoryId
)

/** Returns the given JSON Token as a normalized Design Token. */
export const normalizeToken = ({ name, value, category, tokenLevel, description, referenceToken, component, property }: JSONToken) => {
	let normalizedType = normalizeTokenType(tokenLevel, name)
	let categoryId = replaceSet(category, normalizedCategoryMap)

	if (normalizedType === 'system') {
		categoryId = normalizeSystemCategory(categoryId, property)
	}

	return <DesignToken>{
		id: name,
		type: normalizedType,
		value: String(value),
		category: categoryId,
		component: component || '',
		description: toNormalizedTokenDescription(description || ''),
		reference: referenceToken || '',
	}
}

/** Sorting algorithm for tokens. Sorts certain tokens by scale or size, low to high. */
export const sortToken = (tokenA: DesignToken, tokenB: DesignToken) => (
	isSpacingToken(tokenA) && isSpacingToken(tokenB)
		// sort spacing tokens by numeric value (low to high)
		? parseFloat(tokenA.value) - parseFloat(tokenB.value)
	: isColorPaletteNeutralToken(tokenA) && isColorPaletteNeutralToken(tokenB)
		// sort neutral palette tokens by scale (low to high)
		? parseFloat(tokenA.id.slice(22)) - parseFloat(tokenB.id.slice(22))
	: 0
)

/** Returns the given tokens as a catalog, organized by category. */
export const transformTokensByType = (type: string) => (darkTokens: DesignToken[], liteTokens: DesignToken[]) => darkTokens.reduce(
	(tokens, darkToken, index) => {
		if (darkToken.type === type) {
			const { id, category } = darkToken

			const liteToken = liteTokens[index]

			tokens[category] = tokens[category] || {
				name: toCategoryName(category),
				slug: toCategorySlug(category),
				hash: toCategoryHash(category),
				description: categoryDescriptions[category] || '',
				note: categoryNotes[category] || '',
				tokens: {}
			}

			tokens[category].tokens[id] = tokens[category].tokens[id] || {}

			tokens[category].tokens[id] = {
				name: toTitleCasedTokenName(id),
				slug: id,
				hash: toTokenHash(id),
				category: toCategorySlug(category),
				description: darkToken.description || liteToken.description,

				dark: {
					value: darkToken.value,
					description: darkToken.description,
				},

				lite: {
					value: liteToken.value,
					description: liteToken.description,
				},
			}
		}

		return tokens
	},
	<TokenCatalog>{}
)

/** Returns the given tokens as a catalog, organized by component. */
export const transformComponentTokensByType = (type: string) => (darkTokens: DesignToken[], liteTokens: DesignToken[]) => darkTokens.reduce(
	(tokens, darkToken, index) => {
		if (darkToken.type === type) {
			const { id, category, component } = darkToken

			const liteToken = liteTokens[index]

			tokens[component] = tokens[component] || {
				name: toComponentName(component),
				slug: toCategorySlug(component),
				hash: toCategoryHash(component),
				description: categoryDescriptions[component] || '',
				note: categoryNotes[component] || '',
				tokens: {}
			}

			tokens[component].tokens[id] = tokens[component].tokens[id] || {}

			tokens[component].tokens[id] = {
				name: toTitleCasedTokenName(id),
				slug: id,
				hash: toTokenHash(id),
				category: toCategorySlug(category),
				description: darkToken.description || liteToken.description,

				dark: {
					value: darkToken.value,
					description: darkToken.description,
				},

				lite: {
					value: liteToken.value,
					description: liteToken.description,
				},
			}
		}

		return tokens
	},
	<TokenCatalog>{}
)
