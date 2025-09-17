// Firebase authentication helper functions
import { auth } from './firebase.js'
import {
  signInWithEmailAndPassword as firebaseSignIn,
  createUserWithEmailAndPassword as firebaseSignUp,
  signOut as firebaseSignOut,
  onAuthStateChanged as firebaseOnAuthStateChanged
} from 'firebase/auth'

// Export configured auth functions
export const signInWithEmailAndPassword = (email, password) =>
  firebaseSignIn(auth, email, password)

export const createUserWithEmailAndPassword = (email, password) =>
  firebaseSignUp(auth, email, password)

export const signOut = () =>
  firebaseSignOut(auth)

export const onAuthStateChanged = (callback) =>
  firebaseOnAuthStateChanged(auth, callback)

// Export auth instance for direct use if needed
export { auth }