let createSearch = async (value) => {
	let utils = await import('https://000688888.codepen.website/search/search.js')
	let search = utils.createSearch({
		appId: 'EQEH1X5N4X',
		indexName: 'astrouxds',
		apiKey: 'a402f3cc6d8965606af2d7235ba75700',
	})

	return {
		search,
		results: utils.results,
		html: utils.html,
	}
}

let search
let searchFrame = 0
let searchForm = document.getElementById('search-form')
let searchResults = document.getElementById('results')
let searchElement = document.getElementById('field')

if (searchForm) {
	searchForm.addEventListener('submit', (event) => {
		event.preventDefault()
	})
}

if (searchElement) {
	searchElement.addEventListener('focus', (event) => {
		search = search || createSearch()
	})

	searchElement.addEventListener('input', (event) => {
		cancelAnimationFrame(searchFrame)

		search.then((utils) => {
			searchFrame = requestAnimationFrame(async () => {
				let props = await utils.search(event.target.value)
				let html = utils.results(props)
				let hdom = utils.html(html)

				searchResults.replaceChildren(hdom)
			})
		})
	})
}