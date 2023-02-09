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

if (!globalThis.gtag) {
	globalThis.gtag = (...args: any) => globalThis.dataLayer.push(args)
}

export const gtag = globalThis.gtag
