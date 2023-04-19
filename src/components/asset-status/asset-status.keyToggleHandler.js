{
	const scriptEl = document.currentScript

	/** Asset Status Mobile Status Key */
	const eventElement = scriptEl.previousSibling

	/* closed by default */
	eventElement.classList.add('--closed')

	window.addEventListener('click', (event) => {
		// if the click is in the key do nothing
		if (event.target.closest('.-key') !== null) return

		// if the click is not on the key make sure it closes
		if (event.target.closest('.-toggle') === null) {
			eventElement.classList.remove('--open')
			eventElement.classList.add('--closed')
			return
		}
		// otherwise toggle as normal
		eventElement.classList.toggle('--closed')
		eventElement.classList.toggle('--open')
	}, true)
}
