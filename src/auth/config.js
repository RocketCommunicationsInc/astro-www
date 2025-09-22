/**
 * Firebase Configuration
 * Clean, environment-aware Firebase config for Astro UXDS
 */

export const firebaseConfig = {
  apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
  authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID,
  appId: import.meta.env.PUBLIC_FIREBASE_APP_ID
}

export const authConfig = {
  // Redirect destinations
  redirectAfterLogin: '/auth/dashboard/',
  redirectAfterLogout: '/',

  // Route protection patterns
  protectedRoutes: [
    '/auth/dashboard/',
    '/auth/profile/',
    '/components/**'
  ],

  // Always public routes (no auth required)
  publicRoutes: [
    '/',
    '/auth/login/',
    '/auth/signup/',
    '/patterns/**',
    '/foundations/**'
  ],

  // UI configuration
  ui: {
    showLoadingStates: true,
    loadingTimeout: 5000, // ms
    enableRedirectLogging: false
  }
}

/**
 * Validates that all required Firebase config values are present
 * @returns {boolean} True if config is valid
 */
export function validateFirebaseConfig() {
  const required = ['apiKey', 'authDomain', 'projectId', 'appId']
  const missing = required.filter(key => !firebaseConfig[key])

  if (missing.length > 0) {
    console.error('Missing Firebase config:', missing)
    return false
  }

  return true
}

/**
 * Check if a path is protected based on our route patterns
 * @param {string} path - The URL path to check
 * @returns {boolean} True if the path requires authentication
 */
export function isProtectedRoute(path) {
  // Check if explicitly public
  const isPublic = authConfig.publicRoutes.some(pattern => {
    if (pattern.endsWith('/**')) {
      const prefix = pattern.slice(0, -3)
      return path.startsWith(prefix)
    }
    return path === pattern || path === pattern + '/'
  })

  if (isPublic) return false

  // Check if explicitly protected
  const isProtected = authConfig.protectedRoutes.some(pattern => {
    if (pattern.endsWith('/**')) {
      const prefix = pattern.slice(0, -3)
      return path.startsWith(prefix)
    }
    return path === pattern || path === pattern + '/'
  })

  return isProtected
}