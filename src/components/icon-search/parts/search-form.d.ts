export interface IconObject {
	/** Name of this icon. */
	name: string

	/** Element (`<figure>`) representing this icon in the DOM. */
	element: HTMLElement

	/** Tags associated with this icon. */
	tags: string[]
}

export interface IconCategoryObject {
	/** Name of this category. */
	name: string

	/** Element (`<article>`) representing this category in the DOM. */
	element: HTMLElement

	/** Icons within this category. */
	icons: IconObject[]
}
