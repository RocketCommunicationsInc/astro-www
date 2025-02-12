// STRIPE_SECRET for real
const stripe = require('stripe')(process.env.STRIPE_SANDBOX_SECRET)
// const baseUrl = process.env.DEPLOY_URL || process.env.BASE_URL || 'http://localhost:8888'
let baseUrl
if (process.env.CONTEXT === 'deploy-preview') {
	baseUrl = process.env.DEPLOY_PRIME_URL
} else if (process.env.CONTEXT === 'production') { baseUrl = process.env.BASE_URL } else {
	baseUrl = 'https://www.astrouxds.com/'
}

const PRODUCTS = {
	'fds': {
		name: 'FDS Source Code',
		unit_amount: 10000 // Amount in cents (i.e., $100.00)
	},
	'grm': {
		name: 'GRM Source Code',
		unit_amount: 10000
	},
	'ttc': {
		name: 'TT&C Source Code',
		unit_amount: 10000
	},
	'astro-toolkit-ppt': {
		name: 'Astro Toolkit PPT',
		unit_amount: 10000
	}
  }
  exports.handler = async (event) => {
	try {
		console.log(event.body)
		// Parse the incoming request body
		const { 'products': selectedProducts } = JSON.parse(event.body)

		// Validate that there are selected products
	if (!selectedProducts || selectedProducts.length === 0) {
		return {
		statusCode: 400,
			body: JSON.stringify({ error: 'No products selected' }),
		}
	}

	// Create line items based on the selected products
	// eslint-disable-next-line camelcase
	const line_items = selectedProducts.map(productCode => {
		const product = PRODUCTS[productCode]
		return {
		price_data: {
			currency: 'usd',
			product_data: {
				name: product.name,
			},
			unit_amount: product.unit_amount,
		},
			quantity: 1, // You can make this dynamic if needed
		}
	})
	// Create the Stripe checkout session
	const session = await stripe.checkout.sessions.create({
		payment_method_types: [ 'card' ],
		// eslint-disable-next-line camelcase
		line_items,
		mode: 'payment',
		success_url: `${baseUrl}/checkout/success/?session_id={CHECKOUT_SESSION_ID}`,
		cancel_url: `${baseUrl}/platforms/astro-toolkit-ppt/`,
		// custom_fields: [
		// 	{
		// 	key: 'engraving',
		// 	label: {
		// 		type: 'custom',
		// 		custom: 'Personalized engraving',
		// 	},
		// 	type: 'text',
		// 	optional: true,
		// 	},
		// ],
	})

	return {
		statusCode: 200,
		body: JSON.stringify({ id: session.id }),
	}
	} catch (error) {
	console.error('Error creating checkout session:', error)
	return {
		statusCode: 500,
		body: JSON.stringify({ error: 'Internal Server Error' }),
	}
	}
  }
