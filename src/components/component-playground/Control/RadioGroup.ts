import * as DOM from 'project:utils/client/ZOM.ts'
import content from './RadioGroup.html?withtype=fragment'
import styling from './RadioGroup.css?withtype=style'

export default DOM.elementOf({
	name: 'a-control-radiogroup',

	constructor() {
		const element = this
		const shadowRoot = element.attachShadow({ mode: 'open' })

		shadowRoot.adoptedStyleSheets = [ styling ]
		shadowRoot.replaceChildren(content.cloneNode(true))

		const shadowContent = DOM.queryPart<HTMLSelectElement>(shadowRoot, 'content')!

		const internals = DOM.internals<Internals, DOM.CustomElement>(element, () => ({
			shadowRoot,
			shadowContent,
			options: [],
			selectedOption: null,
			setSelectedOption(option) {
				if (option !== this.selectedOption) {
					if (this.selectedOption) {
						this.selectedOption.selected = false
					}

					this.selectedOption = option

					if (this.selectedOption) {
						this.selectedOption.selected = true
					}

					DOM.dispatchEvent(element, 'input', { bubbles: true, composed: true })
					DOM.dispatchEvent(element, 'change', { bubbles: true, composed: true })
				}
			},
		}))

		shadowRoot.addEventListener('change', (event) => {
			const option = event.target as any as HTMLOptionElement

			if (internals.options.includes(option)) {
				event.stopImmediatePropagation()

				internals.setSelectedOption(option)
			}
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
			const { selectedOption } = DOM.internals<Internals>(this)

			return selectedOption === null ? '' : selectedOption.value
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

		const options: Internals['options'] = []

		for (const option of childNodes) {
			if (option instanceof HTMLElement) {
				if ('value' in option) {
					options.push(option as HTMLOptionElement)
				}
			}
		}

		const selectedOption = options.find(
			option => option === internals.selectedOption
		) || options.find(
			option => option.selected
		) || options[0] || null

		internals.options = options
		internals.setSelectedOption(selectedOption)
	},
})

interface Internals {
	shadowRoot: ShadowRoot
	shadowContent: HTMLSelectElement

	options: HTMLOptionElement[]
	selectedOption: HTMLOptionElement | null
	setSelectedOption(option: HTMLOptionElement | null): void
}
