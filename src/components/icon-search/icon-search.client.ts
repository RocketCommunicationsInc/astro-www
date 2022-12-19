const iconPanel = document.querySelector<HTMLElement>('icon-panel')!

const iconGroups = [
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

const searchControl = document.querySelector<HTMLInputElement>('.icon-search-form .-control')!
const searchResultCountEl = document.querySelector<HTMLParagraphElement>('.p-icon-results')!

searchControl.addEventListener('input', () => {
	let { value } = searchControl
	let searchResultCount = 0

	value = value.trim().toLowerCase()

	iconPanel.removeAttribute('use')

	for (let iconGroup of iconGroups) {
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
})

addEventListener('focus', event => {
	const icon = event.target as HTMLElement

	if (icon.matches?.('figure.icon')) {
		const use = icon.querySelector<SVGUseElement>('use[href]')!

		const iconID = use.href.baseVal

		iconPanel.setAttribute('use', iconID)
	}
}, true)

export {}
