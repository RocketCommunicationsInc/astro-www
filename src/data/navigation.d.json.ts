export interface Link {
	label: string
	url: string
	items: never
}

export interface Group {
	label: string
	items: Link[]
	url: never
}

export default Object as Array<Group | Link>
