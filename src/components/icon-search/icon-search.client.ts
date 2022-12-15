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

const searchControl = document.querySelector<HTMLInputElement>('.p-icon-search input')!

console.log(searchControl)

searchControl.addEventListener('input', () => {
	let { value } = searchControl

	value = value.trim().toLowerCase()

	for (let iconGroup of iconGroups) {
		let nomatches = true

		for (let icon of iconGroup.icons) {
			const nomatch = Boolean(value) && !icon.name.includes(value)

			nomatches = nomatches && nomatch

			icon.element.classList.toggle('nomatch', nomatch)
		}

		iconGroup.element.classList.toggle('nomatch', nomatches)
	}
})

export {}
