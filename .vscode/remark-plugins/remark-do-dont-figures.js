import { visit } from 'unist-util-visit'

function remarkImplicitFigures() {
	return (tree) => {
		visit(tree, (node) => {
			if (node.data?.hName !== 'figure') return

			const [ , lead, , text ] = String(node.children.at(0).alt).match(/^(Do(?:n\’t)?)(\:\s+)(.+)$/) || []

			if (!lead) return

			node.data.hProperties.className = `example-${lead.length === 2 ? 'do' : 'dont'}`

			const figcaption = node.data.hChildren[1]

			figcaption.children = [
				{
					type: 'element',
					tagName: 'strong',
					properties: {},
					children: [
						{
							type: 'text',
							value: lead,
						}
					],
				},
				{
					type: 'text',
					value: ': ' + text,
				}
			]
		})
	}
}

export default remarkImplicitFigures
