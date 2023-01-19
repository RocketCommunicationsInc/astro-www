import templateHTML from './side-panel.shadow.html?raw'
import templateCSS from './side-panel.shadow.css?raw'
import { c, cloneContents, h, html } from 'project:utils/html.js'

const template = html(templateHTML + '<style>' + templateCSS + '</style>')

class IconPanelElement extends HTMLElement {
	close() {
		// remove use attribute
		this.removeAttribute('use')

		// dispatch window close-icon-side-panel event
		window.dispatchEvent(new CustomEvent('close-icon-side-panel'))

		// clear button data
		this.#$.downloadVgButton.dataset.name = ''
		this.#$.downloadVgButton.dataset.text = ''
		this.#$.downloadVgButton.dataset.type = ''
		this.#$.emitClipboardWriteIdButton.dataset.text = ''
		this.#$.emitClipboardWriteVgButton.dataset.text = ''
		this.#$.emitClipboardWriteWcButton.dataset.text = ''
	}

	attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
		// skip all attributes except "use"
		if (name !== 'use') return

		// skip if the "use" attribute is being removed
		if (newValue === null) return

		/** Element matching the given hash from the "use" attribute. */
		const iconElement = document.querySelector<SVGSymbolElement>(newValue)!

		// skip if the element is not matched
		if (iconElement === null) {
			this.removeAttribute('use')

			return
		}

		this.#$.useSymbolElement(iconElement)
	}

	#$: IconPanelInternals = new IconPanelInternals(this)

	static observedAttributes = [ 'use' ]
}

class IconPanelInternals {
	/** Icon Panel Element. */
	host: IconPanelElement

	/** ShadowRoot of the Icon Panel. */
	root: ShadowRoot

	/** ShadowRoot of the Icon Panel. */
	heading: HTMLHeadingElement

	/** ShadowRoot Preview Element of the Icon Panel. */
	preview: SVGSVGElement

	downloadVgButton: HTMLButtonElement
	emitClipboardWriteVgButton: HTMLButtonElement
	emitClipboardWriteIdButton: HTMLButtonElement
	emitClipboardWriteWcButton: HTMLButtonElement

	/** ID of the current icon web component. */
	id: string

	constructor(host: HTMLElement) {
		const root = c(host.attachShadow({ mode: 'open' }), template.cloneNode(true))
		const heading = root.querySelector('[part~="label"]')!
		const preview = root.querySelector('[part~="icon"]')!

		this.downloadVgButton = root.querySelector('button[value="download:svg"]')!
		this.emitClipboardWriteVgButton = root.querySelector('button[value="clipboard:write:vg"]')!
		this.emitClipboardWriteIdButton = root.querySelector('button[value="clipboard:write:id"]')!
		this.emitClipboardWriteWcButton = root.querySelector('button[value="clipboard:write:wc"]')!

		Object.assign(this, { host, root, heading, preview })

		root.addEventListener('close:panel', this, { capture: true, passive: true })

		// give ARIA affordances to the Icon Panel
		if ('attachInternals' in host) {
			const internals = host.attachInternals()

			internals.role = 'dialog'
			internals.ariaModal = 'true'
			internals.ariaLabel = 'Icon Details'
		}

		// give focus affordance to the Icon Panel
		host.tabIndex = -1
	}

	handleEvent(event: CustomEvent) {
		event.stopImmediatePropagation()

		switch (event.type) {
			case 'close:panel':
				this.host.close()
				break
		}
	}

	/** Resizes the heading of the icon panel to prevent it from requiring more than one line. */
	resizeHeading(headingText: string) {
		const headingStyle = getComputedStyle(this.heading)

		/** Size of the font, starting with a maximum size of 36. */
		let headingFontSize = 36

		this.heading.textContent = headingText

		do {
			this.heading.style.setProperty('font-size', headingFontSize + 'px', 'important')
			this.heading.style.setProperty('line-height', String(40 / headingFontSize + 0.0001), 'important')

			--headingFontSize
		} while (
			parseFloat(headingStyle.height) > 40
		)
	}

	useSymbolElement(symbolElement: SVGSymbolElement) {
		/** DOM Content of the current icon. */
		const content = getCleanContentOfSVGSymbol(symbolElement)

		/** Viewbox of the current icon. */
		const viewBox = symbolElement.getAttribute('viewBox')!

		/** ID of the current icon web component. */
		const id = this.id = symbolElement.getAttribute('id')!.replace(/^#icon-/, '')

		const fileName = id + '.svg'

		/** Serialized markup representing the current icon. */
		const serializedVGContent = c(
			h<SVGSVGElement>(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}">`),
			content.cloneNode(true)
		).outerHTML

		/** Serialized markup representing the current icon web component. */
		const serializedWCContent = `<rux-icon size="normal" icon=${JSON.stringify(id)}></rux-icon>`

		// update the download button
		this.downloadVgButton.dataset.name = fileName
		this.downloadVgButton.dataset.text = serializedVGContent

		// update the emit buttons
		this.emitClipboardWriteIdButton.dataset.text = id
		this.emitClipboardWriteWcButton.dataset.text = serializedWCContent
		this.emitClipboardWriteVgButton.dataset.text = serializedVGContent

		// adjust the preview viewbox to the viewbox of the current icon
		this.preview.setAttribute('viewBox', viewBox)

		// replace the contents of the preview to the cloned content of the current icon
		this.preview.replaceChildren(content.cloneNode(true))

		this.resizeHeading(symbolElement.firstElementChild!.textContent!)
	}
}

customElements.define('icon-panel', IconPanelElement)

/** Returns the content of the given SVG symbol, with whitespace text nodes removed. */
const getCleanContentOfSVGSymbol = (symbol: SVGSymbolElement) => {
	const contents = cloneContents(symbol)
	const iterator = document.createNodeIterator(contents, NodeFilter.SHOW_TEXT)

	let node: Node | null

	while (node = iterator.nextNode()) {
		if (!node.textContent!.trim()) {
			(node as ChildNode).remove()
		}
	}

	return contents
}
