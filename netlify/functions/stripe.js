/**
 * Stripe Checkout Function
 * This Netlify serverless function creates Stripe checkout sessions for
 * digital product purchases with automatic tax calculation.
 */


// Initialize Stripe using the sandbox secret key from environment variables
const stripe = require('stripe')(process.env.STRIPE_SECRET) // change this to STRIPE_SANDBOX_SECRET for development or STRIPE_SECRET for production
const baseUrl = process.env.BASE_URL || 'atrouxds.com' // Base URL for success and cancel redirects


/**
 * Product catalog with Stripe-specific IDs
 * Each product contains:
 * - stripeProductId: ID of the product in Stripe dashboard
 * - stripePriceId: ID of the price object in Stripe dashboard
 * - name: Display name of the product
 */

// Comment out the production product and price IDs when using development IDs
// development product and price IDs
//   'astro-toolkit-ppt': {
//         stripeProductId: 'prod_SLdY3pRKOo37hn',
//         stripePriceId: 'price_1RQwHUCX2F0Knv6wHJ8f615k',
//         name: 'Astro Toolkit PPT'
//       }
const PRODUCTS = {
	// production product and price IDs
	'astro-toolkit-ppt': {
        stripeProductId: 'prod_RvMCdid2pZCbUf',
        stripePriceId: 'price_1R1VU2Cecnrjj3thckjd6Qv4',
        name: 'Astro Toolkit PPT'
      }
  }

  /**
 * Main function handler for the Netlify serverless function
 * Creates a Stripe checkout session based on selected products
 *
 * @param {Object} event - The Netlify function event object
 * @returns {Object} Response with session ID or error message
 */
  exports.handler = async (event) => {
	try {
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
		if (!product) {
			throw new Error(`Invalid product code: ${productCode}`)
		}
    return {
        price: product.stripePriceId,
        quantity: 1,
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
		// Enable automatic tax calculation based on customer location
		automatic_tax: {
         enabled: true
        },
		// Collect billing address for tax calculation
        billing_address_collection: 'required',
	})

	// Return successful response with session ID
	return {
		statusCode: 200,
		body: JSON.stringify({ id: session.id }),
	}
	} catch (error) {
	// Log and return error if checkout session creation fails
	console.error('Error creating checkout session:', error)
	return {
		statusCode: 500,
		body: JSON.stringify({ error: 'Internal Server Error' }),
	}
	}
  }
