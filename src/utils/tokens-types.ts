
export interface TokenCatalog {
	[categoryId: string]: TokenCategory
}

export interface TokenCategory {
	name: string
	slug: string
	hash: string
	description: string
	note: string

	tokens: {
		[tokenId: string]: Token
	}
}

export interface Token {
	name: string
	slug: string
	hash: string
	category: string
	description: string

	dark: {
		value: string
		description: string
	}

	lite: {
		value: string
		description: string
	}
}

export interface DesignToken {
	id: string
	type: 'reference' | 'system'
	value: string
	category: string
	component: string
	reference: string
	description: string
}

export interface JSONToken {
	name: string;
	value: number | string;
	category: string;
	component: string | null;
	tokenLevel: string;

	description?: string;
	property?: string;
	referenceToken?: string;
}

export interface TokensByTheme {
	[theme: string]: JSONToken
}

export interface TokensByName {
	[token: string]: TokensByTheme
}

export interface TokensByCategory {
	[category: string]: TokensByName
}
