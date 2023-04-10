const widgetInteriorWrapper: HTMLElement = document.querySelector('.widget_interior-wrapper')!
const topTab: HTMLElement = document.querySelector('.widget_top-tab')!
const widgetContent: HTMLElement = document.querySelector('.widget_content')!
const form: HTMLFormElement = document.querySelector('form#feedback-form')!
const cancelButton: HTMLButtonElement = document.querySelector('.widget_secondary-button')!
const rateButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.widget_rate-group button')!
const submitButton: HTMLButtonElement = document.querySelector('.widget_primary-button')!
const emailInput: HTMLInputElement = document.querySelector('input[type="email"]#user-email')!
const textarea: HTMLTextAreaElement = document.querySelector('textarea#user-input')!
const hiddenThumbsUpRadio: HTMLInputElement = document.querySelector('#radio_thumbs-up')!
const hiddenThumbsDownRadio: HTMLInputElement = document.querySelector('#radio_thumbs-down')!
const widgetSuccess: HTMLDivElement = document.querySelector('.widget_success')!
// const widgetFail: HTMLDivElement = document.querySelector('.widget_fail')!
let emailPopulated: boolean = false
let textareaPopulated: boolean = false
let rateButtonSelected: boolean = false
let formSubmittable: boolean = false
let toggle: boolean = false

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

const handleFormSubmit = (event: Event) => {
	const antenna: SVGElement = widgetSuccess.querySelector('svg')!
	const successText: HTMLParagraphElement = widgetSuccess.querySelector('.widget_success-text')!
	const animatingElement: NodeListOf<HTMLSpanElement> = widgetSuccess.querySelectorAll('.widget_success-orange-circle span')!

	if (formSubmittable) {
		// put receiving animation in place, dots animating into antenna
		widgetSuccess.classList.add('-active')

		// this part below simulates the success animation
		setTimeout(() => {
			antenna.classList.add('success')
			for (const span of animatingElement) {
				span.style.animationPlayState = 'paused'
			}
			successText.innerText = 'We\'ve received your feedback - thank you!'
		}, 1800)

		// submit form data

		// const target = event.target as HTMLFormElement
		// const data = new FormData(form)
		// const action = target.action
		// fetch(action, {
		// method: 'POST',
		// body: data,
		// })
		// .then(() => {
			// on success, make antenna success color, stop receiving animation, add in success text.
		// 	antenna.classList.add('success')
		//	for (const span of animatingElement) {
		//		span.style.animationPlayState = 'paused'
		//	}
		//	successText.innerText = 'We\'ve received your feedback - thank you!'

			// after timeout, remove all success panels and close widget.
		//	setTimeout(() => {
		// 		widgetSuccess.classList.remove('-active')
		//		antenna.classList.remove('selected')
		//		showHideWidget()
		// 	}, 2500)
		// }).catch(() => {
			// on failure display failure panel, remove all panels.
		// 	widgetFail.classList.add('-active')
		// 	setTimeout(() => {
		//		widgetSuccess.classList.remove('-active')
		// 		widgetFail.classList.remove('-active')
		// 	}, 2500)
		// })

		// might not need to do this
		// staticForm.submit()
	}
}

// Setting up all event listeners
toggleWidget()
handleRateButtonClick()
isFormPopulated()

form.addEventListener('submit', (event: SubmitEvent) => {
	event.preventDefault()
	handleFormSubmit(event)
})
