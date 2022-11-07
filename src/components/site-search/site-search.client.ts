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
		document.addEventListener('keydown', (event) => {
			if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
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
					const resultChildren = searchResults.querySelectorAll('.listitem a')
					if (hasResults) {
						onkeydown = (event) => {
							if (event.key === 'Tab') {
								event.preventDefault()
								const firstResult = resultChildren[0] as HTMLElement
								firstResult.focus()
							}
						}
					}
					let keyArray: string[] = []
					resultChildren.forEach((result) => {
						result.addEventListener('focus', (event) => {
							onkeydown = (event) => {
								if (event.key === 'Shift') {
									keyArray.push(event.key)
								}
								if (event.key === 'Tab') {
									keyArray.push(event.key)
								}
								if (event.key === 'ArrowUp' || (keyArray.includes('Shift') && keyArray.includes('Tab'))) {
									event.preventDefault()
									if (result.parentElement?.previousSibling) {
										const previousSibling = result.parentElement?.previousSibling as HTMLElement
										const previousresult = previousSibling.querySelector('a')
										previousresult?.focus()
									}
								} else if (event.key === 'ArrowDown' || (!keyArray.includes('Shift') && keyArray.includes('Tab'))) {
									event.preventDefault()
									if (result.parentElement?.nextSibling) {
										const nextSibling = result.parentElement?.nextSibling as HTMLElement
										const nextresult = nextSibling.querySelector('a')
										nextresult?.focus()
									}
								} else if (event.key === 'Enter') {
									result.querySelector('a')?.click()
								} else if (event.key === 'Escape') {
									searchElement.value = ''
									searchResults.replaceChildren('')
									searchForm.classList.remove('-has-results')
									navigation.classList.remove('-has-results')
								}
							}
							onkeyup = (event) => {
								if (event.key === 'Shift') {
									const shiftKey = keyArray.indexOf('Shift');
									if (shiftKey > -1) {
									keyArray.splice(shiftKey, 1)
									}
								}
								if (event.key === 'Tab') {
									const tabKey = keyArray.indexOf('Tab');
									if (tabKey > -1) {
									keyArray.splice(tabKey, 1)
									}
								}
							}
						})
					})
				})
			})
		})
	}
})
