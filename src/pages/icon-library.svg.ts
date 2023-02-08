import type { APIRoute } from 'astro'

import icons from 'project:data/icons.json'
import { h } from 'project:utils/host/h'

export const get: APIRoute = () => ({
	body: h.svg({ xmlns: 'http://www.w3.org/2000/svg' },
		...Object.entries(icons).map(
			([ name, icons ]) => h.g({ 'data-name': name },
				...Object.entries(icons).map(
					([ id, { name, path, tags }]) => h.symbol({ id: `icon-${id}`, viewBox: '0 0 24 24' },
						h.title({}, name),
						h.path(path),
						h.metadata({}, tags.join(', '))
					)
				)
			)
		)
	),
	encoding: 'utf8',
})
