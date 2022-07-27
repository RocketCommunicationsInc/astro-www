export const createExactMatcher = (...values: any[]) => {
	const set = new Set(values)
	return set.has.bind(set) as (value: any) => boolean
}

export const createLooseMatcher = (value: RegExp) => value.test.bind(value) as (string: string) => boolean
