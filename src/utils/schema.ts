export namespace Data {
	export interface Text {
		type: 'text'
		data: string
	}

	export interface Link {
		type: 'link'
		data: {
			url: string
			description?: string
			width?: string
			height?: string
		}
	}

	export interface Object<T = Any> {
		type: 'object'
		data: {
			[name: string]: T
		}
	}

	export interface Objects<T = Any> {
		type: 'objects'
		data: {
			[name: string]: T
		}[]
	}

	export interface Array<T = Any> {
		type: 'objects'
		data: T[]
	}

	export type Any = Text | Link | Object | Objects | Array
}
