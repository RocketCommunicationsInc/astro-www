const iconPanel = document.querySelector('icon-panel')

import('project:utils/use-click').then(({ useClick }) => {
	for (let icon of document.querySelectorAll('figure.icon')) {
		useClick.on(icon)

		icon.addEventListener('click', event => {
			const use = icon.querySelector('use[href]')

			const iconID = use.href.baseVal.replace(/^[^#]*/, '')

			iconPanel.setAttribute('use', iconID)

			iconPanel.focus()
		})
	}
})
