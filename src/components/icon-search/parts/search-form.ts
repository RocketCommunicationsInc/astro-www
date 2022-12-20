{
	let form = document.currentScript!.previousSibling! as HTMLFormElement

	let element = {
		form,
		control: form.querySelector('.-control')! as HTMLInputElement,
		clear: form.querySelector('.-clear') as HTMLButtonElement,
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

	let groups: {
		name: string
		element: HTMLElement
		icons: {
			name: string
			element: HTMLElement
		}[]
	}[]

	let searchResultCountEl: HTMLParagraphElement

	let onInputQueue: number

	let onInput = (value: string) => {
		groups = groups || [
			...document.querySelectorAll('.p-icon-groups .-group')!
		].map(
			element => {
				const name = element.querySelector('.-group-heading')?.textContent!.toLowerCase()!

				const icons = [
					...element.querySelectorAll('.icon')
				].map(
					element => {
						const name = element.querySelector('figcaption')?.textContent!.toLowerCase()!

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

		searchResultCountEl = searchResultCountEl || document.querySelector('.p-icon-results')!

		let searchResultCount = 0

		for (let iconGroup of groups) {
			let nomatches = true
			let earlymatch = !value || iconGroup.name.includes(value)

			for (let icon of iconGroup.icons) {
				const nomatch = !earlymatch && Boolean(value) && !icon.name.includes(value)

				nomatches = nomatches && nomatch

				icon.element.classList.toggle('nomatch', nomatch)

				if (!nomatch) {
					++searchResultCount
				}
			}

			iconGroup.element.classList.toggle('nomatch', nomatches)
		}

		searchResultCountEl.textContent = (
			searchResultCount
				? (
					searchResultCount === Number(searchResultCountEl.dataset.maxSize)
				)
					? `Showing all ${searchResultCount} icons.`
				: `Showing ${searchResultCount} matching icons.`
			: `No matching icons.`
		)
	}
}
