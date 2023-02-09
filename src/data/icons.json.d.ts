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

declare const icons: Icons

export default icons
