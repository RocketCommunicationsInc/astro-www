export interface Link {
	label: string
	url: string
	items: never
	status?: string
}

export interface Group {
	label: string
	items: Link[]
	url: never
}

export default Object as Array<Group | Link>
