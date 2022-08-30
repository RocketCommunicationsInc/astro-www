// @ts-ignore

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
			appId: 'EQEH1X5N4X',
			indexName: 'astrouxds-next',
			apiKey: 'a402f3cc6d8965606af2d7235ba75700',
		})

		return {
			search,
			results: utils.results,
			html: utils.html,
		}
	}

	let search: Promise<SearchUtils>
	let searchFrame = 0
	let searchForm = document.getElementById('search')!
	let searchResults = document.getElementById('search-results')!
	let searchElement = <HTMLInputElement>document.getElementById('search-field')!

	if (searchForm) {
		searchForm.addEventListener('submit', (event) => {
			event.preventDefault()
		})
	}

	if (searchElement) {
		searchElement.addEventListener('focus', (event) => {
			search = search || createSearch()
		})

		searchElement.addEventListener('input', (event: InputEvent & { target: HTMLInputElement }) => {
			cancelAnimationFrame(searchFrame)

			search.then(searchUtils => {
				searchFrame = requestAnimationFrame(async () => {
					const results = await searchUtils.search(event.target.value)
					const hasResults = Boolean(results && results.items.length)
					const navigation = searchForm.closest('.p-navigation')!

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
				})
			})
		})
	}
})
