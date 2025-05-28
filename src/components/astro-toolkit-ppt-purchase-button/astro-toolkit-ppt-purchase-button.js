
	// Create an instance of the Stripe object with your publishable API key
	// LIVE key
	// const stripe = Stripe(
	// 	'pk_test_51Q57PtCecnrjj3thC05csRltEdlayoXiL7Hq1SwtDGtl0jHVlKIjGEfU5H2BcPuz8caaWBu1Xi7Ir3dqxcupTJRD00TWlVYsHE'
	// 	)
	// Test/Sandbox Key pk_test_51QCk6mCX2F0Knv6wLx3fRI5bIvIKHPa4LcZS2DU0aXMyalKcSsplszWAvftDIjSs072xOs5ZHN264qMnjjHi7Ml600FWdSVdql pk_live_51Q57PtCecnrjj3thBAsVNZ5R02YmZEg4kveWSD7ipTUEX0F7VKVdlTFT3UPHILBUskCmPnOWdCUlvuHp5LDuuGhV00X7Im0xoK
	import { STRIPE_VARIABLES } from '../../config/environment.ts'
	import { isDevelopment } from '../../config/environment.ts'
	const stripe = Stripe(STRIPE_VARIABLES[isDevelopment ? 'development' : 'production'].publicKey)
	const pptBuyButtons = document.querySelectorAll('.ppt-purchase-button')

	pptBuyButtons.forEach(button => {
		button.addEventListener('click', async (e) => {
			e.preventDefault()
			const data = {
				'products': [ 'astro-toolkit-ppt' ], // Gather all values into an array
		}

		console.log(data, 'ppt product as data')
			fetch('/.netlify/functions/stripe', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
			},
			body: JSON.stringify(data) // looks like {source-code: ['fds', 'grm']}
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
		})
	})

