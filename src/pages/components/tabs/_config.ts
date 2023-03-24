import * as overviewURL from './index.md'
import * as specsURL from './specs.md'
import * as usageURL from './usage.md'

export default [
	{...overviewURL.frontmatter, url: overviewURL.url},
    {...specsURL.frontmatter, url: specsURL.url},
    {...usageURL.frontmatter, url: usageURL.url},
]
