import { visit } from 'unist-util-visit';

function remarkAttributes() {
	return (tree) => {
		visit(tree, (node) => {
			// Check if node has children and the last child is a text node with attribute syntax
			const children = node.children || [];
			const lastChild = children[children.length - 1];
			const textContent = lastChild?.value || '';

			// Match attributes in {#id .class data-key="value"} format at end of text
			const attrPattern = /\{\s*([#.]?\S+)(\s+[^\}]+)?\s*\}$/;
			const match = textContent.match(attrPattern);

			if (match) {
				// Remove attribute syntax from text content
				lastChild.value = textContent.replace(attrPattern, '').trim();

				// Process each attribute into hProperties
				node.data = node.data || {};
				node.data.hProperties = node.data.hProperties || {};

				// Capture attributes
				match[0]
					.slice(1, -1) // Remove { and }
					.split(/\s+/) // Split by whitespace
					.forEach((attr) => {
						if (attr.startsWith('#')) {
							node.data.hProperties.id = attr.slice(1);
						} else if (attr.startsWith('.')) {
							node.data.hProperties.className = [
								...(node.data.hProperties.className || '').split(' '),
								attr.slice(1),
							]
								.filter(Boolean)
								.join(' ');
						} else if (attr.includes('=')) {
							const [key, value] = attr.split('=');
							node.data.hProperties[key] = value.replace(/['"]/g, ''); // Remove quotes
						}
					});
			}
		});
	};
}

export default remarkAttributes;
