import * as DOM from 'project:utils/client/ZOM.ts'
import content from './Radio.html?withtype=fragment'
import styling from './Radio.css?withtype=style'

export default class extends DOM.define('a-control-radio', class RadioElement extends HTMLElement {
	constructor() {
		super()

		const shadowRoot = DOM.attachShadow(this, { mode: 'open' }, content.cloneNode(true), styling)
		const shadowIndicator = DOM.queryPart<HTMLSlotElement>(shadowRoot, 'indicator')!
		const shadowCheckedIndicator = DOM.queryPart<HTMLSlotElement>(shadowRoot, 'checked-indicator')!
		const shadowLabel = DOM.queryPart<HTMLSlotElement>(shadowRoot, 'label')!

		DOM.internals<Internals>(this, () => ({
			shadowRoot,
			shadowIndicator,
			shadowCheckedIndicator,
			shadowLabel,
		}))

		DOM.supportKeyClick(this)

		this.addEventListener('click', event => {
			if (this.selected === false) {
				this.selected = true

				DOM.dispatchEvent(this, 'input', { bubbles: true, composed: true })
				DOM.dispatchEvent(this, 'change', { bubbles: true, composed: true })
			}
		})

		this.tabIndex = 0
	}

	get type() {
		return 'radio'
	}

	declare defaultSelected: boolean
	declare defaultValue: string
	declare label: string
	declare selected: boolean
	declare value: string
}, {
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
			this.textContent = value
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
		onValueChange() {
			const internals = DOM.internals<Internals>(this)

			internals.shadowIndicator.part.toggle('selected', this.selected)
			internals.shadowCheckedIndicator.part.toggle('selected', this.selected)
			internals.shadowLabel.part.toggle('selected', this.selected)
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
}) {}

interface Internals {
	shadowRoot: ShadowRoot
	shadowIndicator: HTMLSlotElement
	shadowCheckedIndicator: HTMLSlotElement
	shadowLabel: HTMLSlotElement
}
