import * as DOM from 'project:utils/client/ZOM.ts'
import styling from './Text.css?withtype=style'

export default DOM.elementOf({
	name: 'a-control-text',

	constructor() {
		const element = this
		const shadowRoot = element.attachShadow({ mode: 'open' })
		const shadowInput = new DOM.HTMLElement('input', { type: 'text' })

		shadowRoot.adoptedStyleSheets = [ styling ]
		shadowRoot.replaceChildren(shadowInput)

		const internals = DOM.internals<Internals, DOM.CustomElement>(element, () => ({
			shadowRoot,
			shadowInput,

			value: '',
			defaultValue: '',
			isValueSet: false,
			setValue(value) {
				if (value !== this.value) {
					this.value = value

					DOM.dispatchEvent(element, 'change', { bubbles: true, composed: true })
				}
			},
		}))

		shadowInput.addEventListener('input', () => {
			internals.setValue(shadowInput.value)
		})
	},

	prototype: {
		get defaultValue(): string {
			return DOM.internals<Internals>(this).defaultValue
		},

		get value(): string {
			return DOM.internals<Internals>(this).value
		},

		set value(value) {
			DOM.internals<Internals>(this).setValue(value)
		},
	},

	observeAttributes: {
		value(attributeValue) {
			const internals = DOM.internals<Internals>(this)

			internals.defaultValue = attributeValue === null ? '' : attributeValue

			if (internals.isValueSet === false) {
				internals.setValue(internals.defaultValue)
			}
		},
	},
})

interface Internals {
	shadowRoot: ShadowRoot
	shadowInput: HTMLInputElement

	value: string
	defaultValue: string

	isValueSet: boolean
	setValue(value: string): void
}
