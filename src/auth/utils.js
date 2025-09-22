/**
 * Authentication Utilities
 * Helper functions for auth operations and validation
 */

import { authConfig } from './config.js'

/**
 * Validate redirect URL to prevent open redirect attacks
 * @param {string} url - The URL to validate
 * @returns {string} Safe redirect URL
 */
export function safeRedirect(url) {
  if (typeof url !== 'string') return authConfig.redirectAfterLogin

  // Remove any leading/trailing whitespace
  const cleanUrl = url.trim()

  // Disallow empty strings
  if (!cleanUrl) return authConfig.redirectAfterLogin

  // Disallow protocols and protocol-relative URLs
  if (/^([a-z]+:)?\/\//i.test(cleanUrl)) {
    return authConfig.redirectAfterLogin
  }

  // Must start with a single slash or be a relative path
  if (!cleanUrl.startsWith('/') && !cleanUrl.startsWith('./')) {
    return authConfig.redirectAfterLogin
  }

  // Disallow double slashes at start (protocol-relative)
  if (cleanUrl.startsWith('//')) {
    return authConfig.redirectAfterLogin
  }

  return cleanUrl
}

/**
 * Get redirect URL from various sources
 * @param {URLSearchParams|URL|string} source - Source to extract redirect from
 * @returns {string} Safe redirect URL
 */
export function getRedirectUrl(source) {
  let redirectParam = null

  if (source instanceof URLSearchParams) {
    redirectParam = source.get('redirect')
  } else if (source instanceof URL) {
    redirectParam = source.searchParams.get('redirect')
  } else if (typeof source === 'string') {
    try {
      const url = new URL(source, window.location.origin)
      redirectParam = url.searchParams.get('redirect')
    } catch {
      // If parsing fails, treat as direct URL
      redirectParam = source
    }
  }

  return safeRedirect(redirectParam)
}

/**
 * Create login URL with redirect parameter
 * @param {string} currentPath - Current path to redirect back to
 * @returns {string} Login URL with redirect parameter
 */
export function createLoginUrl(currentPath) {
  const loginPath = '/auth/login/'

  if (!currentPath || currentPath === '/auth/login/' || currentPath === '/auth/login') {
    return loginPath
  }

  const url = new URL(loginPath, window.location.origin)
  url.searchParams.set('redirect', currentPath)
  return url.pathname + url.search
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if email is valid
 */
export function isValidEmail(email) {
  if (typeof email !== 'string') return false

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.trim())
}

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {Object} Validation result with isValid and errors
 */
export function validatePassword(password) {
  const errors = []

  if (typeof password !== 'string') {
    return { isValid: false, errors: ['Password must be a string'] }
  }

  if (password.length < 6) {
    errors.push('Password must be at least 6 characters long')
  }

  if (password.length > 128) {
    errors.push('Password must be less than 128 characters')
  }

  // Check for at least one letter and one number (recommended)
  if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(password)) {
    errors.push('Password should contain both letters and numbers')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

/**
 * Format user display name from user object
 * @param {Object} user - Firebase user object
 * @returns {string} Formatted display name
 */
export function formatDisplayName(user) {
  if (!user) return 'User'

  if (user.displayName) return user.displayName

  if (user.email) {
    // Return email username part
    return user.email.split('@')[0]
  }

  return 'User'
}

/**
 * Check if user has specific role or permission
 * @param {Object} user - Firebase user object
 * @param {string} role - Role to check for
 * @returns {boolean} True if user has role
 */
export function hasRole(user, role) {
  if (!user || !role) return false

  // Check custom claims
  if (user.customClaims && user.customClaims[role] === true) {
    return true
  }

  // For now, all authenticated users have 'user' role
  if (role === 'user') return true

  return false
}

/**
 * Debounce function for reducing API calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Create a promise that resolves after a delay
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise} Promise that resolves after delay
 */
export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Local storage helpers with error handling
 */
export const storage = {
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.warn('Failed to read from localStorage:', error)
      return defaultValue
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch (error) {
      console.warn('Failed to write to localStorage:', error)
      return false
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key)
      return true
    } catch (error) {
      console.warn('Failed to remove from localStorage:', error)
      return false
    }
  }
}

/**
 * Error boundary helper for async operations
 * @param {Function} fn - Async function to wrap
 * @param {string} context - Context for error logging
 * @returns {Function} Wrapped function with error handling
 */
export function withErrorBoundary(fn, context = 'operation') {
  return async (...args) => {
    try {
      return await fn(...args)
    } catch (error) {
      console.error(`Error in ${context}:`, error)
      throw error
    }
  }
}