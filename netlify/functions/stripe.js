/**
 * Stripe Checkout Function
 * This Netlify serverless function creates Stripe checkout sessions for
 * digital product purchases with automatic tax calculation.
 */

// Import environment configuration
import { STRIPE_VARIABLES, isDevelopment } from './config/environment'

// Initialize Stripe using the appropriate secret key based on environment
const stripeSecretKey = isDevelopment ? process.env.STRIPE_SANDBOX_SECRET : process.env.STRIPE_SECRET
const stripe = require('stripe')(stripeSecretKey)
const baseUrl = process.env.BASE_URL || 'astrouxds.com' // Base URL for success and cancel redirects

/**
 * Product catalog with Stripe-specific IDs
 * Automatically switches between development and production based on isDevelopment flag
 * Each product contains:
 * - stripeProductId: ID of the product in Stripe dashboard
 * - stripePriceIds: object with key/value pairs of IDs of the price ids in Stripe dashboard with their pricing licenses
 * - name: Display name of the product
 */
const PRODUCTS = STRIPE_VARIABLES[isDevelopment ? 'development' : 'production'].products

  /**
 * Main function handler for the Netlify serverless function
 * Creates a Stripe checkout session based on selected products
 *
 * @param {Object} event - The Netlify function event object
 * @returns {Object} Response with session ID or error message
 */
  export async function handler(event) {
	try {
	// Parse the incoming request body
	const requestBody = JSON.parse(event.body)

	const productCode = Object.keys(requestBody)[0]
    const license = requestBody[productCode]

	// Validate that there are selected products
	if (!productCode || !license) {
		return {
		statusCode: 400,
			body: JSON.stringify({ error: 'No products selected' }),
		}
	}

	// Get the product
    const product = PRODUCTS[productCode]
    if (!product) {
      throw new Error(`Invalid product code: ${productCode}`)
    }

	const priceId = product.stripePriceIds[license]
	if (!priceId) {
      throw new Error(`Invalid license: ${license} for product: ${productCode}`)
    }

	// eslint-disable-next-line camelcase
	const line_items = [ {
      price: priceId,
      quantity: 1,
    } ]

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
		metadata: {
			productCode,
			license,
			priceId
      }
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
