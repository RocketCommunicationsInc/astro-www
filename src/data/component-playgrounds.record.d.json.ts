interface __PlaygroundFieldBase {
	kind: string
	attribute: string
	property: string
}

export interface PlaygroundFieldMenu extends __PlaygroundFieldBase {
	kind: 'menu'
	options: string[]
}

export interface PlaygroundFieldText extends __PlaygroundFieldBase {
	kind: 'text'
	value: string
}

export interface PlaygroundFieldSwitch extends __PlaygroundFieldBase {
	kind: 'switch'
	checked: boolean
}

export type PlaygroundField = PlaygroundFieldMenu | PlaygroundFieldText | PlaygroundFieldSwitch

export interface PlaygroundExample {
	name: string
	code: string
}

export interface PlaygroundRecord {
	tag: string
	route: string
	constructor: string
	examples: PlaygroundExample[]
	fields?: PlaygroundField[]
}

export interface PlaygroundSchema {
	records: PlaygroundRecord[]
}

export default Object as PlaygroundSchema

export const records = Object as PlaygroundRecord[]
