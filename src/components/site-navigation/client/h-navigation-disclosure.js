import * as HTML from './html.js'
import rawHML from './h-navigation-disclosure.html?raw'
import rawSML from './h-navigation-disclosure.css?raw'

let content = HTML.createFragment(rawHML + '<style>' + rawSML)

class NavigationDisclosureElement extends HTML.Element {
	static content = content;

	constructor() {
		let host = super()
		let root = host.shadowRoot
		let control = root.querySelector('button')
		let content = root.querySelector('span')
		let isOpen = !host.parentNode.classList.contains('current')

		let update = () => {
			isOpen = !isOpen

			control.setAttribute('aria-expanded', String(isOpen))
			control.classList.toggle('open', isOpen)

			content.toggleAttribute('hidden', !isOpen)
			content.classList.toggle('open', isOpen)
		}

		control.setAttribute('aria-expanded', String(isOpen))

		control.addEventListener('click', update)

		update()
	}

	childrenChangedCallback() {
		for (let node of this.children) {
			node.slot = node.localName === 'ul' || node.localName === 'form' ? 'content' : 'control'
		}
	}
}

customElements.define('h-navigation-disclosure', NavigationDisclosureElement)
