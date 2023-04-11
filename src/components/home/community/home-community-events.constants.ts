export const googleCalendarEventsApiUrl = 'https://www.googleapis.com/calendar/v3/calendars/c_c00bcad50f7ad0acd24c335ddf65e16efd7538c0dd57be307b40c1677feb2637@group.calendar.google.com/events'

export const googleCalendarEventsApiKey = 'AIzaSyDDR9nPrJn5F2oX9qw5uCpY4swStcV18rA'

/** Returns a list of fetched Google Calendar Events. */
export const fetchGoogleCalendarEvents = async () => {
	/** Search Parameters attached to the Request URL */
	const searchParams = new URLSearchParams({
		key: googleCalendarEventsApiKey,
		maxResults: '6',
		orderBy: 'startTime',
		singleEvents: 'true',
		timeMin: new Date().toISOString(),
	})

	/** Request URL */
	const request = googleCalendarEventsApiUrl + '?' + searchParams

	/** Response from the Google Calendar API. */
	const response = await fetch(request, {
		cache: 'force-cache',
		headers: {
			Referer: 'https://www.astrouxds.com/',
		},
	})

	const { kind, items }: { kind: string, items: CalendarEvent[] } = await response.json()

	// return an empty array if the response is not calendar events
	if (kind !== 'calendar#events' || !items) return []

	return items
}

// rearrange date - Only triggers if the event is a google calendar All Day event.
export const getDateRange = (startDate: string, endDate: string) => {
	// get time difference in seconds
	const eventLengthSec = (new Date(endDate).getTime() - new Date(startDate).getTime()) / 1000
	// convert day to seconds
	const dayLength = 60 * 60 * 24
	// find event Lenth in days
	const eventLength = eventLengthSec / dayLength

	const orderedDateStart = startDate.split('-')

	// if the event is more than one day long send back both dates
	if (eventLength > 1) {
		const orderedDateEnd = endDate.split('-')
		return {
			dateRange: `${orderedDateStart[1]}/${orderedDateStart[2]}/${orderedDateStart[0]} - ${orderedDateEnd[1]}/${orderedDateEnd[2]}/${orderedDateEnd[0]}`,
			singleDay: false
		}
	} else {
		// otherwise it is only one day so return just that date
		return {
			dateRange: `${orderedDateStart[1]}/${orderedDateStart[2]}/${orderedDateStart[0]}`,
			singleDay: true
		}
	}
}

export interface EventOrganizer {
	email: string
	displayName: string
	self: boolean
}

export interface EventCreator {
	email: string
}

export interface EventTime {
	date: string
	dateTime: string
	timeZone: string
}

export interface CalendarEvent {
	kind: string
	etag: string
	id: string
	status: string
	htmlLink: string
	created: string
	updated: string
	summary: string
	description: string
	location: string
	creator: EventCreator
	organizer: EventOrganizer
	start: EventTime
	end: EventTime
	recurringEventId: string
	originalStartTime?: EventTime
	iCalUID: string
	sequence: number
	guestsCanInviteOthers: boolean
	guestsCanSeeOtherGuests: boolean
	eventType: string
}
