// Sets HTTP-only cookie after successful authentication
// This cookie is checked by Edge Functions for route protection

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { token } = JSON.parse(event.body);

    if (!token) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Token required' })
      };
    }

    // In production, you would:
    // 1. Verify the token with Firebase Admin SDK
    // 2. Create a session cookie with longer expiration
    // For now, we'll just set the token as the session cookie

    // Determine if we're in production or local development
    const isLocal = event.headers.host?.includes('localhost') ||
                   event.headers.host?.includes('127.0.0.1');

    // Use Secure flag only in production (HTTPS)
    const cookieFlags = isLocal
      ? 'HttpOnly; SameSite=Lax'
      : 'HttpOnly; Secure; SameSite=Strict';

    return {
      statusCode: 200,
      headers: {
        'Set-Cookie': `firebase_session=${token}; ${cookieFlags}; Max-Age=${60 * 60}; Path=/`
      },
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    console.error('Error setting auth cookie:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
