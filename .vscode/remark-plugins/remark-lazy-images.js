import { visit } from 'unist-util-visit'

function remarkLazyImages() {
	return (tree, a) => {
		visit(tree, (node) => {
			if (node.type !== 'image') return

			node.data = {
				hName: 'img',
				hProperties: {
					loading: 'lazy',
				},
			}
		})
	}
}

export default remarkLazyImages
