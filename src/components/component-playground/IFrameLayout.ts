import type CodeDrawer from 'project:components/component-playground/CodeDrawer/CodeDrawer.ts'
import type PlaygroundElement from './Playground/Playground.ts'
import { sendEvent } from 'project:utils/client/DOM.ts'
import { h } from 'project:utils/html.ts'

const iframe = window.parent?.document.querySelector('a-playground')! as PlaygroundElement
const codeDrawer: CodeDrawer = document.querySelector('a-code-drawer')!

if (iframe !== null) {
	let iframeHeight = 0

	const updateIframeHeight = () => {
		const contentHeight = document.body.scrollHeight + 2
		const drawerHeight = codeDrawer.scrollHeight <= 400 ? codeDrawer.scrollHeight : 400
		if (iframeHeight !== (contentHeight - 2)) {
			iframeHeight = visualViewport!.width < 700 ? contentHeight : 500

			if (visualViewport!.width < 700) {
				iframe.style.setProperty('--y', `${iframeHeight - 2}px`)
			} else {
				iframe.style.setProperty('--y', `${iframeHeight + drawerHeight}px`)
			}
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

	visualViewport!.addEventListener('resize', updateIframeHeight, { capture: true })

	// resize whenever code is expanded or collapsed
	// -----------------------------------------------------------------------------

	addEventListener('togglePanel', updateIframeHeightOnFrame, { capture: true })
	addEventListener('input', () => {
		updateIframeHeightOnFrame()
})

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

// this updates the code drawer whenever an input happens
function updateCodeDrawer() {
	const codeString = $htmlCode!.outerHTML
	codeDrawer.code = `${codeString}`

	codeDrawer.dispatchEvent(new Event('codeUpdate', { bubbles: true }))
}

// this checks to see if there is additional html wrapping our component and if so, it sends it back to attrs can be added to the right spot
const findTag = (html: Element) => {
	const actualComponent = html.querySelector(`${$tag}`) ? html.querySelector(`${$tag}`) : html as HTMLElement
	return actualComponent
}

// @ts-ignore this represents rux-component tag
let $tag = globalThis.$tag as any

// @ts-ignore
let $target = globalThis.$target as any

let $canvas = $target.parentNode as HTMLElement

// this is the code that goes into the codeDrawer
let $htmlCode = h(codeDrawer.textContent as string) || h(codeDrawer.getAttribute('code') as string)

let $textTimeoutID: ReturnType<typeof setTimeout>

const handleInput = (event: any) => {
	const { target } = event as any as { target: HTMLInputElement }

	const property = target.getAttribute('for')!

	if (typeof property === 'string') {
		// if the property is sandbox:example its a new example so it resets the controls and sets the html to sandbox and code drawer
		if (property === 'sandbox:example') {
			$canvas.innerHTML = target.value
			$target = $canvas.querySelector($tag)
			$htmlCode = h(target.value)

			target.dispatchEvent(new Event('reset', { bubbles: true }))
			sendEvent('gtag', 'playground-control', { 'event_category': 'playground', 'event_label': 'Examples', 'control_value': `${target.textContent}` })
		} else {
			// this regex converts the property to an attribute for code drawer
			const codeAttr = property.replace(/([A-Z])/g, '-$1')

			// if the type is a switch then it is a boolean value
			if ('type' in target && target.type === 'switch') {
				$target[property] = target.checked
				target.checked ? findTag($htmlCode)!.setAttribute(`${codeAttr}`, ``) : findTag($htmlCode)!.removeAttribute(`${codeAttr}`)
				sendEvent('gtag', 'playground-control', { 'event_category': 'playground', 'event_label': `${property}`, 'control_value': target.checked ? 'on' : 'off' })
			} else {
				// otherwise it isn't and so it will take a value other than true/false
				$target[property] = target.value

				target.value.length > 0 ? findTag($htmlCode)!.setAttribute(`${codeAttr}`, `${target.value}`) : findTag($htmlCode)!.removeAttribute(`${codeAttr}`)

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
	// whatever happens, the code drawer needs an update
	updateCodeDrawer()
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
