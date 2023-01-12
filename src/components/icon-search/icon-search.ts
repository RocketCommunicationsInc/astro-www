import { default as IconSearch } from './icon-search.astro'
import { default as SidePanel } from './parts/side-panel.astro'

export default Object.assign(IconSearch, { SidePanel }) as typeof IconSearch & {
	SidePanel: typeof SidePanel
}
