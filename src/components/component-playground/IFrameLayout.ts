import type PlaygroundElement from './Playground/Playground.ts'
import { h } from 'project:utils/html.js'

const getSlots = () => {
	const slots: HTMLSlotElement[] = Array.from($target.shadowRoot.querySelectorAll('slot'))
	return slots.filter(slot => slot.name !== '')
}

const iframe = window.parent?.document.querySelector('a-playground')! as PlaygroundElement

if (iframe !== null) {
	let iframeHeight = 0

	const updateIframeHeight = () => {
		const contentHeight = document.body.scrollHeight + 2

		if (contentHeight !== iframeHeight && iframeHeight !== (contentHeight - 2)) {
			iframeHeight = contentHeight

			iframe.style.setProperty('--y', `${iframeHeight}px`)
		}
	}

	const updateIframeHeightOnFrame = () => {
		cancelAnimationFrame(updateIframeHeightOnFrameId)

		updateIframeHeightOnFrameId = requestAnimationFrame(updateIframeHeight)
	}

	let updateIframeHeightOnFrameId = 0

	// resize whenever the iframe loads
	// -----------------------------------------------------------------------------

	iframe.addEventListener('load', updateIframeHeightOnFrame)

	// resize whenever the iframe viewport resizes
	// -----------------------------------------------------------------------------

	visualViewport.addEventListener('resize', updateIframeHeight, { capture: true })

	// resize whenever new elements are defined
	// -----------------------------------------------------------------------------

	const { define } = CustomElementRegistry.prototype

	Object.assign(CustomElementRegistry.prototype, {
		define(name: string, constructor: CustomElementConstructor) {
			define.call(this, name, constructor)

			updateIframeHeightOnFrame()
		}
	})
}

// @ts-ignore
let $tag = globalThis.$tag as any

// @ts-ignore
let $target = globalThis.$target as any

/**
 * Utility function to add CSS in multiple passes.
 * @param {string} styleString
 */
function toggleStyle(slotName: string, styleString: string) {
	const styleSheet = document.querySelector(`[data-slot-highlight-${slotName}]`)
	if (styleSheet) {
		styleSheet.remove()
	} else {
		const style = document.createElement('style')
		style.setAttribute(`data-slot-highlight-${slotName}`, '')
		style.textContent = styleString
		document.head.append(style)
	}
}

const handleSlotToggleClick = (target: HTMLButtonElement) => {
	if (target.ariaSelected === 'true') {
		target.setAttribute('aria-selected', 'false')
	} else {
		target.setAttribute('aria-selected', 'true')
	}
	const slotName = target.getAttribute('data-slot-name')
	const slots = $target.shadowRoot.querySelectorAll('slot')

	slots.forEach((slot) => {
		if (slot.name === slotName) {
			const textNodeSlot = $target.querySelector('.slot-highlight_text-node')

			// if textNodeSlot that was added on button select exists, remove it, remove stylesheet, exit function
			if (textNodeSlot && target.ariaSelected === 'false') {
				textNodeSlot.remove()

				toggleStyle(slot.name, `
				${$tag as any} [slot] {
					position: relative;
				}
				${$tag} [slot="${slot.name}"]::after {
					display: block;

					/* Layout */
					inset: 0;
					position: absolute;
					z-index: 99999;

					/* Appearance */
					background: repeating-linear-gradient(-28deg,rgba(164, 102, 175, 0.6), rgba(164, 102, 175, 0.6) 12px,rgba(164, 102, 175, 0.7) 12px,rgba(164, 102, 175, 0.7) 24px);
					border: 2px solid rgb(164, 102, 175);
					border-radius: 4px;

					/* Generated */
					content: "";
				}
			`)
				return
			}

			// if innerText then it is a text node and needs a generated DOM Element to exist in the light DOM for styling
			if (slot.innerText !== '') {
				const span: HTMLElement = h(`<span slot="${slot.name}" class="slot-highlight_text-node">${slot.innerText}`)
				$target.appendChild(span)
			}
				toggleStyle(slot.name, `
				${$tag as any} [slot] {
					position: relative;
				}
				${$tag} [slot="${slot.name}"]::after {
					display: block;

					/* Layout */
					inset: 0;
					position: absolute;
					z-index: 99999;

					/* Appearance */
					background: repeating-linear-gradient(-28deg,rgba(164, 102, 175, 0.6), rgba(164, 102, 175, 0.6) 12px,rgba(164, 102, 175, 0.7) 12px,rgba(164, 102, 175, 0.7) 24px);
					border: 2px solid rgb(164, 102, 175);
					border-radius: 4px;

					/* Generated */
					content: "";
				}
			`)
		}
	})
}

