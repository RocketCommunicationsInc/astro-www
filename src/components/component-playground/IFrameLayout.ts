import type PlaygroundElement from './Playground/Playground.ts'
import { sendEvent } from 'project:utils/client/DOM.ts'

const iframe = window.parent?.document.querySelector('a-playground')! as PlaygroundElement

if (iframe !== null) {
	let iframeHeight = 0

	const updateIframeHeight = () => {
		const contentHeight = document.body.scrollHeight + 2
		const codeHeight = document.querySelector('a-code-drawer')?.scrollHeight || 44

		if (iframeHeight !== (contentHeight - 2)) {
			console.log('heard it too')
			iframeHeight = visualViewport.width < 700 ? contentHeight : 460

			iframe.style.setProperty('--y', `${iframeHeight + codeHeight}px`)
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

	// resize whenever code is expanded or collapsed
	// -----------------------------------------------------------------------------

	addEventListener('togglePanel', updateIframeHeight, { capture: true })
	addEventListener('input', () => {
		console.log('heard it!')
		updateIframeHeight()
}, { capture: true })

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

function updateCode() {
	const codeString = $code!.outerHTML
	codeDrawer.code = `${codeString}`

	codeDrawer.dispatchEvent(new Event('codeUpdate', { bubbles: true }))
}

const codeDrawer = document.querySelector('a-code-drawer')!

// @ts-ignore
let $tag = globalThis.$tag as any

// @ts-ignore
let $target = globalThis.$target as any

let $canvas = $target.parentNode as HTMLElement

let $code = parseHTML(codeDrawer.textContent) || parseHTML(codeDrawer.getAttribute('code'))

let $textTimeoutID: number

function parseHTML(textContent:string = '') {
    const t = document.createElement('template')
    t.innerHTML = textContent
    return t.content.firstElementChild
}

const handleInput = (event: any) => {
	const { target } = event as any as { target: HTMLInputElement }

	const property = target.getAttribute('for')!

	if (typeof property === 'string') {
		if (property === 'sandbox:example') {
			$canvas.innerHTML = target.value
			$target = $canvas.querySelector($tag)
			$code = parseHTML(target.value)

			target.dispatchEvent(new Event('reset', { bubbles: true }))
			sendEvent('gtag', 'playground-control', { 'event_category': 'playground', 'event_label': 'Examples', 'control_value': `${target.textContent}` })
		} else {
			const codeAttr = property.replace(/([A-Z])/g, '-$1')
			if ('type' in target && target.type === 'switch') {
				$target[property] = target.checked
				target.checked ? $code.setAttribute(`${codeAttr}`, '') : $code.removeAttribute(`${codeAttr}`)
				sendEvent('gtag', 'playground-control', { 'event_category': 'playground', 'event_label': `${property}`, 'control_value': target.checked ? 'on' : 'off' })
			} else {
				$target[property] = target.value
				console.log(codeAttr, 'attribute')
				$code.setAttribute(`${codeAttr}`, `${target.value}`)

				// if the target is a text input write a timeout so that it doesn't send every single input change to analytics
				if (target.nodeName.toLowerCase() === 'a-text-control') {
					// make sure that if someone types in quick succession the timeout is cleared and a new one is put in place
					clearTimeout($textTimeoutID)
					$textTimeoutID = setTimeout(() => {
						// if the time between input is greater than 3 seconds send the google event
						sendEvent('gtag', 'playground-control', { 'event_category': 'playground', 'event_label': `${property}`, 'control_value': `${target.value}` })
					}, 3000)
				} else {
					// send the value immediately
					sendEvent('gtag', 'playground-control', { 'event_category': 'playground', 'event_label': `${property}`, 'control_value': `${target.value}` })
				}
			}
		}
	}
	updateCode()
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
		sendEvent('gtag', 'playground-click', { 'event_category': 'playground', 'event_label': targetAsCleanString })
	}
})
