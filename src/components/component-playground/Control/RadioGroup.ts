import * as DOM from 'project:utils/client/ZOM.ts'
import RadioElement from './Radio.ts'
import content from './RadioGroup.html?withtype=fragment'
import styling from './RadioGroup.css?withtype=style'

export default class extends DOM.define('a-control-radiogroup', class RadioGroupElement extends HTMLElement {
	constructor() {
		super()

		const shadowRoot = DOM.attachShadow(this, { mode: 'open' }, content.cloneNode(true), styling)
		const shadowContent = DOM.queryPart<HTMLSelectElement>(shadowRoot, 'content')!

		DOM.internals<Internals>(this, () => ({
			shadowRoot,
			shadowContent,
		}))

		shadowRoot.addEventListener('click', (event) => {
			const targetOption = event.target as RadioElement

			if (targetOption.selected === true) {
				for (const option of this.options) {
					option.selected = option === targetOption
				}
			}
		})
	}

	declare options: RadioElement[]
}, {
	options: {
		defaultValue() {
			return []
		},
		useChildList() {
			const options: RadioElement[] = []

			for (const childNode of this.childNodes) {
				if ('value' in childNode) {
					options.push(childNode as RadioElement)
				}
			}

			return options
		},
	},
}) {}

interface Internals {
	shadowRoot: ShadowRoot
	shadowContent: HTMLSelectElement
}
