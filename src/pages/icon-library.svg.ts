import type { APIRoute } from 'astro'

import icons from 'project:data/icons.json'

const html = `<svg xmlns="http://www.w3.org/2000/svg">\n${
	Object.entries(icons).map(
		([ name, icons ]) => (
			`\t<g data-name=${JSON.stringify(name)}>\n${
				Object.entries(icons).map(
					([ id, { name, html, tags }]) => (
						`\t\t<symbol id="icon-${id}" viewBox="0 0 24 24">\n${
							[
								`\t\t\t<title>${name}</title>`,
								`\t\t\t${html}`,
								`\t\t\t<metadata>${tags.join(', ')}</metadata>`,
							].join('\n')
						}\n\t\t</symbol>\n`
					)
				).join('')
			}</g>\n`
		)
	).join('')
}</svg>`

export const get: APIRoute = () => ({
	body: html,
	encoding: 'utf8',
})
