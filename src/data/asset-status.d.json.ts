export interface Asset {
	name: string
	type: 'documentation' | 'ui' | 'component' | 'token'
	link: string
	version: string
	status: 'available' | 'unavailable' | 'planned' | 'inprogress' | 'deprecated'
}

export interface Component {
	id: string
	assets: Asset[]
}

export interface General {
	[key: string]: string
}

export interface Data {
	[component: string]: Component
}

export interface AssetStatus {
	general?: General,
	data: Data
}

export declare const general: General
export declare const data: Data

export default null as AssetStatus
