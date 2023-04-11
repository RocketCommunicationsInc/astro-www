{
	const scriptEl = document.currentScript

	/** Asset Status Mobile Status Key */
	const eventElement = scriptEl.previousSibling
	const toggle = eventElement.querySelector('.-toggle')

	/*closed by default*/
	eventElement.classList.add('--closed')

	toggle.addEventListener('click', (event)=>{
		if (event.target.closest('.-toggle') === null) return

		eventElement.classList.toggle('--closed')
		eventElement.classList.toggle('--open')
	})

}
