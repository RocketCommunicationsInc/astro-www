import * as DOM from 'project:utils/client/DOM.ts'
import ReflectedElement from 'project:utils/client/ReflectedElement.ts'
import content from './Panelset.html?withtype=fragment'
import styling from './Panelset.css?withtype=style'
import stylingDynamic from './Panelset.dynamic.css?raw'

import PanelElement from './Panel.ts'

export default class PanelSetElement extends ReflectedElement(
	HTMLElement as typeof PanelSetElementInterface,
	{
		panels: {
			defaultValue() {
				return this.querySelectorAll<PanelElement>(':scope > a-panel')
			},
			useChildList() {
				const panels: PanelElement[] = []

				for (const childNode of this.childNodes) {
					if (childNode instanceof PanelElement) {
						panels.push(childNode)
					}
				}

				return panels
			},
			onValueChange(panels) {
				const element = this
				const internals = DOM.withInternals<Internals>(element)
				const shadowTabs: HTMLButtonElement[] = []

				for (const panel of panels) {
					const internalsForPanel = internals.internalsForPanel(panel, () => {
						const shadowTab = new DOM.HTMLElement('button', { part: 'tab' }, DOM.attr(panel, 'label') || '')

						DOM.observe(shadowTab, {
							click() {
								element.activePanel = panel
							}
						})

						return { shadowTab }
					})

					shadowTabs.push(internalsForPanel.shadowTab)
				}

				internals.shadowTablist.replaceChildren(...shadowTabs)
			},
		},
		activePanel: {
			defaultValue() {
				return [ ...this.panels ].find(panel => panel.active) || this.panels[0] || null
			},
			setValue(activePanel) {
				return activePanel instanceof PanelElement ? activePanel : null
			},
			useChildList() {
				return [ ...this.panels ].find(panel => panel.active) || this.panels[0] || null
			},
			onValueChange(activePanel) {
				const internals = DOM.withInternals<Internals>(this)

				for (const panel of this.panels) {
					const panelInternals = internals.internalsForPanel(panel)

					panelInternals.shadowTab.part.toggle('active', panel === activePanel)
				}

				const cssMediaRule = (
					internals.shadowCSS.cssRules[0]! ||
					internals.shadowCSS.cssRules[internals.shadowCSS.insertRule(stylingDynamic)]
				) as CSSMediaRule

				const cssStyleRule = cssMediaRule.cssRules[0] as CSSStyleRule

				cssStyleRule.selectorText = (
					activePanel !== null
						? `::slotted(:not(${
							DOM.getAttributeSelector(
								'label',
								DOM.attr(activePanel, 'label')!
							)
						}))`
					: `:not(*)`
				)

				DOM.trigger(this.ownerDocument.defaultView!.visualViewport, {
					resize: {}
				})
			}
		}
	}
) {
	constructor() {
		const element: PanelSetElement = super()!

		const shadowRoot = DOM.withShadow(element, {
			mode: 'open',
			content,
			styling,
		})

		const shadowCSS = new CSSStyleSheet()

		shadowRoot.adoptedStyleSheets.push(shadowCSS)

		DOM.withInternals<Internals>(element, () => ({
			shadowCSS,
			shadowTablist: DOM.queryPart<HTMLSpanElement>(shadowRoot, 'tablist')!,
			internalsForPanel: DOM.createInternals(),
		}))
	}
}

customElements.define('a-panelset', PanelSetElement)

declare class PanelSetElementInterface extends HTMLElement {
	panels: NodeListOf<PanelElement>
	activePanel: PanelElement | null
}

interface Internals {
	shadowCSS: CSSStyleSheet
	shadowTablist: HTMLSpanElement
	internalsForPanel: DOM.Referencer<PanelElement, InternalsForPanel>
}

interface InternalsForPanel {
	shadowTab: HTMLButtonElement
}
