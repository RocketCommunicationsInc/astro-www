export const h = new Proxy(
	<H.SerializeElement>(
		(name, attrs, ...children) => (
		`<${name}${Object.entries(attrs).map(
			([ attrName, attrData ]) => ` ${attrName}=${JSON.stringify(attrData)}`
		).join('')}${
			children.length === 0
				? `/>`
			: `>${
				children.map(
					(child) => (
						Array.isArray(child)
							? h(name, attrs, ...children)
						: child
					)
				).join('')
			}</${name}>`
		}`
	)
), {
	get(target, name) {
		return target.bind(null, name)
	}
}) as H.SerializeElement & Record<H.ElementName, {
	(attrs: H.Attributes, ...children: H.Child[]): string
}>

namespace H {
	export interface SerializeElement {
		<T extends ElementName>(name: T, attrs: Attributes, ...children: Child[]): string
	}

	export type ElementName = keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap
	export type Attributes = Record<string, string>
	export type Element = [ name: ElementName, attrs: Attributes, ...children: Child[] ]
	export type Child = string | Element
}
