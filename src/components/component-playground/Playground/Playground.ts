import * as DOM from 'project:utils/client/DOM'
import ReflectedElement from 'project:utils/client/ReflectedElement.ts'
import content from './Playground.html?withtype=fragment'
import styling from './Playground.css?withtype=style'

export default class PlaygroundElement extends ReflectedElement(
	HTMLElement as typeof PlaygroundElementInterface,
	{
		tag: {
			defaultValue() {
				return this.defaultTag
			},
			setValue(tag) {
				return tag == null ? '' : String(tag)
			},
			onValueChange(tag) {
				const internals = DOM.withInternals<Internals>(this)

				internals.shadowFrame.src = `/playground/${tag}/`
			},
		},

		defaultTag: {
			defaultValue() {
				return this.getAttribute('tag') || ''
			},
			setValue(tag) {
				return tag == null ? '' : String(tag)
			},
			useAttributes: {
				tag() {
					return this.getAttribute('tag')
				},
			},
			onValueChange(tag) {
				const internals = DOM.withInternals<Internals>(this)

				this.setAttribute('tag', tag)

				internals.shadowFrame.setAttribute('src', `/playground/${tag}/`)
			},
		},
	}
) {
	constructor() {
		const element: PlaygroundElement = super()!

		const shadowRoot = DOM.withShadow(element, {
			mode: 'open',
			content,
			styling,
		})

		DOM.withInternals<Internals>(element, () => ({
			shadowFrame: DOM.queryPart<HTMLIFrameElement>(shadowRoot, 'frame')!,
		}))
	}
}

customElements.define('a-playground', PlaygroundElement)

declare class PlaygroundElementInterface extends HTMLElement {
	/** String representing the value of the text control. */
	tag: string

	/** String representing the initial value of the text control. */
	defaultTag: string
}

interface Internals {
	shadowFrame: HTMLIFrameElement
}
