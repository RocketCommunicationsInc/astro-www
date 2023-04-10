import * as DOM from 'project:utils/client/DOM.ts'
import cssText from './ComponentPlayground.Toggle.css?raw'

export default class PlaygroundThemeToggle extends DOM.HTML({
	shadow: {
		mode: 'open',
		root: new DOM.HTML('div', { class: 'c-theme-toggle' },
			new DOM.HTML('span', { class: 'field' },
				new DOM.HTML('input', { id: 'theme-toggle', type: 'checkbox', class: '-control -is-toggle', checked: true })
			),
			new DOM.HTML('span', 'Dark Mode')
		)
	},
	styles: [
		new DOM.CSS(cssText)
	],
}) {}

customElements.define('a-playground-themetoggle', PlaygroundThemeToggle)
