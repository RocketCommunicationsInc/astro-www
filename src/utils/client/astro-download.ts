import { html } from 'project:utils/html.ts'

const getPackageInfo = async () => {
	const data = await fetch('https://registry.npmjs.org/@astrouxds/astro-web-components/').then((response) => {
	console.log(response)
	return response.ok ? response.json() : null
}).catch((err) => console.log(err, 'an error occured'))
	return data
}
const packageJson = await getPackageInfo()
const downloadLink = 'https://registry.npmjs.org/@astrouxds/astro-web-components/-/astro-web-components-'

const getLinks = () => {
const latestLink: HTMLAnchorElement|null = document.querySelector('a#latest-download')
const previousVersions: HTMLDivElement|null = document.querySelector('div#previousVersions')
const selectInput: HTMLSelectElement|null = document.querySelector('#allVersions')
const downloadButton: HTMLAnchorElement|null|undefined = previousVersions?.querySelector('#downloadButton')

// handle latest links
if (!latestLink) return
	latestLink.removeAttribute('hidden')
if (packageJson) {
	const latestVersion = packageJson[`dist-tags`].latest
	latestLink.href = `${downloadLink}${latestVersion}.tgz`
} else {
	latestLink.textContent = 'Currently Unavailable'
	latestLink.style.color = 'red'
	latestLink.removeAttribute('href')
}

// handle all versions
if (!previousVersions) return
const allVersions = Object.keys(packageJson.versions)
const pattern = /^[6-9]\d?\.\d+\.\d+$/
const filteredVersions = allVersions.filter((ver) => pattern.test(ver)).reverse()

if (filteredVersions.length < 1) return
previousVersions.removeAttribute('hidden')
selectInput?.addEventListener('change', () => {
	const ver = selectInput.value
	ver !== null
	? downloadButton?.setAttribute('href', `${downloadLink}${ver}.tgz`)
	:	downloadButton?.removeAttribute('href')
 })
selectInput?.appendChild(html(`<option>--Select Version--</option>`))


for (const version of filteredVersions) {
	const option = html(`<option value=${version}>${version}</option>`)
	selectInput?.appendChild(option)
}
}

getLinks()
