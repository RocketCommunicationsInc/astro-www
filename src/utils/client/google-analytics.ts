export const id = 'G-ZHMMGPG3B3'

const scriptURL = `https://www.googletagmanager.com/gtag/js?id=${id}`
const scriptElement = document.querySelector(`script[src=${JSON.stringify(scriptURL)}]`) || Object.assign(document.createElement('script'), { src: scriptURL })

if (!scriptElement.isConnected) {
	document.head.append(scriptElement)
}

if (!globalThis.dataLayer) {
	globalThis.dataLayer = [
		[ 'js', new Date() ],
		[ 'config', id ],
	]
}

const dataLayer = globalThis.dataLayer

if (!globalThis.gtag) {
	globalThis.gtag = function gtag() {
		dataLayer.push(arguments)
	}
}

export const gtag: Push = globalThis.gtag

interface Push {
	(event: string, parameters: any[]): void
}
