import * as DOM from 'project:utils/client/ZOM.ts'
import styling from './Field.css?withtype=style'
import content from './Field.html?withtype=fragment'

export default DOM.elementOf({
	name: 'a-field',

	constructor() {
		const element = this
		const shadowRoot = element.attachShadow({ mode: 'open' })

		shadowRoot.adoptedStyleSheets = [ styling ]
		shadowRoot.replaceChildren(content.cloneNode(true))

		const shadowLabel = DOM.queryPart<HTMLSpanElement>(shadowRoot, 'label')!

		const internals = DOM.internals<Internals, DOM.CustomElement>(element, () => ({
			shadowRoot,
			shadowLabel,

			label: '',
			defaultLabel: '',
			isLabelSet: false,
			setLabel(label) {
				if (label !== this.label) {
					this.label = label

					DOM.dispatchEvent(element, 'changelabel', { bubbles: true, composed: true })
				}
			},

			hiddenLabel: false,
			setHiddenLabel(hiddenLabel) {
				if (hiddenLabel !== this.hiddenLabel) {
					this.hiddenLabel = hiddenLabel

					shadowLabel.part.toggle('hidden-label', this.hiddenLabel)
				}
			},
		}))

		element.addEventListener('changelabel', () => {
			internals.shadowLabel.textContent = internals.label
		})
	},

	prototype: {
		get defaultLabel(): string {
			return DOM.internals<Internals>(this).defaultLabel
		},

		get label(): string {
			return DOM.internals<Internals>(this).label
		},

		set label(label) {
			DOM.internals<Internals>(this).setLabel(label)
		},
	},

	observeAttributes: {
		label(attributeLabel) {
			const internals = DOM.internals<Internals>(this)

			internals.defaultLabel = attributeLabel === null ? '' : attributeLabel

			if (internals.isLabelSet === false) {
				internals.setLabel(internals.defaultLabel)
			}
		},
		hiddenlabel(attributeHiddenLabel) {
			const internals = DOM.internals<Internals>(this)

			internals.setHiddenLabel(attributeHiddenLabel !== null)
		},
	},
})

interface Internals {
	shadowRoot: ShadowRoot
	shadowLabel: HTMLSpanElement

	label: string
	defaultLabel: string
	isLabelSet: boolean
	setLabel(label: string): void

	hiddenLabel: boolean
	setHiddenLabel(hiddenLabel: boolean): void
}
