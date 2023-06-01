import templateHTML from './side-panel.shadow.html?raw'
import templateCSS from './side-panel.shadow.css?raw'
import { c, cloneContents, h, html } from 'project:utils/html.js'
import { AnimationFrame } from 'project:utils/client/AnimationFrame.js'

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

		this.#$.closeStatus()

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

	style: {
		cssom: CSSStyleSheet
		status: CSSStyleDeclaration
		root: CSSStyleDeclaration
	}

	downloadVgButton: HTMLButtonElement
	tagsParagraph: HTMLParagraphElement
	tagsLabel: HTMLParagraphElement
	groupNameParagraph: HTMLParagraphElement
	groupNameLabel: HTMLParagraphElement
	emitClipboardStatus: HTMLDialogElement
	emitClipboardStatusContent: HTMLSpanElement
	emitClipboardActiveButton: HTMLButtonElement | null
	emitClipboardWriteVgButton: HTMLButtonElement
	emitClipboardWriteIdButton: HTMLButtonElement
	emitClipboardWriteWcButton: HTMLButtonElement

	timedStatusClose: AnimationFrame

	/** ID of the current icon web component. */
	id: string

	constructor(host: HTMLElement) {
		const root = c(host.attachShadow({ mode: 'open' }), template.cloneNode(true))
		const heading = root.querySelector('[part~="label"]')!
		const preview = root.querySelector('[part~="icon"]')!

		this.downloadVgButton = root.querySelector('[value="download:svg"]')!
		this.tagsParagraph = root.querySelector('[part~="tags"]')!
		this.tagsLabel = root.querySelector('[part~="tag-label"]')!
		this.groupNameParagraph = root.querySelector('[part~="group-name"]')!
		this.groupNameLabel = root.querySelector('[part~="group-label"]')!
		this.emitClipboardStatus = root.querySelector('[part~="status"]')!
		this.emitClipboardStatusContent = root.querySelector('[part~="status-content"]')!
		this.emitClipboardWriteVgButton = root.querySelector('[value="clipboard:write:vg"]')!
		this.emitClipboardWriteIdButton = root.querySelector('[value="clipboard:write:id"]')!
		this.emitClipboardWriteWcButton = root.querySelector('[value="clipboard:write:wc"]')!

		Object.assign(this, {
			host,
			root,
			heading,
			preview,
			timedStatusClose: new AnimationFrame(() => {
				this.closeStatus()
			}, 3000),
			nextFrame: new AnimationFrame(() => {}, 0)
		})

		let cssom: CSSStyleSheet

		if (root.adoptedStyleSheets) {
			cssom = new CSSStyleSheet()

			root.adoptedStyleSheets.push(cssom)
		} else {
			const styleEl = document.createElement('style')

			root.prepend(styleEl)

			cssom = styleEl.sheet!
		}

		this.style = {
			cssom,
			root: (<CSSStyleRule>cssom.cssRules[cssom.insertRule(':host{', 0)]).style,
			status: (<CSSStyleRule>cssom.cssRules[cssom.insertRule(':host::part(status){', 0)]).style,
		}

		host.addEventListener('scroll', this, { capture: true, passive: false })
		root.addEventListener('close:panel', this, { capture: true, passive: true })
		root.addEventListener('clipboard:write:success', this, { capture: true, passive: true })

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

	async handleEvent(event: CustomEvent) {
		switch (event.type) {
			case 'close:panel':
				this.host.close()
				break
			case 'clipboard:write:success':
				this.emitClipboardActiveButton = <HTMLButtonElement>event.target!
				await this.closeStatus()
				await this.openStatus()
				break
			case 'scroll': {
				this.updateStatusPosition()
				break
			}
		}
	}

	updateStatusPosition() {
		if (this.style && this.emitClipboardActiveButton) {
			const rect = this.emitClipboardActiveButton.getBoundingClientRect()

			this.style.status.setProperty('--x', rect.right - rect.width / 2)
			this.style.status.setProperty('--y', rect.top)
		}
	}

	async closeStatus() {
		if (this.style && this.emitClipboardActiveButton) {
			this.timedStatusClose.cancel()

			this.emitClipboardStatusContent.textContent = 'Copied!'
			this.emitClipboardStatus.part.remove('status-open')
			this.emitClipboardStatus.part.add('status-closing')

			this.emitClipboardStatus.close()

			await awaitAnimationFinishOf(this.emitClipboardStatus)

			this.emitClipboardStatus.part.remove('status-closing')
			this.emitClipboardStatus.part.add('status-closed')
		}
	}

	async openStatus() {
		if (this.style && this.emitClipboardActiveButton) {
			this.updateStatusPosition()

			this.emitClipboardStatusContent.textContent = 'Copied!'
			this.emitClipboardStatus.part.remove('status-closed')
			this.emitClipboardStatus.part.add('status-opening')

			this.emitClipboardStatus.show()

			await awaitAnimationFinishOf(this.emitClipboardStatus)

			this.emitClipboardStatus.part.remove('status-opening')
			this.emitClipboardStatus.part.add('status-open')

			this.timedStatusClose.start()
		}
	}

	setHeading(headingText: string) {
		this.heading.textContent = headingText
	}

	useSymbolElement(symbolElement: SVGSymbolElement) {
		/** DOM Content of the current icon. */
		const content = getCleanContentOfSVGSymbol(symbolElement)

		/** Viewbox of the current icon. */
		const viewBox = symbolElement.getAttribute('viewBox')!

		/** ID of the current icon web component. */
		const id = this.id = symbolElement.getAttribute('id')!.replace(/^icon-/, '')

		const fileName = id + '.svg'

		/** Serialized markup representing the current icon. */
		const serializedVGContent = c(
			h<SVGSVGElement>(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}">`),
			content.cloneNode(true)
		).outerHTML

		/** Serialized markup representing the current icon web component. */
		const serializedWCContent = `<rux-icon size="normal" icon=${JSON.stringify(id)}></rux-icon>`

		const groupName = <string>symbolElement.parentElement?.getAttribute('data-name')

		// update the download button
		this.downloadVgButton.dataset.name = fileName
		this.downloadVgButton.dataset.text = serializedVGContent

		this.groupNameLabel.textContent = 'Category'
		this.groupNameParagraph.textContent = groupName

		// populate keywords
		const tagButtons = content.querySelector('metadata')!.textContent?.split(', ')
		// add buttons to the tags so they can be clicked
		const tagsContent = tagButtons?.map((tag) => `<button>${tag}</button>`).join(', ')
		this.tagsParagraph.innerHTML = tagsContent || ''
		this.tagsLabel.textContent = 'Keywords'

		// listens for a click in the tags section and then sends the clicked keyword to the search
		this.tagsParagraph.addEventListener('click', (e: Event) => {
			const target = e.target as HTMLElement
			if (target.nodeName !== 'BUTTON') return
			const keyword = target.textContent
			const search = document.querySelector('.p-searchform .-control') as HTMLInputElement
			search.value = keyword || ''
			// initiate the search by dispatching an input event
			search.dispatchEvent(new Event('input', { bubbles: true }))
		})

		// update the emit buttons
		this.emitClipboardWriteIdButton.dataset.text = id
		this.emitClipboardWriteWcButton.dataset.text = serializedWCContent
		this.emitClipboardWriteVgButton.dataset.text = serializedVGContent

		// adjust the preview viewbox to the viewbox of the current icon
		this.preview.setAttribute('viewBox', viewBox)

		// replace the contents of the preview to the cloned content of the current icon
		this.preview.replaceChildren(content.cloneNode(true))

		this.setHeading(symbolElement.firstElementChild!.textContent!)
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

const awaitAnimationFinishOf = async (element: HTMLElement) => {
	const animations = [
		...element.getAnimations({ subtree: true }),
	]

	if (animations.length) {
		for (const animation of animations) {
			await animation.finished

			const hasAnyRunningAnimation = animations.some(
				animation => animation.pending
			)

			if (!hasAnyRunningAnimation) {
				return
			}
		}
	}
}
