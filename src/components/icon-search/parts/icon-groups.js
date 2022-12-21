const iconPanel = document.querySelector('icon-panel')

addEventListener('focus', event => {
	const icon = event.target

	if (icon.matches?.('figure.icon')) {
		const use = icon.querySelector('use[href]')

		const iconID = use.href.baseVal.replace(/^[^#]*/, '')

		iconPanel.setAttribute('use', iconID)
	}
}, true)
