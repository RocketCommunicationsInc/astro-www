import type { SearchUtils, Utils } from './site-search-engine.d'
import globalData from 'project:data/global.json'

let createSearch = async () => {
	let utils = await import('./site-search-engine.js') as Utils

	let search = utils.createSearch({
		appId: globalData.algolia.appId,
		indexName: globalData.algolia.index,
		apiKey: globalData.algolia.apiKey,
	})

	return {
		search,
		results: utils.results,
		html: utils.html,
	}
}

/** The modifier key of the platform ('Meta' for Apple devices, otherwise 'Control'). */
const modifierKey = /^(MacIntel|iPhone)$/.test(navigator.platform) ? 'metaKey' : 'ctrlKey'

let search: Promise<SearchUtils>
let searchFrame = 0
let searchForm = <HTMLFormElement>document.getElementById('search')!
let searchResults = document.getElementById('search-results')!
let searchElement = <HTMLInputElement>document.getElementById('search-field')!
let resultChildren = <NodeListOf<HTMLElement>><any>[]

const navigation = searchForm.closest('.p-navigation')!

document.addEventListener('keydown', (event) => {
	if (event.key === 'k' && event[modifierKey]) {
		event.preventDefault()
		searchElement.focus()
	}
})

searchForm.classList.remove('-nojs')

searchForm.addEventListener('submit', (event) => {
	event.preventDefault()
})

searchElement.addEventListener('focus', (event) => {
	search = search || createSearch()
})

searchElement.addEventListener('input', (event: InputEvent & { target: HTMLInputElement }) => {
	cancelAnimationFrame(searchFrame)
	search.then(searchUtils => {
		searchFrame = requestAnimationFrame(async () => {
			const results = await searchUtils.search(event.target.value)
			const hasResults = Boolean(results && results.items.length)

			// results that have urls that end in #content are removed because #content is for accessibility
			if (hasResults) {
				results.items = results.items.filter(
					searchResult => !searchResult.url.endsWith('#content')
				).slice(0, 5)
			}

			searchForm.classList.toggle('-has-results', hasResults)
			navigation.classList.toggle('-has-results', hasResults)

			const html = searchUtils.results(results)
			const hdom = searchUtils.html(html)

			for (let link of hdom.querySelectorAll('a')) {
				if (link.href.startsWith('https://www.astrouxds.com/')) {
					link.setAttribute(
						'href',
						link.href.replace(/^https:\/\/www\.astrouxds\.com/, '').replace(/\/readme\//, '/')
					)
				}

				let listItem = <HTMLDivElement>link.parentNode!

				listItem.addEventListener('click', () => {
					link.click()
				})
			}

			searchResults.replaceChildren(hdom)

			resultChildren = searchResults.querySelectorAll('.listitem')

			resultChildren.forEach((listItem, index) => {
				listItem.setAttribute('aria-selected', String(index === 0))

				listItem.addEventListener('focusin', () => {
					selectListItem(listItem)
				})
			})
		})
	})
})

/** Index of the selected result child (list item). */
let indexNumber = 0

const selectListItem = (listItem: HTMLElement) => {
	/** Index of the list item within the result children. */
	const nextIndexNumber = [ ...resultChildren ].indexOf(listItem)

	// if the new listitem is not a recognized result child, return early
	if (nextIndexNumber === -1) return

	// if the new listitem is already the selected result child, return early
	if (nextIndexNumber === indexNumber) return

	// set the new list item to be `aria-selected="true"`
	listItem.ariaSelected = 'true'

	// set the old list item to be `aria-selected="false"`
	resultChildren[indexNumber].ariaSelected = 'false'

	// set the index to match the new listitem
	indexNumber = nextIndexNumber
}

const onPointerEnter = (event: PointerEvent & { target: HTMLElement }) => {
	if (resultChildren.length < 1) return

	const target = <HTMLElement>event.target!.closest('.listitem')

	if (target === null) return

	selectListItem(target)
}

const onKeydown = (event: KeyboardEvent) => {
	if (resultChildren.length < 1) return

	resultChildren.forEach((child: HTMLElement, index: number) => {
		if (child.ariaSelected === 'true') indexNumber = index
	})

	if (event.key === 'ArrowDown') {
		event.preventDefault()

		if (indexNumber < (resultChildren.length - 1)) {
			indexNumber++
		}

		resultChildren.forEach((result: HTMLElement, index: number) => {
			if (index === indexNumber) {
				result.setAttribute('aria-selected', 'true')
			} else {
				result.setAttribute('aria-selected', 'false')
			}
		})
	} else if (event.key === 'ArrowUp') {
		event.preventDefault()

		if (indexNumber >= 1) {
			indexNumber--
		}

		resultChildren.forEach((result: HTMLElement, index: number) => {
			if (index === indexNumber) {
				result.setAttribute('aria-selected', 'true')
			} else {
				result.setAttribute('aria-selected', 'false')
			}
		})
	} else if (event.key === 'Enter') {
		resultChildren.forEach((result: HTMLElement) => {
			if (result.getAttribute('aria-selected') === 'true') {
				result.querySelector('a')?.click()
			}
		})
	} else if (event.key === 'Escape') {
		// clears the search control and removes search results
		searchElement.value = ''
		searchResults.replaceChildren()
		searchForm.classList.remove('-has-results')
		navigation.classList.remove('-has-results')
	}
}

searchElement.addEventListener('keydown', onKeydown)
searchResults.addEventListener('pointerover', onPointerEnter)
