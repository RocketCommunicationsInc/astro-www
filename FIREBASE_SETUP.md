# Firebase Setup Guide for Cosmos-Auth Project

## Overview
Setting up Firebase services for the Astro UXDS website authentication system.

**Project Name**: cosmos-auth
**Project ID**: cosmos-auth

## Required Environment Variables

```env
PUBLIC_FIREBASE_API_KEY=your_web_api_key_here
PUBLIC_FIREBASE_AUTH_DOMAIN=cosmos-auth.firebaseapp.com
PUBLIC_FIREBASE_PROJECT_ID=cosmos-auth
PUBLIC_FIREBASE_STORAGE_BUCKET=cosmos-auth.appspot.com
PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
PUBLIC_FIREBASE_APP_ID=your_app_id_here
PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id_here
```

## Setup Steps

### ✅ 1. Web API Key
- **Location**: Firebase Console → Project Settings → General tab
- **Value**: Copy the "Web API Key"
- **Status**: Available immediately

### 🔄 2. Storage Bucket (Firebase Storage)
- **Location**: Firebase Console → Storage (left sidebar)
- **Steps**:
  1. Click **"Get started"**
  2. Choose security rules (start with test mode)
  3. Select location (same region as project)
- **Result**: `cosmos-auth.appspot.com`
- **Note**: ⚠️ May require storage plan upgrade

### 🔄 3. Messaging Sender ID (Firebase Cloud Messaging)
- **Location**: Firebase Console → Project Settings → Cloud Messaging tab
- **Steps**:
  1. Navigate to Cloud Messaging tab
  2. Copy the "Sender ID"
  3. If not showing, enable Cloud Messaging API:
     - Go to Google Cloud Console → APIs & Services → Library
     - Search "Firebase Cloud Messaging API" → Enable

### 🔄 4. App ID (Web App Configuration)
- **Location**: Firebase Console → Project Settings → General tab
- **Steps**:
  1. Scroll to "Your apps" section
  2. Click **"Add app"** → Web icon (`</>`)
  3. Nickname: "Astro UXDS Website"
  4. **Don't** check Firebase Hosting (using Netlify)
  5. Copy App ID from config

### 🔄 5. Measurement ID (Google Analytics)
- **Location**: Firebase Console → Project Settings → Integrations tab
- **Steps**:
  1. Find Google Analytics → Click **"Link"**
  2. Create new Analytics account or link existing
  3. Copy Measurement ID from web app config

## Additional Setup Required

### Authentication Methods
- **Location**: Firebase Console → Authentication → Sign-in method
- **Enable**: Email/Password authentication

### Firestore Database
- **Location**: Firebase Console → Firestore Database
- **Steps**:
  1. Create database
  2. Start in test mode
  3. Choose location (same region)

### Security Rules (After Initial Setup)
```javascript
// Firestore Rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Notes
- All `PUBLIC_` prefixed variables are safe for client-side use
- Keep `.env` file in `.gitignore`
- Test with Firebase emulators in development
- Some services may require billing account upgrade

## Current Status
- [ ] Storage Bucket - Pending storage plan upgrade
- [ ] Messaging Sender ID
- [ ] App ID
- [ ] Measurement ID
- [x] API Key
- [x] Auth Domain
- [x] Project ID
