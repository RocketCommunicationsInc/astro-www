import type { Schema$Events } from './types.d'
import { GOOGLE_CALENDAR_EVENTS_API_URL, GOOGLE_CALENDAR_EVENTS_API_KEY } from './consts'

/** Search Parameters attached to the Request URL */
const searchParams = new URLSearchParams({
	key: GOOGLE_CALENDAR_EVENTS_API_KEY,
	maxResults: '6',
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

export default items
