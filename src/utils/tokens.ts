import darkTokens from 'project:data/tokens-of-dark.json'
import liteTokens from 'project:data/tokens-of-lite.json'

export const components = (theme: string, componentName: string) => {
	let themeTokens = theme === 'dark' ? darkTokens : liteTokens

	return themeTokens.filter((token) => token.component === componentName)
}

export const references = (theme: string, category: string) => {
	let themeTokens = theme === 'dark' ? darkTokens : liteTokens

	themeTokens = themeTokens.filter(
		(token) => token.tokenLevel === "reference" && token.category === category
	)

	if (category === "spacing") {
		themeTokens = themeTokens.sort(
			(a, b) => parseFloat(a.value as string) - parseFloat(b.value as string)
		)
	}

	return themeTokens
}

export const system = (theme: string, category: string, property: string) => {
	let themeTokens = theme === 'dark' ? darkTokens : liteTokens

	return themeTokens.filter((token) => {
		return (
			token.tokenLevel === "system" &&
			token.category === category &&
			token.property === property
		)
	})
}

export const lookupProperty = (category?: string, property?: string) => {
	switch (category) {
		case 'boxShadow':
			return 'shadow'

		case 'borderRadius':
			return 'radius'
	}

	switch (property) {
		case 'fill':
		case 'icon':
			return 'background'

		// TODO fix in transformer
		case 'on-dark':
		case 'on-light':
			return 'border-width'

		default:
			return property
	}
}
