import type { APIRoute } from 'astro'

import icons from 'project:data/icons.json'

const html = `<svg xmlns="http://www.w3.org/2000/svg">${
	Object.entries(icons).map(
		([ name, icons ]) => (
			`<g data-name=${JSON.stringify(name)}>${
				Object.entries(icons).map(
					([ id, { name, html }]) => (
						`<symbol id="icon-${id}" viewBox="0 0 24 24">${
							`<title>${name}</title>${html}`
						}</symbol>`
					)
				).join('')
			}</g>`
		)
	).join('')
}</svg>`

export const get: APIRoute = () => ({
	body: html,
	encoding: 'utf8',
})
