import * as DOM from 'project:utils/client/DOM'
// @ts-ignore
import content from './IframeFallback.html?withtype=fragment'
// @ts-ignore
import { h } from 'project:utils/html.ts'

export default class IframeFallbackElement extends HTMLElement {
	constructor() {
		const element: IframeFallbackElement = super()!
		const shadowRoot = DOM.withShadow(element, {
			mode: 'open',
			content,
		})

		DOM.withInternals<Internals>(element, () => ({
			childContent: DOM.queryPart<HTMLIFrameElement>(shadowRoot, '.content')!,
		}))

		element.setAttribute('hidden', '')
	}

	addToggle(iFrame: HTMLIFrameElement) {
		let fallbackHidden: boolean = true
		const trigger = h(`<button class="iframeFallback-trigger">Not loading? Click Here</button>`)
		trigger.addEventListener('click', () => {
			fallbackHidden = !fallbackHidden
			trigger.textContent = fallbackHidden ? 'Not loading? Click Here' : 'Return to iFrame'
			iFrame.toggleAttribute('hidden', !fallbackHidden)
			this.toggleAttribute('hidden', fallbackHidden)

			// scroll to the correct item
			if (!fallbackHidden) {
				iFrame.scrollIntoView()
			} else {
				this.scrollIntoView()
			}
		})
		this.after(trigger)
	}


	connectedCallback() {
		const iFrame: HTMLIFrameElement|null = this.previousElementSibling?.nodeName === 'IFRAME' ? this.previousElementSibling as HTMLIFrameElement : null
		if (iFrame) {
			this.addToggle(iFrame)
		}
	}
}

customElements.define('a-iframe-fallback', IframeFallbackElement)

// declare class IframeFallbackElementInterface extends HTMLElement {
// 	/** String representing the value of the text control. */
// 	tag: string

// 	/** String representing the initial value of the text control. */
// 	defaultTag: string
// }

interface Internals {
	childContent: HTMLDivElement
}
