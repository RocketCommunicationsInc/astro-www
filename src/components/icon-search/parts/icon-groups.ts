const iconPanel = document.querySelector<HTMLElement>('icon-panel')!

addEventListener('focus', event => {
	const icon = event.target as HTMLElement

	if (icon.matches?.('figure.icon')) {
		const use = icon.querySelector<SVGUseElement>('use[href]')!

		const iconID = use.href.baseVal

		iconPanel.setAttribute('use', iconID)
	}
}, true)
