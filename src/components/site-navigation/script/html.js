let nativeFetch = globalThis.fetch

export let setAttributes = (node, attributes) => {
	for (let name in attributes) {
		node.setAttribute(name, attributes[name])
	}
}

export let createFragment = (
	range => range.selectNodeContents(
		document.createElement('template')
	) || range.createContextualFragment.bind(range)
)(new Range)

export let fetchFragment = (url) => nativeFetch(url).then(response => response.text()).then(createFragment)

export class Element extends HTMLElement {
	constructor() {
		let host = super()
		let root = host.attachShadow({ mode: 'open' })
		let call = host.childrenChangedCallback.bind(host)
		let scan = new MutationObserver(call)

		// append content to the shadow root
		root.append(host.constructor.content.cloneNode(true))

		// observe changes to the host
		scan.observe(host, { childList: true })

		// conditionally run childrenChangedCallback
		if (host.hasChildNodes()) call()
	}

	static content = createFragment('<slot>')

	childrenChangedCallback() {}
}
