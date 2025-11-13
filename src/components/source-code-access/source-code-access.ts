import { API_URLS } from '../../../netlify/functions/config/environment.js'
import { isDevelopment } from '../../../netlify/functions/config/environment.js'

const dialog = document.querySelector('.p-source-code-dialog') as HTMLDialogElement
const openButtons = document.querySelectorAll('.p-source-code-dialog-open') as NodeListOf<HTMLButtonElement>
const closeButton = document.querySelector('.p-source-code-dialog-close') as HTMLButtonElement
const submitButton = document.querySelector('.p-source-code-dialog-submit') as HTMLButtonElement
const loadingEle = document.querySelector('.loading-container') as HTMLDivElement
const form = document.querySelector('.p-source-code-form') as HTMLFormElement
const appCheckboxes = document.querySelectorAll('.p-source-code-app-checkbox') as NodeListOf<HTMLInputElement>
const popover = document.querySelector('.p-source-code-success-popover') as HTMLDivElement
const appsError = document.querySelector('.p-source-code-apps-error') as HTMLDivElement
const appsErrorMgs = `Please select an app you like source code access too.`
const error = document.querySelector('.p-source-code-error') as HTMLDivElement
const errorMsg = `There was a problem with your request, please try again. If the issue persists, please contact support@astrouxds.com for assistance.`

class RequestParams {
	apps: string[] = []
	company: string = ''
	email: string = ''
	first: string = ''
	last: string = ''
	use: string = ''
	useDescription: string = ''
	subscribe: string = 'off'
}

// Function to pre-populate form with user data from Auth0
const prePopulateForm = async () => {
	try {
		// Import auth manager dynamically
		const { default: authManager } = await import('project:utils/auth-client.js')

		// Wait for auth to be initialized
		await authManager.init()

		// Check if user is authenticated
		if (authManager.isAuthenticated && authManager.user) {
			const user = authManager.user
			const companyClaim = user['https://astrouxds.com/company'] || user['https://yourdomain.com/company'] || user.user_metadata?.company || ''
			const userForLog = { ...user, company: companyClaim }
			console.log('Pre-populating form for user:', userForLog)

			// Pre-populate first name from user metadata
			const firstNameInput = form.querySelector('input[name="first"]') as HTMLInputElement
			if (firstNameInput) {
				firstNameInput.value = (user.name ? user.name.split(' ')[0] : '')
			}

			// Pre-populate last name from user metadata
			const lastNameInput = form.querySelector('input[name="last"]') as HTMLInputElement
			if (lastNameInput) {
				lastNameInput.value = (user.name ? (user.name.split(' ').length > 1 ? user.name.split(' ').slice(1).join(' ') : '') : '')
			}

			// Pre-populate email
			const emailInput = form.querySelector('input[name="email"]') as HTMLInputElement
			if (emailInput && user.email) {
				emailInput.value = user.email
			}

			// Pre-populate company: use namespaced claim or metadata
			const companyInput = form.querySelector('input[name="company"]') as HTMLInputElement
			if (companyInput) {
				companyInput.value = companyClaim || ''
			}
		}
	} catch (error) {
		console.error('Error pre-populating form:', error)
		// Silently fail - form will just be empty
	}
}

openButtons.forEach((openBtn) => {
	openBtn.addEventListener('click', async () => {
		dialog.showModal()
		gtag('event', 'open_code_access_popup', { 'page_location': window.location.href })

		// Pre-populate form with user data if logged in
		await prePopulateForm()

		appCheckboxes.forEach((checkbox) => {
			if (!openBtn.dataset.app && checkbox.id === 'GRM') {
				checkbox.checked = true
			}

			if (checkbox.id === openBtn.dataset.app) {
				checkbox.checked = true
			}
		})
	})
})

closeButton.addEventListener('click', () => {
	dialog.close()
	resetErrors()
})

const resetErrors = () => {
	appsError.innerText = ''
	error.innerText = ''
}

const setLoading = () => {
	closeButton.setAttribute('disabled', 'true')
	submitButton.setAttribute('disabled', 'true')
	loadingEle.classList.add('loading')
	resetErrors()
}

const resetLoading = () => {
	closeButton.removeAttribute('disabled')
	submitButton.removeAttribute('disabled')
	loadingEle.classList.remove('loading')
}

form.addEventListener('submit', async (e) => {
	e.preventDefault()
	setLoading()
	const data = new FormData(form)
	const params = new RequestParams()

	for (const entry of data) {
		const key = entry[0] as keyof RequestParams
		const value = entry[1] as string
		if (key === 'apps') {
			params.apps = [ ...params.apps, value ]
		} else {
			params[key] = value
		}
	}

	const hasOneAppMin = params.apps.length > 0
	if (!hasOneAppMin) {
		appsError.innerText = appsErrorMgs
		resetLoading()
		return
	}

	try {
		const url = `${isDevelopment ? API_URLS.development : API_URLS.production}/api/v1/source-code`
		const res = await fetch(url, { method: 'post', body: JSON.stringify(params) })
		const status = res.status
		const data = await res.json()

		if (status !== 201) {
			console.error(data)
			error.innerText = errorMsg
			return
		}

		popover.showPopover()
		form.reset()
		dialog.close()
	} catch (err) {
		console.error(err)
		error.innerText = errorMsg
	} finally {
		resetLoading()
	}
})


