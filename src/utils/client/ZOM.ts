const {
	HTMLElement: GlobalHTMLElement,
	MathMLElement: GlobalMathMLElement,
	SVGElement: GlobalSVGElement
} = globalThis

// internals

let __createElementClass = <T extends Element>(Super: abstract new () => T, xmlns: string): {
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

let __handleKeyClickEvent = (event: KeyboardEvent & { target: HTMLElement }) => {
	switch (event.key) {
		case event.type === 'keydown' && 'Enter':
			event.target.click()

		case ' ':
			event.preventDefault()

			if (!event.altKey && event.type === 'keyup') {
				event.target.click()
			}
	}
}

const __proto__ = '__proto__'
const prototype = 'prototype'

// exports

export const isAppendable = (value: unknown): value is bigint | boolean | null | number | string | symbol => value instanceof Node || typeof value !== 'object' && value !== undefined

export const getTokenSelector = (token: string, parts: string) => parts.trim().split(/\s+/).map(part => `[${token}~="${part}"]`).join(',')

export const attr = (element: Element, name: string) => element.getAttribute(name)
export const token = <T extends Element>(parent: ParentNode, type: string, name: string) => parent.querySelector<T>(getTokenSelector(type, name))

export const queryPart = <T extends Element>(parent: ParentNode, name: string) => token<T>(parent, 'part', name)

export const extend = <T extends object>(target: T, mixin: object): T => Object.defineProperties(target, Object.getOwnPropertyDescriptors(mixin))

export const observeAttributes = <T extends Element>(element: T, callback: { (this: T, attributeValue: string | null): void }, attributeName?: string): void => {
	new MutationObserver(() => {
		callback.call(element, attributeName ? element.getAttribute(attributeName) : null)
	}).observe(element, attributeName ? { attributeFilter: [ attributeName ] } : { attributes: true })

	const attributeValue = attributeName ? element.getAttribute(attributeName) : null

	if (attributeName ? attributeValue !== null : element.hasAttributes()) {
		callback.call(element, attributeValue)
	}
}

export const observeChildren = <T extends Element>(element: T, callback: { (this: T, ...childNodes: ChildNode[]): void }): void => {
	new MutationObserver(records => {
		callback.call(element, ...element.childNodes)
	}).observe(element, { childList: true })

	if (element.hasChildNodes()) {
		callback.call(element, ...element.childNodes)
	}
}

export const supportKeyClick = <T>(element: T & HTMLElement): T => (
	element.addEventListener('keydown', __handleKeyClickEvent),
	element.addEventListener('keyup', __handleKeyClickEvent),
	element
)

export function elementOf<T extends object>(init: ElementOfInit & {
	prototype?: T
}) {
	class Element extends GlobalHTMLElement {
		constructor() {
			const host: this = super()!

			if (init.constructor) {
				init.constructor.call(host as any)
			}

			if (init.observeAttributes) {
				if (typeof init.observeAttributes === 'function') {
					observeAttributes(host as any, init.observeAttributes)
				} else {
					for (const attributeName in init.observeAttributes) {
						observeAttributes(host as any, init.observeAttributes[attributeName], attributeName)
					}
				}
			}

			if (init.observeChildren) {
				observeChildren(host as any, init.observeChildren)
			}
		}
	}

	if (init.prototype) {
		extend(Element.prototype, init.prototype)
	}

	customElements.define(init.name, Element)

	return Element as {
		new (): Element & T
	}
}

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

export let createInternals: CreateRef = (map = new WeakMap()): Referencer => (
	host,
	create = null as any
) => (
	map.has(host)
		? map.get(host)
	: (
		map.set(
			host,
			// @ts-ignore re-use `create` variable
			create = create.call(host, host)
		),
		create
	)
)

export let internals = createInternals()

export const dispatchEvent = (
	element: EventTarget,
	type: string,
	options?: EventInit & Record<PropertyKey, unknown>
): boolean => element.dispatchEvent(
	new Event(type, options)
)

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

export const HTMLElement = __createElementClass(GlobalHTMLElement, '1999/xhtml')
export const MathMLElement = __createElementClass(GlobalMathMLElement, '1998/Math/MathML')
export const SVGElement = __createElementClass(GlobalSVGElement, '2000/svg')

// Types

interface ElementOfInit {
	name: string

	prototype?: object

	constructor: {
		(this: CustomElement): void
	}

	observeAttributes?: {
		(this: CustomElement, value: string | null): void
	} | {
		[attributeName: string]: {
			(this: CustomElement, value: string | null): void
		}
	}

	observeChildren?: {
		(this: CustomElement, ...children: ChildNode[]): void
	}
}

export interface CustomElement extends HTMLElement {
	shadowRoot: ShadowRoot
}

export interface CreateRef {
	(): Referencer
}

export interface Referencer {
	<Internals extends object = object, Host extends object = object>(
		host: Host,
		create?: ReferenceCreator<Internals, Host>
	): Internals
}

export interface ReferenceCreator<Internals extends object = object, Host extends object = object> {
	(this: Host, host: Host): Internals
}

export interface Reference {
	[name: PropertyKey]: unknown
}

export interface Attrs {
	[name: string]: primitive
}

export type Appendable = Node | string

export type primitive = bigint | boolean | null | number | string | symbol | undefined
