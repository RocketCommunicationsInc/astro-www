interface Icons {
	[category: string]: {
		[id: string]: {
			name: string
			path: {
				[attributeName: string]: string
			},
			tags: string[]
		}
	}
}

declare const _default: Icons

export default _default
