// /**
//  * Astro UX Environment Configuration
//  *
//  * This file centralizes all environment-specific variables to simplify
//  * switching between stripe development and production environments.
//  *
//  * Usage:
//  * - For local development: Set isDevelopment = true and update reviewAppUrl
//  * - For production: Set isDevelopment = false
//  *
//  * Additonal Changes:
//  * - Update the stripe.js file
//  */

// /**
//  * Represents a single product with pricing tiers
//  */
// export interface ProductConfig {
//   stripeProductId: string;
//   stripePriceIds: Record<string, string>;
//   name: string;
// }

// /**
//  * Represents the Stripe configuration for a single environment
//  */
// export interface StripeConfig {
//   publicKey: string;
//   products: Record<string, ProductConfig>;
// }

// /**
//  * API URLs for different environments
//  */
// export interface ApiUrls {
//   production: string;
//   development: string;
// }

// /**
//  * Environment type: either 'production' or 'development'
//  */
// export type Environment = 'production' | 'development';

// // TOGGLE THIS VALUE to switch between development and production
// export const isDevelopment: boolean = false // If merging to main, set to false; if working on a feature branch, set to true

// // UPDATE THIS VALUE with your Heroku review app URL when in development mode
// export const reviewAppUrl: string = 'https://astrouxds-ap-dev-enviro-szmhil.herokuapp.com/'

// // API base URLs
// export const API_URLS: ApiUrls = {
//   production: 'https://astrouxds-api-196cde1c48d0.herokuapp.com',
//   development: reviewAppUrl
// }

// // Stripe configuration
// export const STRIPE_VARIABLES: Record<Environment, StripeConfig> = {
//   production: {
//     publicKey: 'pk_live_51Q57PtCecnrjj3thBAsVNZ5R02YmZEg4kveWSD7ipTUEX0F7VKVdlTFT3UPHILBUskCmPnOWdCUlvuHp5LDuuGhV00X7Im0xoK',
//     products: {
//       'astro-toolkit-ppt': {
//         stripeProductId: 'prod_RvMCdid2pZCbUf',
//         stripePriceIds: {
//           'individual': 'price_1R1VU2Cecnrjj3thckjd6Qv4',
// 					'team': 'price_1SUubOCecnrjj3thzmH4xK8G',
// 					'project': 'price_1SUucHCecnrjj3th3izyyL2M',
//         },
//         name: 'Astro Toolkit PPT'
//       }
//     }
//   },
//   development: {
//     publicKey: 'pk_test_51QCk6mCX2F0Knv6wLx3fRI5bIvIKHPa4LcZS2DU0aXMyalKcSsplszWAvftDIjSs072xOs5ZHN264qMnjjHi7Ml600FWdSVdql',
//     products: {
//       'astro-toolkit-ppt': {
//         stripeProductId: 'prod_SLdY3pRKOo37hn',
//         stripePriceIds: {
// 					'individual': 'price_1RQwHUCX2F0Knv6wHJ8f615k',
// 					'team': 'price_1SUPgTCX2F0Knv6w3Gkbu2Mj',
// 					'project': 'price_1SUPhxCX2F0Knv6wikxBiyCK'
// 				},
//         name: 'Astro Toolkit PPT'
//       }
//     }
//   }
// }

/**
 * @typedef {Object} ProductConfig
 * @property {string} stripeProductId
 * @property {Object.<string, string>} stripePriceIds
 * @property {Object.<string, string>} [tierDescriptions]
 * @property {string} name
 */

/**
 * @typedef {Object} StripeConfig
 * @property {string} publicKey
 * @property {Object.<string, ProductConfig>} products
 */

/**
 * @typedef {Object} ApiUrls
 * @property {string} production
 * @property {string} development
 */

const isDevelopment = false
const reviewAppUrl = 'https://astrouxds-ap-dev-enviro-szmhil.herokuapp.com/'

const API_URLS = {
  production: 'https://astrouxds-api-196cde1c48d0.herokuapp.com',
  development: reviewAppUrl
}

const STRIPE_VARIABLES = {
  development: {
    publicKey: 'pk_test_51MIsfsCX2F0Knv6wJXtNKJI5mf5a4h9rkVb1TLm7rVeZCdM7MvHmwoHyQd5AqsQZRk48g0t3hYQHUbTFp4XD9FgN00mjvHNO9O',
    products: {
      'astro-toolkit-ppt': {
        stripeProductId: 'prod_SLdY3pRKOo37hn',
        stripePriceIds: {
          'individual': 'price_1RQwHUCX2F0Knv6wHJ8f615k',
          'team': 'price_1SUPgTCX2F0Knv6w3Gkbu2Mj',
          'project': 'price_1SUPhxCX2F0Knv6wikxBiyCK'
        },
        tierDescriptions: {
          'individual': 'Single user license',
          'team': 'Team license for up to 10 users',
          'project': 'Project-wide license'
        },
        name: 'Astro Toolkit PPT'
      }
    }
  },
  production: {
    publicKey: 'pk_live_51MIsfsCX2F0Knv6wdRx3v6YP9aT45lQVZXiHkFfD9VQrYe0u8MK4Rqn9wgKa8VH5zMXvgJDc1234567890',
    products: {
      'astro-toolkit-ppt': {
        stripeProductId: 'prod_PRODUCTION_ID',
        stripePriceIds: {
          'individual': 'price_PROD_INDIVIDUAL',
          'team': 'price_PROD_TEAM',
          'project': 'price_PROD_PROJECT'
        },
        tierDescriptions: {
          'individual': 'Single user license',
          'team': 'Team license for up to 10 users',
          'project': 'Project-wide license'
        },
        name: 'Astro Toolkit PPT'
      }
    }
  }
}

module.exports = {
  STRIPE_VARIABLES,
  isDevelopment,
  reviewAppUrl,
  API_URLS
}
