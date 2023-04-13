import * as DOM from 'project:utils/client/ZOM.ts'
import content from './Radio.html?withtype=fragment'
import styling from './Radio.css?withtype=style'

export default DOM.elementOf({
	name: 'a-control-radio',

	constructor() {
		const element = this
		const shadowRoot = element.attachShadow({ mode: 'open' })

		shadowRoot.adoptedStyleSheets = [ styling ]
		shadowRoot.replaceChildren(content.cloneNode(true))

		const shadowRadio = DOM.queryPart<HTMLSpanElement>(shadowRoot, 'indicator')!
		const shadowIndicator = DOM.queryPart<HTMLSlotElement>(shadowRoot, 'checked-indicator')!
		const shadowLabel = DOM.queryPart<HTMLSlotElement>(shadowRoot, 'label')!

		const internals = DOM.internals<Internals, DOM.CustomElement>(element, () => ({
			shadowRoot,
			shadowRadio,
			shadowIndicator,
			shadowLabel,

			selected: false,
			defaultSelected: false,
			isSelectedSet: false,
			setSelected(selected) {
				if (selected !== this.selected) {
					this.selected = selected

					shadowRadio.part.toggle('selected', selected)
					shadowIndicator.part.toggle('selected', selected)
					shadowLabel.part.toggle('selected', selected)

					DOM.dispatchEvent(element, 'input', { bubbles: true, composed: true })
					DOM.dispatchEvent(element, 'change', { bubbles: true, composed: true })
				}
			},

			value: '',
			defaultValue: '',
			isValueSet: false,
			setValue(value) {
				if (value !== this.value) {
					this.value = value

					DOM.dispatchEvent(element, 'input', { bubbles: true, composed: true })
					DOM.dispatchEvent(element, 'change', { bubbles: true, composed: true })
				}
			},
		}))

		DOM.supportKeyClick(element)

		element.addEventListener('click', event => {
			event.preventDefault()

			internals.isSelectedSet = true

			internals.setSelected(!internals.selected)
		})

		element.tabIndex = 0
	},

	prototype: {
		get defaultSelected(): boolean {
			return DOM.internals<Internals>(this).defaultSelected
		},

		get selected(): boolean {
			return DOM.internals<Internals>(this).selected
		},

		set selected(selected) {
			DOM.internals<Internals>(this).setSelected(selected)
		},

		get value(): string {
			return DOM.internals<Internals>(this).value
		},

		set value(value) {
			DOM.internals<Internals>(this).setValue(value)
		},
	},

	observeAttributes: {
		selected(attributeChecked) {
			const internals = DOM.internals<Internals>(this)

			internals.defaultSelected = attributeChecked !== null

			if (internals.isSelectedSet === false) {
				internals.setSelected(internals.defaultSelected)
			}
		},
		value(attributeValue) {
			const internals = DOM.internals<Internals>(this)

			internals.defaultValue = attributeValue || ''

			if (internals.isValueSet === false) {
				internals.setValue(internals.defaultValue)
			}
		},
	},
})

interface Internals {
	shadowRoot: ShadowRoot
	shadowRadio: HTMLSpanElement
	shadowIndicator: HTMLSlotElement
	shadowLabel: HTMLSlotElement

	selected: boolean
	defaultSelected: boolean
	isSelectedSet: boolean
	setSelected(value: boolean): void

	value: string
	defaultValue: string
	isValueSet: boolean
	setValue(value: string): void
}
