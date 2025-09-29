// Edge Function to block direct access to /gated/* paths
// These should only be served internally by the content-gate function

export default async function handler(request, context) {
	const url = new URL(request.url);

	console.log(`[Block Gated] Blocking direct access to: ${url.pathname}`);

	// Always return 404 for direct access to /gated paths
	// This content should only be served through the content-gate rewrite
	return new Response('Not Found', {
		status: 404,
		statusText: 'Not Found',
		headers: {
			'Content-Type': 'text/plain',
		},
	});
}
