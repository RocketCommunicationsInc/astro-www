{
	const navButtons = document.querySelectorAll('.p-glossary-nav-button')
	const navSelect = document.querySelector('.p-glossary-nav-select select')
	const navOptions = navSelect.querySelectorAll('option')

	// Add event listeners for nav buttons
	navButtons.forEach((button) => {
		button.addEventListener('click', (event) => handleNavigate(event))
	})

	// Add event listener for nav select
	navSelect.addEventListener('change', (event) => handleNavigate(event))

	// mutation observer for filtered or search changes in the group header matches
	const callback = (mutationsList, observer) => {
		const visibleLetters = [
			...document.querySelectorAll(
				'.p-glossary-item-groups .-group:not(.nomatch)'
			),
		].map((group) => group.querySelector('.-group-heading').id)

		navButtons.forEach((button) => {
			// remove selected state
			if (button.classList.contains('selected')) {
				button.classList.remove('selected')
			}

			// hide all buttons that don't have visible group headings
			if (!visibleLetters.includes(button.id)) {
				button.classList.add('hidden')
			} else {
				button.classList.remove('hidden')
			}
		})

		navSelect.value = 'all'
		navOptions.forEach((option) => {
			// hide all options that don't have visible group headings
			if (!visibleLetters.includes(option.id)) {
				option.classList.add('hidden')
			} else {
				option.classList.remove('hidden')
			}
		})
	}

	const observer = new MutationObserver(callback)
	const targetNode = document.querySelector('.p-glossary-item-groups')
	const config = { attributes: true, childList: false, subtree: true }

	observer.observe(targetNode, config)

	const handleNavigate = (event) => {
		const element = event.target
		if (element instanceof HTMLButtonElement) {
			navButtons.forEach((button) => button.classList.remove('selected'))
			element.classList.add('selected')
		}

		const toolbarHeight = document
			.querySelector('.p-glossary-search')
			.getBoundingClientRect().height
		const topNavHeight = document
			.querySelector('nav.p-navigation')
			.getBoundingClientRect().height
		const { x, y } = document
			.querySelector(
				`h2#${
					element instanceof HTMLButtonElement ? element.id : element.value
				}`
			)
			.getBoundingClientRect()

		// scroll to x, y coords minus height of sticky toolbar in desktop and toolbar plus top nav in mobile
		window.scrollBy(
			x,
			y -
				(window.visualViewport.width < 1024
					? toolbarHeight + topNavHeight
					: toolbarHeight)
		)
	}
}
