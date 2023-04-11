import * as DOM from 'project:utils/client/DOM.ts'
import styling from './ComponentPlayground.Main.css?withtype=style'
import content from './ComponentPlayground.Main.html?withtype=fragment'

import './ComponentPlayground.Toggle.ts'

export default DOM.elementOf({
	define: 'a-playground',
	shadow: {
		mode: 'open',
	},
	styles: [
		styling,
	],
	append: content,
})
