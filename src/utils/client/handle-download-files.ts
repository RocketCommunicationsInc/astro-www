import { downloadFile } from './download-file'

// intercept download files to download files
addEventListener('download:file', (event: DownloadFileEvent) => {
	downloadFile(event.detail.name, { type: event.detail.type }, event.detail.text)
}, { capture: true })

interface DownloadFileEvent extends Event {
	type: 'download:file'
	detail: {
		name: string
		text: string
		type: string
	}
}
