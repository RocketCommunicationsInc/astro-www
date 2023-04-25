export * from './ElementConstructors.ts'

/** Observes events on the given element. */
export const observe = (element: Node, handlers: Record<string, { (event: Event & { target: any }): void } | { (event: InputEvent & { target: any }): void }>, options: EventListenerOptions = null as any) => {
	for (let type in handlers) {
		element.addEventListener(type, handlers[type] as EventListener, options)
	}
}

/** Triggers events on the given element. */
export const trigger = (element: EventTarget, triggers: Record<string, EventInit>) => {
	for (let type in triggers) {
		element.dispatchEvent(
			new Event(type, triggers[type])
		)
	}
}

/** Attaches shadow to the given element. */
export const withShadow = (element: HTMLElement, { content, styling, ...shadowInit }: ShadowOptions = {
	mode: 'open'
}) => {
	const shadowRoot = element.attachShadow(shadowInit)

	if (styling) {
		shadowRoot.adoptedStyleSheets = [ styling ]
	}

	if (content) {
		shadowRoot.append(content.cloneNode(true))
	}

	return shadowRoot
}

interface ShadowOptions extends ShadowRootInit {
	content?: Node,
	styling?: CSSStyleSheet
}

/** Enables clickability on the given element. */
export const withClickability = (element: HTMLElement, tabIndex: number | null = 0) => {
	if (tabIndex !== null) {
		element.tabIndex = tabIndex
	}

	element.addEventListener('keydown', handleKeyClick)
	element.addEventListener('keyup', handleKeyClick)
}

export const handleKeyClick = (event: KeyboardEvent & { target: HTMLElement }) => {
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

/** Returns a CSS selector for the given attribute name and value. */
export const getAttributeSelector = (attributeName: string, attributeValue: string, matcher: '' | '~' | '|' | '^' | '$' | '*' = '') => `[${attributeName}${matcher}="${attributeValue}"]`

/** Returns a CSS selector for the given attribute name with any of the given space-separated values. */
export const getTokenSelector = (attributeName: string, values: string, matcher: '' | '~' | '|' | '^' | '$' | '*' = '~') => values.trim().split(/\s+/).map(value => getAttributeSelector(attributeName, value, matcher)).join(',')

/** Returns the value of the attribute on the given element. */
export const attr = (element: Element, name: string) => element.getAttribute(name)

/** Returns the element matching the given part. */
export const queryPart = <T extends Element>(parent: ParentNode, name: string) => parent.querySelector<T>(getTokenSelector('part', name))

/** Observes changes to attributes on the given element. */
export const observeAttributes = <T extends Element>(element: T, callback: { (this: T, attributeValue: string | null): void }, attributeName?: string): MutationObserver => {
	const observer = new MutationObserver(() => {
		callback.call(element, attributeName ? element.getAttribute(attributeName) : null)
	})

	observer.observe(element, attributeName ? { attributeFilter: [ attributeName ] } : { attributes: true })

	queueMicrotask(() => {
		const attributeValue = attributeName ? element.getAttribute(attributeName) : null

		if (attributeName ? attributeValue !== null : element.hasAttributes()) {
			callback.call(element, attributeValue)
		}
	})

	return observer
}

/** Observes changes to children on the given element. */
export const observeChildren = <T extends Element>(element: T, callback: { (this: T, ...childNodes: ChildNode[]): void }): MutationObserver => {
	const observer = new MutationObserver(records => {
		callback.call(element, ...element.childNodes)
	})

	observer.observe(element, { childList: true })

	queueMicrotask(() => {
		if (element.hasChildNodes()) {
			callback.call(element, ...element.childNodes)
		}
	})

	return observer
}

/** Returns a function that returns internal data associated with a given object. */
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

/** Returns internal data associated with the given object. */
export let withInternals = createInternals()

export interface CreateRef {
	<Host extends object = object, Internals extends object = object>(): Referencer<Host, Internals>
}

export interface Referencer<DefaultHost extends object = object, DefaultInternals extends object = object> {
	<Internals extends DefaultInternals = DefaultInternals, Host extends DefaultHost = DefaultHost>(
		host: Host,
		create?: ReferenceCreator<Internals, Host>
	): Internals
}

export interface ReferenceCreator<Internals extends object = object, Host extends object = object> {
	(this: Host, host: Host): Internals
}
