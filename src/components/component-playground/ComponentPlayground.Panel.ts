import * as DOM from 'project:utils/client/DOM.ts'
import styling from './ComponentPlayground.Panel.css?withtype=style'
import content from './ComponentPlayground.Panel.html?withtype=fragment'

export default DOM.elementOf({
	define: 'a-playground-panel',
	shadow: {
		mode: 'open',
	},
	styles: [
		styling,
	],
	append: content,
	mutate: {
		attributes: true,
		callback() {
			const slot = DOM.part<HTMLSlotElement>(this.shadowRoot, 'heading')!
			const label = DOM.attr(this, 'label')

			if (label !== null) {
				slot.replaceChildren(label)
			}
		},
	},
})
