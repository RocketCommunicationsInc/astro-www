import { h } from 'project:utils/html.js'

const createTableOfContentsNavigation = (headings: NodeListOf<HTMLHeadingElement>) => {
	let currentHeading: HTMLHeadingElement | null

	const headingObserver = new IntersectionObserver((entries) => {
		currentHeading = null

		for (const entry of entries) {
			if (entry.isIntersecting) {
				currentHeading = entry.target as HTMLHeadingElement

				break
			}
		}

		if (currentHeading) {
			const { y } = listElement.getBoundingClientRect()

			for (let heading of headings) {
				const link = asideLinkMap.get(heading as HTMLHeadingElement)!

				if (heading === currentHeading) {
					const linkBox = link.getBoundingClientRect()

					navElement.style.setProperty('--height', `${linkBox.height}px`)
					navElement.style.setProperty('--offset', `${linkBox.y - y}px`)
				}

				link.classList.toggle('current', heading === currentHeading)
			}
		}
	}, {
		rootMargin: '-80px 0% -66%',
		threshold: 1,
	})

	const asideLinkMap = new WeakMap<HTMLHeadingElement, HTMLAnchorElement>()

	const aside = document.querySelector('.p-aside .-contents')!
	const navElement = h<HTMLElement>('<nav class="p-inpage-navigation">')
	const listElement = h<HTMLUListElement>('<ul>')

	for (const heading of headings) {
		headingObserver.observe(heading)

		const listItemElement = h<HTMLLIElement>('<li>')
		const linkElement = h<HTMLAnchorElement>(`<a href="#${heading.id}">${heading.textContent}`)

		listItemElement.append(linkElement)
		listElement.append(listItemElement)

		asideLinkMap.set(heading, linkElement)
	}

	navElement.append(listElement)
	aside.append(navElement)
}

createTableOfContentsNavigation(document.querySelectorAll('main [id]:is(h1,h2,h3,h4,h5,h6)'))
