import templateHTML from './side-panel.shadow.html?raw'
import templateCSS from './side-panel.shadow.css'
import { c, html } from 'project:utils/html.js'

const template = html(templateHTML + '<style>' + templateCSS + '</style>')
// const shapes = document.getElementById('shapes')

class IconPanel extends HTMLElement {
	constructor() {
		let host = super() as any as IconPanel
		let root = c(host.attachShadow({ mode: 'open' }), template.cloneNode(true))

		// eslint-disable-next-line no-void
		void root
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string) {
		let host = this
		let root = this.shadowRoot!

		if (newValue) {
			const icon = document.querySelector<SVGSymbolElement>(newValue)

			if (icon) {
				const range = new Range()

				range.selectNodeContents(icon)

				const clone = range.cloneContents()

				const heading = root.querySelector<HTMLHeadingElement>('[part~="label"]')!

				heading.textContent = clone.firstElementChild!.textContent!

				const svg = root.querySelector<SVGSVGElement>('svg')!
				svg.setAttribute('viewBox', (icon.attributes as any).viewBox.value)
				svg.replaceChildren(clone)
			} else {
				this.removeAttribute('use')
			}
		}
	}

	static observedAttributes = [ 'use' ]
}

customElements.define('icon-panel', IconPanel)
