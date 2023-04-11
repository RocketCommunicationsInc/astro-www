/** Prepares a DOM fragment representing a Google Calendar event for interactive behavior. */
{
	const scriptEl = document.currentScript

	/** Calendar Event Element. */
	const eventElement = scriptEl.previousSibling

	eventElement.classList.add('--closed')

	/** Calendar Events Details Element. */
	const eventDetailsElement = eventElement.querySelector('.p-community-event-details')

	/** Button toggling the appearance of the Calendar Events Details Element. */
	const eventDetailsToggle = eventElement.querySelector('.p-community-event-actions button')

	// handle toggle events
	eventElement.addEventListener('click', event => {
		// if you're clicking inside the event details don't activate close
		if (event.target.closest('.p-community-event-details') !== null) return

		if (!eventDetailsElement) return

		if (eventElement.classList.contains('--closed')) eventDetailsElement.style.setProperty('--content-height', eventDetailsElement.scrollHeight + 32 + 'px')

		eventElement.classList.toggle('--closed')
		eventElement.classList.toggle('--open')

		eventElement.classList.contains('--open') ? eventDetailsToggle.textContent = 'Hide Details' : eventDetailsToggle.textContent = 'View Details'
	})

	// telemetry: user opens the community event details
	eventElement.addEventListener('click', (event) => {
		// if you're clicking inside the event details don't activate close
		if (event.target.closest('.p-community-event-details') !== null) return
		if (!eventElement.classList.contains('--open')) return

		gtag('event', 'open_community_event_details')
	})
}
