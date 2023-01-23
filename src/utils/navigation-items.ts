import type { MarkdownInstance } from 'astro'

export default function getNavigationItems(pages: MarkdownInstance<Record<string, any>>[]) {
	const items: NavigationItem[] = []

	for (let page of pages) {
		if (!page.frontmatter.title) continue

		items.push({
			title: page.frontmatter.title,
			url: page.url!,
		})
	}

	return items
}

interface NavigationItem {
	title: string
	url: string
}
