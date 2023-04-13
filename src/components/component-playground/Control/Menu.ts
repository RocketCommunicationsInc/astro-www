import * as DOM from 'project:utils/client/ZOM.ts'
import content from './Menu.html?withtype=fragment'
import styling from './Menu.css?withtype=style'

export default DOM.elementOf({
	name: 'a-control-menu',

	constructor() {
		const element = this
		const shadowRoot = element.attachShadow({ mode: 'open' })

		shadowRoot.adoptedStyleSheets = [ styling ]
		shadowRoot.replaceChildren(content.cloneNode(true))

		const shadowContent = DOM.queryPart<HTMLSelectElement>(shadowRoot, 'content')!
		const shadowIndicator = DOM.queryPart<HTMLSpanElement>(shadowRoot, 'indicator')!

		DOM.internals<Internals, DOM.CustomElement>(element, () => ({
			shadowRoot,
			shadowContent,
			shadowIndicator,
		}))

		shadowRoot.addEventListener('change', () => {
			DOM.dispatchEvent(element, 'change', { bubbles: true, composed: true })
		})
	},

	prototype: {
		get defaultValue(): string {
			const element = this as any as HTMLElement

			return (
				element.querySelector<HTMLOptionElement>('[selected]')?.value ||
				this.value
			)
		},

		get value(): string {
			return DOM.internals<Internals>(this).shadowContent.value
		},

		set value(value) {
			const { shadowContent } = DOM.internals<Internals>(this)

			const shadowOption = [
				...shadowContent.options
			].find(
				option => option.value === value
			)

			if (shadowOption) {
				shadowOption.selected = true
			}
		},
	},

	observeChildren(...childNodes) {
		const internals = DOM.internals<Internals, DOM.CustomElement>(this)

		internals.shadowContent.replaceChildren(
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
	shadowContent: HTMLSelectElement
	shadowIndicator: HTMLSpanElement
}
