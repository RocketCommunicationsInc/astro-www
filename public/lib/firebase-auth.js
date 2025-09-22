// Firebase auth helpers for client-side use
// This is a static asset that imports Firebase from CDN and provides auth utilities

// Import Firebase from CDN (using specific version for consistency)
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js'
import {
  getAuth,
  signInWithEmailAndPassword as firebaseSignIn,
  createUserWithEmailAndPassword as firebaseSignUp,
  signOut as firebaseSignOut,
  onAuthStateChanged as firebaseOnAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js'

// Firebase configuration will be injected by pages that need it
let app = null
let auth = null

// Initialize Firebase if not already done
function ensureFirebaseInitialized() {
  if (!app) {
    // Try to get config from global window object (set by pages)
    const config = window.firebaseConfig
    if (!config) {
      throw new Error('Firebase config not found. Make sure to set window.firebaseConfig before importing this module.')
    }

    app = initializeApp(config)
    auth = getAuth(app)
  }
  return auth
}

// Export auth helper functions that initialize Firebase on first use
export const signInWithEmailAndPassword = (email, password) => {
  const authInstance = ensureFirebaseInitialized()
  return firebaseSignIn(authInstance, email, password)
}

export const createUserWithEmailAndPassword = (email, password) => {
  const authInstance = ensureFirebaseInitialized()
  return firebaseSignUp(authInstance, email, password)
}

export const signOut = () => {
  const authInstance = ensureFirebaseInitialized()
  return firebaseSignOut(authInstance)
}

export const onAuthStateChanged = (callback) => {
  const authInstance = ensureFirebaseInitialized()
  return firebaseOnAuthStateChanged(authInstance, callback)
}

// Export auth instance getter
export const getAuthInstance = () => {
  return ensureFirebaseInitialized()
}