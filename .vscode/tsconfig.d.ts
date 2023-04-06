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

declare function fetch<T extends Partial<ResponseData> = ResponseData>(input: RequestInfo | URL, init?: RequestInit): Promise<Response<T>>

declare var visualViewport: VisualViewport
