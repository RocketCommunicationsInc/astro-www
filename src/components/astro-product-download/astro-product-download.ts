import productData from 'project:data/product-download.json'

// main elements
const headerElement = document.querySelector(
	'.p-astro-product-download_header'
) as HTMLHeadingElement
const downloadButton = document.getElementById('product-download-button')
const buttonInner = downloadButton?.querySelector(
	'.loading-container'
) as HTMLDivElement
const fileSizeText = document.getElementById('product-file-size') as HTMLSpanElement
const descriptionParagraph = document?.querySelector(
	'.p-astro-product-download_description'
) as HTMLDivElement
const supportParagraph = document?.querySelector(
	'.p-astro-product-download_support'
) as HTMLDivElement

// status elements
const statusWrapper = document.querySelector(
	'.p-astro-product-download_status-wrapper'
) as HTMLDivElement
const success = document.querySelector(
	'.p-astro-product-download_success'
) as HTMLDivElement
const successMsg = `Your download has started successfully!`
const error = document.querySelector(
	'.p-astro-product-download_error'
) as HTMLDivElement
const errorMsg = `There was a problem with your request, please try again. If the issue persists, please contact support@astrouxds.com for assistance.`

const handleButtonState = (innerText: string) => {
	downloadButton?.hasAttribute('disabled')
		? downloadButton?.removeAttribute('disabled')
		: downloadButton?.setAttribute('disabled', '')
	buttonInner.classList.toggle('loading')
	buttonInner.innerText = `${innerText}`
}

const getPresignedURL = async (token: string) => {
	handleButtonState('Verifying')

	try {
		const url = `https://astrouxds-ap-fix-jwt-fi-8e6jbd.herokuapp.com/api/v1/get-product?params=${token}`
		const res = await fetch(url, { method: 'GET' })
		const status = res.status
		const data = await res.json()

		if (status !== 201) {
			console.error(data)
			statusWrapper.classList.remove('hidden')
			error.innerText = errorMsg
			return
		}
		window.location.href = data.url
		handleButtonState('Verification Successful')
		downloadButton?.setAttribute('disabled', '')
		downloadButton?.removeEventListener(
			'click',
			() => getPresignedURL(token),
			true
		)
		downloadButton?.classList.add('hidden')
		statusWrapper.classList.remove('hidden')
		success.innerText = successMsg
	} catch (err) {
		console.error(err)
		statusWrapper.classList.remove('hidden')
		error.innerText = errorMsg
	}
}

// api call for validation and data fetching on page load
document.addEventListener('DOMContentLoaded', async () => {
	const urlParams = new URLSearchParams(window.location.search)

	const token =
		window.location.href.indexOf('checkout') > -1
			? urlParams.get('session_id')
			: urlParams.get('token')

	if (!token) {
		console.error('No valid token')
		handleButtonState('Error')
		return
	}

	try {
		const url = `https://astrouxds-ap-fix-jwt-fi-8e6jbd.herokuapp.com/api/v1/validate-token?params=${token}`
		const res = await fetch(url, { method: 'GET' })
		const status = res.status
		const data = await res.json()
		console.log(data)

		if (status !== 201) {
			console.error(data)
			error.innerText = `${data.message} ${errorMsg}`
			handleButtonState('Error')
			return
		}

		// loop through json data to find the correct product entries
		Object.entries(productData).forEach(([ key, value ]) => {
			if (value.name === data.productName) {
				headerElement.innerText = value['header-name']
				descriptionParagraph.innerHTML = value['description-paragraph']
				supportParagraph.innerHTML = value['learn-more']
			}
		})

		handleButtonState('Click Here to Download')

		fileSizeText!.innerText = data.fileSize
		downloadButton?.addEventListener('click', () => getPresignedURL(token))
	} catch (err) {
		console.error(err)
		error.innerText = errorMsg
		handleButtonState('Error')
	}
})
