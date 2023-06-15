import * as DOM from 'project:utils/client/DOM'
import ReflectedElement from 'project:utils/client/ReflectedElement.ts'
import content from './Menu.html?withtype=fragment'
import styling from './Menu.css?withtype=style'

export default class MenuElement extends ReflectedElement(
	HTMLElement as typeof MenuElementInterface,
	{
		options: {
			defaultValue() {
				return this.querySelectorAll(':scope > option')
			},
			useChildList() {
				return this.querySelectorAll(':scope > option')
			},
			onValueChange(value) {
				const internals = DOM.withInternals<Internals>(this)

				internals.shadowContent.replaceChildren(
					...Array.from(value, option => option.cloneNode(true))
				)
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
				// find the actual default value
				const allOptions = Array.from(this.options) as HTMLOptionElement[]
				// the default value will either be set in the options, or we will choose the first option in the select menu
				let trueDefault = allOptions.find((option) => (option).hasAttribute('selected'))?.value || allOptions[0].value
				// set it to the menu select
				DOM.withInternals<Internals>(this).shadowContent.value = trueDefault
				return trueDefault
			},
			setValue(value) {
				return value == null ? '' : String(value)
			},
		}
	}
) {
	constructor() {
		const element: MenuElement = super()!

		const shadowRoot = DOM.withShadow(element, {
			mode: 'open',
			content,
			styling,
		})

		DOM.withInternals<Internals>(element, () => ({
			shadowContent: DOM.queryPart<HTMLSelectElement>(shadowRoot, 'content')!,
			shadowIndicator: DOM.queryPart<HTMLSpanElement>(shadowRoot, 'indicator')!,
		}))

		DOM.observe(shadowRoot, {
			// listen for when event input happens on a-menu (meaning in this case a select menu change)
			input(event: InputEvent & { target: HTMLSelectElement }) {
				// set the a-menu value to the same thing as the select menu when it changes
				element.value = event.target.value

				// dispatch an event that we did this to this element specifically
				element.dispatchEvent(new InputEvent('input', event))
			},
			change() {
				DOM.trigger(element, {
					change: { bubbles: true, composed: true },
				})
			},
		})
	}

	declare type: 'menu'
}

MenuElement.prototype.type = 'menu'

customElements.define('a-menu', MenuElement)

declare class MenuElementInterface extends HTMLElement {
	/** List of Menu Options contained by the MenuElement. */
	options: NodeList

	/** String representing the value of the Menu. */
	value: string

	/** String representing the initial value of the Menu. */
	defaultValue: string
}

interface Internals {
	shadowContent: HTMLSelectElement
	shadowIndicator: HTMLSpanElement
}
