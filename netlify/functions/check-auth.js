// Check if user has a valid session cookie
// Used by client-side code to verify authentication status
export const handler = async (event) => {
	// Get cookies from request
	const cookies = event.headers.cookie || '';

	console.log(
		'[Check Auth] Cookies received:',
		cookies.substring(0, 50) + '...'
	);

	// Check for firebase_session cookie
	const hasCookie = cookies.includes('firebase_session=');

	if (hasCookie) {
		// Extract the cookie value for logging (be careful not to log sensitive data in production)
		const match = cookies.match(/firebase_session=([^;]+)/);
		const cookieValue = match ? match[1] : 'unknown';
		console.log(
			'[Check Auth] Session cookie found, length:',
			cookieValue.length
		);

		return {
			statusCode: 200,
			body: JSON.stringify({
				authenticated: true,
				message: 'Session cookie found',
			}),
		};
	} else {
		console.log('[Check Auth] No session cookie found');
		return {
			statusCode: 401,
			body: JSON.stringify({
				authenticated: false,
				message: 'No session cookie',
			}),
		};
	}
};
