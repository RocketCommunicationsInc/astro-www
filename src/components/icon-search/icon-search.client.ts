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
  if (window.visualViewport.pageTop > pageHeaderPlusNavHeight) {
	sidePanel.style.insetBlockStart = `${iconSearchHeight + navHeight}px`
	sidePanel.style.blockSize = `calc(100dvh - ${iconSearchHeight + navHeight}px)`
  } else {
    sidePanel.style.insetBlockStart = `${offset}px`
	sidePanel.style.blockSize = `calc(100dvh - ${offset}px)`
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

window.addEventListener('resize', setIconPanelPosition)
