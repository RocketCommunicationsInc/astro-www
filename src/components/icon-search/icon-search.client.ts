const icons = <NodeList>document.querySelectorAll('.icon')
const nav = <HTMLElement>document.querySelector('.p-navigation')
const pageHeader = <HTMLElement>document.querySelector('.page-header')
const iconSearch = <HTMLElement>document.querySelector('.p-icon-search')
const sidePanel = <HTMLElement>document.querySelector('icon-panel')

// add click event listener to bump page down if the icon panel is open
icons.forEach(icon => {
	icon.addEventListener('click', () => {
		let pageHeaderHeight: number = pageHeader.offsetHeight
		let navHeight: number = window.visualViewport.width < 800 ? nav.offsetHeight : 0
		let heightToBottomOfSearchPanel: number = pageHeaderHeight + navHeight

		let searchRectY: number = iconSearch?.getBoundingClientRect().top

		if (searchRectY! > 0) {
			setIconPanelPosition()
			window.scrollTo(0, heightToBottomOfSearchPanel)
		}
	})
})

// sets icon panel distance from top dynamically so it always sits underneath the icon search even though it is position: fixed
// to be run on scroll
const setIconPanelPosition = () => {
	let iconSearchHeight: number = iconSearch.offsetHeight
	let navHeight: number = window.visualViewport.width < 800 ? nav.offsetHeight : 0
	let pageHeaderHeight: number = pageHeader.offsetHeight
	let pageHeaderPlusNavHeight: number = pageHeaderHeight + navHeight
	let searchRect: number = iconSearch?.getBoundingClientRect().y
	let offset: number = searchRect + iconSearchHeight
  if (document.body.scrollTop > pageHeaderPlusNavHeight || document.documentElement.scrollTop > pageHeaderPlusNavHeight) {
	sidePanel.style.insetBlockStart = `${iconSearchHeight}px`
  } else {
    sidePanel.style.insetBlockStart = `${offset}px`
  }
}

// set intersection observer on header so the onscroll event listener is only running for the length of the header scroll
const intersectionOptions = {
	rootMargin: '0px',
	threshold: 0,
}

const callback = (entries: any[]) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			window.addEventListener('scroll', setIconPanelPosition)
		} else {
			window.removeEventListener('scroll', setIconPanelPosition)
		}
	})
}

const observer = new IntersectionObserver(callback, intersectionOptions)

observer.observe(pageHeader)

// const iconPanel = document.querySelector<HTMLElement>('icon-panel')!

// const iconGroups = [
// 	...document.querySelectorAll('.p-icon-groups .-group')!
// ].map(
// 	element => {
// 		const name = element.querySelector('.-group-heading')?.textContent!.toLowerCase()!

// 		const icons = [
// 			...element.querySelectorAll('.icon')
// 		].map(
// 			element => {
// 				const name = element.querySelector('figcaption')?.textContent!.toLowerCase()!

// 				return {
// 					name,
// 					element,
// 				}
// 			}
// 		)

// 		return {
// 			name,
// 			element,
// 			icons
// 		}
// 	}
// )

// const searchControl = document.querySelector<HTMLInputElement>('.icon-search-form .-control')!
// const searchResultCountEl = document.querySelector<HTMLParagraphElement>('.p-icon-results')!



// searchControl.addEventListener('input', () => {
// 	let { value } = searchControl
// 	let searchResultCount = 0

// 	value = value.trim().toLowerCase()

// 	iconPanel.removeAttribute('use')

// 	for (let iconGroup of iconGroups) {
// 		let nomatches = true
// 		let earlymatch = !value || iconGroup.name.includes(value)

// 		for (let icon of iconGroup.icons) {
// 			const nomatch = !earlymatch && Boolean(value) && !icon.name.includes(value)

// 			nomatches = nomatches && nomatch

// 			icon.element.classList.toggle('nomatch', nomatch)

// 			if (!nomatch) {
// 				++searchResultCount
// 			}
// 		}

// 		iconGroup.element.classList.toggle('nomatch', nomatches)

// 		searchResultCountEl.textContent = (
// 			searchResultCount
// 				? (
// 					searchResultCount === Number(searchResultCountEl.dataset.maxSize)
// 				)
// 					? `Showing all ${searchResultCount} icons.`
// 				: `Showing ${searchResultCount} matching icons.`
// 			: `No matching icons.`
// 		)
// 	}
// })

// addEventListener('focus', event => {
// 	const icon = event.target as HTMLElement

// 	if (icon.matches?.('figure.icon')) {
// 		const use = icon.querySelector<SVGUseElement>('use[href]')!

// 		const iconID = use.href.baseVal

// 		iconPanel.setAttribute('use', iconID)
// 	}
// }, true)
