// intercept clipboard writes to copy values to the clipboard
addEventListener('clipboard:write', (event: ClipboardWriteEvent) => {
	navigator.clipboard.writeText(event.detail.data)
}, { capture: true })

interface ClipboardWriteEvent extends Event {
	detail: {
		data: string
	}
}
