import { viteImportYaml } from './vite-plugins/vite-import-yaml.js'
import { viteMinifyRaw } from './vite-plugins/vite-minify-raw.js'

export default () => [
	viteImportYaml(),
	viteMinifyRaw(),
]
