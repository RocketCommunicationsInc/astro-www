// STRIPE_SECRET for real
const stripe = require('stripe')(process.env.STRIPE_SANDBOX_SECRET)

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
	}
  }
  exports.handler = async (event) => {
	try {
		// Parse the incoming request body
		const { 'source-code': selectedProducts } = JSON.parse(event.body)

		// Validate that there are selected products
	if (!selectedProducts || selectedProducts.length === 0) {
		return {
		statusCode: 400,
			body: JSON.stringify({ error: 'No products selected' }),
		}
	}

	// Create line items based on the selected products
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
		line_items,
		mode: 'payment',
		success_url: 'http://localhost:8888/checkout/success/',
		cancel_url: 'http://localhost:8888/checkout/cancel/',
		custom_fields: [
			{
			key: 'engraving',
			label: {
				type: 'custom',
				custom: 'Personalized engraving',
			},
			type: 'text',
			optional: true,
			},
		],
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
