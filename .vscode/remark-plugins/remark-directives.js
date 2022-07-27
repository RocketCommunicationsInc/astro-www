import { visit } from 'unist-util-visit'
import { h } from 'hastscript'

function remarkDirectives() {
	return (tree) => {
		visit(tree, (node) => {
			if (
				node.type === 'textDirective' ||
				node.type === 'leafDirective' ||
				node.type === 'containerDirective'
			) {
				const data = node.data || (node.data = {})
				const attrs = { ...node.attributes, class: node.name }
				const hast = h('div', attrs)

				data.hName = hast.tagName
				data.hProperties = hast.properties
			}
		})
	}
}

export default remarkDirectives
