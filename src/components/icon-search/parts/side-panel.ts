import templateHTML from './side-panel.shadow.html?raw'
import templateCSS from './side-panel.shadow.css?raw'
import { c, cloneContents, h, html } from 'project:utils/html.js'

const template = html(templateHTML + '<style>' + templateCSS + '</style>')

class IconPanel extends HTMLElement {
	#internals: {
		id: string
		content: DocumentFragment | null
		heading: HTMLHeadingElement
		preview: SVGSVGElement
		viewBox: string | null
		markupForHTML: string
		markupForSVG: string
	}

	constructor() {
		let host = super() as any as IconPanel
		let root = c(host.attachShadow({ mode: 'open' }), template.cloneNode(true))

		this.#internals = {
			id: '',
			content: null,
			heading: root.querySelector<HTMLHeadingElement>('[part~="label"]')!,
			preview: root.querySelector<SVGSVGElement>('[part~="icon"]')!,
			viewBox: null,
			markupForHTML: '',
			markupForSVG: '',
		}

		root.addEventListener('click', event => {
			const button = (event.target as Element).closest<HTMLButtonElement>('button[data-action]')

			if (button) {
				event.preventDefault()

				const { dataset: { action }, value } = button

				this.#do(action!, value)
			}
		}, {
			capture: true,
		})

		host.tabIndex = -1

		if ('attachInternals' in host) {
			const internals = host.attachInternals()

			internals.role = 'dialog'
			internals.ariaModal = 'true'
			internals.ariaLabel = 'Icon Details'
		}
	}

	attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
		// skip all attributes except "use"
		if (name !== 'use') return

		// skip if the "use" attribute is being removed
		if (newValue === null) return

		/** Element matching the given hash from the "use" attribute. */
		const iconElement = document.querySelector<SVGSymbolElement>(newValue.trim())!

		// skip if the element is not matched
		if (iconElement === null) {
			this.removeAttribute('use')

			return
		}

		const iconID = this.#internals.id = newValue.replace(/^#icon-/, '')
		const iconViewBox = iconElement.getAttribute('viewBox')!
		const iconContent = getContentsOfSVG(iconElement)

		this.#internals.content = iconContent
		this.#internals.viewBox = iconViewBox

		this.#internals.markupForHTML = getMarkupOfHTML(iconID)
		this.#internals.markupForSVG = getMarkupOfSVG(iconContent, iconViewBox)

		this.#internals.preview.setAttribute('viewBox', iconViewBox)
		this.#internals.preview.replaceChildren(iconContent)

		resizeHeadingElement(this.#internals.heading, iconElement.firstElementChild!.textContent!)
	}

	#do(type: string, value: string) {
		switch (type) {
			case 'close': {
				this.removeAttribute('use')

				this.ownerDocument.defaultView!.dispatchEvent(
					new Event('close-icon-side-panel')
				)

				break
			}

			case 'copy': {
				switch (value) {
					case 'html': {
						navigator.clipboard.writeText(this.#internals.markupForHTML)
						break
					}

					case 'id': {
						navigator.clipboard.writeText(this.#internals.id)
						break
					}

					case 'svg': {
						navigator.clipboard.writeText(this.#internals.markupForSVG)
						break
					}
				}
				break
			}

			case 'download': {
				downloadFileOfText(this.#internals.markupForSVG, this.#internals.id + '.svg', { type: 'image/svg+xml' })
			}
		}
	}

	static observedAttributes = [ 'use' ]
}

/** Downloads the given text content as a file. */
const downloadFileOfText = (textContent: string, fileName: string, options: BlobPropertyBag) => {
	const file = new File([ textContent ], fileName, options)
	const linkElement = h<HTMLAnchorElement>(`<a href=${URL.createObjectURL(file)} download=${JSON.stringify(fileName)}>`)

	document.body.append(linkElement)

	linkElement.click()

	linkElement.remove()
}

/** Returns the sanitized contents of the given icon symbol, with whitespace text nodes removed. */
const getContentsOfSVG = (iconSymbol: SVGSymbolElement) => {
	const contents = cloneContents(iconSymbol)
	const iterator = document.createNodeIterator(contents, NodeFilter.SHOW_TEXT)

	let node: Node | null

	while (node = iterator.nextNode()) {
		if (!node.textContent!.trim()) {
			(node as ChildNode).remove()
		}
	}

	return contents
}

/** Returns serialized markup for the given contents of an SVG icon. */
const getMarkupOfSVG = (contents: DocumentFragment, viewBox: string) => c(
	h<SVGSVGElement>(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}">`),
	contents.cloneNode(true)
).outerHTML

/** Returns serialized markup for the given icon web component. */
const getMarkupOfHTML = (id: string) => `<rux-icon size="normal" icon=${JSON.stringify(id)}></rux-icon>`

/** Resizes the heading of an icon panel to prevent it from requiring more than one line. */
const resizeHeadingElement = (headingElement: HTMLHeadingElement, headingText: string) => {
	const headingStyle = getComputedStyle(headingElement)

	let headingFontSize = 36

	headingElement.textContent = headingText

	do {
		headingElement.style.setProperty('font-size', headingFontSize + 'px', 'important')
		headingElement.style.setProperty('line-height', String(40 / headingFontSize + 0.0001), 'important')

		--headingFontSize
	} while (
		parseFloat(headingStyle.height) > 40
	)
}

customElements.define('icon-panel', IconPanel)
