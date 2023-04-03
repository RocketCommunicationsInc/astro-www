import { h } from 'project:utils/html.js'

// const createTableOfContentsNavigation = (headings: NodeListOf<HTMLHeadingElement>) => {
// 	let currentHeading: HTMLHeadingElement | null

// 	let headingObserver: IntersectionObserver | undefined

// 	const asideLinkMap = new WeakMap<HTMLHeadingElement, HTMLAnchorElement>()

// 	const aside = document.querySelector('.page-content-side-col .-content')!
// 	const navElement = h<HTMLElement>('<nav class="p-inpage-navigation">')
// 	const listElement = h<HTMLUListElement>('<ul>')

// 	for (const heading of headings) {
// 		const listItemElement = h<HTMLLIElement>('<li>')
// 		const linkElement = h<HTMLAnchorElement>(`<a href="#${heading.id}">${heading.textContent}`)

// 		listItemElement.append(linkElement)
// 		listElement.append(listItemElement)

// 		asideLinkMap.set(heading, linkElement)
// 	}

// 	aside.append(navElement)

// 	const visualViewport = globalThis.visualViewport!

// 	const onresize = () => {
// 		if (headingObserver) {
// 			headingObserver.disconnect()
// 		}

// 		headingObserver = new IntersectionObserver((entries) => {
// 			currentHeading = null

// 			for (const entry of entries) {
// 				if (entry.isIntersecting) {
// 					currentHeading = entry.target as HTMLHeadingElement

// 					break
// 				}
// 			}

// 			if (currentHeading) {
// 				const { y } = listElement.getBoundingClientRect()

// 				for (let heading of headings) {
// 					const link = asideLinkMap.get(heading as HTMLHeadingElement)!

// 					if (heading === currentHeading) {
// 						const linkBox = link.getBoundingClientRect()

// 						navElement.style.setProperty('--height', `${linkBox.height}px`)
// 						navElement.style.setProperty('--offset', `${linkBox.y - y}px`)
// 					}

// 					link.classList.toggle('current', heading === currentHeading)
// 				}
// 			}
// 		}, {
// 			rootMargin: `0% 0px -${visualViewport.height - 60}px`,
// 			threshold: 0,
// 		})

// 		for (const heading of headings) {
// 			headingObserver.observe(heading)
// 		}
// 	}

// 	visualViewport.addEventListener('resize', onresize, { passive: true })

// 	onresize()
// }


const createHeadingObserver = (headings: NodeListOf<HTMLHeadingElement>) => {
	let currentHeading: HTMLHeadingElement | null

	let headingObserver: IntersectionObserver | undefined
	const visualViewport = globalThis.visualViewport!

	const onresize = () => {
		if (headingObserver) {
			headingObserver.disconnect()
		}

		headingObserver = new IntersectionObserver((entries) => {
			currentHeading = null

			for (const entry of entries) {
				if (entry.isIntersecting) {
					currentHeading = entry.target as HTMLHeadingElement

					break
				}
			}

			if (currentHeading) {
				const listElements = document.querySelectorAll('.section-links li a')

				for (const listItem of listElements) {
					listItem.classList.contains(currentHeading.id) ? listItem.classList.add('-highlighted') : listItem.classList.remove('-highlighted')
				}
			}
		}, {
			rootMargin: `0% 0px -${visualViewport.height - 60}px`,
			threshold: 0,
		})

		for (const heading of headings) {
			headingObserver.observe(heading)
		}
	}

	visualViewport.addEventListener('resize', onresize, { passive: true })

	onresize()
}

createHeadingObserver(document.querySelectorAll('main [id]:is(h2)'))
// createTableOfContentsNavigation(document.querySelectorAll('main [id]:is(h1,h2,h3,h4,h5,h6)'))
