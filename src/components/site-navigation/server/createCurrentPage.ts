import items from 'project:data/navigation.json'

export { items }

export function intialize(currentPath: string) {
	const current = new WeakSet()

	for (let item of items) {
		if (item.url === currentPath) {
			current.add(item)
		}

		if (item.items) {
			for (let subitem of item.items) {
				if (subitem.url === currentPath) {
					current.add(item)
					current.add(subitem)
				}
			}
		}
	}

	return current
}
