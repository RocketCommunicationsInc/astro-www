// Edge Function to serve different content based on authentication
// Serves gated content to authenticated users, public content to others

export default async function handler(request, context) {
	const url = new URL(request.url);

	console.log(`[Content Gate] Checking ${url.pathname}`);

	// Check for session cookie
	const sessionCookie = context.cookies.get('firebase_session');

	if (sessionCookie) {
		console.log('[Content Gate] User authenticated - serving gated content');

		// User is authenticated - serve the gated version
		// Rewrite the URL to serve from /gated/ directory
		const gatedUrl = new URL(request.url);
		gatedUrl.pathname = `/gated${url.pathname}`;

		console.log(`[Content Gate] Rewriting to: ${gatedUrl.pathname}`);

		// Use context.rewrite to internally serve the gated content
		// This serves the gated content without changing the URL
		return context.rewrite(gatedUrl.pathname);
	} else {
		console.log(
			'[Content Gate] User not authenticated - serving public content'
		);
		// User is not authenticated - serve the normal public version
		return context.next();
	}
}
