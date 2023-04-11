import { viteImportYaml } from './vite-plugins/vite-import-yaml.js'
import { viteMinifyRaw } from './vite-plugins/vite-minify-raw.js'
import { vitePostCSS } from './vite-plugins/vite-postcss.js'
import viteImportWithType from './vite-plugins/vite-import-with-type.js'

export default () => [
	viteImportWithType(),
	vitePostCSS(),
	viteImportYaml(),
	viteMinifyRaw(),
]
