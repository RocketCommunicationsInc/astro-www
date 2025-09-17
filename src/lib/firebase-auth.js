// Firebase auth helpers: thin wrappers around Firebase SDK functions
// Why this file? Keeps pages simple and centralizes our Firebase usage in one place.
import { auth } from './firebase.js'
import {
  signInWithEmailAndPassword as firebaseSignIn,
  createUserWithEmailAndPassword as firebaseSignUp,
  signOut as firebaseSignOut,
  onAuthStateChanged as firebaseOnAuthStateChanged
} from 'firebase/auth'

/** Sign in a user with email/password using the shared auth instance */
export const signInWithEmailAndPassword = (email, password) =>
  firebaseSignIn(auth, email, password)

/** Create a new user with email/password using the shared auth instance */
export const createUserWithEmailAndPassword = (email, password) =>
  firebaseSignUp(auth, email, password)

/** Sign out the currently signed-in user */
export const signOut = () =>
  firebaseSignOut(auth)

/** Subscribe to auth state changes (fires on sign-in, sign-out, and initial load) */
export const onAuthStateChanged = (callback) =>
  firebaseOnAuthStateChanged(auth, callback)

// Export the raw auth instance if you need something advanced later.
// Prefer adding a wrapper above to keep usage consistent across the app.
export { auth }
