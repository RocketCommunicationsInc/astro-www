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
				if (node.name === 'tag' && 'is' in Object(node.attributes)) {
					const { is, ...attributes } = node.attributes

					const hast = h(is, attributes)

					const data = node.data || (node.data = {})

					data.hName = hast.tagName
					data.hProperties = hast.properties
				} else {
					const attrs = {
						...node.attributes,
						class: [
							...new Set([
								node.name,
								...(node.attributes.class || '').trim().split(/\s+/).filter(Boolean)
							])
						],
					}
					const hast = h('div', attrs)

					const data = node.data || (node.data = {})

					data.hName = hast.tagName
					data.hProperties = hast.properties
				}
			}
		})
	}
}

export default remarkDirectives
