export * from './ZOM.DOM.ts'

// internals

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

// exports

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
	class Element extends HTMLElement {
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

export const define = <
	Properties extends ObjectOf<Properties>,
	Element extends HTMLElement
>(
	name: string,
	Class: {
		prototype: Element
		new (): Element
	},
	properties: {
		[K in keyof Element]?: PropertyDescriptor<Element,
			K extends keyof Element
				? Element[K]
			: Properties[K]
		>
	}
): {
	prototype: Element
	new (): Element
} => {
	const withPropertyInternals = createInternals()

	// @ts-expect-error
	class CustomElement extends Class {
		constructor() {
			const host: Element = super()!

			const propertyInternals = withPropertyInternals<PropertyInternals>(host, () => ({}))

			for (const name in properties) {
				const descriptor = properties[name]!

				propertyInternals[name] = {
					value: undefined,
					hasSetValue: !('setValue' in descriptor),
					setValue(value) {
						if (typeof descriptor.setValue === 'function') {
							value = descriptor.setValue.call(host, value)
						}

						if (value !== this.value) {
							this.value = value

							if (typeof descriptor.onValueChange === 'function') {
								descriptor.onValueChange.call(host, value)
							}
						}
					},
				}
			}

			for (const name in properties) {
				const descriptor = properties[name]!
				const internals = propertyInternals[name]

				for (const attributeName in descriptor.useAttributes) {
					const callback = descriptor.useAttributes[attributeName]

					observeAttributes(host, () => {
						internals.setValue(callback.call(host))
					}, attributeName)
				}

				if (typeof descriptor.useChildList === 'function') {
					const callback = descriptor.useChildList

					observeChildren(host, () => {
						const returnValue = callback.call(host)

						internals.setValue(returnValue)
					})
				}
			}
		}
	}

	for (const name in properties) {
		const descriptor = properties[name]!

		Object.defineProperty(CustomElement.prototype, name, {
			get(this: Element) {
				const internals = withPropertyInternals<PropertyInternals>(this)[name]

				return (
					internals.hasSetValue
						? internals.value
					: descriptor.defaultValue.call(this)
				)
			},
			set(this: Element, value) {
				const internals = withPropertyInternals<PropertyInternals>(this)[name]

				internals.hasSetValue = true

				internals.setValue(value)
			},
		})
	}

	customElements.define(name, CustomElement)

	return CustomElement as any
}

interface PropertyInternals {
	[name: PropertyKey]: {
		value: any
		hasSetValue: boolean
		setValue(value: any): void
	}
}

type PropertyDescriptor<Element, Value> = {
	/** Returns the value when it has not been set by the user. */
	defaultValue(this: Element): Value

	/** Returns the value when it is requested. */
	getValue?(this: Element): Value

	/** Attempts to set the value. */
	setValue?(this: Element, value: any): Value

	/** Sets the property value on childlist mutations. */
	useChildList?(this: Element): any

	/** Sets the property value on attribute mutations. */
	useAttributes?: {
		[attributeName: string]: {
			(this: Element): any
		}
	}

	/** Called whenever the value has been changed. */
	onValueChange?(this: Element, value: Value): void
}

type ObjectOf<T> = {
	[K in keyof T]: T[K]
}

export const attachShadow = <T extends Element>(element: T, options: ShadowRootInit, content?: Node, styling?: CSSStyleSheet) => {
	const shadowRoot = element.attachShadow(options)

	if (styling) {
		shadowRoot.adoptedStyleSheets = [ styling ]
	}

	if (content) {
		shadowRoot.append(content)
	}

	return shadowRoot
}

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
export let setInternals = <Internals extends object>(target: object, value: Internals): Internals => (
	internals(target, () => value)
)

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
