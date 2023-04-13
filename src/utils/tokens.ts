import tokens from '@astrouxds/tokens/dist/json/docs.json'
import lightTokens from '@astrouxds/tokens/dist/json/docs-light.json'

export const reference = (theme: string, category: string) => {
	let themeTokens = tokens
	if (theme === 'light') {
		themeTokens = lightTokens
	}

	themeTokens = themeTokens.filter(
		(token) => token.tokenLevel === 'reference' && token.category === category
	)
	if (category === 'spacing') {
		themeTokens = themeTokens.sort((a, b) => {
			return parseFloat(String(a.value)) - parseFloat(String(b.value))
		})
	}
	return themeTokens
}

export const component = (theme: string, componentName: string) => {
	let themeTokens = tokens
	if (theme === 'light') {
		themeTokens = lightTokens
	}
	return themeTokens.filter((token) => token.component === componentName)
}

export const system = (theme: string, category: string, property: string) => {
	let themeTokens = tokens

	if (theme === 'light') {
		themeTokens = lightTokens
	}

	return themeTokens.filter((token) => {
		return (
			token.tokenLevel === 'system' &&
			token.category === category &&
			token.property === property
		)
	})
}

export const findByName = (name: string) => {
	return tokens.find((token) => token.name === name)
}

export const lookupProperty = (category: string, property?: string) => {
	if (category === 'boxShadow') {
		return 'shadow'
	}

	if (category === 'borderRadius') {
		return 'radius'
	}

	if (property === 'fill' || property === 'icon') {
		return 'background'
	}

	if (property === 'on-dark' || property === 'on-light') {
		return 'border-width'
	}

	if (property === 'footer' || property === 'header') {
		return 'background';
	}

	return property;
}
