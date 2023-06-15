import * as DOM from 'project:utils/client/DOM'
import ReflectedElement from 'project:utils/client/ReflectedElement.ts'
import content from './Text.html?withtype=fragment'
import styling from './Text.css?withtype=style'

export default class TextElement extends ReflectedElement(
	HTMLElement as typeof TextElementInterface,
	{
		type: {
			defaultValue() {
				return this.defaultType
			},
			setValue(type) {
				return type == null ? '' : String(type)
			},
			onValueChange(type) {
				const internals = DOM.withInternals<Internals>(this)

				internals.shadowContent.type = type
			},
		},

		defaultType: {
			defaultValue() {
				return this.getAttribute('type') || ''
			},
			setValue(type) {
				return type == null ? '' : String(type)
			},
			useAttributes: {
				type() {
					return this.getAttribute('type')
				},
			},
			onValueChange(type) {
				this.setAttribute('type', type)

				const internals = DOM.withInternals<Internals>(this)

				internals.shadowContent.setAttribute('type', type)
			},
		},

		value: {
			defaultValue() {
				return this.defaultValue
			},
			setValue(value) {
				return value == null ? '' : String(value)
			},
			onValueChange(value) {
				const internals = DOM.withInternals<Internals>(this)

				internals.shadowContent.value = value
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
				const internals = DOM.withInternals<Internals>(this)

				this.setAttribute('value', value)

				internals.shadowContent.setAttribute('value', value)
			},
		},
	}
) {
	constructor() {
		const element: TextElement = super()!

		const shadowRoot = DOM.withShadow(element, {
			mode: 'open',
			content,
			styling,
		})

		DOM.withInternals<Internals>(element, () => ({
			shadowContent: DOM.queryPart<HTMLInputElement>(shadowRoot, 'content')!,
		}))

		DOM.observe(shadowRoot, {
			change() {
				DOM.trigger(element, {
					change: { bubbles: true, composed: true }
				})
			},
			input(event: InputEvent & { target: HTMLInputElement }) {
				element.value = event.target.value

				element.dispatchEvent(new InputEvent('input', event))
			},
		})
	}
}

customElements.define('a-text-control', TextElement)

declare class TextElementInterface extends HTMLElement {
	/** String representing the value of the text control. */
	value: string

	/** String representing the initial value of the text control. */
	defaultValue: string

	/** String representing the type of text control to display. */
	type: 'text' | 'password' | 'number' | 'email' | string

	/** String representing the initial type of text control to display. */
	defaultType: string
}

interface Internals {
	shadowContent: HTMLInputElement
}
