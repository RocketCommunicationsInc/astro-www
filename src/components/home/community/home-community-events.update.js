import { h } from 'project:utils/html.ts'
import { fetchGoogleCalendarEvents, getDate } from './home-community-events.constants.ts'
import { gtag } from 'project:utils/client/google-analytics.ts'

/** Returns a string, empty if the value is nullish. */
const toString = (value) => value == null ? '' : String(value)

/** Returns a DOM fragment representing a Google Calendar event. */
const createCalendarEventFragment = (
	/** @type {CalendarEvent} */
	event
) => withCalendarInteractiveBehavior(h(`<article class="p-community-event --closed">
	<small class="p-community-event-date">
	<span class="-date">${event.start.date
		? getDate(event.start.date)
		: new Date(event.start.dateTime).toLocaleString('en-US', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric'
		})
	}</span>
	${
		event.start.dateTime
			? `<span class="-time">${
				new Date(event.start.dateTime).toLocaleString('en-US', {
					hour: 'numeric',
					minute: '2-digit',
					timeZoneName: 'short'
				})
		}</span>`
		: toString(event.start.date && `<span class="-time">All Day!</span>`)
	}
	</small>
	<hgroup class="p-community-event-heading">
		<h5>${event.summary}</h5>
		${toString(event.location && `<small class="p-community-event-subheading">${event.location}</small>`)}
	</hgroup>
	<span class="p-community-event-actions">
		<button>View Details</button>
	</span>
	${toString(event.description && `<span class="p-community-event-details">${
		event.description
	}</span>`)}
</article>`))

// /** Prepares a DOM fragment representing a Google Calendar event for interactive behavior. */
const withCalendarInteractiveBehavior = (/** @type {HTMLElement} */ calendarEventFragment) => {
	/** Calendar Events Details Element. */
	const detailsElement = /** @type {HTMLElement} */ (calendarEventFragment.querySelector('.p-community-event-details'))
	const articleElement = /** @type {HTMLElement} */ (calendarEventFragment)

	// skip if there is no details element
	if (!detailsElement) return calendarEventFragment

	/** Button toggling the appearance of the Calendar Events Details Element. */
	const actionsElement = /** @type {HTMLElement} */ (calendarEventFragment.querySelector('.p-community-event-actions button'))

	// handle toggle events on the button
	actionsElement.addEventListener('click', event => {
		detailsElement.style.setProperty('--content-height', detailsElement.scrollHeight + 'px')

		articleElement.classList.toggle('--closed')
		articleElement.classList.toggle('--open')

		articleElement.classList.contains('--open') ? actionsElement.textContent = 'Hide Details' : actionsElement.textContent = 'View Details'
	})

	// telemetry: user opens the community event details
	actionsElement.addEventListener('click', () => {
		if (!articleElement.classList.contains('--open')) return

		gtag('event', 'open_community_event_details')
	})
	console.log(calendarEventFragment)
	return calendarEventFragment
}

/** Returns a DOM Fragment representing a list of Google Calendar events. */
const createCalendarEventFragments = (
	/** @type {CalendarEvent[]} */
	calendarEvents
) => {
	/** DOM Fragment containing all Google Calendar events. */
	const eventsFragment = new DocumentFragment()

	// append each calendar event to the fragment
	for (const calendarEvent of calendarEvents) {
		eventsFragment.append(
			createCalendarEventFragment(calendarEvent)
		)
	}

	return eventsFragment
}

/** Replaces the contents of the calendar container with Google Calendar Events. */
const updateCalendarContainer = async () => {
	/** Google Calendar Events Container. */
	const eventsElement = document.querySelector('.p-community-events-content')

	// do nothing if the event contents could not be found
	if (!eventsElement) return

	/** Google Calendar Events. */
	const events = await fetchGoogleCalendarEvents()

	/** DOM Fragment representing the Google Calendar Events. */
	const eventsFragment = createCalendarEventFragments(events)

	// replace the contents of the Google Calendar Events Container with the DOM Fragment if the calendar returned events
	if (events.length !== 0) eventsElement.replaceChildren(eventsFragment)
}

// immediately update the calendar container
updateCalendarContainer()

/** @typedef {{ email: string, displayName: string, self: boolean }} EventOrganizer */
/** @typedef {{ email: string }} EventCreator */
/** @typedef {{ date: string, dateTime: string, timeZone: string }} EventTime */
/** @typedef {{ kind: string, etag: string, id: string, status: string, htmlLink: string, created: string, updated: string, summary: string, description: string, location: string, creator: EventCreator, organizer: EventOrganizer, start: EventTime, end: EventTime, recurringEventId: string, originalStartTime?: EventTime, iCalUID: string, sequence: number, guestsCanInviteOthers: boolean, guestsCanSeeOtherGuests: boolean, eventType: string }} CalendarEvent */
