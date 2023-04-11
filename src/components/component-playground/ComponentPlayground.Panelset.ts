import * as DOM from 'project:utils/client/DOM.ts'
import styling from './ComponentPlayground.Panelset.css?withtype=style'
import liveCSS from './ComponentPlayground.Panelset.live.css?raw'
import content from './ComponentPlayground.Panelset.html?withtype=fragment'

export default DOM.elementOf({
	define: 'a-playground-panelset',
	shadow: { mode: 'open' },
	styles: [ styling ],
	append: content,
	mutate: {
		childList: true,
		callback() {
			const internals = DOM.internals(this, () => ({
				tablistElement: DOM.part<HTMLSpanElement>(this.shadowRoot, 'tablist')!,
				labelElements: [] as HTMLElement[],
				tabElements: [] as HTMLButtonElement[],
				currentLabelElement: null as any as HTMLElement,
				style: this.shadowRoot.adoptedStyleSheets[this.shadowRoot.adoptedStyleSheets.push(new DOM.CSS(liveCSS)) - 1],
				viewport: this.ownerDocument?.defaultView!.visualViewport
			}))

			internals.labelElements = [ ...this.querySelectorAll<HTMLElement>(':scope > [label]') ]

			internals.currentLabelElement = internals.labelElements.find(labelElement => labelElement === internals.currentLabelElement)! || internals.labelElements[0]!

			const styleRule = (internals.style.cssRules[0] as CSSGroupingRule).cssRules[0] as CSSStyleRule
			const updateTabs = () => {
				styleRule.selectorText = `::slotted(:not([label=${JSON.stringify(DOM.attr(internals.currentLabelElement, 'label')!)}]))`

				internals.tabElements = internals.labelElements.map(labelElement => {
					const labelInternals = DOM.internals(labelElement, () => ({
						tabElement: DOM.withEvents(
							new DOM.HTML('button', { part: 'tab' }, DOM.attr(labelElement, 'label')!),
							{
								click() {
									internals.currentLabelElement = labelElement

									updateTabs()

									internals.viewport.dispatchEvent(
										new Event('resize')
									)
								}
							}
						),
					}))

					const isCurrentTab = labelElement === internals.currentLabelElement

					labelInternals.tabElement.part.toggle('current-tab', isCurrentTab)

					labelInternals.tabElement.addEventListener('click', () => {
						internals.currentLabelElement = labelElement
					})

					return labelInternals.tabElement
				})
			}

			updateTabs()

			internals.tablistElement.replaceChildren(...internals.tabElements)
		},
	}
})
