const { max, min } = Math
const clamp = (minNum: number, midNum: number, maxNum: number) => min(max(midNum, minNum), maxNum)

class DOMRectangle extends DOMRect {
	get x1() {
		return this.x
	}

	get x2() {
		return this.right
	}

	get y1() {
		return this.y
	}

	get y2() {
		return this.bottom
	}

	static fromElement(element: Element) {
		const rect = element.getBoundingClientRect()
		return new this(
			rect.x + visualViewport!.pageLeft,
			rect.y + visualViewport!.pageTop,
			rect.width,
			rect.height
		)
	}
}

const supportsAdoptedStyleSheets = Boolean(document.adoptedStyleSheets)

const getBoundingClientRect = (element: HTMLElement) => {
	let rect = element.getBoundingClientRect()

	return new DOMRectangle(
		rect.x + view.pageLeft,
		rect.y + view.pageTop,
		rect.width,
		rect.height
	)
}

const matchNumber = /^((\d+\.)?\d+)(px)?$/
const getReadableCss = (host: Element) => new Proxy(getComputedStyle(host), {
	get(css, key) {
		const value = Reflect.get(css, key)
		const match = typeof value === 'string' && value.match(matchNumber)
		return match ? Number(match[1]) : typeof value === 'function' ? value.bind(css) : value
	}
})

const getStyleSheet = (rootElement: HTMLElement | ShadowRoot) => (
	supportsAdoptedStyleSheets
		? document.adoptedStyleSheets[document.adoptedStyleSheets.push(new CSSStyleSheet()) - 1]
	: rootElement.appendChild(document.createElement('style')).sheet!
)

const getStyle = (sheet: CSSStyleSheet, cssText: string) => (<CSSStyleRule>sheet.cssRules[sheet.insertRule(cssText, sheet.cssRules.length)]).style

const sheet = getStyleSheet(document.documentElement)

const view = visualViewport!

class IconLibraryHeader {
	host: HTMLElement

	csso: {
		host: CSSStyleDeclaration
	}

	rect: DOMRect
	last: Record<string, any>
	opts: IconLibraryHeaderOptions
	page: { scrollX: number, scrollY: number }

	constructor(selectorText: string, opts?: IconLibraryHeaderOptions) {
		this.host = document.querySelector(selectorText)!
		this.opts = opts!

		this.csso = {
			host: getStyle(sheet, selectorText + '{'),
		}

		this.rect = DOMRectangle.fromElement(this.host)
		this.last = { __proto__: null }
		this.page = { scrollX: -1, scrollY: -1 }

		document.addEventListener('scroll', this, { capture: true, passive: false })

		queueMicrotask(() => {
			this.host.classList.add('js')
			this.handleEvent(<Event & { target: Document | Element }>{ target: document })
		})
	}

	get minY() {
		return this.rect.top
	}

	get maxY() {
		return this.rect.bottom - this.opts.minSizeY
	}

	get nowY(): number {
		return clamp(this.minY, view.pageTop, this.maxY)
	}

	handleEvent(event: Event & { target: Document | Element }) {
		const { target } = event

		if (target !== document) return

		this.page.scrollX = view.pageLeft
		this.page.scrollY = view.pageTop

		if (this.nowY === this.last.nowY) return

		this.last.nowY = this.nowY

		const scrollOffset = (this.nowY - this.minY) / (this.maxY - this.minY)

		this.csso.host.setProperty('--ScrollOffset', scrollOffset)
		this.csso.host.setProperty('--MaskSizeYEnter', toRem(this.rect.height))
		this.csso.host.setProperty('--MaskSizeYLeave', toRem(this.opts.minSizeY))
	}
}

class IconLibraryFilters {
	host: HTMLElement
	rect: DOMRect
	read: StyleDeclaration
	push: StyleDeclaration
	roll: { y: number } = { y: -1 }
	opts: IconLibraryFiltersOptions

	constructor(selectorText: string, opts: IconLibraryFiltersOptions) {
		this.host = document.querySelector(selectorText)!
		this.opts = opts
		this.push = getStyle(sheet, selectorText + '{')
		this.read = getReadableCss(this.host)
		this.rect = DOMRectangle.fromElement(this.host)

		document.addEventListener('scroll', this, { capture: true, passive: false })

		queueMicrotask(() => {
			this.host.classList.add('js')
			this.handleEvent(<Event & { target: Document | Element }>{ target: document })
		})
	}

	get y1() {
		return this.rect.top - this.opts.minSizeY - this.opts.marginY1
	}

	get y2() {
		return this.rect.top - this.opts.minSizeY
	}

	// get maxY() {
	// 	return this.rect.bottom - this.opts.minSizeY
	// }

	// get nowY(): number {
	// 	return clamp(this.minY, view.pageTop, this.maxY)
	// }

	handleEvent(event: Event & { target: Document | Element }) {
		const { target } = event

		if (target !== document) return

		const y = clamp(this.y1, view.pageTop, this.y2)

		if (y === this.roll.y) return

		this.roll.y = y

		const scrollOffset = (y - this.y1) / (this.y2 - this.y1)

		this.push.setProperty('--ScrollOffset', scrollOffset)

		// console.log(
		// 	'gridTemplateColumns', this.read.getPropertyValue('grid-template-columns')
		// )
	}
}

interface IconLibraryFiltersOptions {
	marginY1: number
	minSizeY: number
}

