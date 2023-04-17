import * as DOM from 'project:utils/client/ZOM.ts'
import content from './Switch.html?withtype=fragment'
import styling from './Switch.css?withtype=style'

export default class extends DOM.define('a-control-switch', class SwitchElement extends HTMLElement {
	constructor() {
		super()

		const shadowRoot = DOM.attachShadow(this, { mode: 'open' }, content.cloneNode(true), styling)

		const shadowTrack = DOM.queryPart<HTMLSpanElement>(shadowRoot, 'track')!
		const shadowThumb = DOM.queryPart<HTMLSpanElement>(shadowRoot, 'thumb')!

		DOM.internals<Internals>(this, () => ({
			shadowRoot,
			shadowTrack,
			shadowThumb,
		}))

		DOM.supportKeyClick(this)

		this.addEventListener('click', event => {
			this.selected = !this.selected

			DOM.dispatchEvent(this, 'input', { bubbles: true, composed: true })
			DOM.dispatchEvent(this, 'change', { bubbles: true, composed: true })
		})

		this.tabIndex = 0
	}

	get type() {
		return 'switch'
	}

	declare defaultSelected: boolean
	declare selected: boolean
}, {
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

			internals.shadowThumb.part.toggle('selected', this.selected)
			internals.shadowTrack.part.toggle('selected', this.selected)
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
}) {}

interface Internals {
	shadowRoot: ShadowRoot
	shadowTrack: HTMLSpanElement
	shadowThumb: HTMLSpanElement
}
