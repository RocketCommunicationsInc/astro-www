import { html } from 'project:utils/html.js'
import templateHTML from './feedback-widget-custom-element.shadow.html?raw'
import templateCSS from './feedback-widget-custom-element.shadow.css?raw'

const template = html(templateHTML + '<style>' + templateCSS + '</style>')

class FeedbackWidget extends HTMLElement {
	constructor() {
		super()

		// create shadow and attach template
		const root = this.attachShadow({ mode: 'open' })
		root.appendChild(template.cloneNode(true))

		// grabs current url from passed in attribute and sets it in the form
		const currentURL: string = this.getAttribute('current-url')!
		const currentURLInput = root?.getElementById('current-url') as HTMLInputElement
		currentURLInput.value = currentURL
		currentURLInput.setAttribute('value', currentURL)

		// document elements
		const widgetInteriorWrapper: HTMLElement | null = document.querySelector('.widget_interior-wrapper')
		const topTab: HTMLElement | null = document.querySelector('.widget_top-tab')
		const widgetContent: HTMLElement | null = document.querySelector('.widget_content-wrapper')

		// shadow elements
		const form: HTMLFormElement = root.querySelector('form#feedback-form')!
		const clearButton: HTMLButtonElement = root.querySelector('.widget_secondary-button')!
		const rateButtons: NodeListOf<HTMLButtonElement> = root.querySelectorAll('.widget_rate-group button')!
		const submitButton: HTMLButtonElement = root.querySelector('.widget_primary-button')!
		const emailInput: HTMLInputElement = root.querySelector('input[type="email"]#user-email')!
		const textarea: HTMLTextAreaElement = root.querySelector('textarea#user-input')!
		const hiddenThumbsUpRadio: HTMLInputElement = root.querySelector('#radio_thumbs-up')!
		const hiddenThumbsDownRadio: HTMLInputElement = root.querySelector('#radio_thumbs-down')!
		const urlInput: HTMLInputElement = root.querySelector('input[type="text"]#current-url')!
		const widgetSuccess: HTMLDivElement = root.querySelector('.widget_success')!
		const widgetFail: HTMLDivElement = root.querySelector('.widget_fail')!

		// booleans
		let emailPopulated: boolean = false
		let textareaPopulated: boolean = false
		let rateButtonSelected: boolean = false
		let formSubmittable: boolean = false
		let toggle: boolean = false

		const handleRemoveSelected = () => {
			// deselect UI buttons
			for (const button of rateButtons) {
				button.classList.remove('selected')
			}
		}

		const handleUncheckedRadios = () => {
			// pull checked state from both hidden radios
			hiddenThumbsUpRadio.removeAttribute('checked')
			hiddenThumbsDownRadio.removeAttribute('checked')
		}

		const handleRateButtonCheck = (button: HTMLButtonElement) => {
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

		const handleSubmitButton = () => {
			// check booleans and enable/disable form submit button
			if (!emailPopulated && !textareaPopulated && !rateButtonSelected) {
				submitButton.disabled = true
			} else if (emailPopulated && !textareaPopulated && !rateButtonSelected) {
				submitButton.disabled = true
			} else {
				submitButton.disabled = false
			}
		}

		const showHideWidget = () => {
			// if the widget is not marked as collapsible, return
			if (!this.getAttribute('collapsible')) return

			toggle = !toggle

			const toggleAttributes = (toggle: boolean) => {
				widgetContent?.toggleAttribute('data-collapsible-active', toggle)
				topTab?.toggleAttribute('data-collapsible-trigger-active', toggle)
			}

			// set sttributes
			toggleAttributes(true)

			// get tab size to account for widget positioning on open/close
			const tabSize = topTab?.getBoundingClientRect()[visualViewport.width < 1024 ? 'width' : 'height']

			// set min max values for keyframe animation
			let keyframeInteriorMin: Record<string, string> = {
				translate: visualViewport.width < 1024 ? `calc(100% - ${tabSize}px) 0%` : `0% calc(100% - ${tabSize}px)`,
			}
			let keyframeInteriorMax: Record<string, string> = {
				translate: `0% 0%`,
			}

			// translating height if on desktop view
			let min: Record<string, string> = {
				height: `${widgetContent?.getBoundingClientRect().height}px`,
			}
			let max: Record<string, string> = {
				height: `${widgetContent?.getBoundingClientRect().height}px`,
			}

			// treanslating width if on mobile view
			if (window.visualViewport.width < 1024) {
				min = {
					width: `${widgetContent?.getBoundingClientRect().width}px`,
				}
				max = {
					width: `${widgetContent?.getBoundingClientRect().width}px`,
				}
			}

			const keyframes = toggle ? [ min, max ] : [ max, min ]
			const keyframesInterior = toggle ? [ keyframeInteriorMin, keyframeInteriorMax ] : [ keyframeInteriorMax, keyframeInteriorMin ]

			// animate interior wrapper
			widgetInteriorWrapper?.animate(
				keyframesInterior,
				{
					duration: 200,
					iterations: 1,
				}
			)

			// animate content wrapper
			widgetContent?.animate(
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
				handleRemoveSelected()
				handleUncheckedRadios()
				// set boolean to false
				rateButtonSelected = false

				handleSubmitButton()
			} else {
				// Remove selected from all, uncheck hidden radios
				handleRemoveSelected()
				handleUncheckedRadios()

				// add selected to clicked button, enable submit button
				handleRateButtonCheck(button)

				// set boolean to true so handleFormSubmit() works properly
				rateButtonSelected = true
				handleSubmitButton()

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
			handleRemoveSelected()
			handleUncheckedRadios()
			// set boolean to false
			rateButtonSelected = false
			// deselct submit button
			handleSubmitButton()
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
				.then((response) => {
					if (response.status === 400) {
						widgetFail.classList.add('-active')
						setTimeout(() => {
							widgetSuccess.classList.remove('-active')
							widgetFail.classList.remove('-active')
						}, 2500)

					return
					}
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

		const handleWidgetToggleListener = () => {
			topTab?.addEventListener('click', () => {
				showHideWidget()
			})
		}

		const handleClearButtonListener = () => {
			clearButton.addEventListener('click', () => {
				showHideWidget()
				handleFormReset()
			})
		}


		const handleTextareaListener = () => {
			textarea.addEventListener('input', (event) => {
				const target = event.currentTarget as HTMLInputElement
				target.value ? textareaPopulated = true : textareaPopulated = false

				handleSubmitButton()
				// set form boolean to true
				formSubmittable = true
			})
		}

		const handleEmailListener = () => {
			emailInput.addEventListener('input', (event) => {
				const target = event.currentTarget as HTMLInputElement
				target.value ? emailPopulated = true : emailPopulated = false

				handleSubmitButton()
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
		if (this.getAttribute('collapsible')) handleWidgetToggleListener()
		handleClearButtonListener()
		handleRateButtonListener()
		handleTextareaListener()
		handleEmailListener()
		handleFormListener()
	}
}

customElements.define('a-feedback-widget', FeedbackWidget)
