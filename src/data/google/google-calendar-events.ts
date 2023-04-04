import type { Schema$Events } from './types.d'
import { GOOGLE_CALENDAR_EVENTS_API_URL, GOOGLE_CALENDAR_EVENTS_API_KEY } from './consts'

/** Search Parameters attached to the Request URL */
const searchParams = new URLSearchParams({
	key: GOOGLE_CALENDAR_EVENTS_API_KEY,
	maxResults: '8',
	orderBy: 'startTime',
	singleEvents: 'true',
	timeMin: new Date().toISOString(),
})

/** Request URL */
const request = GOOGLE_CALENDAR_EVENTS_API_URL + '?' + searchParams

/** Response from the Google Calendar API. */
const response = await fetch<{ json: Required<Schema$Events> }>(request, {
	cache: 'force-cache',
	headers: {
		Referer: 'https://www.astrouxds.com/',
	},
})

const { items } = await response.json()

console.log(items.find(item => item.summary === `38th Annual Space Symposium`))

items.push(<Schema$Events['items'][0]>{
	kind: 'calendar#event',
	etag: '"3361100641052000"',
	id: '3brsoqdrdiqjhu94bcj667oo2n',
	status: 'confirmed',
	htmlLink: 'https://www.google.com/calendar/event?eid=M2Jyc29xZHJkaXFqaHU5NGJjajY2N29vMm4gY19jMDBiY2FkNTBmN2FkMGFjZDI0YzMzNWRkZjY1ZTE2ZWZkNzUzOGMwZGQ1N2JlMzA3YjQwYzE2NzdmZWIyNjM3QGc',
	created: '2023-04-03T19:32:00.000Z',
	updated: '2023-04-03T19:32:00.526Z',
	summary: '39th Annual Space Symposium',
	description: 'Come stop by for a visit! Rocket/Astro will be in Booth #520',
	location: 'The Broadmoor, 1 Lake Ave, Colorado Springs, CO 80906, USA',
	creator: { email: 'andrew.antal@rocketcom.com' },
	organizer: {
		email: 'c_c00bcad50f7ad0acd24c335ddf65e16efd7538c0dd57be307b40c1677feb2637@group.calendar.google.com',
		displayName: 'AstroUXDS Community Events',
		self: true
	},
	start: { date: '2023-04-18' },
	end: { date: '2023-04-19' },
	transparency: 'transparent',
	iCalUID: '3brsoqdrdiqjhu94bcj667oo2n@google.com',
	sequence: 0,
	eventType: 'default'
})

export default items
