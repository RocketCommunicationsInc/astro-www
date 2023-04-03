const rateButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.widget_rate-group button')!
const submitButton: HTMLButtonElement = document.querySelector('.widget_primary-button')!
const emailInput: HTMLInputElement = document.querySelector('input[type="email"]')!
const textarea: HTMLTextAreaElement = document.querySelector('textarea')!
const buttonThumbsUpRadio: HTMLInputElement = document.querySelector('#button_thumbs-up')!
const buttonThumbsDownRadio: HTMLInputElement = document.querySelector('#button_thumbs-down')!
const hiddenThumbsUpRadio: HTMLInputElement = document.querySelector('#radio_thumbs-up')!
const hiddenThumbsDownRadio: HTMLInputElement = document.querySelector('#radio_thumbs-down')!
let emailPopulated: boolean = false
let textareaPopulated: boolean = false
let rateButtonSelected: boolean = false

const handleRateButtonUncheckAll = () => {
	// set boolean to false
	rateButtonSelected = false

	// deselect UI buttons
	for (const button of rateButtons) {
		button.classList.remove('selected')
	}

	// pull checked state from both hidden radios
	hiddenThumbsUpRadio.removeAttribute('checked');
	hiddenThumbsDownRadio.removeAttribute('checked');
}

const handleRateButtonCheck = (button: HTMLButtonElement) => {
	//set boolean to true
	rateButtonSelected = true

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

const toggleWidget = () => {
	const widgetWrapper = document.querySelector('.widget_wrapper')!
	const topTab = document.querySelector('.widget_top-tab')!
	const cancelButton = document.querySelector('.widget_secondary-button')!

	topTab.addEventListener('click', () => {
		widgetWrapper?.classList.toggle('-active');
	})
	cancelButton.addEventListener('click', () => {
		widgetWrapper?.classList.toggle('-active');
		emailPopulated = false
		textareaPopulated = false

		//makes sure rate buttons are deselected when form clears
		handleRateButtonUncheckAll();

		// deselct submit button
		handleSubmitButtonEnable()
	})
}

const handleSubmitButtonEnable = () => {
	if (!emailPopulated && !textareaPopulated && !rateButtonSelected ) {
		submitButton.disabled = true;
	} else if (emailPopulated && !textareaPopulated && !rateButtonSelected) {
		submitButton.disabled = true;
	} else {
		submitButton.disabled = false;
	}
}

const isFormPopulated = () => {
	emailInput.addEventListener('input', (event) => {
		const target =  event.currentTarget as HTMLInputElement
		target.value ? emailPopulated = true : emailPopulated = false

		handleSubmitButtonEnable()
	})
	textarea.addEventListener('input', (event) => {
		const target =  event.currentTarget as HTMLInputElement
		target.value ? textareaPopulated = true : textareaPopulated = false

		handleSubmitButtonEnable()
	})
}

const handleRateButtonSelected = (button: HTMLButtonElement) => {
	// if any selected, deselect all, disable form submit
	if (button.classList.contains('selected')) {
		handleRateButtonUncheckAll()

		handleSubmitButtonEnable()
	} else {
		// Remove selected from all, then add it to clicked button, enable form submit
		handleRateButtonUncheckAll()
		handleRateButtonCheck(button)

		handleSubmitButtonEnable()
	}
}

const handleRateButtonClick = () => {
	// handle toggling the thumbs up/down buttons on and off, making sure they are mutually exclusive
	for (const button of rateButtons) {
		button.addEventListener('click', () => {
			// handle UI selection of button
			handleRateButtonSelected(button)
		})
	}
}

const handleForm = () => {
	const form = document.querySelector('form')
}

// Setting up all event listeners
toggleWidget()
handleRateButtonClick()
isFormPopulated()
