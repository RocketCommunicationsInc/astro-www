export const handleSubmitButtonEnable = (submitButton: HTMLButtonElement, formSubmittable: Boolean, emailPopulated: Boolean, textareaPopulated: Boolean, rateButtonSelected: Boolean) => {
	if (!emailPopulated && !textareaPopulated && !rateButtonSelected) {
		submitButton.disabled = true
	} else if (emailPopulated && !textareaPopulated && !rateButtonSelected) {
		submitButton.disabled = true
	} else {
		submitButton.disabled = false
		formSubmittable = true
	}
}

export const handleRateButtonUncheckAll = (rateButtonSelected: boolean, rateButtons: NodeListOf<HTMLButtonElement>, hiddenThumbsUpRadio: HTMLInputElement, hiddenThumbsDownRadio: HTMLInputElement) => {
	// set boolean to false
	rateButtonSelected = false

	// deselect UI buttons
	for (const button of rateButtons) {
		button.classList.remove('selected')
	}

	// pull checked state from both hidden radios
	hiddenThumbsUpRadio.removeAttribute('checked')
	hiddenThumbsDownRadio.removeAttribute('checked')
}
