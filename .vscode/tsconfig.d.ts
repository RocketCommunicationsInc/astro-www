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

interface SetTimeout {
	<TArgs extends any[]>(callback: (...args: TArgs) => void, ms?: number, ...args: TArgs): number
}

declare namespace NodeJS {
	type Timeout = number
	type Timer = number
}
