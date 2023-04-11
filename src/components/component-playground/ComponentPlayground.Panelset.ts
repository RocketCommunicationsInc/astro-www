import * as DOM from 'project:utils/client/DOM.ts'
import styling from './ComponentPlayground.Panelset.css?withtype=style'
import content from './ComponentPlayground.Panelset.html?withtype=fragment'

export default DOM.elementOf({
	define: 'a-playground-panelset',
	shadow: { mode: 'open' },
	styles: [ styling ],
	append: content,
})
