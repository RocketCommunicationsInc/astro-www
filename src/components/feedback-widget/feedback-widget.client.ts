// const widgetWrapper: HTMLElement = document.querySelector('.widget_wrapper')!
const widgetInteriorWrapper: HTMLElement = document.querySelector('.widget_interior-wrapper')!
const topTab: HTMLElement = document.querySelector('.widget_top-tab')!
const widgetContent: HTMLElement = document.querySelector('.widget_content')!
const form: HTMLFormElement = document.querySelector('form#feedback-form')!
const cancelButton: HTMLButtonElement = document.querySelector('.widget_secondary-button')!
const rateButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.widget_rate-group button')!
const submitButton: HTMLButtonElement = document.querySelector('.widget_primary-button')!
const emailInput: HTMLInputElement = document.querySelector('input[type="email"]#user-email')!
const textarea: HTMLTextAreaElement = document.querySelector('textarea#user-input')!
// const buttonThumbsUpRadio: HTMLInputElement = document.querySelector('#button_thumbs-up')!
// const buttonThumbsDownRadio: HTMLInputElement = document.querySelector('#button_thumbs-down')!
const hiddenThumbsUpRadio: HTMLInputElement = document.querySelector('#radio_thumbs-up')!
const hiddenThumbsDownRadio: HTMLInputElement = document.querySelector('#radio_thumbs-down')!
const widgetSuccess: HTMLDivElement = document.querySelector('.widget_success')!
let emailPopulated: boolean = false
let textareaPopulated: boolean = false
let rateButtonSelected: boolean = false
let formSubmittable: boolean = false
let toggle: boolean = false
// let formSubmitted: boolean = false

const handleRateButtonUncheckAll = () => {
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

const handleRateButtonCheck = (button: HTMLButtonElement) => {
	// set boolean to true
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

const showHideWidget = () => {
	toggle = !toggle

	const toggleAttributes = (toggle: boolean) => {
		widgetContent.toggleAttribute('data-collapsible-active', toggle)
		topTab.toggleAttribute('data-collapsible-trigger-active', toggle)
	}

	toggleAttributes(true)
	const tabSize = topTab.getBoundingClientRect()[visualViewport.width < 800 ? 'width' : 'height']
	let keyframeInteriorMin: Record<string, string> = {
		translate: visualViewport.width < 800 ? `calc(100% - ${tabSize}px) 0%` : `0% calc(100% - ${tabSize}px)`,
	}
	let keyframeInteriorMax: Record<string, string> = {
		translate: `0% 0%`,
	}

	let min: Record<string, string> = {
		height: `${widgetContent.getBoundingClientRect().height}px`,
	}
	let max: Record<string, string> = {
		height: `${widgetContent.getBoundingClientRect().height}px`,
	}

	if (window.visualViewport.width < 800) {
		min = {
			width: `${widgetContent.getBoundingClientRect().width}px`,
		}
		max = {
			width: `${widgetContent.getBoundingClientRect().width}px`,
		}
	}

	const keyframes = toggle ? [ min, max ] : [ max, min ]
	const keyframesInterior = toggle ? [ keyframeInteriorMin, keyframeInteriorMax ] : [ keyframeInteriorMax, keyframeInteriorMin ]

	widgetInteriorWrapper.animate(
		keyframesInterior,
		{
			duration: 200,
			iterations: 1,
		}
	)

	widgetContent.animate(
		keyframes,
		{
			duration: 200,
			iterations: 1,
		}
	).finished.then(() => {
		toggleAttributes(toggle)
	})
}

const toggleWidget = () => {
	topTab.addEventListener('click', () => {
		showHideWidget()
	})
	cancelButton.addEventListener('click', () => {
		showHideWidget()
		emailPopulated = false
		textareaPopulated = false

		// makes sure rate buttons are deselected when form clears
		handleRateButtonUncheckAll()

		// deselct submit button
		handleSubmitButtonEnable()
	})
}

const handleSubmitButtonEnable = () => {
	if (!emailPopulated && !textareaPopulated && !rateButtonSelected) {
		submitButton.disabled = true
	} else if (emailPopulated && !textareaPopulated && !rateButtonSelected) {
		submitButton.disabled = true
	} else {
		submitButton.disabled = false
		formSubmittable = true
	}
}

const isFormPopulated = () => {
	emailInput.addEventListener('input', (event) => {
		const target = event.currentTarget as HTMLInputElement
		target.value ? emailPopulated = true : emailPopulated = false

		handleSubmitButtonEnable()
	})
	textarea.addEventListener('input', (event) => {
		const target = event.currentTarget as HTMLInputElement
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

const handleFormSubmit = () => {
	if (formSubmittable) {
		widgetSuccess.classList.add('-active')
		// staticForm.submit()
	}
}

// Setting up all event listeners
toggleWidget()
handleRateButtonClick()
isFormPopulated()

form.addEventListener('submit', (event: SubmitEvent) => {
	event.preventDefault()
	handleFormSubmit()
})
