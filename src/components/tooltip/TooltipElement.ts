import { observeMove } from 'project:utils/client/observe-move'

import innerMarkup from './TooltipShadow.html?raw'
import innerStyles from './TooltipShadow.css?raw'

const innerHTML = innerMarkup + '<style>' + innerStyles + '</style>'

const observeDOM = (host: HTMLElement, options: MutationObserverInit, callback: MutationCallback) => {
	options = Object(options)

	let observer = new MutationObserver(([ record ]) => {
		callback(record)
	})

	observer.observe(host, options)

	if (options.attributes) {
		let attributeFilter = options.attributeFilter || []

		for (let attributeName of attributeFilter) {
			if (host.hasAttribute(attributeName)) {
				callback(<MutationRecord>{
					attributeName,
					oldValue: null,
				})
			}
		}
	}
}

export interface MutationCallback {
	(record: MutationRecord): void
}

export default class TooltipElement extends HTMLElement {
	constructor() {
		new TooltipInternals(super()!)
	}

	get open() {
		return this.hasAttribute('open')
	}

	set open(open: boolean) {
		this.toggleAttribute('open', Boolean(open))
	}
}

class TooltipInternals {
	host: TooltipElement
	root: ShadowRoot

	constructor(host: TooltipElement) {
		this.host = host
		this.root = host.attachShadow({ mode: 'open' })

		observeDOM(this.host, {
			attributes: true,
			attributeFilter: [ 'anchor' ]
		}, (record) => {
			const newValue = this.host.getAttribute(record.attributeName!)

			if (newValue === null) return

			const hostRoot = this.host.getRootNode() as ShadowRoot
			const anchorElement = hostRoot.querySelector(`#${newValue}`)

			if (anchorElement === null) return

			const control = observeMove(anchorElement, (event, control) => {
				const x = event.bounds.x + event.bounds.width / 2
				const y = event.bounds.y

				control.cancel()

				this.host.style.setProperty('--x', x + 'px')
				this.host.style.setProperty('--y', y + 'px')

				if (y > visualViewport!.height) return
				if (x > visualViewport!.width) return

				control.resume()
			})

			let hasFocus = () => anchorElement.matches(':focus-visible')
			let toggleId = 0

			const show = (delay: number) => {
				clearTimeout(toggleId)

				toggleId = setTimeout(() => {
					this.host.open = true

					control.resume()
				}, delay)
			}

			const hide = (delay: number) => {
				clearTimeout(toggleId)

				toggleId = setTimeout(() => {
					if (!hasFocus()) {
						this.host.open = false

						control.cancel()
					}
				}, delay)
			}

			anchorElement.addEventListener('focusin', show.bind(null, 0))
			anchorElement.addEventListener('focusout', hide.bind(null, 0))
			anchorElement.addEventListener('pointerenter', show.bind(null, 400))
			anchorElement.addEventListener('pointerleave', hide.bind(null, 200))
		})

		this.root.innerHTML = innerHTML
	}
}

customElements.define('a-tooltip', TooltipElement)
