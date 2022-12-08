/** Prepares a DOM fragment representing a Google Calendar event for interactive behavior. */
// @ts-ignore
{
	const scriptEl = document.currentScript

	/** Calendar Event Element. */
	const eventElement = scriptEl!.previousSibling as HTMLElement

	eventElement.classList.add('--closed')

	/** Calendar Events Details Element. */
	const eventDetailsElement = eventElement.querySelector('.p-community-event-details') as HTMLElement

	/** Button toggling the appearance of the Calendar Events Details Element. */
	const eventDetailsToggle = eventElement.querySelector('.p-community-event-actions button') as HTMLElement

	// handle toggle events
	eventDetailsToggle.addEventListener('click', event => {
		eventDetailsElement.style.setProperty('--content-height', eventDetailsElement.scrollHeight + 'px')

		eventElement.classList.toggle('--closed')
		eventElement.classList.toggle('--open')

		eventElement.classList.contains('--open') ? eventDetailsToggle.textContent = 'Hide Details' : eventDetailsToggle.textContent = 'View Details'
	})
}
