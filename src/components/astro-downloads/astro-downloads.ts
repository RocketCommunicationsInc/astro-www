const selectInput = document.querySelector('#allVersions') as HTMLSelectElement
const downloadButton = document.querySelector('a#downloadButton') as HTMLAnchorElement

selectInput.addEventListener('change', () => {
	const ver = selectInput.value !== '' ? selectInput.value : null
	ver !== null
	? downloadButton?.setAttribute('href', `https://registry.npmjs.org/@astrouxds/astro-web-components/-/astro-web-components-${ver}.tgz`)
	:	downloadButton?.removeAttribute('href')
 })
