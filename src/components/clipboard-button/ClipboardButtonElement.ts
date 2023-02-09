import 'project:components/tooltip/TooltipElement'
import innerMarkup from './ClipboardButtonShadow.html?raw'
import innerStyles from './ClipboardButtonShadow.css?raw'

const innerHTML = innerMarkup + '<style>' + innerStyles + '</style>'

export default class ClipboardButtonElement extends HTMLElement {
	constructor() {
		new ClipboardButtonInternals(super()!)
	}
}

class ClipboardButtonInternals {
	host: ClipboardButtonElement
	root: ShadowRoot

	constructor(host: ClipboardButtonElement) {
		this.host = host
		this.root = host.attachShadow({ mode: 'open' })

		this.root.innerHTML = innerHTML

		let button = this.root.querySelector('button')!

		button.dataset.text = this.host.parentNode!.textContent!

		if (host.attachInternals) {
			let internals = host.attachInternals()

			internals.role = 'none'
			internals.ariaHidden = 'true'
		}
	}
}

customElements.define('a-clipboard-button', ClipboardButtonElement)
