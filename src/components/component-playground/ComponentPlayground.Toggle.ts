import * as DOM from 'project:utils/client/DOM.ts'
import styling from './ComponentPlayground.Toggle.css?withtype=style'
import content from './ComponentPlayground.Toggle.html?withtype=fragment'

export default DOM.elementOf({
	define: 'a-playground-themetoggle',
	shadow: { mode: 'open' },
	styles: [ styling ],
	append: content,
})
