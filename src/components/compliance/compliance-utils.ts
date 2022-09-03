export const { isArray } = Array

/** Returns the numeral for the given compliance section, ruleset, and rule. */
export const toNumeral = (section: any, ruleset: any, rule: any) => [
	section.numeral,
	ruleset.numeral,
	rule.numeral,
].join('.')

/** Returns the class names for the given compliance status. */
export const toStatusClassNames = (rule: any) => `compliance-status -${rule.status}`

/** Returns the class names for the given compliance tier. */
export const toTierClassNames = (rule: any) => `p-compliance-tier -t${rule.tier}`
