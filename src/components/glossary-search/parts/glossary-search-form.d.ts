export interface GlossaryItemObject {
	/** Name of this glossary item. */
	name: string;

	/** Description of this glossary item */
	description: string;

	/** Element (`<div>`) representing this item in the DOM. */
	element: HTMLElement;

	/** Categoriess associated with this glossary item. */
	categories: string[];

	/** Tags associated with this glossary item. */
	tags: string[];
}

export interface GlossaryItemLetterObject {
	/** Name of this group. */
	name: string;

	/** Element (`<article>`) representing this group in the DOM. */
	element: HTMLElement;

	/** Glossary items within this group. */
	glossaryItems: GlossaryItemObject[];
}
