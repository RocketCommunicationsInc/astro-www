// Clear the authentication cookie for logout
export const handler = async (event) => {
	// Determine if we're in production or local development
	const isLocal =
		event.headers.host?.includes('localhost') ||
		event.headers.host?.includes('127.0.0.1');

	const cookieFlags = isLocal
		? 'HttpOnly; SameSite=Lax'
		: 'HttpOnly; Secure; SameSite=Strict';

	return {
		statusCode: 200,
		headers: {
			// Set cookie with Max-Age=0 to delete it
			'Set-Cookie': `firebase_session=; ${cookieFlags}; Max-Age=0; Path=/`,
		},
		body: JSON.stringify({ success: true, message: 'Logged out successfully' }),
	};
};
