const { max, min } = Math
const clamp = (minNum: number, midNum: number, maxNum: number) => min(max(midNum, minNum), maxNum)

let { defineProperty, keys } = Object
let styleDoc = new Document()
let styleDom = styleDoc.appendChild(document.createElement('style'))
let styleStyle = styleDom.style
let styleMap = new WeakMap()
let styleGet = styleMap.get.bind(styleMap)
let matchLl = /^[A-Za-z]+$/
let matchPx = /^-?(\d*\.)?\d+px$/
let matchVp = /^[A-Z][a-z]+([A-Z])([A-Za-z]+)$/
let patchVp = ($0, $1, $2) => $1.toLowerCase() + $2

class StyleDeclarations {
	constructor(target) {
		styleMap.set(this, {
			target,
			styles: getComputedStyle(target),
			get bounds() {
				return this.target.getBoundingClientRect()
			},
		})
	}

	get scrollX() {
		return styleGet(this).target.scrollLeft
	}

	get scrollY() {
		return styleGet(this).target.scrollTop
	}
}

let { prototype } = StyleDeclarations

for (let prop of 'x y top right bottom left'.split(' ')) {
	defineProperty(prototype, prop, {
		configurable: true,
		enumerable: true,
		get() {
			return styleGet(this).bounds[prop]
		},
	})
}

for (let prop of keys(globalThis.CSS2Properties?.prototype || styleStyle)) {
	if (!matchLl.test(prop)) continue

	let pfProp = prop.replace(matchVp, patchVp)

	if (pfProp in prototype) continue

	if (!(prop in prototype)) {
		defineProperty(prototype, pfProp, {
			configurable: true,
			enumerable: true,
			get() {
				let value = styleGet(this).styles[prop]
				return matchPx.test(value) ? parseFloat(value) : value
			},
		})
	}
}

// const getBox = (target: Element) => {
// 	const cs = getComputedStyle(target)
// 	const cr = target.getBoundingClientRect()

// 	for (let key in cs) {
// 		console.log({ key })
// 		if (key === 'zoom') break
// 	}

// 	return null
// }

// const xyz = ({ query, enter, leave }: Opts) => {
// 	let node = document.querySelector<HTMLElement>(query)!
// 	let rect = node.getBoundingClientRect()
// 	let pageY = visualViewport!.pageTop
// 	let offsY = 0
// 	let lastY = 0
// 	let percY = 0

// 	console.log(getBox(node))

// 	if (pageY < enter(rect)) {
// 		rect.y += pageY
// 	}

// 	document.addEventListener('scroll', () => {
// 		pageY = visualViewport!.pageTop
// 		offsY = clamp(rect.y, pageY, leave(rect))

// 		if (offsY === lastY) return

// 		lastY = offsY

// 		percY = (offsY - rect.y) / rect.height

// 		console.log(percY)
// 	}, { capture: true, passive: false })
// }

// interface Opts {
// 	query: string,
// 	enter(rect: DOMRect): number
// 	leave(rect: DOMRect): number
// }

// xyz({
// 	query: '.c-iconlibrary',
// 	enter() {
// 		return 60
// 	},
// 	leave(rect) {
// 		return 60 + rect.height
// 	},
// })
