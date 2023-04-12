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
			const internals = DOM.ref<Internals>(this)

			internals.labels = [ ...this.querySelectorAll<HTMLElement>(':scope > [label]') ]

			internals.currentLabel = internals.labels.find(labelElement => labelElement === internals.currentLabel)! || internals.labels[0]!

			const styleRule = (internals.style.cssRules[0] as CSSGroupingRule).cssRules[0] as CSSStyleRule

			const updateTabs = () => {
				styleRule.selectorText = `::slotted(:not([label=${JSON.stringify(DOM.attr(internals.currentLabel, 'label')!)}]))`

				internals.tabElements = internals.labels.map(labelElement => {
					const labelInternals = internals.labelRef<LabelInternals>(labelElement, () => ({
						tabElement: DOM.withEvents(
							new DOM.HTML('button', { part: 'tab' }, DOM.attr(labelElement, 'label')!),
							{
								click() {
									internals.currentLabel = labelElement

									updateTabs()

									internals.viewport.dispatchEvent(
										new Event('resize')
									)
								}
							}
						),
					}))

					const isCurrentTab = labelElement === internals.currentLabel

					labelInternals.tabElement.part.toggle('current-tab', isCurrentTab)

					labelInternals.tabElement.addEventListener('click', () => {
						internals.currentLabel = labelElement
					})

					return labelInternals.tabElement
				})
			}

			updateTabs()

			internals.tablistElement.replaceChildren(...internals.tabElements)
		},
	},
	setref(): Internals {
		return {
			tablistElement: DOM.part<HTMLSpanElement>(this.shadowRoot, 'tablist')!,
			labels: [] as HTMLElement[],
			tabElements: [] as HTMLButtonElement[],
			currentLabel: null as any as HTMLElement,
			style: this.shadowRoot.adoptedStyleSheets[this.shadowRoot.adoptedStyleSheets.push(new DOM.CSS(liveCSS)) - 1],
			viewport: this.ownerDocument?.defaultView!.visualViewport,
			labelRef: DOM.createRef(),
		}
	},
})

interface Internals {
	tablistElement: HTMLSpanElement
	labels: HTMLElement[]
	tabElements: HTMLButtonElement[]
	currentLabel: HTMLElement,
	style: CSSStyleSheet,
	viewport: VisualViewport
	labelRef: DOM.Referencer
}

interface LabelInternals {
	tabElement: HTMLButtonElement
}
