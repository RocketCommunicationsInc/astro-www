// Edge Function for authentication checking
// Protects routes by verifying Firebase session cookies

export default async function handler(request, context) {
	const url = new URL(request.url);

	console.log(`[Edge Function] Intercepted request for: ${url.pathname}`);

	// Check for session cookie
	const sessionCookie = context.cookies.get('firebase_session');

	if (!sessionCookie) {
		console.log(
			'[Edge Function] No session cookie found, redirecting to login'
		);
		// No cookie = not authenticated, redirect to login
		return Response.redirect(new URL('/auth/login', request.url), 302);
	}

	// In production, we would:
	// 1. Verify the session token with Firebase Admin SDK
	// 2. Check token expiration
	// 3. Validate user permissions

	// For now, we just check if cookie exists
	console.log('[Edge Function] Session cookie found, allowing access');

	// User is authenticated, continue to the protected page
	return context.next();
}
