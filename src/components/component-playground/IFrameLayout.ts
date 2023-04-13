const iframe = window.parent?.document.querySelector('.c-sandbox')! as HTMLIFrameElement

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
const $target = globalThis.$target as any

// @ts-ignore
const $canvas = $target.parentNode as HTMLElement

addEventListener('input', (event) => {
	const { target } = event as any as { target: HTMLInputElement }

	const property = target.getAttribute('for')!

	if (typeof property === 'string') {
		if (property === 'sandbox:example') {
			$canvas.innerHTML = target.value
		} else {
			if ('value' in target) {
				$target[property] = target.value
			}

			if ('checked' in target) {
				$target[property] = target.checked
			}
		}
	}
})
