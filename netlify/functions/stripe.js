const stripe = require('stripe')(process.env.STRIPE_SECRET)

exports.handler = async (event, context) => {
	console.log('running session creation')
  const session = await stripe.checkout.sessions.create({
    payment_method_types: [ 'card' ],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Flight Dynamics Source Code',
          },
          unit_amount: 1,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'https://serverless-payments.netlify.app/success',
    cancel_url: 'https://serverless-payments.netlify.app/cancel',
  })
  return {
    statusCode: 200,
    body: JSON.stringify({
      id: session.id,
    }),
  }
}
