{
	// eslint-disable-next-line no-undef-init
	let any = /** @type {any} */ (undefined)

	/** Search Form. */
	let formElement = /** @type {HTMLFormElement} */ (document.currentScript.previousSibling)

	/** Search Terms Control. */
	let formControl = /** @type {HTMLInputElement} */ (formElement.querySelector('.-control'))

	/** Search Terms Clear Button. */
	let formClear = /** @type {HTMLInputElement} */ (formElement.querySelector('.-clear'))

	/** gtag search modifier */
	// let searchTimeoutID

	let formState = {
		focused: false,
		filled: false,
	}

	formElement.addEventListener('focus', () => {
		if (formState.focused !== true) formElement.classList.toggle('-focused', formState.focused = true)
	})

	formElement.addEventListener('blur', () => {
		if (formState.focused !== false) formElement.classList.toggle('-focused', false)
	})

	formElement.addEventListener('submit', event => {
		event.preventDefault()
	})

	formControl.addEventListener('input', () => {
		let isFilled = Boolean(formControl.value)

		if (formState.filled !== isFilled) formElement.classList.toggle('-filled', formState.filled = isFilled)
		cancelAnimationFrame(onInputQueue)
		onInputQueue = requestAnimationFrame(() => onInput(formControl.value))
	})

	formClear.addEventListener('click', () => {
		formControl.focus()

		formElement.classList.toggle('-filled', formState.filled = false)

		cancelAnimationFrame(onInputQueue)
		onInputQueue = requestAnimationFrame(() => onInput(formControl.value))
	})

	/** Array of glossary item categories. */
	let glossaryItemArrayByLetter = /** @type {GlossaryItemLetterObject[]} */ (any)

	/** Search result text (only currently used when there are no results). */
	let noResultsElement = /** @type {HTMLParagraphElement} */ (any)

	/** Number representing an awaited animation frame. */
	let onInputQueue = 0

	let onInput = (/** @type {string} */ value) => {
		// value, trimmed and converted to lower case
		value = value.trim().toLowerCase()

		glossaryItemArrayByLetter = glossaryItemArrayByLetter || [
			...document.querySelectorAll('.p-glossary-item-groups .-group')
		].map(
			(/** @type {HTMLElement} */ element) => {
				const letterHeading = element.querySelector('.-group-heading').textContent.trim()
				/** An array of the glossary items for the current letter */
				const glossaryItems = [
					...element.querySelectorAll('.glossary-item')
				].map(
					(/** @type {HTMLElement} */ itemElement) => {
						const name = itemElement.querySelector('.glossary-item-name').textContent.toLowerCase().trim()
						const description = itemElement.querySelector('.glossary-item-description').textContent.toLowerCase().trim()
						const categories = itemElement.querySelector('.glossary-categories').getAttribute('data-categories').split(',').map(category => category.replace('_', ' ')) // replace underscore with space for search performance with human typing
						const tags = itemElement.querySelector('metadata.glossary-metadata').textContent.split(', ').map(tag => tag.replace('_', ' ')) // replace underscore with space for search performance with human typing

						return {
							/** Glossary item name. */
							name,
							/** Glossary item description. */
							description,
							/** Glossary item (`<li>`) element. */
							element: itemElement,
							/** Glossary item categories. */
							categories,
							/** Glossary item tags. */
							tags,
						}
					}
				)

				return {
					/** Letter Name */
					letterHeading,
					element,
					glossaryItems,
				}
			}
		)

		noResultsElement = noResultsElement || document.querySelector('.p-glossary-results')

		let searchResultCount = 0

		for (let glossaryGroup of glossaryItemArrayByLetter) {
			let nomatches = true

			/** Whether the glossary item is matched early because it is empty or matches the category name. */
			let earlymatch = !value || glossaryGroup.letterHeading.toLowerCase().includes(value)

			for (let item of glossaryGroup.glossaryItems) {
				/** Whether the item is not matching the search term. */
				const nomatch = (
					// whether the item is
					!earlymatch &&
					!item.name.includes(value) &&
					!item.description.includes(value) &&
					!item.categories.some(
						category => category.includes(value)
					) &&
					!item.tags.some(
						tag => tag.includes(value)
					)
				)

				nomatches = nomatches && nomatch

				item.element.classList.toggle('nomatch', nomatch)

				if (!nomatch) {
					++searchResultCount
				}
			}
			glossaryGroup.element.classList.toggle('nomatch', nomatches)

			const pageHeaderHeight = document.querySelector('.page-header').offsetHeight
			const navHeight = document.querySelector('.p-navigation').offsetHeight

			// on successful search, scroll to top of search results minus header
			const scrollBackTo = window.visualViewport.width < 800 ? pageHeaderHeight + navHeight : pageHeaderHeight
			document.documentElement.scrollTo(0, scrollBackTo)
		}
		noResultsElement.innerHTML = (
			searchResultCount
				? (
					searchResultCount === Number(noResultsElement.dataset.maxSize)
				)
					? ``
				: ``
			: `
			<strong>No results for "${value}".</strong> <p>Not finding what you want? <a href="mailto:support@astrouxds.com">Contact us</a> and suggest a new glossary entry.</p>`
		)
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

/** @typedef {import('./glossary-search-form').GlossaryItemObject} GlossaryItemObject */
/** @typedef {import('./glossary-search-form').GlossaryItemLetterObject} GlossaryItemLetterObject */
