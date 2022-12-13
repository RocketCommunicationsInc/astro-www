import DOMPurify from 'isomorphic-dompurify'

export class Sanitizer {
	constructor(config?: Partial<SanitizerConfig>) {
		Boolean(config)
	}

	sanitize(input: DocumentOrShadowRoot) {
		Boolean(input)
	}

	sanitizeFor(element: string, input: string) {
		return DOMPurify.sanitize(input)
	}
}

interface SanitizerConfig {
	allowElements: string[]
	blockElements: string[]
	dropElements: string[]
	allowAttributes: {
		[attributeName: string]: string[]
	}
	dropAttributes: {
		[attributeName: string]: string[]
	}
	allowCustomElements: boolean
	allowComments: boolean
}
