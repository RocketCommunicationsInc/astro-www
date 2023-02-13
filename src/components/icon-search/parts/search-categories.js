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
		const offset = stickySearch.getBoundingClientRect().height
		const scrollTarget = document.getElementById(event.target.value)
		scrollTarget.style.scrollMarginBlockStart = offset + 'px'
		location.hash = `#${event.target.value}`
	}

	select.addEventListener('change', changeLocation)

	// create intersection observer to watch for when group headings intersect search bar, update selected option displayed
	// const iconSearchHeight = document.querySelector('.p-icon-search').offsetHeight
	const iconSearchHeight = 200
	const viewportHeight = window.innerHeight
	const intersectionOffset = viewportHeight - iconSearchHeight
	const iconGroups = document.querySelectorAll('.-group')

	let intersectOptions = {
		root: null,
		rootMargin: `0px 0px -${intersectionOffset}px 0px`,
		threshold: 0,
	}

	let callback = (entries) => {
		console.log('observed')
		entries.forEach((entry) => {
			console.log(entry.intersectionRatio)
			if (entry.intersectionRatio > 0) {
				const headingName = entry.target.querySelector('.-group-heading').getAttribute('id')
				console.log(headingName)
				select.value = headingName
			}
		});
	};

	iconGroups.forEach((group) => {
		let observer = new IntersectionObserver(callback, intersectOptions);
		observer.observe(group)
	})
}
