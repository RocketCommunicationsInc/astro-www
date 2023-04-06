export interface Ruleset {
	name: string
	numeral: number
	note?: string
	link?: string
	rules?: Rule[]
	note?: undefined
}

export interface Rule {
	numeral: number
	rule: string
	figure?: string
	status: string
	tier: number
}

export interface Content {
	name: string
	numeral: number
	rules?: Rule[]
	rulesets: Ruleset[]
}

export interface Compliance {
	version: string
	contents: Content[]
}

export const version: Compliance['version']
export const contents: Compliance['contents']

export default null as Compliance
