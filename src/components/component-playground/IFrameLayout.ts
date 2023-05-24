import type PlaygroundElement from './Playground/Playground.ts'
import { sendEvent } from 'project:utils/client/DOM.ts'

const iframe = window.parent?.document.querySelector('a-playground')! as PlaygroundElement

if (iframe !== null) {
	let iframeHeight = 0

	const updateIframeHeight = () => {
		const contentHeight = document.body.scrollHeight + 2

		if (contentHeight !== iframeHeight && iframeHeight !== (contentHeight - 2)) {
			iframeHeight = visualViewport.width < 700 ? contentHeight : 460

			iframe.style.setProperty('--y', `${iframeHeight}px`)
		}
	}

	const updateIframeHeightOnFrame = () => {
		cancelAnimationFrame(updateIframeHeightOnFrameId)

		updateIframeHeightOnFrameId = requestAnimationFrame(updateIframeHeight)
	}

	let updateIframeHeightOnFrameId = 0

	// resize whenever the iframe loads
	// -----------------------------------------------------------------------------

	iframe.addEventListener('load', updateIframeHeightOnFrame)

	// resize whenever the iframe viewport resizes
	// -----------------------------------------------------------------------------

	visualViewport.addEventListener('resize', updateIframeHeight, { capture: true })

	// resize whenever new elements are defined
	// -----------------------------------------------------------------------------

	const { define } = CustomElementRegistry.prototype

	Object.assign(CustomElementRegistry.prototype, {
		define(name: string, constructor: CustomElementConstructor) {
			define.call(this, name, constructor)

			updateIframeHeightOnFrame()
		}
	})
}

// @ts-ignore
let $tag = globalThis.$tag as any

// @ts-ignore
let $target = globalThis.$target as any

let $canvas = $target.parentNode as HTMLElement

let $textTimeoutID: number

const handleInput = (event: any) => {
	const { target } = event as any as { target: HTMLInputElement }

	const property = target.getAttribute('for')!

	if (typeof property === 'string') {
		if (property === 'sandbox:example') {
			$canvas.innerHTML = target.value


			$target = $canvas.querySelector($tag)

			console.log($target)

			target.dispatchEvent(new Event('reset', { bubbles: true }))
			sendEvent('gtag', 'playground-control', { event_category: 'playground', event_label: 'Examples', value: `${target.textContent}` })
		} else {
			if ('type' in target && target.type === 'switch') {
				$target[property] = target.checked
				sendEvent('gtag', 'playground-control', { event_category: 'playground', event_label: `${property}`, value: target.checked ? 'on' : 'off' })
			} else {
				$target[property] = target.value

				// if the target is a text input write a timeout so that it doesn't send every single input change to analytics
				if (target.nodeName.toLowerCase() === 'a-text-control') {
					// make sure that if someone types in quick succession the timeout is cleared and a new one is put in place
					clearTimeout($textTimeoutID)
					$textTimeoutID = setTimeout(() => {
						// if the time between input is greater than 3 seconds send the google event
						sendEvent('gtag', 'playground-control', { event_category: 'playground', event_label: `${property}`, value: `${target.value}` })
					}, 3000)
				} else {
					// send the value immediately
					sendEvent('gtag', 'playground-control', { event_category: 'playground', event_label: `${property}`, value: `${target.value}` })
				}
			}
		}
	}
}

addEventListener('input', handleInput)

addEventListener('reset', (event) => {
	for (const control of document.querySelectorAll<HTMLFormElement>('[for]')) {
		if (control !== event.target) {
			control.value = control.defaultValue
			control.selected = control.defaultSelected
			control.checked = control.defaultChecked
		}
	}
})

// google tag events
// -----------------------------------------------------------------------------

// send gtag data to parent add when someone clicks in the preview window
addEventListener('click', (event) => {
	const { target } = event as any as { target: HTMLElement, currentTarget: HTMLElement }

	if (target.localName !== 'a-sandbox' && target.closest('a-sandbox')) {
		// get the current tag that exists within the playground
		const ruxTarget = $canvas.innerHTML as string
		// clean up the target string by removing all new line, and tab characters
		const targetAsCleanString = ruxTarget.replace(/[\n\t\\]/g, '')
		// send the event as a 'gtag' to the parent window to be consumed by google
		sendEvent('gtag', 'playground-click', { event_category: 'playground', event_label: targetAsCleanString })
	}
})
