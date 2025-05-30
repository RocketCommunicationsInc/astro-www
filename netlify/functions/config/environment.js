/**
 * Astro UX Environment Configuration
 *
 * This file centralizes all environment-specific variables to simplify
 * switching between stripe development and production environments.
 *
 * Usage:
 * - For local development: Set isDevelopment = true and update reviewAppUrl
 * - For production: Set isDevelopment = false
 */

// TOGGLE THIS VALUE to switch between development and production
export const isDevelopment = false
console.log('isDevelopment:', isDevelopment)

// UPDATE THIS VALUE with your Heroku review app URL when in development mode
export const reviewAppUrl = 'https://astrouxds-ap-dev-enviro-qbexve.herokuapp.com'

// API base URLs
export const API_URLS = {
  production: 'https://astrouxds-api-196cde1c48d0.herokuapp.com',
  development: reviewAppUrl
}

// Stripe configuration
export const STRIPE_VARIABLES = {
  production: {
    publicKey: 'pk_live_51Q57PtCecnrjj3thBAsVNZ5R02YmZEg4kveWSD7ipTUEX0F7VKVdlTFT3UPHILBUskCmPnOWdCUlvuHp5LDuuGhV00X7Im0xoK',
    products: {
      'astro-toolkit-ppt': {
        stripeProductId: 'prod_RvMCdid2pZCbUf',
        stripePriceId: 'price_1R1VU2Cecnrjj3thckjd6Qv4',
        name: 'Astro Toolkit PPT'
      }
    }
  },
  development: {
    publicKey: 'pk_test_51QCk6mCX2F0Knv6wLx3fRI5bIvIKHPa4LcZS2DU0aXMyalKcSsplszWAvftDIjSs072xOs5ZHN264qMnjjHi7Ml600FWdSVdql',
    products: {
      'astro-toolkit-ppt': {
        stripeProductId: 'prod_SLdY3pRKOo37hn',
        stripePriceId: 'price_1RQwHUCX2F0Knv6wHJ8f615k',
        name: 'Astro Toolkit PPT'
      }
    }
  }
}
