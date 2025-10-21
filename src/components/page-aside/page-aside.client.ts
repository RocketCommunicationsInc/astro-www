import { h } from 'project:utils/html.js'

// Helper function to check if a path is protected and user is not authenticated
const shouldShowLockIcon = (href: string): boolean => {
    const protectedRoutes = (window as any).protectedRoutes || []
    const isProtected = protectedRoutes.some((route: string) => href.startsWith(route))

    // Only show lock icon if route is protected AND user is not authenticated
    if (!isProtected) return false

    const authManager = (window as any).authManager
    return !authManager?.isAuthenticated
}

// Function to update lock icons on all navigation links
const updateLockIcons = () => {
    const allLinks = document.querySelectorAll('.section-links li a')
    allLinks.forEach(link => {
        const shouldHaveLock = shouldShowLockIcon(window.location.pathname)
        const hasLock = link.textContent?.startsWith('🔒 ')

        if (shouldHaveLock && !hasLock) {
            link.textContent = '🔒 ' + link.textContent
        } else if (!shouldHaveLock && hasLock) {
            link.textContent = (link.textContent || '').replace('🔒 ', '')
        }
    })
}

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
		const href = `#${complianceTitleKebab}`
		const lockIcon = shouldShowLockIcon(window.location.pathname) ? '🔒 ' : ''
		const linkElement = h<HTMLAnchorElement>(`<a href="${href}" class="${complianceTitleKebab}">${lockIcon}${complianceTitle}`)

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
			const lockIcon = shouldShowLockIcon(window.location.pathname) ? '🔒 ' : ''
			const link = h(`<a href="#${heading.id}" class="${heading.id}">${lockIcon}${heading.textContent}`)
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
const checkVisibility = (currentItem: Element) => {
	const navWrapper = document.querySelector('.section-links-wrapper') as HTMLElement
	const navWrapperSize = navWrapper.getBoundingClientRect()
	const itemSize = currentItem.getBoundingClientRect()
	const isVisible = (itemSize.top >= navWrapperSize.top && itemSize.bottom <= navWrapperSize.bottom)
	return isVisible
}

const createObservers = (headings: NodeListOf<HTMLHeadingElement>, footer: HTMLElement | null) => {
	let currentHeading: HTMLHeadingElement | null

	// check to see if there is a nav, if not, make one.
	const nav = document.querySelector('.section-links-wrapper')
	if (!nav && headings.length > 1) {
		createNav(Array.from(headings))
	} else if (nav) {
		// If navigation already exists, add lock icons to existing links if needed
		const existingLinks = nav.querySelectorAll('ul.section-links li a')
		existingLinks.forEach(link => {
			const shouldHaveLock = shouldShowLockIcon(window.location.pathname)
			const hasLock = link.textContent?.startsWith('🔒 ')

			if (shouldHaveLock && !hasLock) {
				link.textContent = '🔒 ' + link.textContent
			} else if (!shouldHaveLock && hasLock) {
				link.textContent = (link.textContent || '').replace('🔒 ', '')
			}
		})
	}

	let headingObserver: IntersectionObserver | undefined
	let footerObserver: IntersectionObserver | undefined
	const visualViewport = globalThis.visualViewport!

	const onresize = () => {
		if (headingObserver) {
			headingObserver.disconnect()
		}

		if (footerObserver) {
			footerObserver.disconnect()
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
				const listElements = document.querySelectorAll('.section-links li a') as NodeListOf<HTMLElement>

				for (const listItem of listElements) {
					// look for the appropriate element then highlight it
					if (listItem.classList.contains(currentHeading.id)) {
						listItem.classList.add('-highlighted')
						// see if the highlighted item is visible and if not, scroll to it
						if (!checkVisibility(listItem)) {
							const parent = document.querySelector('.section-links') as HTMLElement
							parent?.scrollTo({
								top: listItem.offsetTop - parent.offsetTop,
								behavior: 'smooth'
})
						}
					} else { listItem.classList.remove('-highlighted') }
				}
			}
		}, {
			rootMargin: `0% 0px -${visualViewport.height - 60}px`,
			threshold: 0,
		})

		footerObserver = new IntersectionObserver((footer) => {
				if (footer[0].isIntersecting) {
					const listElements = Array.from(document.querySelectorAll('.section-links li a'))

					listElements.map((listItem, index) => {
						index === listElements.length - 1 ? listItem.classList.add('-highlighted') : listItem.classList.remove('-highlighted')
						return null
					})
				}
		}, {
			rootMargin: `0% 0px 0px`,
			threshold: 0.99,
		})

		if (footer) footerObserver.observe(footer)

		for (const heading of headings) {
			headingObserver.observe(heading)
		}
	}

	visualViewport.addEventListener('resize', onresize, { passive: true })

	onresize()
}

addComplianceFooterToNav()
// check to see if h3s exist in the side nav
const extendedNav = document.querySelectorAll('a.heading-3').length > 0 ? 'h2,h3' : 'h2'
// make h2 observers and one for the footer
createObservers(document.querySelectorAll(`main [id]:is(${extendedNav})`), document.querySelector('footer.p-footer'))
// createTableOfContentsNavigation(document.querySelectorAll('main [id]:is(h1,h2,h3,h4,h5,h6)'))

// Listen for authentication state changes to update lock icons
window.addEventListener('authStateChanged', () => {
    updateLockIcons()
})

document.addEventListener('DOMContentLoaded', () => {
  const OPEN_HASH = '#create-account'

  function tryOpenViaApi() {
    // preferred: direct API
    if (typeof (window as any).openCreateAccountModal === 'function') {
      (window as any).openCreateAccountModal()
      return true
    }
    // fallback: authManager API
    if ((window as any).authManager && typeof (window as any).authManager.openCreateAccount === 'function') {
      (window as any).authManager.openCreateAccount()
      return true
    }
    return false
  }

  function openFromHash() {
    if (location.hash !== OPEN_HASH) return
    // 1) try API
    if (tryOpenViaApi()) return

    // 2) try to click an existing trigger in the page
    const trigger = document.querySelector('[data-open-create-account], a[href="#create-account"], button[data-open="create-account"], button.open-create-account')
    if (trigger) {
      (trigger as HTMLElement).click()
      return
    }
    // 3) fallback: emit an event your modal code can listen for
    window.dispatchEvent(new CustomEvent('openCreateAccountFromHash'))
  }

  // Open on first load and on hash changes (back button)
  openFromHash()
  window.addEventListener('hashchange', openFromHash)

  // Clean URL when modal closes — adapt event name if your modal emits a different one
  function clearHash() {
    if (location.hash === OPEN_HASH) history.replaceState(null, '', location.pathname + location.search)
  }
  window.addEventListener('createAccountModalClosed', clearHash)
  window.addEventListener('modalClosed', clearHash)
})
// If the script is evaluated after DOMContentLoaded, ensure the open check still runs
if (document.readyState !== 'loading') {
  // mimic the DOMContentLoaded behavior
  const evt = new Event('DOMContentLoaded')
  document.dispatchEvent(evt)
}
