{
	const select = document.currentScript.previousSibling

	const optionsNotUnique = [ ...document.querySelectorAll('.glossary-categories') ].map((categoryElement) => (
		categoryElement.getAttribute('data-categories').split(',')
	)).flat()

	const options = [ ...new Set(optionsNotUnique) ]
	options.forEach(option => {
		const newOption = document.createElement('option')
		newOption.value = option
		newOption.textContent = option.replace('_', ' ')
		select.appendChild(newOption)
	})
}
