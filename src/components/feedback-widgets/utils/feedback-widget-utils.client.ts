export const handleRemoveSelected = (rateButtons: NodeListOf<HTMLButtonElement>) => {
	// deselect UI buttons
	for (const button of rateButtons) {
		button.classList.remove('selected')
	}
}

export const handleUncheckedRadios = (hiddenThumbsUpRadio: HTMLInputElement, hiddenThumbsDownRadio: HTMLInputElement) => {
	// pull checked state from both hidden radios
	hiddenThumbsUpRadio.removeAttribute('checked')
	hiddenThumbsDownRadio.removeAttribute('checked')
}

export const handleRateButtonCheck = (button: HTMLButtonElement, hiddenThumbsUpRadio: HTMLInputElement, hiddenThumbsDownRadio: HTMLInputElement) => {
	// select UI button
	button.classList.add('selected')

	// map selected button state to checked state of hidden radios
	if (button.id === 'button_thumbs-up') {
		button.classList.contains('selected') ? hiddenThumbsUpRadio.setAttribute('checked', '') : hiddenThumbsUpRadio.removeAttribute('checked')
	}

	if (button.id === 'button_thumbs-down') {
		button.classList.contains('selected') ? hiddenThumbsDownRadio.setAttribute('checked', '') : hiddenThumbsDownRadio.removeAttribute('checked')
	}
}

export const handleSubmitButton = (submitButton: HTMLButtonElement, emailPopulated: Boolean, textareaPopulated: Boolean, rateButtonSelected: Boolean) => {
	if (!emailPopulated && !textareaPopulated && !rateButtonSelected) {
		submitButton.disabled = true
	} else if (emailPopulated && !textareaPopulated && !rateButtonSelected) {
		submitButton.disabled = true
	} else {
		submitButton.disabled = false
	}
}
