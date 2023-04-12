let __animationId = 0

let __iframeHeight = ''

const __resize = () => {
	const { height } = document.body.getBoundingClientRect()
	const iframeHeight = `${height + 2}px`

	if (iframe !== null && __iframeHeight !== iframeHeight) {
		iframe.style.setProperty('--y', __iframeHeight = iframeHeight)
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

visualViewport.addEventListener('resize', resize, { capture: true })

const { define } = CustomElementRegistry.prototype

Object.assign(CustomElementRegistry.prototype, {
	define(name: string, constructor: CustomElementConstructor) {
		define.call(this, name, constructor)
		resize()
	}
})
