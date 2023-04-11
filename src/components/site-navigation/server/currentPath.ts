import items, { type Group, type Link } from 'project:data/navigation.json'
import secondaryNavGroups, { type Group as SecondaryNavGroup } from 'project:data/navigation.secondary.json'

export { items }

export function intialize(currentPath: string) {
	const current = new WeakSet<Group | Link>()
	const secondaryNavGroup = getSecondaryNavGroup(currentPath)

	for (const item of items) {
		if ('url' in item) {
			if (item.url === currentPath) {
				current.add(item)
			} else if (secondaryNavGroup) {
				for (const secondaryNavItem of secondaryNavGroup.items) {
					if (secondaryNavItem.url === item.url) {
						current.add(item)
					}
				}
			}
		}

		if ('items' in item) {
			for (const subitem of item.items) {
				if (subitem.url === currentPath) {
					current.add(item)
					current.add(subitem)
				} else if (secondaryNavGroup) {
					for (const secondaryNavItem of secondaryNavGroup.items) {
						if (secondaryNavItem.url === subitem.url) {
							current.add(item)
							current.add(subitem)
						}
					}
				}
			}
		}
	}

	return current
}

export const getSecondaryNavGroup = (currentPath: string): SecondaryNavGroup | null => {
	for (const secondaryNavigationGroup of secondaryNavGroups) {
		for (const secondaryNavigationItem of secondaryNavigationGroup.items) {
			if (secondaryNavigationItem.url === currentPath) {
				return secondaryNavigationGroup
			}
		}
	}

	return null
}
