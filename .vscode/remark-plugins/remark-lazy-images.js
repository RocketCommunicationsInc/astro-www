import { createReadStream, fstatSync, openSync, readSync, statSync } from 'node:fs'
import { visit } from 'unist-util-visit'
import { getSizeFromUint8Array } from '@astropub/get-size'

/** @typedef {{ publicDir: URL }} Options */

function remarkLazyImages(/** @type {Options} */ opts) {
	opts = Object(opts)

	const getImageSize = createGetImageSize()

	return () => (tree, _vfile) => {
		visit(tree, (node, _parent) => {
			if (node === undefined) return
			if (node.type !== 'image') return
			if (typeof node.url !== 'string' && node.url[0] !== '/') return

			const pathName = node.url.slice(1)
			const pathURL = new URL(pathName, opts.publicDir)
			const { width, height } = getImageSize(pathURL)

			node.data = {
				hName: 'img',
				hProperties: {
					loading: 'lazy',
					width: String(width),
					height: String(height),
				},
			}
		})
	}
}

function createGetImageSize() {
	const cache = new Map()

	return (pathURL) => {
		if (cache.has(pathURL.href)) {
			return cache.get(pathURL.href)
		}

		const fileDescriptor = openSync(pathURL, 'r')
		const { size } = fstatSync(fileDescriptor)
		const maxBufferSize = 512 * 1024
		const bufferSize = Math.min(size, maxBufferSize)
		const buffer = Buffer.alloc(bufferSize)

		readSync(fileDescriptor, buffer, 0, bufferSize, 0)

		const array = new Uint8Array(buffer.buffer)

		const results = getSizeFromUint8Array(array)

		cache.set(pathURL.href, results)

		return results
	}
}

export default remarkLazyImages
