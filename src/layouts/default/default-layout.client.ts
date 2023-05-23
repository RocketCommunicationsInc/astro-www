import 'project:utils/client/google-analytics'

/* Receive messages (mostly) from playground iframe */
addEventListener('message', (event) => {
	// security: if your message comes from a different site than your receiver, abort.
	if (window.origin !== event.origin) return

	// otherwise get the event and parse it
	const { data } = event

	// if the event is a gtag event then send to google analytics datalayer
	if (data.messageType === 'gtag') {
		const { eventType, eventData } = data
		gtag('event', eventType, eventData)
	}
})
