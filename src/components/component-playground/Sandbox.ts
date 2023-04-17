import * as DOM from 'project:utils/client/ZOM.ts'
import content from './Sandbox.html?withtype=fragment'
import styling from './Sandbox.css?withtype=style'

import './Field/Field.ts'
import './Control/Switch.ts'

export default DOM.elementOf({
	name: 'a-sandbox',

	constructor() {
		const shadowRoot = this.attachShadow({ mode: 'open' })

		shadowRoot.adoptedStyleSheets = [ styling ]

		shadowRoot.replaceChildren(content.cloneNode(true))

		shadowRoot.addEventListener('change', (event) => {
			if (!(event.target instanceof HTMLElement)) return
			if (!('selected' in event.target)) return
			if (typeof event.target.selected !== 'boolean') return

			this.classList.toggle('dark-theme', event.target.selected)
			this.classList.toggle('light-theme', !event.target.selected)
		}, { capture: true })
	}
})
