
	// Create an instance of the Stripe object with your publishable API key
	// LIVE key
	// const stripe = Stripe(
	// 	'pk_test_51Q57PtCecnrjj3thC05csRltEdlayoXiL7Hq1SwtDGtl0jHVlKIjGEfU5H2BcPuz8caaWBu1Xi7Ir3dqxcupTJRD00TWlVYsHE'
	// 	)
	// Test/Sandbox Key
	const stripe = Stripe('pk_test_51QCk6mCX2F0Knv6wLx3fRI5bIvIKHPa4LcZS2DU0aXMyalKcSsplszWAvftDIjSs072xOs5ZHN264qMnjjHi7Ml600FWdSVdql')
	const openBtn = document.querySelectorAll('.open-btn')
	const dialog = document.querySelector('.p-source-code-dialog')
	const form = document.getElementById('buy-code-access')

form.addEventListener('submit', async (e) => {
	e.preventDefault()
	const data = new FormData(form)
	const formObject = {
		'source-code': data.getAll('source-code'), // Gather all values into an array
  }

console.log(formObject, 'data from formdata')
	fetch('/.netlify/functions/stripe', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
	},
	body: JSON.stringify(formObject) // looks like {source-code: ['fds', 'grm']}
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

openBtn.forEach((openBtn) => {
	openBtn.addEventListener('click', () => {
		dialog.showModal()
		// gtag('event', 'open_code_access_popup', { 'page_location': window.location.href })
	})
})
