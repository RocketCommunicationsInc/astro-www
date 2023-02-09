import { visit } from 'unist-util-visit'
import { default as GitHubSlugger } from 'github-slugger'

function remarkHeadingLinks() {
	const slugger = new GitHubSlugger()
	const visited = new WeakSet()

	return (tree) => {
		let hasVisitedH1 = false

		visit(tree, (node) => {
			if (visited.has(node)) return
			if (node.type !== 'heading') return

			const children = node.children

			if (children?.length !== 1) return

			const [ child ] = children

			if (child.type !== 'text') return

			const heading = { ...node }

			visited.add(node)
			visited.add(heading)

			delete node.type
			delete node.depth
			delete node.children
			delete node.position

			/** Slug (URL hash) given to the heading. */
			let slug = slugger.slug(child.value)

			// if the heading is the first H1
			if (!hasVisitedH1 && heading.depth === 1) {
				// change the slug to the #content
				slug = 'content'

				hasVisitedH1 = true
			}

			Object.assign(node, {
				type: 'link',
				url: `#${slug}`,
				children: [
					heading
				],
				data: {
					hName: 'a',
					hProperties: {
						className: `h h${heading.depth}`
					}
				}
			})
		})
	}
}

export default remarkHeadingLinks
