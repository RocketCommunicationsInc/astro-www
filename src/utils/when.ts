export function when<T>(value: T, call: { (value: NonNullable<T>): any }) {
	return value ? call(value) : null
}
