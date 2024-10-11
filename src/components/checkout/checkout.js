
	// Create an instance of the Stripe object with your publishable API key
	const stripe = Stripe(
		'pk_test_51Q57PtCecnrjj3thC05csRltEdlayoXiL7Hq1SwtDGtl0jHVlKIjGEfU5H2BcPuz8caaWBu1Xi7Ir3dqxcupTJRD00TWlVYsHE'
		)
	const checkoutButton = document.querySelectorAll('.checkout-btn')

		checkoutButton.forEach((btn) => btn.addEventListener('click', function () {
			console.log('heard click')
		fetch('/api/stripe', {
			method: 'POST',
			})
			.then(function (response) {
			return response.json()
		})
			.then(function (session) {
				return stripe.redirectToCheckout({ sessionId: session.id })
		})
			.then(function (result) {
			if (result.error) {
				alert(result.error.message)
			}
			}).catch((err) => console.error('Error with stripe fetch: ', err))
		}))
