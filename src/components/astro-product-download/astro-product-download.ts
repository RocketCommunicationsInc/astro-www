import productData from 'project:data/product-download.json'
import { isDevelopment, API_URLS } from '../../../netlify/functions/config/environment.js'

// main elements
const mainElement = document.querySelector(
	'.p-astro-product-download'
) as HTMLDivElement
const headerElement = document.querySelector(
	'.p-astro-product-download_header'
) as HTMLHeadingElement
const licenseElement = document.querySelector(
	'.p-astro-product-download_license'
) as HTMLHeadingElement
const licenseText = document.querySelector(
	'.p-astro-product-download_license-text'
) as HTMLHeadingElement
const downloadButton = document.getElementById('product-download-button')
const buttonInner = downloadButton?.querySelector(
	'.loading-container'
) as HTMLDivElement
const fileSizeText = document.getElementById('product-file-size') as HTMLSpanElement
const expireTimeText = document.getElementById('product-expire-time') as HTMLSpanElement
const descriptionParagraph = document?.querySelector(
	'.p-astro-product-download_description'
) as HTMLDivElement
const supportParagraph = document?.querySelector(
	'.p-astro-product-download_support'
) as HTMLDivElement

// purchase not found error page
const purchaseNotFoundElement = document.querySelector(
	'.p-astro-product-download_purchase-not-found'
) as HTMLDivElement

// expired error page
const linkExpiredElement = document.querySelector(
	'.p-astro-product-download_link-expired'
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
const errorMsg = `<span>Error:&nbsp;</span>Oops... Something went wrong. Please contact our <a href="mailto:support@astrouxds.com">Support Team</a> for help downloading your purchase.`

const handleButtonState = (innerText: string) => {
	downloadButton?.hasAttribute('disabled')
		? downloadButton?.removeAttribute('disabled')
		: downloadButton?.setAttribute('disabled', '')
	buttonInner.classList.toggle('loading')
	buttonInner.innerText = `${innerText}`
}

const handlePurchaseNotFoundState = () => {
	purchaseNotFoundElement.classList.remove('hidden')
	mainElement.classList.add('hidden')
}

const handleExpiredState = () => {
	linkExpiredElement.classList.remove('hidden')
	mainElement.classList.add('hidden')
}

const safeSetHTML = (element: HTMLElement | null, html: string): void => {
    if (!element) {
        console.warn('Element not found when trying to set HTML')
        return
    }

    // Use DOMParser for safe parsing
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')

    // Clear existing content
    element.innerHTML = ''

    // Append parsed nodes
    Array.from(doc.body.childNodes).forEach(node => {
        element.appendChild(node.cloneNode(true))
    })
}

const getPresignedURL = async (token: string) => {
	handleButtonState('Verifying')
	const isCheckout = window.location.href.indexOf('checkout') > -1

	try {
		const url = `${isDevelopment ? API_URLS.development : API_URLS.production}/api/v1/get-product?params=${token}&isCheckout=${isCheckout}`
		const res = await fetch(url, { method: 'GET' })
		const status = res.status
		const data = await res.json()

		if (status !== 201) {
			console.error(data)
			statusWrapper.classList.remove('hidden')
			error.textContent = errorMsg
			handleButtonState('Click Here to Download')
			return
		}
		window.location.href = data.url
		handleButtonState('Click Here to Download')
		// removing for now, but this code may need to be added back in to remove the button if the download is successful to prevent mal use.
		// downloadButton?.setAttribute('disabled', '')
		// downloadButton?.removeEventListener(
		// 	'click',
		// 	() => getPresignedURL(token),
		// 	true
		// )
		// downloadButton?.classList.add('hidden')
		statusWrapper.classList.remove('hidden')
		success.textContent = successMsg
	} catch (err) {
		console.error(err)
		statusWrapper.classList.remove('hidden')
		error.textContent = errorMsg
	}
}

// api call for validation and data fetching on page load
document.addEventListener('DOMContentLoaded', async () => {
	const urlParams = new URLSearchParams(window.location.search)
	const isCheckout = window.location.href.indexOf('checkout') > -1
	const token =
		isCheckout
			? urlParams.get('session_id')
			: urlParams.get('token')

	if (!token) {
		console.error('No valid token')
		handlePurchaseNotFoundState()
		return
	}


	try {
		const url = `${isDevelopment ? API_URLS.development : API_URLS.production}/api/v1/validate-token?params=${token}&isCheckout=${isCheckout}`
		const res = await fetch(url, { method: 'GET' })
		const status = res.status
		const data = await res.json()

		if (status !== 201) {
			console.error(data)
			data.message.includes('expired') ? handleExpiredState() : handlePurchaseNotFoundState()
			return
		}

		// loop through json data to find the correct product entries
		Object.entries(productData).forEach(([ key, value ]) => {
			if (value.name === data.productName) {
				headerElement.textContent = value['header-name']
				safeSetHTML(descriptionParagraph, value['description-paragraph'])
				safeSetHTML(supportParagraph, value['learn-more'])

				// set license text based on license type returned from api
				switch (data.license) {
					case 'Individual License':
						licenseText.textContent = value.individual
						break
					case 'Team License':
						licenseText.textContent = value.team
						break
					case 'Project License':
						licenseText.textContent = value.project
						break
				}
			}
		})

		handleButtonState('Click Here to Download')

		// get token expire time (returns in hours) convert to days if needed and append text
		const expireTimeInt = parseInt(data.expireTime)
		const expireTimeString = expireTimeInt <= 72 ? data.expireTime + ' hours' : Math.floor(expireTimeInt / 24) + ' days'

		// get filesize and round to same number as browser when download starts e.g. 10.18 --> 10.2
		const fileSizeFloat = parseFloat(data.fileSize)
		const fileSizeFloatRound = Math.ceil(fileSizeFloat * 10) / 10

		fileSizeText!.textContent = fileSizeFloatRound.toString()
		expireTimeText!.textContent = expireTimeString
		licenseElement.textContent = data.license
		downloadButton?.addEventListener('click', () => getPresignedURL(token))
	} catch (err) {
		console.error(err)
	}
})
