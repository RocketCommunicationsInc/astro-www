/*
 * Corrects mistakes in the built-in TypeScript definitions.
 * =============================================================================
 */

interface ScrollToOptions {
	behavior: string
}

interface Element {
	insertAdjacentElement<T extends Element>(where: InsertPosition, element: T): T
}

interface CSSStyleDeclaration {
	setProperty(property: string, value: string | number | boolean, priority?: string): void
}

declare namespace NodeJS {
	type Timeout = number
	type Timer = number
}
