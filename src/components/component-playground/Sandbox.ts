import * as DOM from 'project:utils/client/DOM.ts'
import content from './Sandbox.html?withtype=fragment'
import styling from './Sandbox.css?withtype=style'

import './Field/Field.ts'
import './Control/Switch.ts'

export default class SandboxElement extends HTMLElement {
	constructor() {
		const element: SandboxElement = super()!

		const shadowRoot = DOM.withShadow(element, {
			mode: 'open',
			content,
			styling,
		})

		DOM.observe(shadowRoot, {
			change(event: Event & { target: HTMLElement & { checked: boolean } }) {
				if (typeof event.target.checked !== 'boolean') return

				element.classList.toggle('dark-theme', event.target.checked)
				element.classList.toggle('light-theme', !event.target.checked)
			}
		})
	}
}

customElements.define('a-sandbox', SandboxElement)
