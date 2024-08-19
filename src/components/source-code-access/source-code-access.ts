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
	subscribe: string = 'off'
}

openButtons.forEach((openBtn) => {
	openBtn.addEventListener('click', () => {
		dialog.showModal()
		gtag('event', 'open_code_access_popup')
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
			params.apps = [...params.apps, value]
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
		const url = 'https://astrouxds-api-196cde1c48d0.herokuapp.com/api/v1/source-code'
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


