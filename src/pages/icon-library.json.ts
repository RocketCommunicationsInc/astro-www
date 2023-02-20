import type { APIRoute } from 'astro'

import icons from 'project:data/icons.json'

export const get: APIRoute = () => ({
	body: JSON.stringify(icons),
	encoding: 'utf8',
})
