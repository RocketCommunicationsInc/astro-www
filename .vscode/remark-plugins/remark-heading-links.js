import { visit } from 'unist-util-visit'
import { default as GitHubSlugger } from 'github-slugger'

function remarkHeadingLinks() {
	const slugger = new GitHubSlugger()
	const visited = new WeakSet()

	return (tree) => {
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

			Object.assign(node, {
				type: 'link',
				url: `#${slugger.slug(child.value)}`,
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
