import { default as PageHeader } from './page-header.astro'
import { default as Heading } from './page-header.heading.astro'
import { default as Subheading } from './page-header.subheading.astro'
import { default as Nav } from './page-header.nav.astro'
import { default as NavItem } from './page-header.nav-item.astro'

PageHeader.Heading = Heading
PageHeader.Subheading = Subheading
PageHeader.Nav = Nav
PageHeader.NavItem = NavItem

export { PageHeader as default }
