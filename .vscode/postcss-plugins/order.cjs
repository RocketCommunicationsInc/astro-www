const { createPlugin, utils } = require('stylelint')
const propertiesOrderRule = require('stylelint-order/rules/properties-order')

const ruleName = 'csstools/order'

module.exports = createPlugin(
	ruleName,
	(enabled, options, context) => (postcssRoot, postcssResult) => {
		options = Object(options)

		const canFix = Boolean(Object(context).fix)

		const validOptions = utils.validateOptions(
			postcssResult,
			ruleName,
			{
				actual: enabled,
				possible: ["always", true, "never", false],
			}
		)

		if (!enabled || !validOptions) {
			return
		}

		postcssResult.stylelint.ruleSeverities['order/properties-order'] = 'warning'

		propertiesOrderRule(
			order,
			{},
			context
		)(postcssRoot, postcssResult)

		if (canFix) {
			postcssRoot.walkDecls(decl => {
				const previous = decl.prev()

				if (previous?.type === 'comment') return

				if (decl.parent?.name === 'font-face') return

				let group = order.find(
					group => group.properties.includes(decl.prop.toLowerCase())
				)

				if (!group || group.groupName === 'Display') return

				const before = decl.raws?.before || ''

				if (
					before.startsWith('\n\n') ||
					(
						!previous &&
						before.startsWith('\n')
					)
				) {
					const [ indent ] = decl.raws.before.match(/\t+$/) || [ '' ]

					if (previous) {
						decl.raws.before = decl.raws.before.slice(1)
					}

					decl.before(`\n${previous ? '\n' : ''}${indent}/* ${group.groupName} */`)
				}
			})
		}
	}
)

const order = [
	{
		'groupName': 'Display',
		'emptyLineBefore': 'always',
		'properties': [
			'display'
		]
	},
	{
		'groupName': 'Layout',
		'emptyLineBefore': 'always',
		'properties': [
			'border-block',
			'border-block-start',
			'border-block-end',
			'border-block-width',
			'border-inline',
			'border-inline-start',
			'border-inline-end',
			'border-inline-width',
			'aspect-ratio',
			'block-size',
			'inline-size',
			'gap',
			'column-gap',
			'row-gap',
			'grid-area',
			'grid-auto-flow',
			'margin',
			'margin-block',
			'margin-block-start',
			'margin-block-end',
			'margin-inline',
			'margin-inline-start',
			'margin-inline-end',
			'overflow',
			'overflow-x',
			'overflow-y',
			'padding',
			'padding-block',
			'padding-block-start',
			'padding-block-end',
			'padding-inline',
			'padding-inline-start',
			'padding-inline-end',
			'height',
			'width',
			'position',
			'inset',
			'inset-block',
			'inset-block-start',
			'inset-block-end',
			'inset-inline',
			'inset-inline-start',
			'inset-inline-end',
			'top',
			'right',
			'bottom',
			'left',
			'z-index',
			'float',
			'clear',
			'overflow',
			'resize',
			'clip',
			'clip-path',
			'visibility',
			'box-sizing',
			'align-content',
			'align-items',
			'align-self',
			'flex',
			'flex-basis',
			'flex-direction',
			'flex-flow',
			'flex-grow',
			'flex-shrink',
			'flex-wrap',
			'grid',
			'grid-column',
			'grid-row',
			'grid-template',
			"grid-template-areas",
			'grid-template-columns',
			'grid-template-rows',
			'justify-content',
			'order',
			'place-items',
			'place-content',
			'place-self',
			'min-inline-size',
			'min-block-size',
			'max-inline-size',
			'max-block-size',
			'min-width',
			'max-width',
			'min-height',
			'max-height'
		].sort()
	},
	{
		'groupName': 'Text',
		'emptyLineBefore': 'always',
		'properties': [
			'font',
			'font-family',
			'font-size',
			'font-size-adjust',
			'font-stretch',
			'font-style',
			'font-variant',
			'font-weight',
			'font-smoothing',
			'direction',
			'tab-size',
			'text-align',
			'text-align-last',
			'text-decoration',
			'text-decoration-color',
			'text-decoration-line',
			'text-decoration-style',
			'text-indent',
			'text-justify',
			'text-overflow',
			'text-shadow',
			'text-transform',
			'text-size-adjust',
			'line-height',
			'vertical-align',
			'letter-spacing',
			'word-spacing',
			'white-space',
			'word-break',
			'word-wrap'
		].sort()
	},
	{
		'groupName': 'Appearance',
		'emptyLineBefore': 'always',
		'properties': [
			'appearance',
			'filter',
			'opacity',
			'color',
			'outline',
			'outline-color',
			'outline-offset',
			'outline-style',
			'outline-width',
			'border',
			'border-image',
			'background',
			'background-color',
			'background-image',
			'background-position',
			'background-repeat',
			'background-size',
			'border-radius',
			'box-shadow',
			'cursor',
			'tap-highlight-color'
		].sort()
	},
	{
		'groupName': 'Behavior',
		'emptyLineBefore': 'always',
		'properties': [
			'overscroll-behavior',
			'overscroll-behavior-x',
			'overscroll-behavior-y',
			'pointer-events',
			'scroll-behavior',
			'scroll-snap',
			'scroll-snap-type',
			'-webkit-overflow-scrolling',
		].sort(),
	},
	{
		'groupName': 'Masking',
		'emptyLineBefore': 'always',
		'properties': [
			'mask',
			'mask-clip',
			'mask-composite',
			'mask-image',
			'mask-mode',
			'mask-origin',
			'mask-position',
			'mask-repeat',
			'mask-size',
			'overscroll-behavior',
			'overscroll-behavior-x',
			'overscroll-behavior-y',
			'pointer-events',
			'scroll-behavior',
			'scroll-snap',
			'scroll-snap-type',
			'-webkit-overflow-scrolling',
		].sort(),
	},
	{
		'groupName': 'Animation',
		'emptyLineBefore': 'always',
		'properties': [
			'animation',
			'animation-delay',
			'animation-direction',
			'animation-duration',
			'animation-fill-mode',
			'animation-iteration-count',
			'animation-name',
			'animation-play-state',
			'animation-timing-function',
			'transition',
			'transition-delay',
			'transition-duration',
			'transition-property',
			'transition-timing-function'
		].sort()
	},
	{
		'groupName': 'Table',
		'emptyLineBefore': 'always',
		'properties': [
			'border-collapse',
			'border-spacing',
			'caption-side',
			'empty-cells',
			'table-layout',
		].sort()
	},
	{
		'groupName': 'Generated',
		'emptyLineBefore': 'always',
		'properties': [
			'content',
			'quotes',
			'counter-reset',
			'counter-increment'
		].sort()
	}
]

module.exports.ruleName = ruleName
