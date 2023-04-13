import * as DOM from 'project:utils/client/ZOM.ts'
import styling from './Switch.css?withtype=style'
import content from './Switch.html?withtype=fragment'

export default DOM.elementOf({
	name: 'a-control-switch',

	constructor() {
		const element = this
		const shadowRoot = element.attachShadow({ mode: 'open' })

		shadowRoot.adoptedStyleSheets = [ styling ]
		shadowRoot.replaceChildren(content.cloneNode(true))

		const shadowTrack = DOM.queryPart<HTMLSpanElement>(shadowRoot, 'track')!
		const shadowThumb = DOM.queryPart<HTMLSpanElement>(shadowRoot, 'thumb')!

		const internals = DOM.internals<Internals, DOM.CustomElement>(element, () => ({
			shadowRoot,
			shadowTrack,
			shadowThumb,

			checked: false,
			defaultChecked: false,
			isCheckedSet: false,
			setChecked(checked) {
				if (checked !== this.checked) {
					this.checked = checked

					DOM.dispatchEvent(element, 'change', { bubbles: true, composed: true })

					shadowTrack.part.toggle('checked', checked)
					shadowThumb.part.toggle('checked', checked)
				}
			},
		}))

		DOM.supportKeyClick(element)

		element.addEventListener('click', event => {
			event.preventDefault()

			internals.isCheckedSet = true

			internals.setChecked(!internals.checked)
		})

		element.tabIndex = 0
	},

	prototype: {
		get defaultChecked(): boolean {
			return DOM.internals<Internals>(this).defaultChecked
		},

		get checked(): boolean {
			return DOM.internals<Internals>(this).checked
		},

		set checked(checked) {
			DOM.internals<Internals>(this).setChecked(checked)
		},
	},

	observeAttributes: {
		checked(attributeChecked) {
			const internals = DOM.internals<Internals>(this)

			internals.defaultChecked = attributeChecked !== null

			if (internals.isCheckedSet === false) {
				internals.setChecked(internals.defaultChecked)
			}
		},
	},
})

interface Internals {
	shadowRoot: ShadowRoot
	shadowTrack: HTMLSpanElement
	shadowThumb: HTMLSpanElement

	checked: boolean
	defaultChecked: boolean

	isCheckedSet: boolean
	setChecked(value: boolean): void
}
