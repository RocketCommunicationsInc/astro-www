import { downloadFile } from './download-file'

// intercept download files to download files
addEventListener('download:file', event => {
	downloadFile(event.detail.name, { type: event.detail.type }, event.detail.text)
}, { capture: true })

declare global {
	export interface WindowEventMap extends GlobalEventHandlersEventMap, WindowEventHandlersEventMap {
		'download:file': DownloadFileEvent
	}

	interface DownloadFileEvent extends Event {
		type: 'download:file'
		detail: {
			name: string
			text: string
			type: string
		}
	}
}
