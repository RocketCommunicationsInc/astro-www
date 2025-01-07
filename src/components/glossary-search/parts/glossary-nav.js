{
	// Find our component DOM on the page.
	const navButtons = document.querySelectorAll('.p-glossary-nav-button')

	// Add event listeners to fire confetti when a button is clicked.
	navButtons.forEach((button) => {
		button.addEventListener('click', (event) => handleClick(event))
	})

	// mutation observer for filtered or search changes in the group header matches
	const callback = (mutationsList, observer) => {
		const visibleLetters = [
			...document.querySelectorAll(
				'.p-glossary-item-groups .-group:not(.nomatch)'
			),
		].map((group) => group.querySelector('.-group-heading').id)

		navButtons.forEach(button => {
			if (!visibleLetters.includes(button.id)) {
				button.classList.add('hidden')
			} else {
				button.classList.remove('hidden')
			}
		})
	}

	const observer = new MutationObserver(callback)
	const targetNode = document.querySelector('.p-glossary-item-groups')
	const config = { attributes: true, childList: false, subtree: true }

	observer.observe(targetNode, config)

	const handleClick = (event) => {
		navButtons.forEach((button) => button.classList.remove('selected'))

		const button = event.target
		const { height } = document
			.querySelector('.p-glossary-search')
			.getBoundingClientRect()
		const { x, y } = document
			.querySelector(`h2#${button.id}`)
			.getBoundingClientRect()

		button.classList.add('selected')
		window.scrollBy(x, y - height)
	}
}