// Priming named slots
window.addEventListener('load', () => {
	const slots = getSlots()
	const slotPanel = document.querySelector('[label="Slots"]')
	const icon = `
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20px" height="20px"><title>Flare</title><path fill-rule="evenodd" d="M11 2c0-.55.44-1 1-1 .55 0 1 .45 1 1v4c0 .55-.45 1-1 1s-1-.45-1-1V2ZM8.47 7.06l-.72-.72a.996.996 0 1 0-1.41 1.41l.71.71c.39.39 1.02.39 1.41 0 .39-.38.39-1.02.01-1.4ZM6 11H2c-.55 0-1 .45-1 1s.45 1 1 1h4c.55 0 1-.45 1-1s-.45-1-1-1Zm11.66-4.65a.996.996 0 0 0-1.41 0l-.71.71a.996.996 0 1 0 1.41 1.41l.71-.71c.38-.39.38-1.03 0-1.41ZM18 13c-.55 0-1-.44-1-1 0-.55.45-1 1-1h4c.55 0 1 .45 1 1s-.45 1-1 1h-4Zm-6-4c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3Zm4.24 8.65-.71-.71c-.38-.38-.38-1.02 0-1.41a.996.996 0 0 1 1.41 0l.71.71a.996.996 0 1 1-1.41 1.41Zm-9.9 0c.39.39 1.02.39 1.41 0l.71-.71a.996.996 0 1 0-1.41-1.41l-.71.71c-.38.39-.38 1.03 0 1.41ZM13 22c0 .55-.44 1-1 1-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1s1 .45 1 1v4Z"></path><metadata>bright, edit, editing, effect, flare, image, images, light, photography, picture, pictures, sparkle, sun</metadata></svg>`

	if (slots.length > 0) {
		const ul = h('<ul>')
		slots.map(slot => {
			const slotLi = h(`<li>${slot.name} <button data-slot-name='${slot.name}' class='toggle-slot-highlight' aria-selected="false">${icon}</button> `)
			ul.appendChild(slotLi)
			return null
		})

		slotPanel?.appendChild(ul)
	} else {
		slotPanel?.setAttribute('hidden', '')
	}

	const slotToggleButtons: HTMLButtonElement[] = Array.from(document.querySelectorAll('.toggle-slot-highlight'))
	slotToggleButtons.forEach(button => {
		button.addEventListener('click', () => {
			handleSlotToggleClick(button)
		})
	})
})


// @ts-ignore
let $canvas = $target.parentNode as HTMLElement

addEventListener('input', (event) => {
	const { target } = event as any as { target: HTMLInputElement }

	const property = target.getAttribute('for')!

	if (typeof property === 'string') {
		if (property === 'sandbox:example') {
			$canvas.innerHTML = target.value

			$target = $canvas.querySelector($tag)

			target.dispatchEvent(new Event('reset', { bubbles: true }))
		} else {
			if ('type' in target && target.type === 'switch') {
				$target[property] = target.checked
			} else {
				$target[property] = target.value
			}
		}
	}
})

addEventListener('reset', (event) => {
	for (const control of document.querySelectorAll<HTMLFormElement>('[for]')) {
		if (control !== event.target) {
			control.value = control.defaultValue
			control.selected = control.defaultSelected
			control.checked = control.defaultChecked
		}
	}
})
