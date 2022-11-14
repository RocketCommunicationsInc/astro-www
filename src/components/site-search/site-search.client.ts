import metaData from 'project:utils/meta'

interface Utils {
	createSearch(init: { appId: string, indexName: string, apiKey: string }): SearchUtils
	results(props: any): string
	html(fragment: string): DocumentFragment
}

interface SearchUtils {
	search(query: string): Promise<SearchResults>

	results: Utils['results']
	html: Utils['html']
}

interface SearchResults {
	title: string
	items: SearchResult[]
}

interface SearchResult {
	type: string
	objectID: string
	url: string
	content: string

	hierarchy: any
	_snippetResult?: any
	_highlightResult?: any
}

requestAnimationFrame(() => {
	let createSearch = async () => {
		let utils = await import('./site-search-engine.js') as Utils

		let search = utils.createSearch({
			appId: metaData.algoliaAppId,
			indexName: metaData.algoliaIndex,
			apiKey: metaData.algoliaApiKey
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
	let searchForm = document.getElementById('search')!
	let searchResults = document.getElementById('search-results')!
	let searchElement = <HTMLInputElement>document.getElementById('search-field')!
	let resultChildren: any[] | NodeListOf<Element> = []
	const navigation = searchForm.closest('.p-navigation')!

	if (searchForm) {
		searchForm.addEventListener('submit', (event) => {
			event.preventDefault()
		})
	}

	if (searchElement) {
		document.addEventListener('keydown', (event) => {
			if (event.key === 'k' && event[modifierKey]) {
				event.preventDefault()
				searchElement.focus()
			}
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

						link.parentNode!.addEventListener('click', (event) => {
							link.click()
						})
					}

					searchResults.replaceChildren(hdom)
					resultChildren = searchResults.querySelectorAll('.listitem')
					resultChildren.forEach((result, index) => {
						if (index === 0) {
							result.setAttribute('aria-selected', 'true')
						} else {
							result.setAttribute('aria-selected', 'false')
						}
					})
				})
			})
		})
		let indexNumber = 0
		const onKeydown = (event: { key: string; preventDefault: () => void }) => {
			if (resultChildren.length > 0) {
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
		}
		searchElement.addEventListener('keydown', onKeydown)
	}
})
