export interface Reflection<Value extends any = any, Element extends HTMLElement = HTMLElement> {
	/** Returns the value when it has not been set by the user. */
	defaultValue(this: Element): Value

	/** Returns the value when it is requested. */
	getValue?(this: Element): Value

	/** Attempts to set the value. */
	setValue?(this: Element, value: any): Value

	/** Sets the property value on childlist mutations. */
	useChildList?(this: Element): any

	/** Sets the property value on attribute mutations. */
	useAttributes?: {
		[attributeName: string]: {
			(this: Element): any
		}
	}

	/** Called whenever the value has been changed. */
	onValueChange?(this: Element, value: Value): void
}

export interface FunctionOf<T> {
	(...args: any): T
}

export interface ClassOf<T> {
	new (...args: any): T

	prototype: T
}
