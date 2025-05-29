import { html } from 'project:utils/html.js'
import templateHTML from './feedback-widget-custom-element.shadow.html?raw'
import templateCSS from './feedback-widget-custom-element.shadow.css?raw'
import { isDevelopment, API_URLS } from '../../config/environment.ts'

const template = html(templateHTML + '<style>' + templateCSS + '</style>')

class FeedbackWidget extends HTMLElement {
	constructor() {
		super()

		// create shadow and attach template
		const root = this.attachShadow({ mode: 'open' })
		root.appendChild(template.cloneNode(true))

		// grabs current url from passed in attribute and sets it in the form
		const currentURL: string = this.getAttribute('current-url')!

		// document elements
		const widgetWrapper: HTMLElement | null =
			document.querySelector('.widget_wrapper')
		const widgetInteriorWrapper: HTMLElement | null = document.querySelector(
			'.widget_interior-wrapper'
		)
		const topTab: HTMLElement | null =
			document.querySelector('.widget_top-tab')
		const widgetContent: HTMLElement | null = document.querySelector(
			'.widget_content-wrapper'
		)
		const pageFooter: HTMLElement = document.querySelector('.p-footer')!

		// shadow elements
		const form: HTMLFormElement = root.querySelector('form#feedback-form')!

		// Set API endpoint based on environment config
		const apiBaseUrl = isDevelopment ? API_URLS.development : API_URLS.production
		form.action = `${apiBaseUrl}/api/v1/feedback`

		const clearButton: HTMLButtonElement = root.querySelector(
			'.widget_secondary-button'
		)!
		const rateButtons: NodeListOf<HTMLButtonElement> = root.querySelectorAll(
			'.widget_rate-group button'
		)!
		const submitButton: HTMLButtonElement = root.querySelector(
			'.widget_primary-button'
		)!
		const receiveResponseCheckbox: HTMLInputElement = root.querySelector(
			'input[type="checkbox"]#widget_receive-response'
		)!
		const emailInput: HTMLInputElement = root.querySelector(
			'input[type="email"]#user-email'
		)!
		const textarea: HTMLTextAreaElement = root.querySelector(
			'textarea#user-input'
		)!
		const hiddenThumbsUpRadio: HTMLInputElement =
			root.querySelector('#radio_thumbs-up')!
		const hiddenThumbsDownRadio: HTMLInputElement =
			root.querySelector('#radio_thumbs-down')!
		const widgetSuccess: HTMLDivElement =
			root.querySelector('.widget_success')!
		const widgetFail: HTMLDivElement = root.querySelector('.widget_fail')!

		// booleans
		let emailPopulated: boolean = false
		let rateButtonSelected: boolean = false
		let toggle: boolean = false

		// intersection observer
		let observer: IntersectionObserver | undefined

		type FeedbackData = {
			feedback: string;
			thumbUp: boolean;
			thumbDown: boolean;
			receiveResponse: boolean;
			email: string;
			pageURL: string;
		};

		const handleRateButtonsRemoveSelected = () => {
			// deselect UI buttons
			for (const button of rateButtons) {
				button.classList.remove('selected')
			}

			// pull checked state from both hidden radios
			hiddenThumbsUpRadio.checked = false
			hiddenThumbsDownRadio.checked = false

			rateButtonSelected = false
		}

		const handleReceiveResponse = () => {
			receiveResponseCheckbox.addEventListener('change', () => {
				if (receiveResponseCheckbox.checked) {
					emailInput.required = true
					emailInput.placeholder = 'Email Address (required)'
				} else {
					emailInput.placeholder = 'Email Address (optional)'
					emailInput.required = false
				}

				handleDisableSubmitButton()
			})
		}

		const handleDisableSubmitButton = () => {
			// no rating button selected, early return
			if (!rateButtonSelected) {
				submitButton.disabled = true
				return
			}

			// receive response checked and email not populated, return
			if (!emailPopulated && receiveResponseCheckbox.checked) {
				submitButton.disabled = true
				return
			}
			submitButton.disabled = false
		}

		const handleSetWidgetOnFooter = () => {
			const footerBottom: number = pageFooter.getBoundingClientRect().top
			const viewportHeight: number = visualViewport!.height
			const difference: number = (footerBottom - viewportHeight) * -1

			if (widgetWrapper !== null) {
				widgetWrapper.style.insetBlockEnd = `${difference}px`
			}
		}

		// observer to pin widget to top of footer instead of bottom of page if footer is in viewport
		const watchForFooter = () => {
			if (observer) observer.disconnect()
			if (visualViewport!.width > 1024) {
				return
			}

			const handleIntersect = (entries: any[]) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						document.addEventListener('scroll', handleSetWidgetOnFooter)
					} else {
						document.removeEventListener('scroll', handleSetWidgetOnFooter)
						if (widgetWrapper !== null) {
							widgetWrapper.style.insetBlockEnd = `0px`
						}
					}
				})
			}

			let options = {
				root: null,
				rootMargin: '0px',
				threshold: 0,
			}

			observer = new IntersectionObserver(handleIntersect, options)
			observer.observe(pageFooter)
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
			const tabSize =
				topTab?.getBoundingClientRect()[
					visualViewport!.width < 1024 ? 'width' : 'height'
				]

			// set min max values for keyframe animation
			let keyframeInteriorMin: Record<string, string> = {
				translate:
					visualViewport!.width < 1024
						? `calc(100% - ${tabSize}px) 0%`
						: `0% calc(100% - ${tabSize}px)`,
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
			if (window.visualViewport!.width < 1024) {
				min = {
					width: `${widgetContent?.getBoundingClientRect().width}px`,
				}
				max = {
					width: `${widgetContent?.getBoundingClientRect().width}px`,
				}
			}

			const keyframes = toggle ? [ min, max ] : [ max, min ]
			const keyframesInterior = toggle
				? [ keyframeInteriorMin, keyframeInteriorMax ]
				: [ keyframeInteriorMax, keyframeInteriorMin ]

			// animate interior wrapper
			widgetInteriorWrapper?.animate(keyframesInterior, {
				duration: 200,
				iterations: 1,
			})

			// animate content wrapper
			widgetContent
				?.animate(keyframes, {
					duration: 200,
					iterations: 1,
				})
				.finished.then(() => {
					toggleAttributes(toggle)
				})
		}

		const handleRateButtonToggle = (button: HTMLButtonElement) => {
			// if any selected, deselect all, disable form submit
			if (button.classList.contains('selected')) {
				handleRateButtonsRemoveSelected()
			} else {
				// Remove selected from all, uncheck hidden radios
				handleRateButtonsRemoveSelected()

				// select UI button
				button.classList.add('selected')

				// map selected button state to checked state of hidden radios
				if (button.id === 'button_thumbs-up') {
					button.classList.contains('selected')
						? (hiddenThumbsUpRadio.checked = true)
						: (hiddenThumbsUpRadio.checked = false)
				}

				if (button.id === 'button_thumbs-down') {
					button.classList.contains('selected')
						? (hiddenThumbsDownRadio.checked = true)
						: (hiddenThumbsDownRadio.checked = false)
				}

				// set boolean to true so handleFormSubmit() works properly
				rateButtonSelected = true
			}

			handleDisableSubmitButton()
		}

		const handleFormReset = () => {
			form.reset()
			emailInput.required = false
			emailInput.placeholder = 'Email Address (optional)'
			emailPopulated = false

			// makes sure rate buttons are deselected when form clears
			handleRateButtonsRemoveSelected()

			// deselct submit button
			handleDisableSubmitButton()
		}

		const handleFormSubmit = (event: Event) => {
			// check for valid email
			if (!emailInput.checkValidity()) return

			const antenna: SVGElement = widgetSuccess.querySelector('svg')!
			const animatingElement: NodeListOf<HTMLSpanElement> =
				widgetSuccess.querySelectorAll('.widget_success-orange-circle span')!

			// put receiving animation in place, dots animating into antenna
			widgetSuccess.classList.add('-active')

			const target = event.target as HTMLFormElement
			let data: FeedbackData = {
				feedback: textarea.value,
				thumbUp: hiddenThumbsUpRadio.checked,
				thumbDown: hiddenThumbsDownRadio.checked,
				receiveResponse: receiveResponseCheckbox.checked,
				email: emailInput.value,
				pageURL: currentURL,
			}
			const action = target.action
			fetch(action, {
				headers: { 'Content-Type': 'application/json' },
				method: 'POST',
				body: JSON.stringify(data),
			})
				.then(() => {
					// on success, make antenna success color, stop receiving animation after brief timeout.
					antenna.classList.add('success')
					for (const span of animatingElement) {
						span.style.animationIterationCount = '1'
					}
				})
				.catch(() => {
					// on failure display failure panel, remove all panels.
					widgetFail.classList.add('-active')
					setTimeout(() => {
						widgetSuccess.classList.remove('-active')
						widgetFail.classList.remove('-active')
					}, 1200)
				})
				.finally(() => {
					// small pause to allow animation to complete
					// 1200ms matches animation in css file
					setTimeout(() => {
						widgetSuccess.classList.remove('-active')
						antenna.classList.remove('selected')
						handleFormReset()
						showHideWidget()
					}, 1200)
				})
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

		const handleEmailListener = () => {
			emailInput.addEventListener('input', (event) => {
				const target = event.currentTarget as HTMLInputElement
				target.value ? (emailPopulated = true) : (emailPopulated = false)

				handleDisableSubmitButton()
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
					handleRateButtonToggle(button)
				})
			}
		}

		// Setting up all event listeners
		if (this.getAttribute('collapsible')) handleWidgetToggleListener()
		handleClearButtonListener()
		handleRateButtonListener()
		handleReceiveResponse()
		handleEmailListener()
		handleFormListener()
		watchForFooter()
		window.addEventListener('resize', () => {
			document.removeEventListener('scroll', handleSetWidgetOnFooter)
			watchForFooter()
		})
	}
}

customElements.define('a-feedback-widget', FeedbackWidget)
