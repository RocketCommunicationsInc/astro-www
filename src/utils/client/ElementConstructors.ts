export type primitive = bigint | boolean | null | number | string | symbol | undefined

export type Appendable = Node | string

export interface Attrs {
	[name: string]: primitive
}

const __proto__ = '__proto__'
const prototype = 'prototype'

const __createElementClass = <T extends Element>(Super: abstract new () => T, xmlns: string): {
	prototype: T

	new <Name extends keyof HTMLElementTagNameMap>(name: Name): HTMLElementTagNameMap[Name]
	new (name: string): T
	new <Name extends keyof HTMLElementTagNameMap>(name: Name, attrs: Attrs): HTMLElementTagNameMap[Name]
	new (name: string, attrs: Attrs): T
	new <Name extends keyof HTMLElementTagNameMap>(name: Name, ...children: Appendable[]): HTMLElementTagNameMap[Name]
	new (name: string, ...children: Appendable[]): T
	new <Name extends keyof HTMLElementTagNameMap>(name: Name, attrs: Attrs, ...children: Appendable[]): HTMLElementTagNameMap[Name]
	new (name: string, attrs: Attrs, ...children: Appendable[]): T
} => {
	function Element(name: string, ...args: any[]) {
		return set(
			document.createElementNS(
				'http://www.w3.org/' + xmlns,
				name,
				...args
			),
			...args
		)
	}

	// @ts-ignore
	Element[prototype] = Super[prototype]

	// @ts-ignore
	Element[__proto__] = Super[__proto__]

	return Element as any
}

const HTMLClass = __createElementClass(HTMLElement, '1999/xhtml')
const MathMLClass = __createElementClass(MathMLElement, '1998/Math/MathML')
const SVGClass = __createElementClass(SVGElement, '2000/svg')

export {
	HTMLClass as HTMLElement,
	MathMLClass as MathMLElement,
	SVGClass as SVGElement,
}

export const set = <T extends Element>(
	element: T,
	attrs?: Attrs | primitive,
	...children: Appendable[]
): T => {
	if (isAppendable(attrs)) {
		children.unshift(attrs as string)
	} else {
		for (const name in attrs) {
			setAttr(element, name, attrs[name])
		}
	}

	element.append(...children)

	return element
}

export const isAppendable = (value: unknown): value is bigint | boolean | null | number | string | symbol => value instanceof Node || typeof value !== 'object' && value !== undefined

export let setAttr = <T extends Element>(element: T, name: string, value: primitive): T => (
	element[
		value === null || value === undefined || value === true || value === false
			? 'toggleAttribute'
		: 'setAttribute'
	](
		name,
		// @ts-expect-error
		value
	),
	element
)
