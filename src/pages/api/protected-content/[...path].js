/**
 * Protected Content API Endpoint
 * Serves content only to authenticated users - keeps it out of HTML source
 */

export async function GET({ request, params }) {
  try {
    // Extract auth token from request
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(JSON.stringify({
        error: 'Authentication required',
        code: 'AUTH_REQUIRED'
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const token = authHeader.replace('Bearer ', '')

    // Verify the Firebase token (you'll need Firebase Admin SDK for production)
    // For now, we'll do a basic validation
    if (!token || token.length < 10) {
      return new Response(JSON.stringify({
        error: 'Invalid token',
        code: 'INVALID_TOKEN'
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Get the content path from params
    const contentPath = params.path || 'default'

    // Load the protected content based on the path
    const content = await loadProtectedContent(contentPath)

    if (!content) {
      return new Response(JSON.stringify({
        error: 'Content not found',
        code: 'NOT_FOUND'
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Return the protected content
    return new Response(JSON.stringify({
      html: content.html,
      metadata: {
        title: content.title,
        description: content.description,
        lastModified: content.lastModified,
        contentType: content.type
      }
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'private, no-cache' // Don't cache protected content
      }
    })
  } catch (error) {
    console.error('Error serving protected content:', error)

    return new Response(JSON.stringify({
      error: 'Internal server error',
      code: 'SERVER_ERROR'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

/**
 * Load protected content based on path
 * This is where you'd fetch from your CMS, database, or file system
 */
async function loadProtectedContent(contentPath) {
  // Example content mapping - replace with your actual content source
  const contentMap = {
    'dashboard-overview': {
      title: 'Account Dashboard',
      description: 'User dashboard with account management and usage analytics',
      type: 'user-dashboard',
      html: `
        <main class="page" id="content">
          <div class="page-header">
            <h1>Account Dashboard</h1>
            <p>Manage your account and track your usage</p>
          </div>

          <div class="page-content">
            <div class="dashboard-grid">
              <section class="profile-section">
                <h2>Profile</h2>
                <div id="profile-info" class="profile-info">
                  <p>Loading user information...</p>
                </div>
                <button class="btn btn-secondary">Edit Profile</button>
              </section>

              <section class="downloads-section">
                <h2>Recent Downloads</h2>
                <div class="download-list">
                  <div class="download-item">
                    <span class="download-name">Component Library v2.1</span>
                    <span class="download-date">Downloaded 3 days ago</span>
                  </div>
                  <div class="download-item">
                    <span class="download-name">Design Tokens Export</span>
                    <span class="download-date">Downloaded 1 week ago</span>
                  </div>
                </div>
              </section>

              <section class="activity-section">
                <h2>Recent Activity</h2>
                <div class="activity-list">
                  <div class="activity-item">
                    <span class="activity-action">Viewed Premium Components</span>
                    <span class="activity-time">2 hours ago</span>
                  </div>
                  <div class="activity-item">
                    <span class="activity-action">Downloaded Design System</span>
                    <span class="activity-time">1 day ago</span>
                  </div>
                </div>
              </section>

              <section class="account-actions">
                <h2>Account Actions</h2>
                <div class="action-buttons">
                  <button class="btn btn-secondary">Account Settings</button>
                  <button id="signOutBtn" class="btn btn-outline">Sign Out</button>
                </div>
              </section>
            </div>
          </div>
        </main>

        <style>
          .dashboard-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            padding: 2rem;
          }

          section {
            background: var(--color-background-surface, white);
            padding: 1.5rem;
            border-radius: var(--radius-large, 8px);
            border: 1px solid var(--color-border, #e5e7eb);
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
          }

          h2 {
            margin-bottom: 1rem;
            color: var(--color-text-primary, #111827);
          }

          .profile-info p, .download-item, .activity-item {
            margin: 0.5rem 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .download-date, .activity-time {
            color: var(--color-text-secondary, #6b7280);
            font-size: 0.875rem;
          }

          .action-buttons {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }

          .btn {
            display: inline-block;
            padding: 0.75rem 1.5rem;
            border-radius: var(--radius-base, 6px);
            font-weight: 600;
            text-decoration: none;
            text-align: center;
            cursor: pointer;
            transition: all 0.2s;
            border: 1px solid transparent;
            background: none;
            font-size: 1rem;
          }

          .btn-secondary {
            background: var(--color-secondary, #6b7280);
            color: white;
          }

          .btn-secondary:hover {
            background: var(--color-secondary-dark, #4b5563);
          }

          .btn-outline {
            background: transparent;
            color: var(--color-text-primary, #111827);
            border: 1px solid var(--color-border, #e5e7eb);
          }

          .btn-outline:hover {
            background: var(--color-background-hover, #f3f4f6);
          }
        </style>

        <script>
          import { authClient } from '/src/auth/client.js'
          import { formatDisplayName } from '/src/auth/utils.js'

          // Initialize dashboard after content loads
          document.addEventListener('DOMContentLoaded', () => {
            const profileInfo = document.getElementById('profile-info')
            const signOutBtn = document.getElementById('signOutBtn')

            // Get current user and populate profile
            const user = authClient.getCurrentUser()
            if (user && profileInfo) {
              const displayName = formatDisplayName(user)
              const createdAt = user.metadata.creationTime
                ? new Date(user.metadata.creationTime).toLocaleDateString()
                : 'Unknown'

              profileInfo.innerHTML = \`
                <p><strong>Display Name:</strong> <span>\${displayName}</span></p>
                <p><strong>Email:</strong> <span>\${user.email}</span></p>
                <p><strong>Account Created:</strong> <span>\${createdAt}</span></p>
                <p><strong>Status:</strong> <span style="color: #10b981;">Active</span></p>
              \`
            }

            // Handle sign out
            if (signOutBtn) {
              signOutBtn.addEventListener('click', async () => {
                try {
                  await authClient.signOut()
                  window.location.href = '/'
                } catch (error) {
                  console.error('Sign out error:', error)
                  alert('Failed to sign out. Please try again.')
                }
              })
            }
          })
        </script>
      `,
      lastModified: new Date().toISOString()
    },

    'component-advanced': {
      title: 'Advanced Component Patterns',
      description: 'Premium component implementations and patterns',
      type: 'component-docs',
      html: `
        <div class="protected-content">
          <h2>Advanced Component Patterns</h2>
          <p>Learn advanced patterns for building scalable components.</p>

          <div class="pattern-example">
            <h3>Compound Component Pattern</h3>
            <pre><code>
// Premium pattern implementation
function DataTable({ children, ...props }) {
  const [state, dispatch] = useReducer(tableReducer, initialState)

  return (
    &lt;TableContext.Provider value={{ state, dispatch }}&gt;
      &lt;table {...props}&gt;{children}&lt;/table&gt;
    &lt;/TableContext.Provider&gt;
  )
}

DataTable.Header = ({ children }) =&gt; &lt;thead&gt;{children}&lt;/thead&gt;
DataTable.Row = ({ children }) =&gt; &lt;tr&gt;{children}&lt;/tr&gt;
DataTable.Cell = ({ children }) =&gt; &lt;td&gt;{children}&lt;/td&gt;
            </code></pre>
          </div>
        </div>
      `,
      lastModified: new Date().toISOString()
    },

    'default': {
      title: 'Premium Content',
      description: 'Access to premium features and documentation',
      type: 'general',
      html: `
        <div class="protected-content">
          <h2>Welcome to Premium Content</h2>
          <p>You now have access to advanced documentation, code examples, and exclusive resources.</p>

          <div class="premium-benefits">
            <h3>What's Included:</h3>
            <ul>
              <li>Advanced component implementations</li>
              <li>Exclusive design patterns</li>
              <li>Premium code examples</li>
              <li>Early access to new features</li>
            </ul>
          </div>
        </div>
      `,
      lastModified: new Date().toISOString()
    }
  }

  return contentMap[contentPath] || contentMap.default
}

/**
 * POST endpoint for content requests (alternative to GET)
 */
export async function POST({ request }) {
  try {
    const body = await request.json()
    const { contentPath, ...metadata } = body

    // Same authentication logic as GET
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(JSON.stringify({
        error: 'Authentication required'
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const content = await loadProtectedContent(contentPath)

    // Log the content request for analytics
    console.log('Protected content requested:', {
      contentPath,
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get('user-agent'),
      ...metadata
    })

    return new Response(JSON.stringify({
      html: content.html,
      metadata: content
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    return new Response(JSON.stringify({
      error: 'Server error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
