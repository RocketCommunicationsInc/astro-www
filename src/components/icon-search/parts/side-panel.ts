import templateHTML from './side-panel.shadow.html?raw'
import templateCSS from './side-panel.shadow.css'
import { c, cloneContents, h, html } from 'project:utils/html.js'

const template = html(templateHTML + '<style>' + templateCSS + '</style>')
// const shapes = document.getElementById('shapes')

class IconPanel extends HTMLElement {
	constructor() {
		let host = super() as any as IconPanel
		let root = c(host.attachShadow({ mode: 'open' }), template.cloneNode(true))

		for (let button of root.querySelectorAll('button')) {
			button.addEventListener('click', event => {
				event.preventDefault()

				const iconID = host.getAttribute('use')!
				const icon = document.querySelector(iconID)!

				const viewBox = (icon.attributes as any).viewBox.value
				const svg = c(h(`<svg viewBox="${viewBox}">`), cloneContents(icon))

				const iterator = document.createNodeIterator(svg, NodeFilter.SHOW_TEXT)
				let node: Node | null

				while (node = iterator.nextNode()) {
					if (!node.textContent!.trim()) {
						(node as ChildNode).remove()
					}
				}

				const iconRawID = iconID.replace(/^#icon-/, '')
				const svgHTML = svg.outerHTML

				const wcHTML = `<rux-icon size="normal" icon=${JSON.stringify(iconRawID)}></rux-icon>`

				switch (button.dataset.copy) {
					case 'id': {
						navigator.clipboard.writeText(iconRawID)
						console.log('copied id')
						break
					}

					case 'svg': {
						navigator.clipboard.writeText(svgHTML)
						console.log('copied svg')
						break
					}

					case 'wc': {
						navigator.clipboard.writeText(wcHTML)
						console.log('copied web component')
						break
					}
				}
			})
		}
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string) {
		let host = this
		let root = host.shadowRoot!

		if (newValue) {
			const icon = document.querySelector<SVGSymbolElement>(newValue)

			if (icon) {
				const clone = cloneContents(icon)

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
