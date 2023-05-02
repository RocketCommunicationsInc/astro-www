import * as DOM from 'project:utils/client/DOM'
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

		DOM.withInternals<Internals>(element, () => ({
			shadowHeading: DOM.queryPart<HTMLSlotElement>(shadowRoot, 'heading')!,
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
