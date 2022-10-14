import { html } from 'project:utils/html.js'

const wrapper = html(`<div></div>`).firstChild as HTMLDivElement
const lArrow = html(`<button class="l"><svg viewBox="137.718 0 366.563 643.999"><path d="M428.36 12.5c16.67-16.67 43.76-16.67 60.42 0 16.67 16.67 16.67 43.76 0 60.42L241.7 320c148.25 148.24 230.61 230.6 247.08 247.08 16.67 16.66 16.67 43.75 0 60.42-16.67 16.66-43.76 16.67-60.42 0-27.72-27.71-249.45-249.37-277.16-277.08a42.308 42.308 0 0 1-12.48-30.34c0-11.1 4.1-22.05 12.48-30.42C206.63 234.23 400.64 40.21 428.36 12.5z" /></svg></button>`).firstChild as HTMLButtonElement
const rArrow = html(`<button class="r"><svg viewBox="0 0 238 238"><path d="M181.776 107.719 78.705 4.648c-6.198-6.198-16.273-6.198-22.47 0s-6.198 16.273 0 22.47l91.883 91.883-91.883 91.883c-6.198 6.198-6.198 16.273 0 22.47s16.273 6.198 22.47 0l103.071-103.039a15.741 15.741 0 0 0 4.64-11.283c0-4.13-1.526-8.199-4.64-11.313z" /></svg></button>`).firstChild as HTMLButtonElement

const css = html(`<style>:host {
	--icon-size: calc(8 * var(--step));
}

div {
	display: flex;

	/* Layout */
	gap: var(--gap);
	overflow: auto hidden;
	inline-size: min(100%, calc(var(--articlesize) * var(--articlecount) + var(--gap) * (var(--articlecount) - 1)));

	scroll-snap-type: x mandatory;

	/* Interface */
	scroll-behavior: smooth;
	scrollbar-width: none;
}

div::-webkit-scrollbar, div::-webkit-scrollbar {
	/* Layout */
	width: 0;
	height: 0;
}

svg {
	block-size: var(--icon-size);
	inline-size: var(--icon-size);
	flex: 0 0 var(--icon-size);
	fill: currentColor;
}

button {
	/* Layout */
	margin: 0;
	padding: 0;

	/* Text */
	font: inherit;
	line-height: inherit;
	text-align: inherit;

	/* Appearance */
	appearance: none;
	background-color: transparent;
	color: inherit;
	cursor: inherit;
	border-width: 0;
}

button {
	color: var(--InteractiveColor);
	padding: calc(4 * var(--step));
}

button:focus,
button:hover {
	color: var(--InteractiveHoverColor);
}

button.l {
	order: -1;
}
</style>`)

class Slideshow extends HTMLElement {
	constructor() {
		let host = super() as any as this
		let root = host.attachShadow({ mode: 'open' })
		let data = {
			slideIndex: 0,
			updateSlideIndex() {
				this.slideIndex = this.slides.findIndex(slide => slide.box.left > this.scroll)
			},
			slides: [],
			updateSlides() {
				this.slides = Array.from(
					host.querySelectorAll(':scope > *'),
					dom => ({
						dom,
						box: dom.getBoundingClientRect(),
					})
				) as any
			},
			scroll: 0,
			updateScroll() {
				this.scroll = host.getBoundingClientRect().left

				this.updateSlideIndex()
			},
		} as IHateTypeScript

		let observer = new ResizeObserver(() => {
			data.updateSlides()
		})

		observer.observe(wrapper)

		wrapper.append(
			html('<slot></slot>')
		)

		root.append(
			wrapper,
			lArrow,
			rArrow,
			css
		)

		wrapper.addEventListener('scroll', () => {
			data.updateScroll()
		}, { passive: true })

		root.addEventListener('click', (event: PointerEvent) => {
			let button = event.target as HTMLButtonElement

			switch (true) {
				case lArrow.contains(button): {
					root.dispatchEvent(new Event('slideshow:prev'))
					break
				}

				case rArrow.contains(button): {
					root.dispatchEvent(new Event('slideshow:next'))
					break
				}
			}
		})

		root.addEventListener('slideshow:prev', (event: Event) => {
			console.log('prev')
		})

		root.addEventListener('slideshow:next', (event: Event) => {
			console.log('next')

			const x = host.getBoundingClientRect().left
			const slides = Array.from(
				host.querySelectorAll(':scope > *'),
				dom => ({
					dom,
					box: dom.getBoundingClientRect(),
				})
			) as { dom: HTMLElement, box: DOMRect }[]

			const oldSlideIndex = slides.findIndex(slide => slide.box.left > x)!
			const newSlideIndex = Math.min(slides.length - 1, oldSlideIndex + 1)

			if (oldSlideIndex !== newSlideIndex) {
				const shift = slides[newSlideIndex].box.left - slides[oldSlideIndex].box.left
				console.log(shift)
				wrapper.scrollBy({
					left: shift,
					top: 0,
					behavior: 'smooth',
				})
			}
		})

		root.addEventListener('slideshow:prev', (event: Event) => {
			console.log('prev')

			const x = host.getBoundingClientRect().left
			const slides = Array.from(
				host.querySelectorAll(':scope > *'),
				dom => ({
					dom,
					box: dom.getBoundingClientRect(),
				})
			) as { dom: HTMLElement, box: DOMRect }[]

			const oldSlideIndex = slides.findIndex(slide => slide.box.left > x)!
			const newSlideIndex = Math.max(0, oldSlideIndex - 1)

			if (oldSlideIndex !== newSlideIndex) {
				const shift = slides[newSlideIndex].box.left - slides[oldSlideIndex].box.left
				console.log(shift)
				wrapper.scrollBy({
					left: shift,
					top: 0,
					behavior: 'smooth',
				})
			}
		})
	}
}

