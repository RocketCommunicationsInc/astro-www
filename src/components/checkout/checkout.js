
	// Create an instance of the Stripe object with your publishable API key
	const stripe = Stripe(
		'pk_test_51Q57PtCecnrjj3thC05csRltEdlayoXiL7Hq1SwtDGtl0jHVlKIjGEfU5H2BcPuz8caaWBu1Xi7Ir3dqxcupTJRD00TWlVYsHE'
		)
	const checkoutButton = document.querySelectorAll('.checkout-btn')

		checkoutButton.forEach((btn) => btn.addEventListener('click', function () {
			console.log('heard click')
		fetch('/netlify/functions/stripe', {
			method: 'POST',
			})
			.then(function (response) {
				if (!response.ok) throw new Error('Failed to create checkout session')
			return response.json()
		})
			.then(function (session) {
				if (!session.id) throw new Error('No session ID returned')
				return stripe.redirectToCheckout({ sessionId: session.id })
		})
			.then(function (result) {
			if (result.error) {
				alert(result.error.message)
			}
			}).catch((err) => console.error('Error with stripe fetch: ', err))
		}))
