interface __PlaygroundFieldBase {
	kind: string
	attribute: string
	property: string
}

export interface PlaygroundFieldMenu extends __PlaygroundFieldBase {
	kind: 'menu'
	options: string[]
	value: string
}

export interface PlaygroundFieldRadio extends __PlaygroundFieldBase {
	kind: 'radio'
	label: string
	value: string
}

export interface PlaygroundFieldRadioGroup extends __PlaygroundFieldBase {
	kind: 'radio-group'
	options: PlaygroundFieldRadio[]
	value: string
}

export interface PlaygroundFieldSwitch extends __PlaygroundFieldBase {
	kind: 'switch'
	checked: boolean
}

export interface PlaygroundFieldText extends __PlaygroundFieldBase {
	kind: 'text'
	value: string
}

export type PlaygroundField = PlaygroundFieldMenu | PlaygroundFieldRadioGroup | PlaygroundFieldSwitch | PlaygroundFieldText

export interface PlaygroundDependency {
	tag: string
	constructor: string
}

export interface PlaygroundExample {
	name: string
	code: string
	script?: string
}

export interface PlaygroundRecord {
	tag: string
	route: string
	constructor: string
	examples: PlaygroundExample[]
	fields?: PlaygroundField[]
	dependencies?: PlaygroundDependency[]
	style?: string
	align?: string
}

export interface PlaygroundSchema {
	records: PlaygroundRecord[]
}

export default Object as PlaygroundSchema

export const records = Object as PlaygroundRecord[]
