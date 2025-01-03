export interface GlossaryItemObject {
	/** Name of this icon. */
	name: string

	/** Element (`<div>`) representing this item in the DOM. */
	element: HTMLElement

	/** Tags associated with this icon. */
	tags: string[]
}

export interface GlossaryItemLetterObject {
	/** Name of this category. */
	name: string

	/** Element (`<article>`) representing this category in the DOM. */
	element: HTMLElement

	/** Glossary items within this category. */
	glossaryItems: GlossaryItemObject[]
}
