export declare function results(e: any): string

export declare const html: any

export declare const createSearch: Utils['createSearch']

interface Utils {
	createSearch(init: { appId: string, indexName: string, apiKey: string }): SearchUtils
	results(results: SearchResults): string
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
