import * as DOM from 'project:utils/client/DOM.ts'
import ReflectedElement from 'project:utils/client/ReflectedElement.ts'
import RadioElement from './Radio.ts'
import content from './RadioGroup.html?withtype=fragment'
import styling from './RadioGroup.css?withtype=style'

export default class RadioGroupElement extends ReflectedElement(
	HTMLElement as typeof RadioGroupElementInterface,
	{
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
	}
) {
	constructor() {
		const element: RadioGroupElement = super()!

		const shadowRoot = DOM.withShadow(element, {
			mode: 'open',
			content,
			styling,
		})

		DOM.withClickability(element)

		DOM.withInternals<Internals>(element, () => ({
			shadowRoot,
			shadowContent: DOM.queryPart<HTMLSelectElement>(shadowRoot, 'content')!,
		}))

		DOM.observe(element, {
			click(event) {
				const targetOption = event.target as RadioElement

				if (targetOption.selected === true) {
					for (const option of element.options) {
						option.selected = option === targetOption
					}
				}
			},
		})
	}
}

customElements.define('a-radiogroup', RadioGroupElement)

declare class RadioGroupElementInterface extends HTMLElement {
	/** List of RadioElements contained by the RadioGroupElement. */
	options: RadioElement[]
}

interface Internals {
	shadowRoot: ShadowRoot
	shadowContent: HTMLSelectElement
}
