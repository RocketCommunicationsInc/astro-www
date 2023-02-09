import { viteImportYaml } from './vite-plugins/vite-import-yaml.js'
import { viteMinifyRaw } from './vite-plugins/vite-minify-raw.js'
import { vitePostCSS } from './vite-plugins/vite-postcss.js'

export default () => [
	vitePostCSS(),
	viteImportYaml(),
	viteMinifyRaw(),
]
