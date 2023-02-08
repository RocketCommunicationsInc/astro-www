{
	let form = document.currentScript.previousSibling

	let element = {
		form,
		control: form.querySelector('.-control'),
		clear: form.querySelector('.-clear'),
	}

	let state = {
		focused: false,
		filled: false,
	}

	element.form.addEventListener('focus', () => {
		if (state.focused !== true) element.form.classList.toggle('-focused', state.focused = true)
	})

	element.form.addEventListener('blur', () => {
		if (state.focused !== false) element.form.classList.toggle('-focused', false)
	})

	element.form.addEventListener('submit', event => {
		event.preventDefault()
	})

	element.control.addEventListener('input', () => {
		let isFilled = Boolean(element.control.value)

		if (state.filled !== isFilled) element.form.classList.toggle('-filled', state.filled = isFilled)

		cancelAnimationFrame(onInputQueue)
		onInputQueue = requestAnimationFrame(() => onInput(element.control.value))
	})

	element.clear.addEventListener('click', () => {
		element.control.focus()

		element.form.classList.toggle('-filled', state.filled = false)

		cancelAnimationFrame(onInputQueue)
		onInputQueue = requestAnimationFrame(() => onInput(element.control.value))
	})

	/** @type {IconCategoryObject[]} */
	let groups

	let searchResultCountEl

	let onInputQueue

	let onInput = (/** @type {string} */ value) => {
		// value, trimmed and converted to lower case
		value = value.trim().toLowerCase()

		groups = groups || [
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
					name,
					element,
					icons,
				}
			}
		)

		searchResultCountEl = searchResultCountEl || document.querySelector('.p-icon-results')

		let searchResultCount = 0

		for (let iconGroup of groups) {
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
		}

		searchResultCountEl.innerHTML = (
			searchResultCount
				? (
					searchResultCount === Number(searchResultCountEl.dataset.maxSize)
				)
					? ``
				: ``
			: `No matching icons. Please contact <a href="mailto:support@astrouxds.com">support@astrouxds.com</a>.`
		)
	}
}

/** @typedef {{ name: string; element: HTMLElement; tags: string[] }} IconObject */
/** @typedef {{ name: string, element: HTMLElement; icons: IconObject[] }} IconCategoryObject */
