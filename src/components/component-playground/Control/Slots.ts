import { h } from 'project:utils/html.js'

// @ts-ignore
let $tag = globalThis.$tag as any

// @ts-ignore
let $target = globalThis.$target as any
let $canvas = $target.parentNode as HTMLElement
let $actualSlots: any[]
let $slots: HTMLSlotElement[]

const getSlots = () => {
	const slots: HTMLSlotElement[] = Array.from($target.shadowRoot.querySelectorAll('slot'))
	return slots.filter(slot => slot.name !== '')
}

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
	const slots = $target.shadowRoot.querySelectorAll('slot') as HTMLSlotElement[]

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

const slotHideIconOpen = `
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Visibility</title><path d="M12 4C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4Zm0 12.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5Zm-3-5c0-1.66 1.34-3 3-3s3 1.34 3 3-1.34 3-3 3-3-1.34-3-3Z"></path><metadata>eye, on, reveal, see, show, view, visibility</metadata></svg>`

const slotHideIconClosed = `
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Visibility Off</title><path fill-rule="evenodd" d="M2.71 4.57a.996.996 0 0 1 0-1.41c.39-.39 1.03-.39 1.42 0l16.31 16.33a.996.996 0 1 1-1.41 1.41l-2.72-2.72c-1.34.52-2.79.82-4.31.82-5 0-9.27-3.11-11-7.5.77-1.97 2.06-3.67 3.68-4.96L2.71 4.57ZM17 11.5c0-2.76-2.24-5-5-5-.51 0-1 .1-1.47.24L8.36 4.57C9.51 4.2 10.73 4 12 4c5 0 9.27 3.11 11 7.49-.69 1.76-1.79 3.3-3.18 4.53l-3.06-3.06c.14-.46.24-.95.24-1.46Zm-5 5c-2.76 0-5-2.24-5-5 0-.77.18-1.5.49-2.14l1.57 1.57c-.03.18-.06.37-.06.57 0 1.66 1.34 3 3 3 .2 0 .38-.03.57-.07L14.14 16c-.65.32-1.37.5-2.14.5Zm2.97-5.33a2.97 2.97 0 0 0-2.64-2.64l2.64 2.64Z"></path><metadata>disabled, enabled, eye, off, on, reveal, see, show, slash, view, visibility</metadata></svg>`

const handleSlotHideClick = (target: HTMLButtonElement) => {
	const slotName = target.getAttribute('data-slot-hide')
	const slotHighlightButton = document.querySelector(`[data-slot-name=${slotName}]`) as HTMLButtonElement

	if (target.ariaSelected === 'false') {
		target.setAttribute('aria-selected', 'true')
		target.innerHTML = slotHideIconClosed
		slotHighlightButton!.disabled = true

		const targetSlot = $target.querySelector(`[slot=${slotName}]`)
		targetSlot.remove()
	} else {
		target.setAttribute('aria-selected', 'false')
		target.innerHTML = slotHideIconOpen
		slotHighlightButton!.disabled = false

		// @ts-ignore
		const slotNode = $actualSlots.find((item: { slot: string | null }) => item.slot === slotName)
		$target.appendChild(slotNode)
	}
}

// this tells which slots are currently in the element
function getEnabledSlots() {
	const slotPanel = document.querySelector('[label="Slots"]')
	const slotsControl = document.querySelector('a-slots-control')
	const slotHighlightIcon = `
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Flare</title><path fill-rule="evenodd" d="M11 2c0-.55.44-1 1-1 .55 0 1 .45 1 1v4c0 .55-.45 1-1 1s-1-.45-1-1V2ZM8.47 7.06l-.72-.72a.996.996 0 1 0-1.41 1.41l.71.71c.39.39 1.02.39 1.41 0 .39-.38.39-1.02.01-1.4ZM6 11H2c-.55 0-1 .45-1 1s.45 1 1 1h4c.55 0 1-.45 1-1s-.45-1-1-1Zm11.66-4.65a.996.996 0 0 0-1.41 0l-.71.71a.996.996 0 1 0 1.41 1.41l.71-.71c.38-.39.38-1.03 0-1.41ZM18 13c-.55 0-1-.44-1-1 0-.55.45-1 1-1h4c.55 0 1 .45 1 1s-.45 1-1 1h-4Zm-6-4c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3Zm4.24 8.65-.71-.71c-.38-.38-.38-1.02 0-1.41a.996.996 0 0 1 1.41 0l.71.71a.996.996 0 1 1-1.41 1.41Zm-9.9 0c.39.39 1.02.39 1.41 0l.71-.71a.996.996 0 1 0-1.41-1.41l-.71.71c-.38.39-.38 1.03 0 1.41ZM13 22c0 .55-.44 1-1 1-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1s1 .45 1 1v4Z"></path></svg>`

	// getting the actual slots set by the user, filling array with just slot names
	const actualSlots: HTMLElement[] = Array.from($target.querySelectorAll('[slot]'))
	console.log('target', $target)
	console.log(actualSlots)

	$actualSlots = actualSlots

	const actualSlotNames: String[] = []

	actualSlots.forEach(item => {
		actualSlotNames.push(item.slot)
	})

	if ($slots.length > 0) {
		const ul = h('<ul>')
		let slotLi: HTMLElement
		$slots.map(slot => {
			// make sure slots don't have stylesheets
			const styleSheet = document.querySelector(`[data-slot-highlight-${slot.name}]`)
			if (styleSheet) styleSheet.remove()
			// if the slot is actually set by the user, make it selectable
			if (actualSlotNames.includes(slot.name)) {
				slotLi = h(`<li><button data-slot-hide='${slot.name}' aria-selected="false">${slotHideIconOpen}</button>${slot.name}<button data-slot-name='${slot.name}' class='toggle-slot-highlight' aria-selected="false">${slotHighlightIcon}</button> `)
			} else {
				slotLi = h(`<li disabled>${slot.name} <button disabled data-slot-name='${slot.name}' class='toggle-slot-highlight' aria-selected="false">${slotHighlightIcon}</button> `)
			}

			ul.appendChild(slotLi)
			return null
		})
		slotsControl!.innerHTML = ''
		slotsControl!.appendChild(ul)
	} else {
		slotPanel?.setAttribute('hidden', '')
	}

	// highlight slot buttons
	const slotToggleButtons: HTMLButtonElement[] = Array.from(document.querySelectorAll('.toggle-slot-highlight'))
	slotToggleButtons.forEach(button => {
		button.addEventListener('click', () => {
			handleSlotToggleClick(button)
		})
	})

	// hide slot buttons
	const slotHideButtons: HTMLButtonElement[] = Array.from(document.querySelectorAll('[data-slot-hide]'))
	slotHideButtons.forEach(button => {
		button.addEventListener('click', () => {
			handleSlotHideClick(button)
		})
	})
}


// Priming named slots
addEventListener('load', () => {
	const slots = getSlots()
	$slots = [ ...slots ] as any[]
	getEnabledSlots()
})

// get new variant and change slot disabled/enabled when variant changes
addEventListener('reset', () => {
	$target = $canvas.querySelector($tag)
	getEnabledSlots()
})
