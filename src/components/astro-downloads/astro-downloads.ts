const previousVersions: HTMLDivElement|null = document.querySelector('div#previousVersions')
const selectInput: HTMLSelectElement|null = document.querySelector('#allVersions')
const downloadButton: HTMLAnchorElement|null|undefined = previousVersions?.querySelector('#downloadButton')

selectInput?.addEventListener('change', () => {
	const ver = selectInput.value !== '' ? selectInput.value : null
	console.log(ver)
	ver !== null
	? downloadButton?.setAttribute('href', `'https://registry.npmjs.org/@astrouxds/astro-web-components/-/astro-web-components-${ver}.tgz`)
	:	downloadButton?.removeAttribute('href')
 })
