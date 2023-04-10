const staticForm: HTMLFormElement = document.querySelector('form#static-feedback-form')!
const staticRateButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.widget-static_rate-group button')!
const clearButton: HTMLButtonElement = document.querySelector('.widget-static_secondary-button')!
const staticSubmitButton: HTMLButtonElement = document.querySelector('.widget-static_primary-button')!
const staticEmailInput: HTMLInputElement = document.querySelector('input[type="email"]#static-user-email')!
const staticTextarea: HTMLTextAreaElement = document.querySelector('textarea#static-user-input')!
const staticHiddenThumbsUpRadio: HTMLInputElement = document.querySelector('#static-radio_thumbs-up')!
const staticHiddenThumbsDownRadio: HTMLInputElement = document.querySelector('#static-radio_thumbs-down')!
const staticWidgetSuccess: HTMLDivElement = document.querySelector('.widget-static_success')!
let staticEmailPopulated: boolean = false
let staticTextareaPopulated: boolean = false
let staticRateButtonSelected: boolean = false
let staticFormSubmittable: boolean = false

const handleRateButtonUncheckAll = () => {
	// set boolean to false
	staticRateButtonSelected = false

	// deselect UI buttons
	for (const button of staticRateButtons) {
		button.classList.remove('selected')
	}

	// pull checked state from both hidden radios
	staticHiddenThumbsUpRadio.removeAttribute('checked')
	staticHiddenThumbsDownRadio.removeAttribute('checked')
}

const handleRateButtonCheck = (button: HTMLButtonElement) => {
	// set boolean to true
	staticRateButtonSelected = true

	// select UI button
	button.classList.add('selected')

	// map selected button state to checked state of hidden radios
	if (button.id === 'button_thumbs-up') {
		button.classList.contains('selected') ? staticHiddenThumbsUpRadio.setAttribute('checked', '') : staticHiddenThumbsUpRadio.removeAttribute('checked')
	}

	if (button.id === 'button_thumbs-down') {
		button.classList.contains('selected') ? staticHiddenThumbsDownRadio.setAttribute('checked', '') : staticHiddenThumbsDownRadio.removeAttribute('checked')
	}
}

const handleStaticSubmitButtonEnable = () => {
	if (!staticEmailPopulated && !staticTextareaPopulated && !staticRateButtonSelected) {
		staticSubmitButton.disabled = true
	} else if (staticEmailPopulated && !staticTextareaPopulated && !staticRateButtonSelected) {
		staticSubmitButton.disabled = true
	} else {
		staticSubmitButton.disabled = false
		staticFormSubmittable = true
	}
}

const handleClearButton = () => {
	clearButton.addEventListener('click', () => {
		staticEmailPopulated = false
		staticTextareaPopulated = false

		// makes sure rate buttons are deselected when form clears
		handleRateButtonUncheckAll()
		// deselct submit button
		handleStaticSubmitButtonEnable()
	})
}

const isStaticFormPopulated = () => {
	staticEmailInput.addEventListener('input', (event) => {
		const target = event.currentTarget as HTMLInputElement
		target.value ? staticEmailPopulated = true : staticEmailPopulated = false

		handleStaticSubmitButtonEnable()
	})
	staticTextarea.addEventListener('input', (event) => {
		const target = event.currentTarget as HTMLInputElement
		target.value ? staticTextareaPopulated = true : staticTextareaPopulated = false

		handleStaticSubmitButtonEnable()
	})
}

const handlestaticRateButtonSelected = (button: HTMLButtonElement) => {
	// if any selected, deselect all, disable staticForm submit
	if (button.classList.contains('selected')) {
		handleRateButtonUncheckAll()

		handleStaticSubmitButtonEnable()
	} else {
		// Remove selected from all, then add it to clicked button, enable staticForm submit
		handleRateButtonUncheckAll()
		handleRateButtonCheck(button)

		handleStaticSubmitButtonEnable()
	}
}

const handleRateButtonClick = () => {
	// handle toggling the thumbs up/down buttons on and off, making sure they are mutually exclusive
	for (const button of staticRateButtons) {
		button.addEventListener('click', () => {
			// handle UI selection of button
			handlestaticRateButtonSelected(button)
		})
	}
}

const handlestaticFormSubmit = () => {
	if (staticFormSubmittable) {
		staticWidgetSuccess.classList.add('-active')
		// staticForm.submit()
	}
}

// Setting up all event listeners
handleRateButtonClick()
isStaticFormPopulated()
handleClearButton()

staticForm.addEventListener('submit', (event: SubmitEvent) => {
	event.preventDefault()
	handlestaticFormSubmit()
})
