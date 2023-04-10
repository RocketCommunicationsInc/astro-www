import * as DOM from 'project:utils/client/DOM.ts'
import cssText from './ComponentPlayground.Main.css?raw'

import PlaygroundThemeToggle from './ComponentPlayground.Toggle.ts'

console.log(
	new DOM.Fragment(
		new DOM.HTML('span', { part: 'heading' },
			new PlaygroundThemeToggle()
		),
		new DOM.HTML('slot', { part: 'content' })
	)
)

export default class Playground extends DOM.HTML({
	shadow: {
		mode: 'open',
		root: new DOM.Fragment(
			new DOM.HTML('span', { part: 'heading' },
				new PlaygroundThemeToggle()
			),
			new DOM.HTML('slot', { part: 'content' })
		),
	},
	styles: [
		new DOM.CSS(cssText),
	],
}) {}

customElements.define('a-playground', Playground)