customElements.define('h-slideshow', Slideshow)

export {}

// import { html } from 'project:utils/html.js'

// requestAnimationFrame(() => {
// 	const carrot = html(`<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 24" width="10" height="24" preserveAspectRatio="xMidYMid"><path d="M0 24L10 12L0 0L0 4.06351L6.86939 12L0 19.9365L0 24Z" /></svg>`).firstChild as SVGSVGElement
// 	const host = document.querySelector('.p-articles') as HTMLDivElement
// 	const content = host && host.querySelector(':scope > .content') as HTMLDivElement
// 	const articles = content && content.querySelectorAll(':scope > article') as NodeListOf<HTMLElement>
// 	const prevSvg = host.appendChild(carrot.cloneNode(true)) as SVGSVGElement
// 	const nextSvg = host.appendChild(carrot.cloneNode(true)) as SVGSVGElement

// 	prevSvg.classList.add('icon-carrot-prev')
// 	nextSvg.classList.add('icon-carrot-next')

// 	if (!content || !articles.length) return
// 	if (!prevSvg || !nextSvg) return

// 	prevSvg.addEventListener('click', () => {
// 		content.scrollBy({ left: -320, behavior: 'smooth' })
// 	})

// 	nextSvg.addEventListener('click', () => {
// 		content.scrollBy({ left: 320, behavior: 'smooth' })
// 	})

// 	let leadArticle = articles[0]
// 	let tailArticle = articles[articles.length - 1]

// 	let obscuredLead = false
// 	let obscuredTail = false

// 	// ...
// 	content.addEventListener('wheel', (event: WheelEvent) => {
// 		if (event.deltaX > 0) {
// 			if (content.offsetWidth + content.scrollLeft >= content.scrollWidth) {
// 				event.preventDefault()
// 			}
// 		}
// 	})

// 	const intersections = new WeakMap<Element, IntersectionObserverEntry>()
// 	const isIntersecting = (target: Element) => intersections.get(target)!.isIntersecting
// 	const observer = new IntersectionObserver((entries) => {
// 		for (const entry of entries) {
// 			intersections.set(entry.target, entry)

// 			entry.target.classList.toggle('obscured', !entry.isIntersecting)

// 			if (entry.target === leadArticle) {
// 				obscuredLead = !entry.isIntersecting
// 			}

// 			if (entry.target === tailArticle) {
// 				obscuredTail = !entry.isIntersecting
// 			}
// 		}

// 		host.classList.toggle('obscured-lead', obscuredLead)
// 		host.classList.toggle('obscured-tail', obscuredTail)

// 		requestAnimationFrame(() => {
// 			requestAnimationFrame(() => {
// 				host.classList.add('animate')
// 			})
// 		})
// 	}, { root: host, rootMargin: '0px', threshold: 0.9 })

// 	for (let article of articles) {
// 		observer.observe(article)

// 		article.addEventListener('focusin', () => {
// 			if (!isIntersecting(article)) {
// 				article.scrollIntoView({
// 					behavior: 'smooth',
// 					block: 'nearest',
// 					inline: 'start',
// 				})
// 			}
// 		})
// 	}
// })

interface IHateTypeScript {
	slideIndex: number,
	updateSlideIndex(this: IHateTypeScript): void
	slides: { dom: HTMLElement, box: DOMRect }[],
	updateSlides(this: IHateTypeScript): void
	scroll: number,
	updateScroll(this: IHateTypeScript): void,
}
