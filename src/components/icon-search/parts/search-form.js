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
	let searchTimeoutID

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

	/** Array of icon categories. */
	let iconCategoryArray = /** @type {IconCategoryObject[]} */ (any)

	/** Search result text (only currently used when there are no results). */
	let noResultsElement = /** @type {HTMLParagraphElement} */ (any)

	/** Number representing an awaited animation frame. */
	let onInputQueue = 0

	let onInput = (/** @type {string} */ value) => {
		// value, trimmed and converted to lower case
		value = value.trim().toLowerCase()

		iconCategoryArray = iconCategoryArray || [
			...document.querySelectorAll('.p-icon-groups .-group')
		].map(
			(/** @type {HTMLElement} */ element) => {
				/** Category name. */
				const name = element.querySelector('.-group-heading').textContent.toLowerCase()

				/** Icons as a normalized object. */
				const icons = [
					...element.querySelectorAll('.icon')
				].map(
					(/** @type {HTMLElement} */ element) => {
						const use = element.querySelector('use')
						const name = element.querySelector('figcaption').textContent.toLowerCase()
						const tags = document.querySelector(use.getAttribute('href') + ' metadata').textContent.split(', ')

						return {
							/** Icon name. */
							name,
							/** Icon (`<figure>`) element. */
							element,
							/** Icon tags. */
							tags,
						}
					}
				)

				return {
					/** Category Name */
					name,
					element,
					icons,
				}
			}
		)

		noResultsElement = noResultsElement || document.querySelector('.p-icon-results')

		let searchResultCount = 0

		for (let iconGroup of iconCategoryArray) {
			let nomatches = true

			/** Whether the icon is matched early because it is empty or matches the category name. */
			let earlymatch = !value || iconGroup.name.toLowerCase().includes(value)

			for (let icon of iconGroup.icons) {
				/** Whether the icon is not matching the search term. */
				const nomatch = (
					// whether the icon is
					!earlymatch &&
					!icon.name.includes(value) &&
					!icon.tags.some(
						tag => tag.includes(value)
					)
				)

				nomatches = nomatches && nomatch

				icon.element.classList.toggle('nomatch', nomatch)

				if (!nomatch) {
					++searchResultCount
				}
			}
			iconGroup.element.classList.toggle('nomatch', nomatches)

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
			<strong>No results for "${value}".</strong> <p>Not finding what you want? <a href="mailto:support@astrouxds.com">Contact us</a> and suggest a new icon.</p>`
		)

				/** Add google analytic search result logic */
		// make sure that if someone types in quick succession the timeout is cleared and a new one is put in place
		clearTimeout(searchTimeoutID)
		searchTimeoutID = setTimeout(() => {
			// if the time between input is greater than 3 seconds send the google event
			gtag('event', 'search', { 'event_category': 'icon_library', 'search_term': `${value}`, 'search_results': searchResultCount > 0 })
		}, 2000)
	}
}

/** @typedef {import('./search-form.d').IconObject} IconObject */
/** @typedef {import('./search-form.d').IconCategoryObject} IconCategoryObject */
