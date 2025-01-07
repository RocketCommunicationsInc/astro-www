{
	const select = document.currentScript.previousSibling

	// eslint-disable-next-line no-undef-init
	let any = /** @type {any} */ (undefined)

	// util function
	const capitalizeFirstLetter = (word) => {
		const firstLetterCap = word.charAt(0).toUpperCase()
		const remainingLetters = word.slice(1)
		return firstLetterCap + remainingLetters
	}

	// grab all category options and flatten into an array
	const optionsNotUnique = [
		...document.querySelectorAll('.glossary-categories'),
	]
		.map((categoryElement) =>
			categoryElement.getAttribute('data-categories').split(',')
		)
		.flat()

	// use a Set to remove dupes, map through and capitalize first letter
	const options = [ ...new Set(optionsNotUnique) ].map((opt) => {
		if (opt.includes('_')) {
			return opt
				.split('_')
				.map((word) => capitalizeFirstLetter(word))
				.join(' ')
		} else {
			return capitalizeFirstLetter(opt)
		}
	})

	// append each option value to select element
	options.forEach((option) => {
		const newOption = document.createElement('option')
		newOption.value = option
		newOption.textContent = option
		select.appendChild(newOption)
	})

	// fire the onInput search when the select element changes.
	select.addEventListener('change', (event) => onChange(event.target.value))

	/** Array of glossary item categories. */
	let glossaryItemArrayByLetter = /** @type {GlossaryItemLetterObject[]} */ (
		any
	)

	/** Search result text (only currently used when there are no results). */
	let noResultsElement = /** @type {HTMLParagraphElement} */ (any)

	const onChange = (/** @type {string} */ value) => {
		value = value.trim().toLowerCase()

		glossaryItemArrayByLetter =
			glossaryItemArrayByLetter ||
			[ ...document.querySelectorAll('.p-glossary-item-groups .-group') ].map(
				(/** @type {HTMLElement} */ element) => {
					const letterHeading = element
						.querySelector('.-group-heading')
						.textContent.trim()
					/** An array of the glossary items for the current letter */
					const glossaryItems = [
						...element.querySelectorAll('.glossary-item'),
					].map((/** @type {HTMLElement} */ itemElement) => {
						const categories = itemElement
							.querySelector('.glossary-categories')
							.getAttribute('data-categories')
							.split(',')
							.map((category) => category.replaceAll('_', ' ')) // replace underscore with space for search performance with human typing

						return {
							/** Glossary item (`<li>`) element. */
							element: itemElement,
							/** Glossary item categories. */
							categories,
						}
					})

					return {
						/** Letter Name */
						letterHeading,
						element,
						glossaryItems,
					}
				}
			)

		noResultsElement =
			noResultsElement || document.querySelector('.p-glossary-results')

		let searchResultCount = 0

		for (let glossaryGroup of glossaryItemArrayByLetter) {
			let nomatches = true

			/** Whether the glossary item is matched early because it is empty or matches the category name. */
			let earlymatch =
				!value || value === 'content' || glossaryGroup.letterHeading.toLowerCase().includes(value)

			for (let item of glossaryGroup.glossaryItems) {
				/** Whether the item is not matching the search term. */
				const nomatch =
					// whether the item is
					!earlymatch &&
					!item.categories.some((category) => category.includes(value))

				nomatches = nomatches && nomatch

				item.element.classList.toggle('nomatch', nomatch)

				if (!nomatch) {
					++searchResultCount
				}
			}
			glossaryGroup.element.classList.toggle('nomatch', nomatches)

			const pageHeaderHeight =
				document.querySelector('.page-header').offsetHeight
			const navHeight = document.querySelector('.p-navigation').offsetHeight

			// on successful search, scroll to top of search results minus header
			const scrollBackTo =
				window.visualViewport.width < 800
					? pageHeaderHeight + navHeight
					: pageHeaderHeight
			document.documentElement.scrollTo(0, scrollBackTo)
		}
		noResultsElement.innerHTML = searchResultCount
			? searchResultCount === Number(noResultsElement.dataset.maxSize)
				? ``
				: ``
			: `
				<strong>No results for "${value}".</strong> <p>Not finding what you want? <a href="mailto:support@astrouxds.com">Contact us</a> and suggest a new glossary entry.</p>`
		// !TODO: ADD IN GTAG EVENTS WHEN THEY EXIST
		/** Add google analytic search result logic */
		// make sure that if someone types in quick succession the timeout is cleared and a new one is put in place
		// clearTimeout(searchTimeoutID)
		// searchTimeoutID = setTimeout(() => {
		// 	// if the time between input is greater than 1 seconds send the google event
		// 	gtag('event', 'search', { 'event_category': 'glossary', 'search_term': `${value}`, 'search_results': searchResultCount > 0 })
		// }, 1000)
	}
}
