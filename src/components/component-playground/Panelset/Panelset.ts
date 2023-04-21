import * as DOM from 'project:utils/client/ZOM.ts'
import content from './Panelset.html?withtype=fragment'
import styling from './Panelset.css?withtype=style'
import stylingDynamic from './Panelset.dynamic.css?raw'

export default DOM.elementOf({
	name: 'a-panelset',

	constructor() {
		const element = this
		const shadowRoot = element.attachShadow({ mode: 'open' })
		const shadowCSS = new CSSStyleSheet()

		shadowRoot.adoptedStyleSheets = [
			styling,
			shadowCSS,
		]

		shadowRoot.append(content.cloneNode(true))

		const shadowTablist = DOM.queryPart<HTMLSpanElement>(shadowRoot, 'tablist')!

		const panelsInternals = DOM.createInternals()

		DOM.internals<Internals, DOM.CustomElement>(element, () => ({
			shadowRoot,
			shadowCSS,

			shadowTablist,

			panels: [],
			activePanel: null,
			setActivePanel(activePanel) {
				if (activePanel !== this.activePanel) {
					if (this.activePanel !== null) {
						const panelInternals = this.panelsInternals<InternalsForPanel>(this.activePanel)

						panelInternals.shadowTab.part.remove('active')
					}

					this.activePanel = activePanel

					if (this.activePanel !== null) {
						const panelInternals = this.panelsInternals<InternalsForPanel>(this.activePanel)

						panelInternals.shadowTab.part.add('active')
					}

					const cssMediaRule = (
						shadowCSS.cssRules[0]! ||
						shadowCSS.cssRules[shadowCSS.insertRule(stylingDynamic)]
					) as CSSMediaRule

					const cssStyleRule = cssMediaRule.cssRules[0] as CSSStyleRule

					cssStyleRule.selectorText = (
						activePanel !== null
							? `::slotted(:not([label=${
								JSON.stringify(
									DOM.attr(activePanel, 'label')!
								)
							}]))`
						: `:not(*)`
					)

					DOM.dispatchEvent(this.visualViewport, 'resize')
					DOM.dispatchEvent(element, 'panelchange', { bubbles: true, composed: true })
				}
			},
			panelsInternals,

			visualViewport: element.ownerDocument?.defaultView!.visualViewport,
		}))
	},

	observeChildren(...childNodes) {
		const internals = DOM.internals<Internals>(this)

		const shadowTabs: HTMLButtonElement[] = []
		const panels: Internals['panels'] = []

		for (const panel of childNodes) {
			if (!(panel instanceof HTMLElement)) continue
			if (!panel.matches('[label]')) continue

			const panelInternals = internals.panelsInternals<InternalsForPanel, HTMLElement>(panel, () => {
				const shadowTab = new DOM.HTMLElement('button', { part: 'tab' })

				shadowTab.addEventListener('click', () => {
					internals.setActivePanel(panel)
				})

				DOM.observeAttributes(panel, (attributeValue) => {
					shadowTab.textContent = attributeValue || ''
				}, 'label')

				return {
					shadowTab,
				}
			})

			shadowTabs.push(panelInternals.shadowTab)

			panels.push(panel)
		}

		internals.shadowTablist.replaceChildren(...shadowTabs)

		const activePanel = panels.find(
			panel => panel === internals.activePanel
		) || panels[0] || null

		internals.panels = panels
		internals.setActivePanel(activePanel)
	},
})

interface Internals {
	shadowRoot: ShadowRoot
	shadowCSS: CSSStyleSheet

	shadowTablist: HTMLSpanElement

	panels: HTMLElement[]
	activePanel: HTMLElement | null
	setActivePanel(panel: HTMLElement | null): void
	panelsInternals: DOM.Referencer

	visualViewport: VisualViewport
}

interface InternalsForPanel {
	shadowTab: HTMLButtonElement
}
