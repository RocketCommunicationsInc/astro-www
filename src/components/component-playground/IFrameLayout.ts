import type PlaygroundElement from './Playground/Playground.ts'

const iframe = window.parent?.document.querySelector('a-playground')! as PlaygroundElement

if (iframe !== null) {
	let iframeHeight = 0

	const updateIframeHeight = () => {
		const contentHeight = document.body.getBoundingClientRect().height + 2

		if (contentHeight !== iframeHeight) {
			iframeHeight = contentHeight

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

// @ts-ignore
let $canvas = $target.parentNode as HTMLElement

addEventListener('input', (event) => {
	const { target } = event as any as { target: HTMLInputElement }

	const property = target.getAttribute('for')!

	if (typeof property === 'string') {
		if (property === 'sandbox:example') {
			$canvas.innerHTML = target.value

			$target = $canvas.querySelector($tag)

			target.dispatchEvent(new Event('reset', { bubbles: true }))
		} else {
			if ('type' in target && target.type === 'switch') {
				$target[property] = target.checked
			} else {
				$target[property] = target.value
			}
		}
	}
})

addEventListener('reset', (event) => {
	for (const control of document.querySelectorAll<HTMLFormElement>('[for]')) {
		if (control !== event.target) {
			control.value = control.defaultValue
			control.selected = control.defaultSelected
			control.checked = control.defaultChecked
		}
	}
})
