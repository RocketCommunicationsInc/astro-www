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

declare global {
	/** GTag Data Layer. */
	// eslint-disable-next-line no-unused-vars,no-var
	var dataLayer: IArguments[]

	/** GTag Command Queue function. */
	// eslint-disable-next-line no-unused-vars,no-var
	var gtag: Gtag
}
