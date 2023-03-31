const rateButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.widget_rate-group button')!
const submitButton: HTMLButtonElement = document.querySelector('.widget_primary-button')!
const emailInput: HTMLInputElement = document.querySelector('input[type="email"]')!
const textarea: HTMLTextAreaElement = document.querySelector('textarea')!
let formPopulated: boolean = false

const toggleWidget = () => {
	const widgetWrapper = document.querySelector('.widget_wrapper')!
	const topTab = document.querySelector('.widget_top-tab')!
	const cancelButton = document.querySelector('.widget_secondary-button')!

	topTab.addEventListener('click', () => {
		widgetWrapper?.classList.toggle('-active');
	})
	cancelButton.addEventListener('click', () => {
		widgetWrapper?.classList.toggle('-active');
	})
}

const handleRateButtonRemove = () => {
	for (const button of rateButtons) {
		button.classList.remove('selected')
	}
}

const isFormPopulated = () => {
	emailInput.addEventListener('input', (event) => {
		const target =  event.currentTarget as HTMLInputElement
		target.value ? formPopulated = true : formPopulated = false
	})
	textarea.addEventListener('input', (event) => {
		const target =  event.currentTarget as HTMLInputElement
		target.value ? formPopulated = true : formPopulated = false
	})
}

const handleRateButtonSelected = (button: HTMLButtonElement) => {
	// if it's selected already only deselect itself (which will mean both will be deselected), disable form submit
	if (button.classList.contains('selected')) {
		button.classList.remove('selected')
		if(!formPopulated) {
			submitButton.disabled = true
		}
	} else {
		// Remove selected from all, then add it to clicked button, enable form submit
		handleRateButtonRemove()
		button.classList.add('selected')
		submitButton.disabled = false
	}
}

const handleRateButtonsClick = () => {
	// handle toggling the thumbs up/down buttons on and off, making sure they are mutually exclusive
	for (const button of rateButtons) {
		button.addEventListener('click', () => {
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
