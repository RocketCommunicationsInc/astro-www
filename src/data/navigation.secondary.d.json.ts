export interface Item {
	label: string
	url: string
}

export interface Group {
	heading: string
	description: string
	hide?: boolean
	items: Item[]
}

export default Object as Array<Group>
