import * as DOM from 'project:utils/client/DOM'
import ReflectedElement from 'project:utils/client/ReflectedElement.ts'
import content from './Menu.html?withtype=fragment'
import styling from './Menu.css?withtype=style'

export default class MenuElement extends ReflectedElement(
	HTMLElement as typeof MenuElementInterface,
	{
		options: {
			defaultValue() {
				return this.querySelectorAll(':scope > option')
			},
			useChildList() {
				return this.querySelectorAll(':scope > option')
			},
			onValueChange(value) {
				const internals = DOM.withInternals<Internals>(this)

				internals.shadowContent.replaceChildren(
					...Array.from(value, option => option.cloneNode(true))
				)
			},
		},

		value: {
			defaultValue() {
				return DOM.withInternals<Internals>(this).shadowContent.value
			},
			setValue(value) {
				return value
			},
		},
	}
) {
	constructor() {
		const element: MenuElement = super()!

		const shadowRoot = DOM.withShadow(element, {
			mode: 'open',
			content,
			styling,
		})

		DOM.withInternals<Internals>(element, () => ({
			shadowContent: DOM.queryPart<HTMLSelectElement>(shadowRoot, 'content')!,
			shadowIndicator: DOM.queryPart<HTMLSpanElement>(shadowRoot, 'indicator')!,
		}))

		DOM.observe(shadowRoot, {
			change() {
				DOM.trigger(element, {
					change: { bubbles: true, composed: true },
				})
			},
		})
	}
}

customElements.define('a-menu', MenuElement)

declare class MenuElementInterface extends HTMLElement {
	/** List of RadioElements contained by the RadioGroupElement. */
	options: NodeList

	/** String representing the value of the Menu. */
	value: string

	/** String representing the initial value of the Menu. */
	defaultValue: string
}

interface Internals {
	shadowContent: HTMLSelectElement
	shadowIndicator: HTMLSpanElement
}
