import { visit } from 'unist-util-visit'
import getSizeFromFileSync from '@astropub/get-size/from/FileSync'
import { pathToFileURL } from 'node:url'
import { cwd } from 'node:process'

// @ts-check

/** @typedef {{ command: 'dev' | 'build' | 'preview', publicDir: URL }} Configuration */
/** @typedef {{ type: string, width: number, height: number }} ISize */

function remarkLazyImages(/** @type {Configuration} */ opts) {
	const getImageSize = createGetImageSize(Object(opts))

	return () => (tree, _vfile) => {
		visit(tree, (node, _parent) => {
			if (node === undefined) return
			if (node.type !== 'image') return
			if (typeof node.url !== 'string' && node.url[0] !== '/') return

			const url = node.url.slice(1)

			const { width, height } = getImageSize(url)

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

function createGetImageSize(/** @type {Configuration} */ { publicDir = defaultPublicDir }) {
	const sizeCache = /** @type {Map<string, ISize>} */ (new Map())

	return /** @type {{ (pathname: string): ISize }} */ (pathname) => {
		const pathURL = new URL(pathname, publicDir)

		if (sizeCache.has(pathURL.href)) {
			return sizeCache.get(pathURL.href)
		}

		const result = getSizeFromFileSync(pathURL)

		return result
	}
}

const defaultPublicDir = pathToFileURL(cwd())

defaultPublicDir.pathname += '/'

export default remarkLazyImages
