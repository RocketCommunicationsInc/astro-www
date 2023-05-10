import * as DOM from 'project:utils/client/DOM'
import ReflectedElement from 'project:utils/client/ReflectedElement.ts'
import styling from './PanelNav.css?withtype=style'
import content from './PanelNav.html?withtype=fragment'

export default class PanelNav extends ReflectedElement(
	HTMLElement as typeof PanelNavInterface,
	{
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
		const element: PanelNav = super()!

		DOM.withShadow(element, {
			mode: 'open',
			content,
			styling,
		})
	}
}

customElements.define('a-panel-nav', PanelNav)

declare class PanelNavInterface extends HTMLElement {
	/** String label indicating the meaning of the option. */
	label: string

	/** Boolean indicating whether the panel is active. */
	active: boolean

	/** Boolean indicating whether the panel is initially active. */
	defaultActive: boolean
}
