// intercept button clicks to emit events using data attributes
addEventListener('click', event => {
	/** Button element that is clicked. */
	const button = <HTMLButtonElement | undefined>event.composedPath().find(node => node instanceof HTMLButtonElement)

	// return early if no button is clicked
	if (button === undefined) return

	// return early if the button is without a data action
	if (!button.matches('[data-emit]:not([data-emit=""]')) return

	// prevent the default clicking behavior and immediately stop any further propigation
	event.preventDefault()
	event.stopImmediatePropagation()

	/* Event type from the [data-emit], with detail from all other data attributes. */
	const { dataset: { emit: type, ...detail } } = <{ dataset: Record<string, string> }>button

	// dispatch the [data-emit] event
	button.dispatchEvent(new CustomEvent(type, { bubbles: true, composed: true, detail }))
}, { capture: true })
