import { load } from './remark-frontmatter-yaml.js'
import { readFileSync } from 'node:fs'

export default function remarkVariables() {
	let cache = Object.create(null)

	return (tree, vfile) => {
		const text = cache[vfile.path] = cache[vfile.path] || readFileSync(vfile.path, 'utf-8')

		if (!text) return

		const [ , , yaml ] = text.match(/^(-{3}(?:\n|\r)([\w\W]+?)(?:\n|\r)-{3})?/) || []

		if (!yaml) return

		const data = load(yaml)

		Object.assign(vfile.data, data)
	}
}
