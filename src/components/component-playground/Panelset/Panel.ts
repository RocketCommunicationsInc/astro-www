import * as DOM from 'project:utils/client/DOM'
import { h } from 'project:utils/html.ts'
import { playgroundSvgs } from 'project:utils/component-playground-svg.ts'
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
		const elementName = element.getAttribute('label')!

		const shadowRoot = DOM.withShadow(element, {
			mode: 'open',
			content,
			styling,
		})

		const closeButton = DOM.queryPart<HTMLButtonElement>(shadowRoot, 'closeButton')!
		closeButton.appendChild(h(`${playgroundSvgs.closeIcon}`))
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

		const headingIcon = DOM.queryPart<HTMLSlotElement>(shadowRoot, 'headingIcon')!
		headingIcon.appendChild(h(`${playgroundSvgs[elementName]}`))

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
