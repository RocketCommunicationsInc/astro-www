import * as DOM from 'project:utils/client/DOM'
import ReflectedElement from 'project:utils/client/ReflectedElement.ts'
import content from './Switch.html?withtype=fragment'
import styling from './Switch.css?withtype=style'

export default class SwitchElement extends ReflectedElement(
	HTMLElement as typeof SwitchElementInterface,
	{
		selected: {
			defaultValue() {
				return this.defaultSelected
			},
			setValue(value) {
				return Boolean(value)
			},
			useAttributes: {
				selected() {
					return this.selected
				},
			},
			onValueChange(selected) {
				const internals = DOM.withInternals<Internals>(this)

				internals.shadowThumb.part.toggle('selected', selected)
				internals.shadowTrack.part.toggle('selected', selected)
			},
		},

		defaultSelected: {
			defaultValue() {
				return this.getAttribute('selected') !== null
			},
			setValue(value) {
				return Boolean(value)
			},
			useAttributes: {
				selected() {
					return this.hasAttribute('selected')
				},
			},
			onValueChange(value) {
				this.toggleAttribute('selected', value)
			},
		},

		value: {
			defaultValue() {
				return this.defaultValue
			},
			setValue(value) {
				return value == null ? '' : String(value)
			},
		},

		defaultValue: {
			defaultValue() {
				return this.getAttribute('value') || ''
			},
			setValue(value) {
				return value == null ? '' : String(value)
			},
			useAttributes: {
				value() {
					return this.getAttribute('value')
				},
			},
			onValueChange(value) {
				this.setAttribute('value', value)
			},
		},
	}
) {
	constructor() {
		const element: SwitchElement = super()!

		const shadowRoot = DOM.withShadow(element, {
			mode: 'open',
			content,
			styling,
		})

		DOM.withClickability(element)

		DOM.withInternals<Internals>(element, () => ({
			shadowRoot,
			shadowTrack: DOM.queryPart<HTMLSpanElement>(shadowRoot, 'track')!,
			shadowThumb: DOM.queryPart<HTMLSpanElement>(shadowRoot, 'thumb')!,
		}))

		DOM.observe(element, {
			click() {
				element.selected = !element.selected

				DOM.trigger(element, {
					input: { bubbles: true, composed: true },
					change: { bubbles: true, composed: true },
				})
			},
		})
	}

	declare type: 'switch'
}

SwitchElement.prototype.type = 'switch'

customElements.define('a-switch', SwitchElement)

declare class SwitchElementInterface extends HTMLElement {
	/** Boolean indicating whether the switch is selected. */
	selected: boolean

	/** String representing the value of the Switch. */
	value: string

	/** Boolean indicating whether the switch is initially selected. */
	defaultSelected: boolean

	/** String representing the initial value of the Switch. */
	defaultValue: string
}

interface Internals {
	shadowRoot: ShadowRoot
	shadowTrack: HTMLSpanElement
	shadowThumb: HTMLSpanElement
}
