import innerHTML from './icon-search-field.html?raw'
import cssText from './icon-search-field.css?raw'

// const sheet = new CSSStyleSheet()
// sheet.replaceSync(cssText)

const adoptStyleSheet = (root: ShadowRoot) => {
	const sheet = root.appendChild(document.createElement('style')).sheet!

	sheet.insertRule('@media {' + cssText)
}

const template = document.createElement('template')
template.innerHTML = innerHTML

class IconSearchFieldElement extends HTMLElement {
	#$ = new IconSearchFieldInternals(this)
}

class IconSearchFieldInternals {
	constructor(host: IconSearchFieldElement) {
		let root = host.attachShadow({ mode: 'open' })

		root.append(template.content.cloneNode(true))
		// root.adoptedStyleSheets.push(sheet)
		adoptStyleSheet(root)
	}
}

customElements.define('icon-search-field', IconSearchFieldElement)
