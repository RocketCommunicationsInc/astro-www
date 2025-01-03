{
	const select = document.currentScript.previousSibling
	const glossarySearchHeight = document.querySelector('.p-glossary-search').offsetHeight
	const viewportHeight = window.innerHeight
	const intersectionOffset = viewportHeight - glossarySearchHeight
	const glossaryGroups = document.querySelectorAll('.-group')
	const glossaryHeaders = document.querySelectorAll('.-group-heading')
	const glossaryHeaderFirst = glossaryHeaders[0]
	const glossaryHeaderMarginTop = parseFloat(getComputedStyle(glossaryHeaderFirst).marginTop)

	const options = [ ...document.querySelectorAll('.-group-heading') ]
	options.forEach(option => {
		const newOption = document.createElement('option')
		newOption.value = `${option.textContent}`
		newOption.textContent = option.textContent
		select.appendChild(newOption)
	})

	const changeLocation = (event) => {
		const scrollOffset = glossarySearchHeight - glossaryHeaderFirst.offsetHeight
		const scrollTarget = document.getElementById(event.target.value)

		// we need to offset the scroll to account for sticky header
		scrollTarget.style.scrollMarginBlockStart = `${scrollOffset}px`
		location.hash = `#${event.target.value}`
	}

	select.addEventListener('change', changeLocation)

	// create intersection observer to watch for when group headings intersect search bar, update selected option displayed
	let intersectOptions = {
		root: null,
		rootMargin: `${-1 * glossaryHeaderMarginTop}px 0px ${-1 * intersectionOffset}px 0px`,
		threshold: 0,
	}

	let callback = (entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const headingName = entry.target.querySelector('.-group-heading').getAttribute('id')
				select.value = headingName
			}
		})
	}

	let observer = new IntersectionObserver(callback, intersectOptions)

	glossaryGroups.forEach((group) => {
		observer.observe(group)
	})
}
