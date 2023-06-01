import { html } from 'project:utils/html.js'
import styling from './color-sample.css?raw'
import htmltemplate from './color-sample.astro?raw'

const template = html(htmltemplate + '<style>' + styling + '</style>')

export class ColorSample extends HTMLElement {
		constructor() {
			super()
			// create shadow and attach template
			const root = this.attachShadow({ mode: 'open' })
			root.appendChild(template.cloneNode(true))
		}
}

customElements.define('color-sample', ColorSample)
