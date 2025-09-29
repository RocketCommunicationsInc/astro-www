// Simplified version for POC - sets the Firebase token as HTTP-only cookie
// In production, you would verify the token with Firebase Admin SDK

exports.handler = async (event) => {
	if (event.httpMethod !== 'POST') {
		return { statusCode: 405, body: 'Method Not Allowed' };
	}

	try {
		const { token } = JSON.parse(event.body);

		if (!token) {
			return {
				statusCode: 400,
				body: JSON.stringify({ error: 'Token required' }),
			};
		}

		// In production, you would:
		// 1. Verify the token with Firebase Admin SDK
		// 2. Create a session cookie with longer expiration
		// For POC, we'll just set the token as the session cookie

		// For local development, don't use Secure flag (only works on HTTPS)
		const isProduction = process.env.NODE_ENV === 'production';
		const cookieFlags = isProduction
			? 'HttpOnly; Secure; SameSite=Strict'
			: 'HttpOnly; SameSite=Lax'; // Lax for local development

		return {
			statusCode: 200,
			headers: {
				'Set-Cookie': `firebase_session=${token}; ${cookieFlags}; Max-Age=${
					60 * 60
				}; Path=/`,
			},
			body: JSON.stringify({ success: true }),
		};
	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify({ error: 'Internal server error' }),
		};
	}
};
