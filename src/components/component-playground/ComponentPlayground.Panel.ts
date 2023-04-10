import * as DOM from 'project:utils/client/DOM.ts'
import cssText from './ComponentPlayground.Panel.css?raw'

export default class PlaygroundPanel extends DOM.HTML({
	shadow: {
		mode: 'open',
		root: new DOM.Fragment(
			new DOM.HTML('slot', { part: 'heading', name: 'heading' }),
			new DOM.HTML('slot', { part: 'content' })
		)
	},
	styles: [
		new DOM.CSS(cssText),
	],
}) {
	connectedCallback() {
		const slot = this.shadowRoot.querySelector<HTMLSlotElement>(DOM.getTokenSelector('part', 'heading'))!

		slot.append(
			new DOM.Text(
				DOM.getAttr(this, 'label') as string
			)
		)
	}

	declare shadowRoot: ShadowRoot
}

customElements.define('a-playground-panel', PlaygroundPanel)
