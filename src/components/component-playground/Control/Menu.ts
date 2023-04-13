import * as DOM from 'project:utils/client/ZOM.ts'
import styling from './Menu.css?withtype=style'

export default DOM.elementOf({
	name: 'a-control-menu',

	constructor() {
		const element = this
		const shadowRoot = element.attachShadow({ mode: 'open' })
		const shadowControl = new DOM.HTMLElement('select', { type: 'text' })

		shadowRoot.adoptedStyleSheets = [ styling ]
		shadowRoot.replaceChildren(shadowControl)

		DOM.internals<Internals, DOM.CustomElement>(element, () => ({
			shadowRoot,
			shadowControl,
		}))

		shadowControl.addEventListener('change', event => {
			DOM.dispatchEvent(element, 'change', { bubbles: true, composed: true })
		})
	},

	prototype: {
		get value(): string {
			return DOM.internals<Internals>(this).shadowControl.value
		},
	},

	observeChildren(...childNodes) {
		const internals = DOM.internals<Internals, DOM.CustomElement>(this)

		internals.shadowControl.replaceChildren(
			...childNodes.filter(
				childNode => childNode instanceof HTMLOptionElement
			).map(
				option => option.cloneNode(true)
			)
		)
	},
})

interface Internals {
	shadowRoot: ShadowRoot
	shadowControl: HTMLSelectElement
}
