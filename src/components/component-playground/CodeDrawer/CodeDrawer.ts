import * as DOM from 'project:utils/client/DOM'
import ReflectedElement from 'project:utils/client/ReflectedElement.ts'
import { h } from 'project:utils/html.ts'
import { playgroundSvgs } from 'project:utils/component-playground-svg.ts'
import styling from './CodeDrawer.css?withtype=style'
import content from './CodeDrawer.html?withtype=fragment'

export default class CodeDrawer extends ReflectedElement(
	HTMLElement as typeof CodeDrawerInterface,
	{
		collapsed: {
			defaultValue() {
				return this.defaultCollapsed
			},
			setValue(value) {
				return Boolean(value)
			},
			useAttributes: {
				collapsed() {
					return this.collapsed
				},
			},
		},

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

		defaultCollapsed: {
			defaultValue() {
				return this.getAttribute('collapsed') !== null
			},
			setValue(value) {
				return Boolean(value)
			},
			useAttributes: {
				collapsed() {
					return this.hasAttribute('collapsed')
				},
			},
			onValueChange(value) {
				this.toggleAttribute('collapsed', value)
			},
		},
	}
) {
	constructor() {
		const element: CodeDrawer = super()!

		const shadowRoot = DOM.withShadow(element, {
			mode: 'open',
			content,
			styling,
		})



		const collapseButton = DOM.queryPart<HTMLButtonElement>(shadowRoot, 'collapseButton')!
		collapseButton.appendChild(h(`${playgroundSvgs.collapseIcon}`))
		// trigger a togglePanel event
		DOM.observe(collapseButton, {
			click() {
				element.toggleAttribute('collapsed')

				DOM.trigger(element, {
					togglePanel: { bubbles: true, composed: true },
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

customElements.define('a-code-drawer', CodeDrawer)

declare class CodeDrawerInterface extends HTMLElement {
	/** String label indicating the meaning of the option. */
	label: string

	/** Boolean indicating whether the panel is active. */
	collapsed: boolean

	/** Boolean indicating whether the panel is initially active. */
	defaultCollapsed: boolean
}

interface Internals {
	shadowHeading: HTMLSlotElement
	shadowContent: HTMLSlotElement
}
