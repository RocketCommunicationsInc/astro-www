{
	const select = document.currentScript.previousSibling

	/* we need to offset the scroll to account for sticky header */
	const stickySearch = document.querySelector('.p-icon-search')

	const options = [ ...document.querySelectorAll('.-group-heading') ]
	options.forEach(option => {
		const newOption = document.createElement('option')
		newOption.value = `${option.textContent}`
		newOption.textContent = option.textContent
		select.appendChild(newOption)
	})

	const changeLocation = (event) => {
		const scrollTarget = document.getElementById(event.target.value)
		scrollTarget.style.scrollMarginBlockStart = '65px'
		location.hash = `#${event.target.value}`
	}

	select.addEventListener('change', changeLocation)

	// create intersection observer to watch for when group headings intersect search bar, update selected option displayed
	const iconSearchHeight = document.querySelector('.p-icon-search').offsetHeight
	const viewportHeight = window.innerHeight
	const intersectionOffset = viewportHeight - iconSearchHeight
	const iconGroups = document.querySelectorAll('.-group')
	const iconHeaders = document.querySelectorAll('.-group-heading')
	const iconHeaderFirst = iconHeaders[0]
	const iconHeaderMarginTop = getComputedStyle(iconHeaderFirst).marginTop

	let intersectOptions = {
		root: null,
		rootMargin: `-${iconHeaderMarginTop} 0px -${intersectionOffset}px 0px`,
		threshold: 0,
	}

	let callback = (entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const headingName = entry.target.querySelector('.-group-heading').getAttribute('id')
				select.value = headingName
			}
		});
	};

	let observer = new IntersectionObserver(callback, intersectOptions);

	iconGroups.forEach((group) => {
		observer.observe(group)
	})
}
