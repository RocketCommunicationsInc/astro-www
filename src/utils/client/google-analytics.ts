export const id = 'G-ZHMMGPG3B3'

const scriptURL = `https://www.googletagmanager.com/gtag/js?id=${id}`

const dataLayer = (
	globalThis.dataLayer = (
		globalThis.dataLayer || [
			[ 'js', new Date() ],
			[ 'config', id ],
		]
	)
) as [ command: string, ...parameters: any[]][ ]

export const gtag = (
	globalThis.gtag = (
		globalThis.gtag || (
			(...args: any) => dataLayer.push(args)
		)
	)
) as {
	(command: string, ...parameters: string[]): void
}

const scriptElement = document.querySelector(`script[src=${JSON.stringify(scriptURL)}]`) || Object.assign(document.createElement('script'), { src: scriptURL })

if (!scriptElement.isConnected) {
	document.head.append(scriptElement)
}
