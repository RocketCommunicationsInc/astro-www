import innerHTML from './icon-search-field.html?raw'
import cssText from './icon-search-field.css?raw'

const sheet = new CSSStyleSheet()

sheet.replaceSync(cssText)

class IconSearchFieldElement extends HTMLElement {
	#$ = new IconSearchFieldInternals(this)
}

class IconSearchFieldInternals {
	constructor(host: IconSearchFieldElement) {
		let root = host.attachShadow({ mode: 'open' })

		root.innerHTML = innerHTML
		root.adoptedStyleSheets.push(sheet)
	}
}

customElements.define('icon-search-field', IconSearchFieldElement)
