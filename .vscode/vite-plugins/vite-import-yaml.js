import { parseAsYaml } from 'parse-yaml'

export function viteImportYaml() {
	const name = 'vite:import-yaml'

	const plugin = {
		name,
		transform(code, importee) {
			if (importee.endsWith('yml')) {
				return {
					code: 'export default ' + JSON.stringify(
						parseAsYaml(code),
						null,
						'\t'
					)
				}
			}
		},
	}

	return plugin
}
