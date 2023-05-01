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


const addComplianceFooterToNav = () => {
	const sideNav = document.querySelector('ul.section-links')!
	if (!sideNav) return
	const linkItems = sideNav.querySelectorAll('li a')!
	const complianceHeader: HTMLElement | null = document.querySelector('.p-compliance-aside h2.-heading')
	let complianceTitle: string
	const listItemElement = h<HTMLLIElement>('<li>')

	if (complianceHeader) {
		// if compliance section exists, get header text, create additional link in side nav
		complianceTitle = complianceHeader.innerText
		const complianceTitleKebab: string = complianceTitle.toLowerCase().replace(' ', '-')
		const linkElement = h<HTMLAnchorElement>(`<a href="#${complianceTitleKebab}" class="${complianceTitleKebab}">${complianceTitle}`)

		// remove currently identified last item's class
		for (const link of linkItems) {
			if (link.classList.contains('-last')) link.classList.remove('-last')
		}

		// add in last item class to new final item (compliance footer), append to nav
		linkElement.classList.add('-last')
		listItemElement.append(linkElement)
		sideNav.append(listItemElement)
	}
}

const createNav = (headings: any) => {
	const linksNav = document.querySelector('.p-quicklinks-navigation')
	const separator = h('<hr />')
	const navigation = h('<div class="section-links-wrapper">')
	const ul = h('<ul class="section-links">')
	headings.map((heading: HTMLElement, index: number) => {
			const li = h('<li>')
			const link = h(`<a href="#${heading.id}" class="${heading.id}">${heading.textContent}`)
			if (index === 0) {
				link.classList.add('-highlighted')
				link.classList.add('-first')
			}
			if (index === headings.length - 1) link.classList.add('-last')
			li.append(link)
			ul.append(li)
			return null
	})
	navigation.append(ul)
	linksNav?.append(separator)
	linksNav?.append(navigation)
}

const isVisible = (currentLink : HTMLElement) => {
	const wrapper = document.querySelector('.section-links-wrapper')
	console.log(wrapper?.getBoundingClientRect())
	console.log(currentLink.getBoundingClientRect())
}

const createHeadingObserver = (headings: NodeListOf<HTMLHeadingElement>) => {
	let currentHeading: HTMLHeadingElement | null

	// check to see if there is a nav, if not, make one.
	const nav: HTMLELement = document.querySelector('.section-links-wrapper')
	if (!nav && headings.length > 1) {
		createNav(Array.from(headings))
	}

	let headingObserver: IntersectionObserver | undefined
	let listObserver: IntersectionObserver | undefined
	const visualViewport = globalThis.visualViewport!

	const onresize = () => {
		if (headingObserver) {
			headingObserver.disconnect()
		}

		if (listObserver) {
			listObserver.disconnect()
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

				/// ////

				listObserver = new IntersectionObserver((entries) => {
					let navRect = nav.getBoundingClientRect()!
					console.log('navRect', navRect)
					for (const entry of entries) {
						let newTarget = entry.target as HTMLElement
						if (entry.isIntersecting) {
							console.log('target', entry.target)
							console.log('entry intersecting', entry)

							newTarget.style.backgroundColor = entry.target.classList.contains('-highlighted') ? 'hotpink' : 'transparent'
						}

						if (entry.target.classList.contains('-highlighted') && !entry.isIntersecting) {
							const scrollEl = newTarget.offsetTop
							console.log(scrollEl)
							console.log(newTarget)
							newTarget.scrollIntoView({ block: 'center', behavior: 'smooth' })
						}
					}
				}, {
					root: nav,
					rootMargin: '-50% 0%',
					threshold: 0,
				})

				/// ///

				for (const listItem of listElements) {
					if (listItem.classList.contains(currentHeading.id)) {
							listItem.classList.add('-highlighted')
					} else { listItem.classList.remove('-highlighted') }

					listObserver.observe(listItem)
				}

				// check to see if the currentLink is visible
				// isVisible(currentLink)
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

addComplianceFooterToNav()
createHeadingObserver(document.querySelectorAll('main [id]:is(h2)'))
// createTableOfContentsNavigation(document.querySelectorAll('main [id]:is(h1,h2,h3,h4,h5,h6)'))
