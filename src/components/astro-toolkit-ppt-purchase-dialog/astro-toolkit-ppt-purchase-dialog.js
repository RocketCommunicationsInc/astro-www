
// Create an instance of the Stripe object with your publishable API key
import { STRIPE_VARIABLES, isDevelopment } from '../../../netlify/functions/config/environment.ts'
const stripe = Stripe(STRIPE_VARIABLES[isDevelopment ? 'development' : 'production'].publicKey)
const purchaseButtons = document.querySelectorAll('.ppt-purchase-button')
const dialog = document.querySelector('.ppt-purchase-dialog')
const submitButton = document.querySelector('.ppt-purchase-dialog-submit')
const closeButton = document.querySelector('.ppt-purchase-dialog-close')
const loadingEle = document.querySelector('.loading-container')
const form = document.querySelector('.ppt-purchase-form')

purchaseButtons.forEach((button) => {
	button.addEventListener('click', () => {
		dialog.showModal()
	})
})

closeButton.addEventListener('click', () => {
	dialog.close()
	form.reset()
})

const setLoading = () => {
	closeButton.setAttribute('disabled', 'true')
	submitButton.setAttribute('disabled', 'true')
	loadingEle.classList.add('loading')
}

const resetLoading = () => {
	closeButton.removeAttribute('disabled')
	submitButton.removeAttribute('disabled')
	loadingEle.classList.remove('loading')
	form.reset()
}

form.addEventListener('submit', async (e) => {
	e.preventDefault()
	setLoading()
	const formData = new FormData(form)

    // Convert FormData to an object
    const data = {}
    formData.forEach((value, key) => {
        data[key] = value
    })

	fetch('/.netlify/functions/stripe', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data)
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
			if (result.error) alert(result.error.message)
		}).catch((err) => {
			resetLoading()
			console.error('Error with stripe fetch: ', err)
		}).finally(() => resetLoading())
})
