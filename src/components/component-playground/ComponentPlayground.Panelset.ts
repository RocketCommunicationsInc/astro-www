import * as DOM from 'project:utils/client/DOM.ts'

export default class PlaygroundPanelSet extends DOM.HTML({
	shadow: {
		mode: 'open',
		root: new DOM.HTML('slot'),
	},
}) {}

customElements.define('a-playground-panelset', PlaygroundPanelSet)
