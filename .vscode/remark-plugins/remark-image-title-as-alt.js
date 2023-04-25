// @ts-check

/** @typedef {import('unist').Node} Node */
/** @typedef {Node & { title?: string; url?: string; alt?: string }} ImageNode */
/** @typedef {import('unist').Parent} ParagraphNode */

import { visit } from 'unist-util-visit'

/** Transforms a standalone image with a title and no alt into a plain image with an alt. */
export default function remarkImageTitleAsAlt() {
	return (/** @type {Node} */ tree) => {
		visit(tree, 'paragraph', (/** @type {ParagraphNode} */ paragraph) => {
			const children = paragraph.children

			if (!children || children.length !== 1) return

			/** @type {ImageNode} */
			const image = children[0]

			if (!image || image.type !== 'image' || !!image.alt || !image.title) return

			image.alt = image.title

			delete image.title
		})
	}
}
