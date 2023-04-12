import { handleRemoveSelected, handleUncheckedRadios, handleRateButtonCheck, handleSubmitButton } from 'project:components/feedback-widgets/utils/feedback-widget-utils.client.ts'

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
const urlInput: HTMLInputElement = document.querySelector('input[type="text"]#current-url')!
const widgetSuccess: HTMLDivElement = document.querySelector('.widget_success')!
const widgetFail: HTMLDivElement = document.querySelector('.widget_fail')!
let emailPopulated: boolean = false
let textareaPopulated: boolean = false
let rateButtonSelected: boolean = false
let formSubmittable: boolean = false
let toggle: boolean = false

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

const handleRateButtonSelected = (button: HTMLButtonElement) => {
	// if any selected, deselect all, disable form submit
	if (button.classList.contains('selected')) {
		handleRemoveSelected(rateButtons)
		handleUncheckedRadios(hiddenThumbsUpRadio, hiddenThumbsDownRadio)
		// set boolean to false
		rateButtonSelected = false

		handleSubmitButton(submitButton, emailPopulated, textareaPopulated, rateButtonSelected)
	} else {
		// Remove selected from all, then add it to clicked button
		handleRemoveSelected(rateButtons)
		handleUncheckedRadios(hiddenThumbsUpRadio, hiddenThumbsDownRadio)


		handleRateButtonCheck(button, hiddenThumbsUpRadio, hiddenThumbsDownRadio)
		// set boolean to true
		rateButtonSelected = true

		handleSubmitButton(submitButton, emailPopulated, textareaPopulated, rateButtonSelected)
		// set form boolean to true
		formSubmittable = true
	}
}

const handleFormReset = () => {
	textarea.value = ''
	emailInput.value = ''
	emailPopulated = false
	textareaPopulated = false

	// makes sure rate buttons are deselected when form clears
	handleRemoveSelected(rateButtons)
	handleUncheckedRadios(hiddenThumbsUpRadio, hiddenThumbsDownRadio)
	// set boolean to false
	rateButtonSelected = false
	// deselct submit button
	handleSubmitButton(submitButton, emailPopulated, textareaPopulated, rateButtonSelected)
	// set form boolean to false
	formSubmittable = false
}

const handleFormSubmit = (event: Event) => {
	const antenna: SVGElement = widgetSuccess.querySelector('svg')!
	const animatingElement: NodeListOf<HTMLSpanElement> = widgetSuccess.querySelectorAll('.widget_success-orange-circle span')!

	if (formSubmittable) {
		// put receiving animation in place, dots animating into antenna
		widgetSuccess.classList.add('-active')

		const target = event.target as HTMLFormElement
		let data = {
			'feedback': textarea.value,
			'thumbUp': hiddenThumbsUpRadio.checked,
			'thumbDown': hiddenThumbsDownRadio.checked,
			'email': emailInput.value,
			'pageURL': urlInput.value,
		}
		const action = target.action
		fetch(action, {
			headers: { 'Content-Type': 'application/json' },
			method: 'POST',
			body: JSON.stringify(data),
		})
		.then(() => {
			// on success, make antenna success color, stop receiving animation after brief timeout.
			setTimeout(() => {
				antenna.classList.add('success')
				for (const span of animatingElement) {
					span.style.animationIterationCount = '1'
				}
			}, 900)

			// after timeout, remove all success panels and close widget.
			setTimeout(() => {
				widgetSuccess.classList.remove('-active')
				antenna.classList.remove('selected')
				handleFormReset()
				showHideWidget()
			}, 2500)
		}).catch(() => {
			// on failure display failure panel, remove all panels.
			widgetFail.classList.add('-active')
			setTimeout(() => {
				widgetSuccess.classList.remove('-active')
				widgetFail.classList.remove('-active')
			}, 2500)
		})
	}
}

/** ** SETTING UP EVENT LISTENERS ** **/

const handleWidgetToggleListeners = () => {
	topTab.addEventListener('click', () => {
		showHideWidget()
	})
	cancelButton.addEventListener('click', () => {
		showHideWidget()
		emailPopulated = false
		textareaPopulated = false

		// makes sure rate buttons are deselected when form clears
		handleRemoveSelected(rateButtons)
		handleUncheckedRadios(hiddenThumbsUpRadio, hiddenThumbsDownRadio)
		// set boolean to false
		rateButtonSelected = false

		// deselct submit button
		handleSubmitButton(submitButton, emailPopulated, textareaPopulated, rateButtonSelected)
		// set form boolean to false
		formSubmittable = false
	})
}


const handleTextareaListener = () => {
	textarea.addEventListener('input', (event) => {
		const target = event.currentTarget as HTMLInputElement
		target.value ? textareaPopulated = true : textareaPopulated = false

		handleSubmitButton(submitButton, emailPopulated, textareaPopulated, rateButtonSelected)
		// set form boolean to true
		formSubmittable = true
	})
}

const handleEmailListener = () => {
	emailInput.addEventListener('input', (event) => {
		const target = event.currentTarget as HTMLInputElement
		target.value ? emailPopulated = true : emailPopulated = false

		handleSubmitButton(submitButton, emailPopulated, textareaPopulated, rateButtonSelected)
	})
}

const handleFormListener = () => {
	form.addEventListener('submit', (event: SubmitEvent) => {
		event.preventDefault()
		handleFormSubmit(event)
	})
}

const handleRateButtonListener = () => {
	// handle toggling the thumbs up/down buttons on and off, making sure they are mutually exclusive
	for (const button of rateButtons) {
		button.addEventListener('click', () => {
			// handle UI selection of button
			handleRateButtonSelected(button)
		})
	}
}

// Setting up all event listeners
handleWidgetToggleListeners()
handleRateButtonListener()
handleTextareaListener()
handleEmailListener()
handleFormListener()
