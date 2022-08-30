import { html } from 'project:utils/html.js'

requestAnimationFrame(() => {
	const carrot = html(`<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 24" width="10" height="24" preserveAspectRatio="xMidYMid"><path d="M0 24L10 12L0 0L0 4.06351L6.86939 12L0 19.9365L0 24Z" /></svg>`).firstChild as SVGSVGElement
	const host = document.querySelector('.p-articles') as HTMLDivElement
	const content = host && host.querySelector(':scope > .content') as HTMLDivElement
	const articles = content && content.querySelectorAll(':scope > article') as NodeListOf<HTMLElement>
	const prevSvg = host.appendChild(carrot.cloneNode(true)) as SVGSVGElement
	const nextSvg = host.appendChild(carrot.cloneNode(true)) as SVGSVGElement

	prevSvg.classList.add('icon-carrot-prev')
	nextSvg.classList.add('icon-carrot-next')

	if (!content || !articles.length) return
	if (!prevSvg || !nextSvg) return

	prevSvg.addEventListener('click', () => {
		content.scrollBy({ left: -320, behavior: 'smooth' })
	})

	nextSvg.addEventListener('click', () => {
		content.scrollBy({ left: 320, behavior: 'smooth' })
	})

	let leadArticle = articles[0]
	let tailArticle = articles[articles.length - 1]

	let obscuredLead = false
	let obscuredTail = false

	// ...
	content.addEventListener('wheel', (event: WheelEvent) => {
		if (event.deltaX > 0) {
			if (content.offsetWidth + content.scrollLeft >= content.scrollWidth) {
				event.preventDefault()
			}
		}
	})

	const intersections = new WeakMap<Element, IntersectionObserverEntry>()
	const isIntersecting = (target: Element) => intersections.get(target)!.isIntersecting
	const observer = new IntersectionObserver((entries) => {
		for (const entry of entries) {
			intersections.set(entry.target, entry)

			entry.target.classList.toggle('obscured', !entry.isIntersecting)

			if (entry.target === leadArticle) {
				obscuredLead = !entry.isIntersecting
			}

			if (entry.target === tailArticle) {
				obscuredTail = !entry.isIntersecting
			}
		}

		host.classList.toggle('obscured-lead', obscuredLead)
		host.classList.toggle('obscured-tail', obscuredTail)

		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				host.classList.add('animate')
			})
		})
	}, { root: host, rootMargin: '0px', threshold: 0.9 })

	for (let article of articles) {
		observer.observe(article)

		article.addEventListener('focusin', () => {
			if (!isIntersecting(article)) {
				article.scrollIntoView({
					behavior: 'smooth',
					block: 'nearest',
					inline: 'start',
				})
			}
		})
	}
})
