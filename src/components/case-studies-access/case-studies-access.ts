const dialog = document.querySelector('.p-case-studies-dialog') as HTMLDialogElement
const showButton = document.querySelector('.open') as HTMLButtonElement
const closeButton = document.querySelector('.close') as HTMLButtonElement
const submit = document.querySelector('.submit') as HTMLDivElement
const form = document.querySelector('.p-case-studies-form') as HTMLFormElement
const error = document.querySelector('.p-case-studies-error') as HTMLDivElement
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

showButton.addEventListener('click', () => {
  dialog.showModal()
})

closeButton.addEventListener('click', () => {
  dialog.close()
})

form.addEventListener('submit', async (e) => {
	e.preventDefault()
	submit.classList.add('loading')
	error.innerText = ''
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

	try {
		// TODO replace with live server url
		const url = 'http://localhost:9090/api/v1/sample-apps'
		const res = await fetch(url, { method: 'post', body: JSON.stringify(params) })
		const status = res.status
		const data = await res.json()

		if (status !== 201) {
			console.error(data)
			error.innerText = errorMsg
			return
		}

		form.reset()
		dialog.close()
	} catch (err) {
		console.error(err)
		error.innerText = errorMsg
	} finally {
		submit.classList.remove('loading')
	}
})


