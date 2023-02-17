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

	let groups

	let searchResultCountEl

	let onInputQueue

	let onInput = (value) => {
		groups = groups || [
			...document.querySelectorAll('.p-icon-groups .-group')
		].map(
			element => {
				const name = element.querySelector('.-group-heading')?.textContent.toLowerCase()

				const icons = [
					...element.querySelectorAll('.icon')
				].map(
					element => {
						const name = element.querySelector('figcaption')?.textContent.toLowerCase()

						return {
							name,
							element,
						}
					}
				)

				return {
					name,
					element,
					icons
				}
			}
		)

		searchResultCountEl = searchResultCountEl || document.querySelector('.p-icon-results')

		let searchResultCount = 0

		let lowerCaseValue = value.toLowerCase()

		for (let iconGroup of groups) {
			let nomatches = true
			let earlymatch = !lowerCaseValue || iconGroup.name.includes(lowerCaseValue)

			for (let icon of iconGroup.icons) {
				const nomatch = !earlymatch && Boolean(lowerCaseValue) && !icon.name.includes(lowerCaseValue)

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

		searchResultCountEl.innerHTML = (
			searchResultCount
				? (
					searchResultCount === Number(searchResultCountEl.dataset.maxSize)
				)
					? ``
				: ``
			: `
			<strong>No results for "${value}".</strong> <p>Not finding what you want? <a href="mailto:support@astrouxds.com">Contact us</a> and suggest a new icon.</p>`
		)
	}
}
