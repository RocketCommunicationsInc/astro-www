class ColorSwab extends HTMLElement {
	constructor() {
		super()
		this.attachShadow({ mode: 'open' })
	}

	connectedCallback() {
		this.render()
	}

	render() {
		const hexCode = this.textContent.trim()
		if (hexCode.includes('#')) {
			const style = `
	  .color-swab {
		display: inline-flex;
		align-items: center;
		gap: 5px;
	  }
	  .color-preview {
		inline-size: .875em;
		block-size: .875em;
		box-shadow: 0 0 0 1px inset;
	  }
	`

			const colorPreview = document.createElement('div')
			colorPreview.classList.add('color-preview')
			colorPreview.style.backgroundColor = hexCode

			const container = document.createElement('div')
			container.classList.add('color-swab')
			container.appendChild(colorPreview)
			container.appendChild(document.createTextNode(hexCode))

			const styleElement = document.createElement('style')
			styleElement.textContent = style

			this.shadowRoot.innerHTML = ''
			this.shadowRoot.appendChild(styleElement)
			this.shadowRoot.appendChild(container)
		} else {
			const slot = document.createElement('slot')
			this.shadowRoot?.appendChild(slot)
		}
	}
}

customElements.define('color-swab', ColorSwab)
