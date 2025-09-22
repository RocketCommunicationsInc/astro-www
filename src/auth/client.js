/**
 * Firebase Authentication Client
 * Clean client-side Firebase wrapper with proper error handling and state management
 */

import { initializeApp } from 'firebase/app'
import {
  getAuth,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth'

import { firebaseConfig, validateFirebaseConfig } from './config.js'

/**
 * Main authentication client class
 * Handles all Firebase auth operations with proper error handling
 */
class AuthClient {
  constructor(config) {
    this.app = null
    this.auth = null
    this.user = null
    this.initialized = false
    this.listeners = new Set()
    this.config = config

    this.init()
  }

  /**
   * Initialize Firebase app and auth
   */
  init() {
    try {
      if (!validateFirebaseConfig()) {
        throw new Error('Invalid Firebase configuration')
      }

      this.app = initializeApp(this.config)
      this.auth = getAuth(this.app)
      this.initialized = true

      // Set up initial auth state listener
      this.setupAuthStateListener()

    } catch (error) {
      console.error('Failed to initialize Firebase:', error)
      this.initialized = false
    }
  }

  /**
   * Set up the auth state change listener
   */
  setupAuthStateListener() {
    if (!this.auth) return

    firebaseOnAuthStateChanged(this.auth, (user) => {
      this.user = user

      // Notify all registered listeners
      this.listeners.forEach(callback => {
        try {
          callback(user)
        } catch (error) {
          console.error('Error in auth state listener:', error)
        }
      })
    })
  }

  /**
   * Subscribe to auth state changes
   * @param {Function} callback - Called when auth state changes
   * @returns {Function} Unsubscribe function
   */
  onAuthStateChanged(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Callback must be a function')
    }

    this.listeners.add(callback)

    // Call immediately with current user if available
    if (this.user !== null) {
      try {
        callback(this.user)
      } catch (error) {
        console.error('Error in auth state callback:', error)
      }
    }

    // Return unsubscribe function
    return () => {
      this.listeners.delete(callback)
    }
  }

  /**
   * Sign in with email and password
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<UserCredential>}
   */
  async signIn(email, password) {
    if (!this.initialized) {
      throw new Error('Auth client not initialized')
    }

    if (!email || !password) {
      throw new Error('Email and password are required')
    }

    try {
      const result = await signInWithEmailAndPassword(this.auth, email, password)
      return result
    } catch (error) {
      throw this.handleAuthError(error)
    }
  }

  /**
   * Create new account with email and password
   * @param {string} email - User email
   * @param {string} password - User password
   * @param {Object} options - Additional options (displayName, etc.)
   * @returns {Promise<UserCredential>}
   */
  async signUp(email, password, options = {}) {
    if (!this.initialized) {
      throw new Error('Auth client not initialized')
    }

    if (!email || !password) {
      throw new Error('Email and password are required')
    }

    try {
      const result = await createUserWithEmailAndPassword(this.auth, email, password)

      // Update profile with display name if provided
      if (options.displayName && result.user) {
        await updateProfile(result.user, {
          displayName: options.displayName
        })
      }

      return result
    } catch (error) {
      throw this.handleAuthError(error)
    }
  }

  /**
   * Sign out current user
   * @returns {Promise<void>}
   */
  async signOut() {
    if (!this.initialized) {
      throw new Error('Auth client not initialized')
    }

    try {
      await firebaseSignOut(this.auth)
    } catch (error) {
      throw this.handleAuthError(error)
    }
  }

  /**
   * Send password reset email
   * @param {string} email - User email
   * @returns {Promise<void>}
   */
  async resetPassword(email) {
    if (!this.initialized) {
      throw new Error('Auth client not initialized')
    }

    if (!email) {
      throw new Error('Email is required')
    }

    try {
      await sendPasswordResetEmail(this.auth, email)
    } catch (error) {
      throw this.handleAuthError(error)
    }
  }

  /**
   * Get current user
   * @returns {User|null}
   */
  getCurrentUser() {
    return this.auth?.currentUser || null
  }

  /**
   * Check if user is signed in
   * @returns {boolean}
   */
  isSignedIn() {
    return !!this.getCurrentUser()
  }

  /**
   * Handle Firebase auth errors and convert to user-friendly messages
   * @param {Error} error - Firebase error
   * @returns {Error} Formatted error
   */
  handleAuthError(error) {
    const errorMessages = {
      'auth/user-not-found': 'No account found with this email address.',
      'auth/wrong-password': 'Incorrect password.',
      'auth/email-already-in-use': 'An account with this email already exists.',
      'auth/weak-password': 'Password should be at least 6 characters.',
      'auth/invalid-email': 'Please enter a valid email address.',
      'auth/user-disabled': 'This account has been disabled.',
      'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
      'auth/network-request-failed': 'Network error. Please check your connection.',
      'auth/popup-closed-by-user': 'Sign-in was cancelled.',
      'auth/cancelled-popup-request': 'Sign-in was cancelled.',
      'auth/popup-blocked': 'Popup was blocked by the browser.'
    }

    const message = errorMessages[error.code] || 'An error occurred. Please try again.'
    const formattedError = new Error(message)
    formattedError.code = error.code
    formattedError.originalError = error

    return formattedError
  }

  /**
   * Get auth instance for advanced usage
   * @returns {Auth|null}
   */
  getAuth() {
    return this.auth
  }

  /**
   * Check if client is properly initialized
   * @returns {boolean}
   */
  isInitialized() {
    return this.initialized
  }
}

// Export singleton instance
export const authClient = new AuthClient(firebaseConfig)

// Export class for testing
export { AuthClient }

// Convenience exports for common operations
export const {
  signIn,
  signUp,
  signOut,
  resetPassword,
  getCurrentUser,
  isSignedIn
} = authClient

// Export onAuthStateChanged separately to avoid duplication
export const onAuthStateChanged = authClient.onAuthStateChanged.bind(authClient)