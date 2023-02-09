const importCustomElement = async (tagName: string) => {
	switch (tagName) {
		case 'a-clipboard-button':
			await import('project:components/clipboard-button/ClipboardButtonElement')
			break
	}
}

if (globalThis.document) {
	let mapAppends = new WeakMap<Element, Element>()
	let oldResults = new Set<Element>()
	let appendee: Element
	let appender: Element

	let callback = () => {
		let newResults = new Set<Element>()

		for (appendee of document.querySelectorAll('[data-append]')) {
			newResults.add(appendee)

			if (oldResults.delete(appendee)) continue

			appender = document.createElement(appendee.getAttribute('data-append')!)

			importCustomElement(appender.localName)

			mapAppends.set(appendee, appender)

			appendee.append(appender)
		}

		for (appendee of oldResults) {
			appender = mapAppends.get(appendee)!

			if (mapAppends.delete(appendee)) {
				appender.remove()
			}
		}

		oldResults = newResults
	}

	callback()

	new MutationObserver(callback).observe(document, {
		childList: true,
		subtree: true,
		attributes: true,
		attributeFilter: [ 'data-append' ],
	})
}
