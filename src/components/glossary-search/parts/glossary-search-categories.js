{
	const select = document.currentScript.previousSibling

	// util function
	const capitalizeFirstLetter = (word) => {
		const firstLetterCap = word.charAt(0).toUpperCase()
		const remainingLetters = word.slice(1)
		return firstLetterCap + remainingLetters
	}

	// grab all category options and flatten into an array
	const optionsNotUnique = [
		...document.querySelectorAll('.glossary-categories'),
	]
		.map((categoryElement) =>
			categoryElement.getAttribute('data-categories').split(',')
		)
		.flat()

	// use a Set to remove dupes, map through and capitalize first letter
	const options = [ ...new Set(optionsNotUnique) ].map((opt) => {
		if (opt.includes('_')) {
			return opt
				.split('_')
				.map((word) => capitalizeFirstLetter(word))
				.join(' ')
		} else {
			return capitalizeFirstLetter(opt)
		}
	})

	// append each option value to select element
	options.forEach((option) => {
		const newOption = document.createElement('option')
		newOption.value = option
		newOption.textContent = option
		select.appendChild(newOption)
	})
}
