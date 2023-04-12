let __animationId = 0

const __resize = () => {
	const { height } = document.body.getBoundingClientRect()
	const newIframeHeight = `${height + 2}px`

	if (iframe !== null && iframeHeight !== newIframeHeight) {
		iframe.style.setProperty('--y', iframeHeight = newIframeHeight)
	}
}

const resize = () => {
	cancelAnimationFrame(__animationId)

	__animationId = requestAnimationFrame(__resize)
}

const iframe = window.parent?.document.querySelector('.c-sandbox')! as HTMLIFrameElement

if (iframe !== null) {
	iframe.addEventListener('load', resize)
}

let iframeHeight = ''

visualViewport.addEventListener('resize', resize, { capture: true })

const { define } = CustomElementRegistry.prototype

Object.assign(CustomElementRegistry.prototype, {
	define(name: string, constructor: CustomElementConstructor) {
		define.call(this, name, constructor)
		resize()
	}
})
