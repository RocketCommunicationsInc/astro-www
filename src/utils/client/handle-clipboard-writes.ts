// intercept clipboard writes to copy values to the clipboard
addEventListener('clipboard:write', (event: ClipboardWriteEvent) => {
	const { href, type = typeOfTextPlain, text = '' } = event.detail
	const target = event.composedPath().shift()!

	Object(
		href == null
			? navigator.clipboard.write([
				toClipboardItem(
					new Blob([ text ], { type })
				),
			])
		: fetch(href).then(
			response => response.blob()
		).then(
			blob => navigator.clipboard.write([ toClipboardItem(blob) ])
		)
	).then(
		() => target.dispatchEvent(new CustomEvent('clipboard:write:success'))
	)
}, { capture: true })

const toClipboardItem = (blob: Blob) => new ClipboardItem(
	blob.type === typeOfTextHTML
		? {
			[typeOfTextPlain]: blob.slice(0, blob.size, typeOfTextPlain),
			[blob.type]: blob,
		}
	: {
		[blob.type]: blob,
	}
)

const typeOfTextHTML = 'text/html'
const typeOfTextPlain = 'text/plain'

interface ClipboardWriteEvent extends Event {
	detail: {
		href?: string
		type?: string
		text?: string
	}
}
