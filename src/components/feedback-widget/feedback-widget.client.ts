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
	// deselect UI buttons
	for (const button of rateButtons) {
		button.classList.remove('selected')
	}

	// pull checked state from both hidden radios
	hiddenThumbsUpRadio.removeAttribute('checked');
	hiddenThumbsDownRadio.removeAttribute('checked');
}

const handleRateButtonCheck = (button: HTMLButtonElement) => {
	button.classList.add('selected')
	// map selected button state to hidden radios for form submit
	// add checked state to selected radio
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
		handleRateButtonUncheckAll();
	})
}

const isFormPopulated = () => {
	emailInput.addEventListener('input', (event) => {
		const target =  event.currentTarget as HTMLInputElement
		if (target.value) {
			emailPopulated = true;
			(!rateButtonSelected && !textareaPopulated) ? submitButton.disabled = true : submitButton.disabled = false
		} else {
			emailPopulated = false
			if (!rateButtonSelected && !textareaPopulated) submitButton.disabled = true
		}
	})
	textarea.addEventListener('input', (event) => {
		const target =  event.currentTarget as HTMLInputElement
		if (target.value) {
			textareaPopulated = true
			submitButton.disabled = false
		} else {
			textareaPopulated = false
			if (!rateButtonSelected) submitButton.disabled = true
		}
	})
}

const handleRateButtonSelected = (button: HTMLButtonElement) => {
	// if it's selected already only deselect itself (which will mean both will be deselected), disable form submit
	if (button.classList.contains('selected')) {
		handleRateButtonUncheckAll()
		rateButtonSelected = false
		if(!textareaPopulated) {
			submitButton.disabled = true
		}
	} else {
		// Remove selected from all, then add it to clicked button, enable form submit
		handleRateButtonUncheckAll()
		handleRateButtonCheck(button)
		rateButtonSelected = true
		submitButton.disabled = false
	}
}

const handleRateButtonsClick = () => {
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

toggleWidget()
handleRateButtonsClick()
isFormPopulated()
