// const popover = document.querySelector('.p-astro-product-access-success-popover') as HTMLDivElement

const success = document.querySelector('.p-astro-product-access-success') as HTMLDivElement
const successMsg = `Request validated. Your download will begin shortly.`
const error = document.querySelector('.p-astro-product-access-error') as HTMLDivElement
const errorMsg = `There was a problem with your request, please try again. If the issue persists, please contact support@astrouxds.com for assistance.`

document.addEventListener('DOMContentLoaded', async () => {
	const urlParams = new URLSearchParams(window.location.search)
	const token = urlParams.get('token')

	if (!token) {
		console.error('No valid token')
		return
	}

	try {
		const url = `https://astrouxds-ap-feat-ap-22-5n6wtk.herokuapp.com/api/v1/validate-token?params=${token}`
		const res = await fetch(url, { method: 'GET' })
		const status = res.status
		const data = await res.json()

		if (status !== 201) {
			console.error(data)
			error.innerText = `${data.message} ${errorMsg}`
			return
		}

		success.innerText = successMsg
		// TODO: IF SUCCESS DOWNLOAD FILE HERE
	} catch (err) {
		console.error(err)
		error.innerText = errorMsg
	}
})
