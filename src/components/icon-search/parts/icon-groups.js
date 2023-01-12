const useClick = {
	on(element) {
		element.addEventListener('keydown', this)
		element.addEventListener('keyup', this)
	},
	handleEvent(event) {
		switch (event.key) {
			case event.type === 'keydown' && 'Enter':
				event.target.click()

			case ' ':
				event.preventDefault()

				if (!event.altKey && event.type === 'keyup') {
					event.target.click()
				}
		}
	},
}

const iconPanel = document.querySelector('icon-panel')

const iconState = {
	/** @type {Element} */
	activeElement: null,
	changeElement(/** @type {Element | null} */ element) {
		element = element instanceof Element ? element : null

		if (iconState.activeElement === element) return

		if (iconState.activeElement !== null) {
			iconState.activeElement.classList.toggle('selected', false)
		}

		iconState.activeElement = element

		if (iconState.activeElement !== null) {
			iconState.activeElement.classList.toggle('selected', true)
		}
	},
}

for (let icon of document.querySelectorAll('figure.icon')) {
	useClick.on(icon)

	icon.addEventListener('click', event => {
		const use = icon.querySelector('use[href]')

		const iconID = use.href.baseVal.replace(/^[^#]*/, '')

		iconPanel.setAttribute('use', iconID)

		iconPanel.focus()

		iconState.changeElement(icon)
	})
}

addEventListener('close-icon-side-panel', () => {
	iconState.changeElement(null)
})
