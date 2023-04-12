let __proto__ = '__proto__'
let prototype = 'prototype'

export let getTokenSelector = (
	token: string,
	parts: string
) => parts.trim().split(/\s+/).map(part => `[${token}~="${part}"]`).join(',')

export let attr = (element: Element, name: string) => element.getAttribute(name)
export let token = <T extends Element>(parent: ParentNode, type: string, name: string) => parent.querySelector<T>(getTokenSelector(type, name))
export let part = <T extends Element>(parent: ParentNode, name: string) => token<T>(parent, 'part', name)

export let setAttr = <T>(
	element: T & Element,
	name: string,
	value: primitive
): T => (
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

export let set = <T>(
	element: T & Element,
	attrs?: Attrs | primitive,
	...children: ChildNode[]
): T => {
	if (__isAppendable(attrs)) {
		children.unshift(attrs as string)
	} else {
		for (name in attrs) {
			// @ts-expect-error
			setAttr(element, name, attrs[name])
		}
	}

	return append(element, ...children)
}

export let createRef: CreateRef = (map = new WeakMap()): Referencer => (
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

export let ref = createRef()

export let withEvents = <T>(target: T & EventTarget, events: { [type: string]: { (this: T, event: Event): void } }): T => {
	for (let type in events) {
		target.addEventListener(type, events[type].bind(target))
	}
	return target
}

let __isAppendable = (value: unknown): value is bigint | boolean | null | number | string | symbol => value instanceof Node || typeof value !== 'object' && value !== undefined

let __createElementClass = <T extends Element>(Super: abstract new () => T, xmlns: string): {
	prototype: T

	(config: ReflectConfig): Element

	new (): T
	new <Name extends keyof HTMLElementTagNameMap>(name: Name): HTMLElementTagNameMap[Name]
	new (name: string): T
	new <Name extends keyof HTMLElementTagNameMap>(name: Name, attrs: Attrs): HTMLElementTagNameMap[Name]
	new (name: string, attrs: Attrs): T
	new <Name extends keyof HTMLElementTagNameMap>(name: Name, ...children: ChildNode[]): HTMLElementTagNameMap[Name]
	new (name: string, ...children: ChildNode[]): T
	new <Name extends keyof HTMLElementTagNameMap>(name: Name, attrs: Attrs, ...children: ChildNode[]): HTMLElementTagNameMap[Name]
	new (name: string, attrs: Attrs, ...children: ChildNode[]): T
} => {
	function Element(opts: ReflectConfig, ...args: any[]) {
		if (new.target) {
			if (typeof opts === 'string') {
				Class = new.target || Element

				element = set(
					document.createElementNS(
						'http://www.w3.org/' + xmlns,
						opts,
						...args
					),
					...args
				)

				if (Class !== Element) {
					// @ts-ignore
					element[__proto__] = Class[prototype]
				}

				return element
			}

			return Reflect.construct(HTMLElement, arguments, new.target)
		} else {
			return elementOf(opts)
		}
	}

	// @ts-ignore
	Element[prototype] = Super[prototype]

	// @ts-ignore
	Element[__proto__] = Super[__proto__]

	return Element as any
}

let Class: ElementClass
let element: Element
let name: string

export let HTML = __createElementClass(HTMLElement, '1999/xhtml')
export let MathML = __createElementClass(MathMLElement, '1998/Math/MathML')
export let SVG = __createElementClass(SVGElement, '2000/svg')

export let append = <T>(parentNode: T & ParentNode, ...children: ChildNode[]): T => (
	parentNode.append(...children),
	parentNode
)

export let define = <T>(name: string, constructor: T & CustomElementConstructor, options?: ElementDefinitionOptions): T => (
	customElements.define(name, constructor, options),
	constructor
)

export let elementOf = (opts: ReflectConfig) => {
	class Element extends HTMLElement {
		constructor() {
			const host: this = super()!

			if (opts.shadow !== undefined) {
				const root = host.attachShadow(opts.shadow)

				if (__isAppendable(opts.append)) {
					append(root, opts.append.cloneNode(true))
				}

				if (Array.isArray(opts.styles)) {
					root.adoptedStyleSheets = opts.styles
				}
			}

			if (opts.setref !== undefined) {
				ref(host as any, opts.setref)
			}

			if (opts.mutate !== undefined) {
				const callback = opts.mutate.callback.bind(host as CustomElement)
				new MutationObserver(callback).observe(host, opts.mutate)

				const { attributes: [ ...attributes ], childNodes } = host

				callback([
					...attributes.map(
						attr => ({
							type: 'attributes',
							addedNodes: nodes,
							attributeName: attr.name,
							attributeNamespace: attr.namespaceURI,
							nextSibling: null,
							oldValue: null,
							previousSibling: null,
							removedNodes: nodes,
							target: host
						}) as MutationRecord
					),
					{
						type: 'childList',
						addedNodes: childNodes,
						attributeName: null,
						attributeNamespace: null,
						nextSibling: null,
						oldValue: null,
						previousSibling: null,
						removedNodes: nodes,
						target: host
					} as MutationRecord
				])
			}
		}
	}

	return opts.define ? define(opts.define, Element) : Element
}

type ElementClass = (opts: ReflectConfig, ...args: any[]) => Element

const nodes = new DocumentFragment().childNodes

export const Text = globalThis.Text

export class Fragment extends DocumentFragment {
	constructor(...children: ChildNode[]) {
		append(super()! as this, ...children)
	}
}

export class CSS extends CSSStyleSheet {
	constructor(cssText: string) {
		(super()! as this).replaceSync(cssText)
	}
}

export interface ReflectElement<T extends Element = Element> {
	prototype: T
	new(): T
}

interface GenericConfig {
	define?: unknown
	shadow?: unknown
	styles?: unknown
	append?: unknown
	mutate?: unknown
	setref?: unknown
}

export interface ReflectConfig extends GenericConfig {
	define?: string
	shadow?: ReflectShadowConfig
	styles?: CSSStyleSheet[]
	append?: Node
	mutate?: ReflectMutationConfig
	setref?: {
		(this: CustomElement, host: CustomElement): object
	}
}

export interface ReflectShadowConfig extends ShadowRootInit {}

export interface ReflectMutationConfig extends MutationObserverInit {
	callback(this: CustomElement, records: MutationRecord[]): void
}

export interface CustomElementConnectedCallback {
	(this: CustomElement): void
}

export interface Attrs {
	[name: string]: primitive
}

export interface CustomElement extends HTMLElement {
	shadowRoot: ShadowRoot
}

export type ChildNode = Node | string

export type primitive = bigint | boolean | null | number | string | symbol | undefined
