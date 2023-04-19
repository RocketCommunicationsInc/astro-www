import { visit } from 'unist-util-visit'
import getSizeFromFileSync from '@astropub/get-size/from/FileSync'
import { pathToFileURL } from 'node:url'
import { cwd } from 'node:process'
import loader from '@astrojs/image/squoosh'
import * as fs from 'node:fs/promises'

// @ts-check

/** @typedef {{ command: 'dev' | 'build' | 'preview', publicDir: URL }} Configuration */
/** @typedef {{ type: string, width: number, height: number }} ISize */

function remarkLazyImages(/** @type {Configuration} */ opts) {
	const promises = []
	const getImageSize = createGetImageSize(Object(opts))
	const getWebPImage = createGetWebPImage(Object(opts), promises)

	return () => async (tree, _vfile) => {
		visit(tree, (node, _parent) => {
			if (node === undefined) return
			if (node.type !== 'image') return
			if (typeof node.url !== 'string' && node.url[0] !== '/') return

			const url = node.url.slice(1)

			const { type, width, height } = getImageSize(url)

			if (type === 'png') {
				node.url = getWebPImage(node.url)
			}

			node.data = {
				hName: 'img',
				hProperties: {
					loading: 'lazy',
					width: String(width),
					height: String(height),
				},
			}
		})

		await Promise.all(promises)
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

function createGetWebPImage(/** @type {Configuration} */ { command, publicDir = defaultPublicDir }, promises = []) {
	const writeCache = /** @type {Map<string, ISize>} */ (new Map())

	const compress = /** @type {{ (pathname: string, webppathname: string): Promise<void> }} */ async (pngPath, webpPath) => {
		if (writeCache.has(pngPath)) {
			return
		}

		writeCache.set(pngPath, true)

		const pngURL = new URL(pngPath.slice(1), publicDir)
		const webpURL = new URL(webpPath.slice(1), publicDir)

		const webpImage = await loader.transform(await fs.readFile(pngURL), {
			format: 'webp',
			quality: 50,
		})

		await fs.writeFile(webpURL, webpImage.data)
	}

	return /** @type {{ (pathname: string): string }} */ (pathname) => {
		if (command !== 'build') {
			return pathname
		}

		const webppathname = pathname.replace(/\.png$/, '.webp')

		promises.push(
			compress(pathname, webppathname)
		)

		return webppathname
	}
}

const defaultPublicDir = pathToFileURL(cwd())

defaultPublicDir.pathname += '/'

export default remarkLazyImages
