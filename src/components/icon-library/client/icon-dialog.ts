import innerHTML from './icon-dialog.html?raw'

class IconDialogElement extends HTMLElement {
	#$ = new IconDialogInternals(this)
}

class IconDialogInternals {
	constructor(host: IconDialogElement) {
		let root = Object.assign(host.attachShadow({ mode: 'open' }), { innerHTML })

		Number(root)
	}
}

customElements.define('icon-dialog', IconDialogElement)
