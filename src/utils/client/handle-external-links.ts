// intercept anchor link clicks to open external links in a blank window
addEventListener('click', event => {
	/** Anchor element that was clicked. */
	const anchor = (<Element>event.target!).closest<HTMLAnchorElement>('a')

	// if no anchor was clicked, do nothing
	if (anchor === null) return

	// if the anchor is not a link without a target, do nothing
	if (!anchor.matches('[href]:not([target])')) return

	/** Whether the anchor link comes from the current origin or www.astrouxds.com. */
	const isInternalOrigin = (
		anchor.hostname === location.hostname ||
		anchor.hostname === 'www.astrouxds.com'
	)

	// if the anchor link does not come from the current origin or www.astrouxds.com, do nothing
	if (isInternalOrigin) return

	// set the anchor link to open in a blank window
	// note: this implicitly provides the same behavior as `rel="noopener"`
	anchor.target = '_blank'
}, { capture: true })
