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

export class IconSearchFieldElement extends HTMLElement {
	#$ = new IconSearchFieldInternals(this)

	get blank() {
		return this.#$.blank
	}
}

class IconSearchFieldInternals {
	blank: boolean
	label: HTMLLabelElement
	control: HTMLInputElement

	constructor(host: IconSearchFieldElement) {
		let root = host.attachShadow({ mode: 'open' })

		root.append(template.content.cloneNode(true))

		this.label = root.querySelector('[part~="label"]')!
		this.control = root.querySelector('[part~="control"]')!

		this.blank = this.control.value === ''

		this.label.part.toggle('blank-label', this.blank)

		this.control.addEventListener('input', () => {
			if (this.blank !== (this.control.value === '')) {
				this.blank = !this.blank

				this.label.part.toggle('blank-label', this.blank)
			}
		})

		this.control.addEventListener('focusin', () => {
			host.toggleAttribute('data-focus', true)
		})

		this.control.addEventListener('focusout', () => {
			host.toggleAttribute('data-focus', false)
		})

		adoptStyleSheet(root)
	}
}

customElements.define('icon-search-field', IconSearchFieldElement)
