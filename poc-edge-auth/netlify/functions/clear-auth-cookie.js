// Clear the authentication cookie
exports.handler = async (event) => {
  // For local development, don't use Secure flag
  const isProduction = process.env.NODE_ENV === 'production';
  const cookieFlags = isProduction
    ? 'HttpOnly; Secure; SameSite=Strict'
    : 'HttpOnly; SameSite=Lax';

  return {
    statusCode: 200,
    headers: {
      // Set cookie with Max-Age=0 to delete it
      'Set-Cookie': `firebase_session=; ${cookieFlags}; Max-Age=0; Path=/`
    },
    body: JSON.stringify({ success: true, message: 'Logged out successfully' })
  };
};
