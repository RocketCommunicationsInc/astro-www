import remarkDirective from 'remark-directive'
import remarkDirectives from './remark-plugins/remark-directives.js'
import remarkDoDontFigures from './remark-plugins/remark-do-dont-figures.js'
import remarkGfm from 'remark-gfm'
import remarkHeadingLinks from './remark-plugins/remark-heading-links.js'
import remarkImplicitFigures from './remark-plugins/remark-implicit-figures.js'
import remarkLazyImages from './remark-plugins/remark-lazy-images.js'
import remarkLists from './remark-plugins/remark-lists.js'
import remarkSmartyPants from 'remark-smartypants'

export default () => [
	remarkGfm,
	remarkSmartyPants,
	remarkDirective,
	remarkDirectives,
	remarkLazyImages,
	remarkImplicitFigures,
	remarkDoDontFigures,
	remarkLists,
	remarkHeadingLinks,
]
