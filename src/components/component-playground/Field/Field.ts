import * as DOM from 'project:utils/client/DOM'
import ReflectedElement from 'project:utils/client/ReflectedElement.ts'
import styling from './Field.css?withtype=style'
import content from './Field.html?withtype=fragment'

export default class FieldElement extends ReflectedElement(
	HTMLElement as typeof FieldElementInterface,
	{
		label: {
			defaultValue() {
				return ''
			},
			setValue(label) {
				return label == null ? '' : String(label)
			},
			useAttributes: {
				label() {
					return this.getAttribute('label') || ''
				},
			},
			onValueChange(label) {
				const internals = DOM.withInternals<Internals>(this)

				internals.shadowLabel.textContent = label
			},
		},

		labelHidden: {
			defaultValue() {
				return this.defaultLabelHidden
			},
			setValue(labelHidden) {
				return Boolean(labelHidden)
			},
			useAttributes: {
				labelhidden() {
					return this.labelHidden
				},
			},
			onValueChange(labelHidden) {
				const internals = DOM.withInternals<Internals>(this)

				internals.shadowLabel.part.toggle('hidden-label', labelHidden)
			},
		},

		defaultLabelHidden: {
			defaultValue() {
				return this.getAttribute('labelhidden') !== null
			},
			setValue(labelHidden) {
				return Boolean(labelHidden)
			},
			useAttributes: {
				labelhidden() {
					return this.hasAttribute('labelhidden')
				},
			},
			onValueChange(labelHidden) {
				this.toggleAttribute('labelhidden', labelHidden)
			},
		},
	}
) {
	constructor() {
		const element: FieldElement = super()!

		const shadowRoot = DOM.withShadow(element, {
			mode: 'open',
			content,
			styling,
		})

		DOM.withInternals<Internals>(element, () => ({
			shadowLabel: DOM.queryPart<HTMLSpanElement>(shadowRoot, 'label')!,
		}))
	}
}

customElements.define('a-field', FieldElement)

declare class FieldElementInterface extends HTMLElement {
	/** String label indicating the meaning of the option. */
	label: string

	/** Boolean indicating whether the option is selected. */
	labelHidden: boolean

	/** String representing the value of the Radio. */
	value: string

	/** Boolean indicating whether the option is initially selected. */
	defaultLabelHidden: boolean

	/** String representing the initial value of the Radio. */
	defaultValue: string
}

interface Internals {
	shadowLabel: HTMLSpanElement
}
