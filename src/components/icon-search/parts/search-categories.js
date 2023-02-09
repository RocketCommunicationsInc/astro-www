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
}
