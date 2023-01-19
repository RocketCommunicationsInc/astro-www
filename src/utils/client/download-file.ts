/** Document body element. */
const bodyElement = document.body

/** Link element used to trigger downloads. */
const linkElement = document.createElement('a')

/** Downloads the given file. */
export const downloadFile = (fileName: string, options: BlobPropertyBag, ...fileContents: BlobPart[]) => {
	// create the file
	const file = new File(fileContents, fileName, options)

	// set the link href and download attributes
	linkElement.href = URL.createObjectURL(file)
	linkElement.download = fileName

	// add the link to the document
	bodyElement.append(linkElement)

	// click the link to download the file
	linkElement.click()

	// remove the link from the document
	linkElement.remove()

	// clear the link href and download attributes
	linkElement.href = ''
	linkElement.download = ''
}
