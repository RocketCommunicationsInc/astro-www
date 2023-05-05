import 'project:utils/client/google-analytics'

/* Receive messages from playground iframe */
addEventListener('message', (event) => {
	// security: if your message comes from a different site than your receiver, abort.
	if (window.origin !== event.origin) return

	const { data } = event
	console.log(data.messageType)
	if (data.messageType === 'gtag') {
		console.log('fired')
		gtag('event', 'playgroundmessage', data.messageData)
	}
})
