import * as DOM from 'project:utils/client/ZOM.ts'
import content from './Playground.html?withtype=fragment'
import styling from './Playground.css?withtype=style'

export default class extends DOM.define('a-playground', class PlaygroundElement extends HTMLElement {
	constructor() {
		super()

		const shadowRoot = DOM.attachShadow(this, { mode: 'open' }, content.cloneNode(true), styling)
		const shadowFrame = DOM.queryPart<HTMLIFrameElement>(shadowRoot, 'frame')!

		DOM.internals<Internals>(this, () => ({
			shadowRoot,
			shadowFrame,
		}))
	}

	declare src: string
}, {
	src: {
		defaultValue() {
			return this.getAttribute('tag') || ''
		},
		setValue(value) {
			return String(value)
		},
		useAttributes: {
			tag() {
				return this.getAttribute('tag')
			},
		},
		onValueChange(value) {
			this.setAttribute('tag', value)

			const internals = DOM.internals<Internals>(this)

			internals.shadowFrame.src = `/playground/${value}/`
		},
	},
}) {}

interface Internals {
	shadowRoot: ShadowRoot
	shadowFrame: HTMLIFrameElement
}
