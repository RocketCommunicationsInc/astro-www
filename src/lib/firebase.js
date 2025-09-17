// Core Firebase SDKs we use in the browser
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// IMPORTANT: These PUBLIC_ env values are safe to expose to the browser.
// They identify your Firebase project but are NOT secrets.
// Make sure anything sensitive stays on the server and is not imported here.
const firebaseConfig = {
  apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
  authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID,
  appId: import.meta.env.PUBLIC_FIREBASE_APP_ID
}

// Initialize the Firebase app instance (one per page/app)
const app = initializeApp(firebaseConfig)

// Auth service handles sign-in, sign-out, and user sessions (client-side)
export const auth = getAuth(app)

// Firestore is Firebase's NoSQL database. We'll use this later for profiles, etc.
export const db = getFirestore(app)
