import * as DOM from 'project:utils/client/DOM'
import { h } from 'project:utils/html.ts'
import ReflectedElement from 'project:utils/client/ReflectedElement.ts'
import styling from './Panel.css?withtype=style'
import content from './Panel.html?withtype=fragment'

export default class PanelElement extends ReflectedElement(
	HTMLElement as typeof PanelElementInterface,
	{
		label: {
			defaultValue() {
				return ''
			},
			setValue(value) {
				return value == null ? '' : String(value)
			},
			useAttributes: {
				label() {
					return this.getAttribute('label') || ''
				},
			},
			onValueChange(label) {
				const internals = DOM.withInternals<Internals>(this)

				internals.shadowHeading.replaceChildren(label)
			},
		},

		active: {
			defaultValue() {
				return this.defaultActive
			},
			setValue(value) {
				return Boolean(value)
			},
			useAttributes: {
				active() {
					return this.active
				},
			},
		},

		defaultActive: {
			defaultValue() {
				return this.getAttribute('active') !== null
			},
			setValue(value) {
				return Boolean(value)
			},
			useAttributes: {
				active() {
					return this.hasAttribute('active')
				},
			},
			onValueChange(value) {
				this.toggleAttribute('active', value)
			},
		},
	}
) {
	constructor() {
		const element: PanelElement = super()!

		const shadowRoot = DOM.withShadow(element, {
			mode: 'open',
			content,
			styling,
		})
		const closeButton = DOM.queryPart<HTMLButtonElement>(shadowRoot, 'closeButton')!
		closeButton.appendChild(h('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Close</title><path d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59 7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12 5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4Z"></path></svg>'))
		// trigger a closePanel event
		DOM.observe(closeButton, {
			click() {
				element.setAttribute('hidden', '')
				DOM.trigger(element, {
					closePanel: { bubbles: true, composed: true },
				})
			}
		})

		const shadowHeading = DOM.queryPart<HTMLSlotElement>(shadowRoot, 'headingTitle')!

		DOM.withInternals<Internals>(element, () => ({
			shadowHeading,
			shadowContent: DOM.queryPart<HTMLSlotElement>(shadowRoot, 'content')!,
		}))
	}
}

customElements.define('a-panel', PanelElement)

declare class PanelElementInterface extends HTMLElement {
	/** String label indicating the meaning of the option. */
	label: string

	/** Boolean indicating whether the panel is active. */
	active: boolean

	/** Boolean indicating whether the panel is initially active. */
	defaultActive: boolean
}

interface Internals {
	shadowHeading: HTMLSlotElement
	shadowContent: HTMLSlotElement
}
