import * as DOM from 'project:utils/client/DOM'
import { h } from 'project:utils/html.ts'
import { playgroundSvgs } from 'project:utils/component-playground-svg.ts'
import content from './PanelNavItem.html?withtype=fragment'
import styling from './PanelNavItem.css?withtype=style'

export default class PanelNavItem extends HTMLElement {
 constructor() {
		let element = super() as any as this

		const shadowRoot = DOM.withShadow(element, {
			mode: 'open',
			content,
			styling,
		})

		DOM.withInternals<Internals>(element, () => ({
			shadowContent: DOM.queryPart<HTMLButtonElement>(shadowRoot, 'button')!,
		}))
		const button = shadowRoot.querySelector('button')! as HTMLButtonElement
		const NavItem = element.getAttribute('data-nav-item') as string
		const matchingPanel = document.querySelector(`[label="${NavItem}"]`) as HTMLElement
		// const allPanels: HTMLElement[] = Array.from(document.querySelectorAll('a-panel'))
		// const allPanelNavItems: HTMLElement[] = Array.from(document.querySelectorAll('a-panel-nav-item'))

		button?.appendChild(h(`${playgroundSvgs[NavItem]}`))

		// if panel doesn't exist, disable the corresponding nav button, otherwise set the none hidden panel button
		if (matchingPanel === null) {
			button.disabled = true
		} else {
			if (matchingPanel.hasAttribute('hidden')) {
				element.setAttribute('data-active', 'false')
			} else {
				element.setAttribute('data-active', 'true')
			}
		}

		// checks to see if all panels are hidden, adjust border styles on main element to adjust
		const checkAllPanelsHidden = () => {
			const allPanels: HTMLElement[] = Array.from(document.querySelectorAll('a-panel'))
			const app: HTMLElement = document.querySelector('.app')!
			const hiddenPanels: number[] = []

			allPanels.map((panel, index) => {
				if (panel.hasAttribute('hidden')) hiddenPanels.push(index)
				return null
			})

			if (allPanels.length === hiddenPanels.length) {
				app.style.gap = '0.5px'
			} else {
				app.style.gap = ''
			}
		}

		const toggleActive = (e: Event) => {
			// if button is disabled, do nothing
			if (button.disabled === true) return

			// if button is active, remove active state and hide matching panel
			if (element.getAttribute('data-active') === 'true') {
				element.setAttribute('data-active', 'false')
				matchingPanel.setAttribute('hidden', '')
			} else {
				// set active state on clicked button and unhide matching panel
				element.setAttribute('data-active', 'true')
				matchingPanel.removeAttribute('hidden')
			}

			checkAllPanelsHidden()
		}

		const matchButtonStateToPanel = (e: Event) => {
			const target = e.target as HTMLElement
			const label = target.getAttribute('label')

			if (label === NavItem) {
				element.setAttribute('data-active', 'false')
			}
		}

		const updatePanelVisibility = () => {
			if (visualViewport.width >= 700) return
			element.setAttribute('data-active', 'true')
			matchingPanel.removeAttribute('hidden')
		}

		element.addEventListener('click', (e) => toggleActive(e))

		// listener to handle setting button to inactive if panel is closed via the x on the panel
		addEventListener('closePanel', (e) => {
			matchButtonStateToPanel(e)
			checkAllPanelsHidden()
		})

		// make panels visible if viewport is under 700
		visualViewport.addEventListener('resize', updatePanelVisibility, { capture: true })
	}
}

customElements.define('a-panel-nav-item', PanelNavItem)

interface Internals {
	shadowContent: HTMLButtonElement
}
