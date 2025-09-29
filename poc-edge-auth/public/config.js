// Firebase configuration
// These values should be set in your .env file
window.firebaseConfig = {
    apiKey: process.env.PUBLIC_FIREBASE_API_KEY || "YOUR_API_KEY",
    authDomain: process.env.PUBLIC_FIREBASE_AUTH_DOMAIN || "YOUR_AUTH_DOMAIN",
    projectId: process.env.PUBLIC_FIREBASE_PROJECT_ID || "YOUR_PROJECT_ID",
    appId: process.env.PUBLIC_FIREBASE_APP_ID || "YOUR_APP_ID"
};
