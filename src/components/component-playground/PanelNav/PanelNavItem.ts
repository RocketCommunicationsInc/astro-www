import * as DOM from 'project:utils/client/DOM'
import { h } from 'project:utils/html.ts'
import content from './PanelNavItem.html?withtype=fragment'
import styling from './PanelNavItem.css?withtype=style'

export default class PanelNavItem extends HTMLElement {
 constructor() {
		let element = super() as any as this
		let active = false

		const svg: {[key:string]: string} = {
			'Variants': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Examples</title><path d="M4 9c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1Zm1 3c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1Zm0 4c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1Zm15-3H8c-.55 0-1-.45-1-1s.45-1 1-1h12c.55 0 1 .45 1 1s-.45 1-1 1ZM8 17h12c.55 0 1-.45 1-1s-.45-1-1-1H8c-.55 0-1 .45-1 1s.45 1 1 1Zm0-8c-.55 0-1-.45-1-1s.45-1 1-1h12c.55 0 1 .45 1 1s-.45 1-1 1H8Z"></path></svg>>`,
			'Properties': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Properties</title><path fill-rule="evenodd" d="M17 8c0 .55-.45 1-1 1s-1-.45-1-1V4c0-.55.45-1 1-1s1 .45 1 1v1h3c.55 0 1 .45 1 1s-.45 1-1 1h-3v1ZM4 7c-.55 0-1-.45-1-1s.45-1 1-1h9v2H4Zm0 12c-.55 0-1-.45-1-1s.45-1 1-1h5v2H4Zm9 1v-1h7c.55 0 1-.45 1-1s-.45-1-1-1h-7v-1c0-.55-.45-1-1-1s-1 .45-1 1v4c0 .55.45 1 1 1s1-.45 1-1Zm-6-9v-1c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1s-1-.45-1-1v-1H4c-.55 0-1-.45-1-1s.45-1 1-1h3Zm14 1c0-.55-.45-1-1-1h-9v2h9c.55 0 1-.45 1-1Z"></path></svg>`,
			'Slots': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>Slots</title><path fill-rule="evenodd" d="M8 3c.55 0 1 .45 1 1 0 .51-.388.935-.884.993L8 5H6c-.51 0-.935.388-.993.884L5 6v2c0 .55-.45 1-1 1-.51 0-.935-.388-.993-.884L3 8V5c0-1.05.82-1.918 1.851-1.994L5 3h3Zm7 9c0-1.66-1.34-3-3-3s-3 1.34-3 3 1.34 3 3 3 3-1.34 3-3ZM4 15c.51 0 .935.388.993.884L5 16v2c0 .51.388.935.884.993L6 19h2c.55 0 1 .45 1 1 0 .51-.388.935-.884.993L8 21H5c-1.05 0-1.918-.82-1.994-1.851L3 19v-3c0-.55.45-1 1-1Zm16 0c.51 0 .935.388.993.884L21 16v3c0 1.05-.82 1.918-1.851 1.994L19 21h-3c-.55 0-1-.45-1-1 0-.51.388-.935.884-.993L16 19h2c.51 0 .935-.388.993-.884L19 18v-2c0-.55.45-1 1-1Zm.994-10.149A2.007 2.007 0 0 0 19 3h-3l-.116.007A1.004 1.004 0 0 0 15 4c0 .55.45 1 1 1h2l.116.007c.496.058.884.482.884.993v2l.007.116c.058.496.482.884.993.884.55 0 1-.45 1-1V5l-.006-.149Z"></path></svg`
		}

		const shadowRoot = DOM.withShadow(element, {
			mode: 'open',
			content,
			styling,
		})

		DOM.withInternals<Internals>(element, () => ({
			shadowContent: DOM.queryPart<HTMLButtonElement>(shadowRoot, 'button')!,
		}))
		const button = shadowRoot.querySelector('button')
		const NavItem = element.getAttribute('data-nav-item') as string
		button?.appendChild(h(`${svg[NavItem]}`))

		const toggleActive = (e: Event) => {
			const panelMatch = document.querySelector(`[label="${NavItem}"]`) as HTMLElement
			active = !active
			if (active) {
				element.setAttribute('active', '')
				panelMatch.style.display = 'grid'
			} else {
				element.removeAttribute('active')
				panelMatch.style.display = 'none'
			}
		}
		element.addEventListener('click', (e) => toggleActive(e))
	}
}

customElements.define('a-panel-nav-item', PanelNavItem)


interface Internals {
	shadowContent: HTMLButtonElement
}