import * as HTML from './html.js'
import rawHML from './h-navigation-list.html?raw'
import rawSML from './h-navigation-list.css?raw'

let content = HTML.createFragment(rawHML + '<style>' + rawSML)

class NavigationListElement extends HTML.Element {
	static content = content;

	constructor() {
		let host = super()
		let root = host.shadowRoot

		let control = root.querySelector('.control')
		let content = root.querySelector('.content')
		let expanded = false

		let handleClick = {
			handleEvent() {
				expanded = !expanded

				control.classList.toggle('open', expanded)
				control.setAttribute('aria-expanded', expanded)

				content.classList.toggle('open', expanded)
			},
		}

		control.addEventListener('click', handleClick)
	}
}

customElements.define('h-navigation-list', NavigationListElement)
