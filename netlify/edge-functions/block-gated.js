// Edge Function to block direct access to /gated/* paths
// These should only be served internally by the content-gate function

export default async function handler(request, context) {
  const url = new URL(request.url);

  console.log(`[Block Gated] Blocking direct access to: ${url.pathname}`);

  // Return the site's normal 404 page to avoid revealing this is a special path
  // In production, update this to match your site's 404 behavior
  return context.next(); // Falls through to normal 404
}
