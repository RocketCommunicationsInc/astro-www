/*
 * Corrects mistakes in the built-in TypeScript definitions.
 * =============================================================================
 */

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

interface ResponseData {
	arrayBuffer: ArrayBuffer
	formData: FormData
	blob: Blob
	json: any
	text: string
}

interface Response<T extends Partial<ResponseData> = ResponseData> extends Omit<globalThis.Response, 'json' | 'text'> {
	arrayBuffer(): Promise<T['arrayBuffer']>
	blob(): Promise<T['blob']>
	formData(): Promise<T['formData']>
	json(): Promise<T['json']>
	text(): Promise<T['text']>
}

interface GlobalEventHandlersEventMap {
	"click": PointerEvent
	"input": InputEvent
}

interface HTMLElement extends Element, ElementCSSInlineStyle, ElementContentEditable, GlobalEventHandlers, HTMLOrSVGElement {
	addEventListener<K extends keyof HTMLElementEventMap>(
		type: K,
		listener: (
			this: HTMLElement,
			event: HTMLElementEventMap[K] & { target: this }
		) => any,
		options?: boolean | AddEventListenerOptions
	): void
}

interface HTMLInputElement extends HTMLElement {
	addEventListener<K extends keyof HTMLElementEventMap>(
		type: K,
		listener: (
			this: HTMLInputElement,
			event: HTMLElementEventMap[K] & { target: this }
		) => any,
		options?: boolean | AddEventListenerOptions
	): void
}

declare function fetch<T extends Partial<ResponseData> = ResponseData>(input: RequestInfo | URL, init?: RequestInit): Promise<Response<T>>

declare var visualViewport: VisualViewport

// constructable stylesheet import
declare module '*?withtype=style' {
	export default Object as CSSStyleSheet
}

// constructable fragment import
declare module '*?withtype=fragment' {
	export default Object as DocumentFragment
}
