# Edge Authentication POC

This is a minimal proof of concept for the NEW_PLAN authentication approach using Netlify Edge Functions.

## Key Differences from Current Implementation

### Current (CLIENT-SIDE):
- Authentication handled entirely in browser
- Protected routes checked via React/Astro components
- User can see HTML before redirect happens
- Vulnerable to client-side bypassing

### New (EDGE-SIDE):
- Authentication checked at CDN edge before HTML is served
- Protected routes blocked at network level
- User never receives protected HTML if not authenticated
- Much more secure, cannot be bypassed

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set environment variables in `.env`:
```env
PUBLIC_FIREBASE_API_KEY=your-api-key
PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
PUBLIC_FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PROJECT_ID=your-project-id
```

3. Run locally with Netlify Dev:
```bash
netlify dev
```

## Files Structure

```
poc-edge-auth/
├── netlify/
│   ├── edge-functions/
│   │   └── auth-guard.js      # Edge function for auth checking
│   └── functions/
│       └── set-auth-cookie.js  # Sets HTTP-only cookie after login
├── public/
│   ├── index.html              # Public page
│   ├── login.html              # Login page
│   └── dashboard.html         # Protected page (requires auth)
└── src/
    └── firebase-client.js      # Client-side Firebase setup
```

## How It Works

1. User visits `/dashboard` (protected route)
2. Edge Function intercepts request BEFORE serving HTML
3. Checks for `firebase_session` cookie
4. If no valid cookie → Redirect to `/login`
5. If valid cookie → Serve dashboard HTML

This is MORE SECURE than current client-side approach because the protected content never reaches unauthorized users.