const remSize = parseFloat(getComputedStyle(document.documentElement).fontSize)
const toRem = (number: number) => (number / remSize) + 'rem'

interface IconLibraryHeaderOptions {
	minSizeY: number
}

requestAnimationFrame(() => {
	new IconLibraryHeader('.c-iconlibrary-header', {
		minSizeY: 48
	})

	// x, y, w, h
	// tl, tr, br, bl

	new IconLibraryFilters('.c-iconlibrary-filters', {
		marginY1: 32,
		minSizeY: 48,
	})
})

// headerCSS.setProperty('block-size', (headerSizeY / rem) + 'rem')
// headerCSS.setProperty('--MaskSizeYMin', (minSizeY / rem) + 'rem')
// headerCSS.setProperty('--MaskSizeYMax', (maxSizeY / rem) + 'rem')

// filterCSS.setProperty('inset-block-start', (minSizeY / rem) + 'rem')

// const updateMaskSizeY = () => {
// 	const y = clamp(headerBox.top, visualViewport!.pageTop, headerBox.bottom - minSizeY)

// 	if (y === cache.y) return

// 	cache.y = y
// 	cache.p = (y - headerBox.top) / deltaY

// 	headerCSS.setProperty('--P', cache.p)
// }

// updateMaskSizeY()

// headerDOM.classList.add('js')
// filterDOM.classList.add('js')

// document.addEventListener('scroll', event => {
// 	if (event.target !== document) return

// 	updateMaskSizeY()
// }, { capture: true, passive: false })



// // let { defineProperty, keys } = Object
// // let styleDoc = new Document()
// // let styleDom = styleDoc.appendChild(document.createElement('style'))
// // let styleStyle = styleDom.style
// // let styleMap = new WeakMap()
// // let styleGet = styleMap.get.bind(styleMap)
// // let matchLl = /^[A-Za-z]+$/
// // let matchPx = /^-?(\d*\.)?\d+px$/
// // let matchVp = /^[A-Z][a-z]+([A-Z])([A-Za-z]+)$/
// // let patchVp = ($0, $1, $2) => $1.toLowerCase() + $2

// // class StyleDeclarations {
// // 	constructor(target) {
// // 		styleMap.set(this, {
// // 			target,
// // 			styles: getComputedStyle(target),
// // 			get bounds() {
// // 				return this.target.getBoundingClientRect()
// // 			},
// // 		})
// // 	}

// // 	get scrollX() {
// // 		return styleGet(this).target.scrollLeft
// // 	}

// // 	get scrollY() {
// // 		return styleGet(this).target.scrollTop
// // 	}
// // }

// // let { prototype } = StyleDeclarations

// // for (let prop of 'x y top right bottom left'.split(' ')) {
// // 	defineProperty(prototype, prop, {
// // 		configurable: true,
// // 		enumerable: true,
// // 		get() {
// // 			return styleGet(this).bounds[prop]
// // 		},
// // 	})
// // }

// // for (let prop of keys(globalThis.CSS2Properties?.prototype || styleStyle)) {
// // 	if (!matchLl.test(prop)) continue

// // 	let pfProp = prop.replace(matchVp, patchVp)

// // 	if (pfProp in prototype) continue

// // 	if (!(prop in prototype)) {
// // 		defineProperty(prototype, pfProp, {
// // 			configurable: true,
// // 			enumerable: true,
// // 			get() {
// // 				let value = styleGet(this).styles[prop]
// // 				return matchPx.test(value) ? parseFloat(value) : value
// // 			},
// // 		})
// // 	}
// // }

// // // const getBox = (target: Element) => {
// // // 	const cs = getComputedStyle(target)
// // // 	const cr = target.getBoundingClientRect()

// // // 	for (let key in cs) {
// // // 		console.log({ key })
// // // 		if (key === 'zoom') break
// // // 	}

// // // 	return null
// // // }

// // // const xyz = ({ query, enter, leave }: Opts) => {
// // // 	let node = document.querySelector<HTMLElement>(query)!
// // // 	let rect = node.getBoundingClientRect()
// // // 	let pageY = visualViewport!.pageTop
// // // 	let offsY = 0
// // // 	let lastY = 0
// // // 	let percY = 0

// // // 	console.log(getBox(node))

// // // 	if (pageY < enter(rect)) {
// // // 		rect.y += pageY
// // // 	}

// // // 	document.addEventListener('scroll', () => {
// // // 		pageY = visualViewport!.pageTop
// // // 		offsY = clamp(rect.y, pageY, leave(rect))

// // // 		if (offsY === lastY) return

// // // 		lastY = offsY

// // // 		percY = (offsY - rect.y) / rect.height

// // // 		console.log(percY)
// // // 	}, { capture: true, passive: false })
// // // }

// // // interface Opts {
// // // 	query: string,
// // // 	enter(rect: DOMRect): number
// // // 	leave(rect: DOMRect): number
// // // }

// // // xyz({
// // // 	query: '.c-iconlibrary',
// // // 	enter() {
// // // 		return 60
// // // 	},
// // // 	leave(rect) {
// // // 		return 60 + rect.height
// // // 	},
// // // })

type StyleDeclaration = {
	[K in keyof CSSStyleDeclaration]:
		CSSStyleDeclaration[K] extends number | string
			? number | string
		: CSSStyleDeclaration[K]
}

