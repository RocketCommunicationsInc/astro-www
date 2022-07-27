import { visit } from 'unist-util-visit'

function remarkImplicitFigures() {
	return (tree) => {
		visit(tree, (node) => {
			if (node.type !== 'paragraph') return

			const children = node.children

			if (!children || children.length !== 1) return

			const image = children[0]

			if (!image || image.type !== 'image' || !image.alt) return

			node.data = {
				hName: 'figure',
				hProperties: {},
				hChildren: [
					{
						type: 'element',
						tagName: 'img',
						properties: {
							src: image.url,
							alt: image.alt,
							loading: 'lazy',
						},
					},
					{
						type: 'element',
						tagName: 'figcaption',
						properties: {},
						children: [
							{
								type: 'text',
								value: image.title || image.alt,
							},
						],
					},
				],
			}
		})
	}
}

export default remarkImplicitFigures
