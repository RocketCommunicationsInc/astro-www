export const id = 'G-ZHMMGPG3B3'

const dataLayer = globalThis.dataLayer = [
	[ 'js', new Date() ],
	[ 'config', id ],
] as [ command: string, ...parameters: any[]][ ]

export const gtag = globalThis.gtag = (command: string, ...parameters: string[]) => {
	dataLayer.push([ command, ...parameters ])
}

if (globalThis.document) {
	const scriptElement = document.createElement('script')

	scriptElement.src = `https://www.googletagmanager.com/gtag/js?id=${id}`

	document.head.append(scriptElement)
}
