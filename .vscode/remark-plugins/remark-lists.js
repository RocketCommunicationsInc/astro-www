import { visit } from 'unist-util-visit'

function remarkLists() {
	return (tree) => {
		visit(tree, (node) => {
			if (node.type !== 'listItem') return

			const children = node.children

			if (children?.length !== 1) return

			const [ child ] = children

			if (child.type !== 'paragraph') return

			node.children = child.children
		})
	}
}

export default remarkLists
