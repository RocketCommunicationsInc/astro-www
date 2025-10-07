import { createAuth0Client } from '@auth0/auth0-spa-js'

class Auth0Manager {
	constructor() {
		this.auth0 = null
		this.user = null
		this.isAuthenticated = false
		this.isInitialized = false
	}

	async init() {
		if (this.isInitialized) return

		try {
			// Get config from meta tags or environment
			const domain = document.querySelector('meta[name="auth0-domain"]')?.content || 'your-domain.auth0.com'
			const clientId = document.querySelector('meta[name="auth0-client-id"]')?.content || 'your-client-id'

			this.auth0 = await createAuth0Client({
				domain,
				clientId,
				authorizationParams: {
					redirect_uri: window.location.origin,
					audience: `https://${domain}/api/v2/`
				},
				cacheLocation: 'localstorage',
				// Configure for popup mode
				useRefreshTokens: true
			})

			// Check if user is authenticated
			this.isAuthenticated = await this.auth0.isAuthenticated()

			if (this.isAuthenticated) {
				this.user = await this.auth0.getUser()
			}

			// No redirect callback needed for popup mode

			this.isInitialized = true
			this.updateUI()
		} catch (error) {
			console.error('Auth0 initialization error:', error)
		}
	}

	async handleRedirectCallback() {
		try {
			await this.auth0.handleRedirectCallback()
			this.isAuthenticated = await this.auth0.isAuthenticated()

			if (this.isAuthenticated) {
				this.user = await this.auth0.getUser()
			}

			// Clean up URL
			window.history.replaceState({}, document.title, window.location.pathname)
		} catch (error) {
			console.error('Auth0 callback error:', error)
		}
	}

		async login() {
		if (!this.auth0) await this.init()

		try {
			// Use popup login for better UX (users can close popup to cancel)
			await this.auth0.loginWithPopup()

			// Update authentication state after popup login
			this.isAuthenticated = await this.auth0.isAuthenticated()
			if (this.isAuthenticated) {
				this.user = await this.auth0.getUser()
			}

			this.updateUI()
		} catch (error) {
			// User cancelled popup or other error
			if (error.error === 'cancelled') {
				console.log('Login cancelled by user')
			} else {
				console.error('Login error:', error)
			}
		}
	}

	async logout(options = {}) {
		if (!this.auth0) return

		// Show confirmation if requested
		if (options.confirm !== false) {
			const confirmed = confirm('Are you sure you want to sign out?')
			if (!confirmed) return
		}

		try {
			// Update UI to show loading state
			this.setLoadingState(true)

			await this.auth0.logout({
				logoutParams: {
					returnTo: options.returnTo || window.location.origin
				}
			})
		} catch (error) {
			console.error('Logout error:', error)
			this.setLoadingState(false)
		}
	}

	// Quick logout without confirmation
	async quickLogout() {
		return this.logout({ confirm: false })
	}

	setLoadingState(isLoading) {
		const logoutBtns = document.querySelectorAll('[data-auth-logout]')
		logoutBtns.forEach(btn => {
			if (isLoading) {
				btn.disabled = true
				btn.textContent = 'Signing out...'
			} else {
				btn.disabled = false
				btn.textContent = 'Sign Out'
			}
		})
	}

	async getUser() {
		if (!this.isAuthenticated) return null
		return this.user
	}

	isLoggedIn() {
		return this.isAuthenticated
	}

	updateUI() {
		// Update login buttons
		const loginButtons = document.querySelectorAll('[data-auth-login]')
		const logoutButtons = document.querySelectorAll('[data-auth-logout]')
		const userInfo = document.querySelectorAll('[data-auth-user]')
		const protectedContent = document.querySelectorAll('[data-auth-protected]')

		loginButtons.forEach(btn => {
			btn.style.display = this.isAuthenticated ? 'none' : 'block'
		})

		logoutButtons.forEach(btn => {
			btn.style.display = this.isAuthenticated ? 'block' : 'none'
		})

		userInfo.forEach(element => {
			if (this.isAuthenticated && this.user) {
				element.textContent = this.user.name || this.user.email || 'User'
				element.style.display = 'block'
			} else {
				element.style.display = 'none'
			}
		})

		protectedContent.forEach(element => {
			element.style.display = this.isAuthenticated ? 'block' : 'none'
		})

		// Show/hide login prompts
		const loginPrompts = document.querySelectorAll('[data-auth-login-prompt]')
		loginPrompts.forEach(element => {
			element.style.display = this.isAuthenticated ? 'none' : 'block'
		})

		// Dispatch custom event for other components to listen to
		window.dispatchEvent(new CustomEvent('authStateChanged', {
			detail: {
				isAuthenticated: this.isAuthenticated,
				user: this.user
			}
		}))
	}
}

// Create global instance
window.authManager = new Auth0Manager()

export default window.authManager
