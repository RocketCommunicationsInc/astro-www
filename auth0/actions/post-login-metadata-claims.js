/**
 * Auth0 Post-Login Action: Add Custom Claims from User Metadata
 *
 * This Action runs on every login and copies user_metadata fields into
 * namespaced custom claims in the ID token and access token, making them
 * available to the client application.
 *
 * Fields exposed:
 * - company (from user_metadata.company)
 * - first_name (from user_metadata.first_name or given_name)
 * - last_name (from user_metadata.last_name or family_name)
 *
 * DEPLOYMENT INSTRUCTIONS:
 * ========================
 *
 * 1. Go to Auth0 Dashboard → Actions → Library → Create Action
 * 2. Choose "Build from scratch"
 * 3. Name: "Add Metadata Claims"
 * 4. Trigger: "Login / Post Login"
 * 5. Runtime: Node 18 (or latest available)
 * 6. Copy and paste this code into the editor
 * 7. Click "Deploy"
 *
 * 8. Go to Actions → triggers → Login
 * 9. Click "Custom" tab on the right
 * 10. Drag "Add Metadata Claims" action into the flow (between "Start" and "Complete")
 * 11. Click "Apply" to save the flow
 *
 */

exports.onExecutePostLogin = async (event, api) => {
  // Read user metadata
  const userMetadata = event.user.user_metadata || {}

  // Extract values with fallbacks
  const company = userMetadata.company || ''
  const firstName = userMetadata.first_name || event.user.given_name || ''
  const lastName = userMetadata.last_name || event.user.family_name || ''

  // Define your namespace (update this to your domain)
  const namespace = 'https://astrouxds.com/'

  // Set custom claims in ID token (visible to client)
  if (company) {
    api.idToken.setCustomClaim(`${namespace}company`, company)
    api.accessToken.setCustomClaim(`${namespace}company`, company)
  }

  if (firstName) {
    api.idToken.setCustomClaim(`${namespace}first_name`, firstName)
    api.accessToken.setCustomClaim(`${namespace}first_name`, firstName)
  }

  if (lastName) {
    api.idToken.setCustomClaim(`${namespace}last_name`, lastName)
    api.accessToken.setCustomClaim(`${namespace}last_name`, lastName)
  }
}
