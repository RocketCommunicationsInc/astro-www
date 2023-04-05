const widgetWrapper: HTMLElement = document.querySelector('.widget_wrapper')!
const topTab: HTMLElement = document.querySelector('.widget_top-tab')!
const widgetContent: HTMLElement = document.querySelector('.widget_content')!
const cancelButton: HTMLButtonElement = document.querySelector('.widget_secondary-button')!
const rateButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.widget_rate-group button')!
const submitButton: HTMLButtonElement = document.querySelector('.widget_primary-button')!
const emailInput: HTMLInputElement = document.querySelector('input[type="email"]')!
const textarea: HTMLTextAreaElement = document.querySelector('textarea')!
const buttonThumbsUpRadio: HTMLInputElement = document.querySelector('#button_thumbs-up')!
const buttonThumbsDownRadio: HTMLInputElement = document.querySelector('#button_thumbs-down')!
const hiddenThumbsUpRadio: HTMLInputElement = document.querySelector('#radio_thumbs-up')!
const hiddenThumbsDownRadio: HTMLInputElement = document.querySelector('#radio_thumbs-down')!
const pageFooter: HTMLElement = document.querySelector('.p-footer')!
let emailPopulated: boolean = false
let textareaPopulated: boolean = false
let rateButtonSelected: boolean = false
let footerObserver: IntersectionObserver | undefined

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

const showHideWidget = () => {
	let toggle = false

	topTab.addEventListener('click', () => {
		toggle = !toggle

		if (toggle) {
			widgetContent.toggleAttribute('data-collapsible-active', toggle)
		}

		let min = { height: `0px` }
		let max = { height: `${widgetContent.getBoundingClientRect().height}px` }

		if (window.visualViewport.width < 800) {
			min = { width: `0px` }
			max = { width: `${widgetContent.getBoundingClientRect().width}px` }
		}

		if (!toggle) {
			widgetContent.toggleAttribute('data-collapsible-active', toggle)
		}

		const keyframes = toggle ? [ min, max ] : [ max, min ]

		widgetContent.animate(
			keyframes,
			{
				duration: 200,
				iterations: 1,
			}
		)
	})
}

const toggleWidget = () => {
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

// handles widget sitting behind, and sticking to the top of footer instead of the bottom of the viewport
// const footerIntersectionObserver = () => {
// 	if (footerObserver) {
// 		footerObserver.disconnect()
// 	}

// 	footerObserver = new IntersectionObserver((entries) => {

// 		for (const entry of entries) {
// 			console.log(entry)
// 			if (entry.isIntersecting) {
// 				console.log(entry)
// 				widgetWrapper.style.insetBlockEnd = '-309px';
// 				pageFooter.style.position = 'relative';
// 			} else {
// 				widgetWrapper.style.removeProperty('inset-block-end')
// 			}
// 		}
// 	}, {
// 		// rootMargin: `0% 0px -${visualViewport.height - 60}px`,
// 		threshold: 0,
// 	})

// 	footerObserver.observe(pageFooter)
// }


/////

// sets icon panel distance from top dynamically so it always sits underneath the icon search even though it is position: fixed
// to be run on scroll
// const setWidgetPositionOnFooter = () => {
// 	let footerHeight: number = pageFooter.offsetHeight;
// 	console.log(pageFooter.getBoundingClientRect())
// 	let footerRect: number = pageFooter.getBoundingClientRect().y;
// 	let widgetOffset: number  = -473;
// 	let offset: number = widgetOffset + footerRect;
//     //widgetWrapper.style.insetBlockEnd = `${offset}px`;
// }

// // set intersection observer on header so the onscroll event listener is only running for the length of the header scroll
// const options = {
// 	rootMargin: '0px',
// 	threshold: 0,
// }

// const intersectCallback = (entries: any[]) => {
// 	entries.forEach(entry => {
// 		if (entry.isIntersecting) {
// 			window.addEventListener('scroll', setWidgetPositionOnFooter)
// 		} else {
// 			window.removeEventListener('scroll', setWidgetPositionOnFooter)
// 		}
// 	})
// }

// footerObserver = new IntersectionObserver(intersectCallback, options)

// footerObserver.observe(pageFooter)

// //////

// const handleFormSubmit = () => {
// 	const form = document.querySelector('form')
// }

// Setting up all event listeners
// toggleWidget()
showHideWidget()
handleRateButtonClick()
isFormPopulated()

// footerIntersectionObserver()
