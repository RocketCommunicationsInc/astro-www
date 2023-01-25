document.adoptedStyleSheets || ((
	{ defineProperties, getOwnPropertyDescriptors } = Object,

	virtualDocument = new Document(),
	createStyle = virtualDocument.cloneNode.bind(document.createElement('style')),

	CSSStyleSheetPrototype = CSSStyleSheet.prototype,
	CSSStyleSheetProps = getOwnPropertyDescriptors(CSSStyleSheetPrototype),

	/** @type {WeakMap<CSSStyleSheet, { index: number, group: CSSGroupingRule, rules: CSSRuleList, replace(cssText?: string): void }>} */
	groupingRuleMap = new WeakMap(),

	/** @type {WeakMap<Document | ShadowRoot, CSSStyleSheet[]>} */
	adoptedStyleSheetsMap = new WeakMap(),

	adoptedStyleSheetsProps = getOwnPropertyDescriptors({
		get adoptedStyleSheets() {
			/** @type {Document | ShadowRoot} */
			let root = this
			let adoptedStyleSheets = adoptedStyleSheetsMap.get(root)

			if (!adoptedStyleSheets) {
				/** @type {HTMLStyleElement} */
				let element = createStyle()

				/**  @type {CSSGroupingRule} */
				let elementGroup = { cssText: '@media{' }

				/**  @type {CSSStyleSheet} */
				let elementSheet

				let appendSource = () => root.contains(element) || (root.documentElement || root).append(element) || (
					elementSheet = defineProperties(element.sheet, CSSStyleSheetProps),
					elementGroup = elementSheet.cssRules[elementSheet.insertRule(elementGroup.cssText)]
				)

				let source = []

				adoptedStyleSheetsMap.set(root, adoptedStyleSheets = new Proxy(source, {
					get(/** @type {any} */ gettedValue, prop) {
						gettedValue = Reflect.get(source, prop)

						return (
							typeof gettedValue === 'function'
								? (returnValue, ...args) => {
									returnValue = gettedValue.call(source, returnValue, ...args)

									for (let sheet of source) {
										if (!groupingRuleMap.has(sheet)) {
											groupingRuleMap.set(sheet, {
												index: elementGroup.insertRule('@media{', elementGroup.cssRules.length),
												get group() {
													return elementGroup
												},
												get rules() {
													return elementGroup.cssRules
												},
												replace(/** @type {string} */ cssText) {
													elementSheet.deleteRule(0)
													elementGroup = elementSheet.cssRules[elementSheet.insertRule('@media {' + cssText)]
												},
											})
										}
									}

									return returnValue
								}
							: gettedValue
						)
					},
				}))

				appendSource()

				new MutationObserver(appendSource).observe(root.documentElement || root, { childList: true })
			}

			return adoptedStyleSheets
		}
	})
) => (
	defineProperties(Document.prototype, adoptedStyleSheetsProps),
	defineProperties(ShadowRoot.prototype, adoptedStyleSheetsProps),

	/** @type {CSSStyleSheet} */
	(
		// eslint-disable-next-line no-global-assign
		CSSStyleSheet = CSSStyleSheetPrototype.constructor = function CSSStyleSheet() {
			if (!new.target) {
				throw new TypeError("Constructor requires 'new' operator")
			}

			let element = virtualDocument.appendChild(createStyle())
			let sheet = element.sheet

			element.remove()

			return sheet
		}.bind()
	).prototype = defineProperties(CSSStyleSheetPrototype, getOwnPropertyDescriptors({
		insertRule(/** @type {string} */ cssText, index = 0) {
			/** @type {CSSStyleSheet} */
			let sheet = this
			let group = groupingRuleMap.get(sheet)

			return /** @type {number} */ (
				group
					? group.group.insertRule(cssText, index)
				: CSSStyleSheetProps.insertRule.value.call(sheet, cssText, index)
			)
		},
		replaceSync(cssText) {
			/** @type {CSSStyleSheet} */
			let sheet = this

			let group = groupingRuleMap.get(sheet)

			if (group) {
				group.replace(cssText)
			} else {
				throw new TypeError("Can't call replaceSync on non-constructed CSSStyleSheets.")
			}
		},
		async replace(cssText) {
			this.replaceSync(cssText)
		},
		get rules() {
			return /** @type {CSSRuleList} */ (this.cssRules)
		},
		get cssRules() {
			/** @type {CSSStyleSheet} */
			let sheet = this
			let group = groupingRuleMap.get(sheet)

			return /** @type {CSSRuleList} */ (
				group
					? group.rules
				: CSSStyleSheetProps.cssRules.get.call(sheet)
			)
		},
	}))
))()
