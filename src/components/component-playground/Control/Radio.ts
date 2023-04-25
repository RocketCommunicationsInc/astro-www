import * as DOM from 'project:utils/client/DOM'
import ReflectedElement from 'project:utils/client/ReflectedElement.ts'
import content from './Radio.html?withtype=fragment'
import styling from './Radio.css?withtype=style'

export default class RadioElement extends ReflectedElement(
	HTMLElement as typeof RadioElementInterface,
	{
		label: {
			defaultValue() {
				return ''
			},
			setValue(value) {
				return value == null ? '' : String(value)
			},
			useChildList() {
				return this.textContent
			},
			onValueChange(value) {
				const internals = DOM.withInternals<Internals>(this)

				internals.shadowLabel.textContent = value
			},
		},

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

				internals.shadowIndicator.part.toggle('selected', selected)
				internals.shadowCheckedIndicator.part.toggle('selected', selected)
				internals.shadowLabel.part.toggle('selected', selected)
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
		const element: RadioElement = super()!

		const shadowRoot = DOM.withShadow(element, {
			mode: 'open',
			content,
			styling,
		})

		DOM.withClickability(element)

		DOM.withInternals<Internals>(element, () => ({
			shadowRoot,
			shadowIndicator: DOM.queryPart<HTMLSlotElement>(shadowRoot, 'indicator')!,
			shadowCheckedIndicator: DOM.queryPart<HTMLSlotElement>(shadowRoot, 'checked-indicator')!,
			shadowLabel: DOM.queryPart<HTMLSlotElement>(shadowRoot, 'label')!,
		}))

		DOM.observe(element, {
			click() {
				if (element.selected === false) {
					element.selected = true

					DOM.trigger(element, {
						input: { bubbles: true, composed: true },
						change: { bubbles: true, composed: true },
					})
				}
			},
		})
	}

	declare type: 'radio'
}

RadioElement.prototype.type = 'radio'

customElements.define('a-radio', RadioElement)

declare class RadioElementInterface extends HTMLElement {
	/** String label indicating the meaning of the option. */
	label: string

	/** Boolean indicating whether the option is selected. */
	selected: boolean

	/** String representing the value of the Radio. */
	value: string

	/** Boolean indicating whether the option is initially selected. */
	defaultSelected: boolean

	/** String representing the initial value of the Radio. */
	defaultValue: string
}

interface Internals {
	shadowRoot: ShadowRoot
	shadowIndicator: HTMLSlotElement
	shadowCheckedIndicator: HTMLSlotElement
	shadowLabel: HTMLSlotElement
}
