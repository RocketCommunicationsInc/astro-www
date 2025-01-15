// const popover = document.querySelector('.p-astro-product-access-success-popover') as HTMLDivElement

// const success = document.querySelector(
// 	'.p-astro-product-access-success'
// ) as HTMLDivElement
// const successMsg = `Request validated. Your download will begin shortly.`
const error = document.querySelector(
	'.p-astro-product-access-error'
) as HTMLDivElement
const errorMsg = `There was a problem with your request, please try again. If the issue persists, please contact support@astrouxds.com for assistance.`
const downloadButton = document.getElementById('product-download-button')
const buttonInner = downloadButton?.querySelector('.loading-container') as HTMLDivElement

const errorState = () => {
		buttonInner.classList.remove('loading')
		buttonInner.innerText = 'Error'
}

document.addEventListener('DOMContentLoaded', async () => {
	const urlParams = new URLSearchParams(window.location.search)
	const token = urlParams.get('token')

	if (!token) {
		console.error('No valid token')
		errorState()
		return
	}

	try {
		const url = `https://astrouxds-api-196cde1c48d0.herokuapp.com/api/v1/validate-token?params=${token}`
		const res = await fetch(url, { method: 'GET' })
		const status = res.status
		const data = await res.json()
		console.log(data)

		if (status !== 201) {
			console.error(data)
			error.innerText = `${data.message} ${errorMsg}`
			errorState()
			return
		}

		downloadButton?.removeAttribute('disabled')
		buttonInner.classList.remove('loading')
		buttonInner.innerText = 'Click Here to Download'
		// success.innerText = successMsg
		// TODO: IF SUCCESS DOWNLOAD FILE HERE
	} catch (err) {
		console.error(err)
		error.innerText = errorMsg
		errorState()
	}
})
