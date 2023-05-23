import * as DOM from 'project:utils/client/DOM'
import type { ClassOf } from './types'

/**
 * Returns a HTMLElement class that accepts reflected attributes and properties.
 */
export const ReflectedElement = <
	Element extends HTMLElement,
	Properties extends RecordOfPropertyReflectors<Element>
>(
	Super: ClassOf<Element>,
	properties: {
		[K in keyof Element]?: PropertyReflector<Element,
			K extends keyof Element
				? Element[K]
			: K extends keyof Properties
				? Properties[K]
			: never
		>
	}
) => {
	// @ts-expect-error
	class ReflectedElement extends Super {
		constructor() {
			const element: Element = super()!
			const propertyInternals = withPropertyInternals<Record<PropertyKey, PropertyInternals>>(element, () => ({}))

			for (const name in properties) {
				const descriptor = properties[name]!

				propertyInternals[name] = {
					value: undefined,
					isSet: !('setValue' in descriptor),
					setter(value) {
						if (typeof descriptor.setValue === 'function') {
							value = descriptor.setValue.call(element, value)
						}

						if (value !== this.value) {
							this.value = value

							if (typeof descriptor.onValueChange === 'function') {
								descriptor.onValueChange.call(element, value)
							}
						}
					},
				}
			}

			for (const name in properties) {
				const descriptor = properties[name]!
				const internals = propertyInternals[name]

				for (const attributeName in descriptor.useAttributes) {
					const callback = descriptor.useAttributes[attributeName]

					DOM.observeAttributes(element, () => {
						internals.setter(callback.call(element))
					}, attributeName)
				}

				if (typeof descriptor.useChildList === 'function') {
					const callback = descriptor.useChildList

					DOM.observeChildren(element, () => {
						const returnValue = callback.call(element)

						internals.setter(returnValue)
					})
				}
			}
		}
	}

	for (const name in properties) {
		const descriptor = properties[name]!

		defineProperty(ReflectedElement.prototype as Element, name, {
			configurable: true,
			get() {
				const internals = withPropertyInternals(this)[name]

				return (
					internals.isSet
						? internals.value
					: descriptor.defaultValue.call(this)
				)
			},
			set(value) {
				const internals = withPropertyInternals(this)[name]

				internals.isSet = true

				internals.setter(value)
			},
		})
	}
	return ReflectedElement
}

export const withPropertyInternals = DOM.createInternals<HTMLElement, Record<PropertyKey, PropertyInternals>>()

const { defineProperty }: {
	defineProperty<Target>(o: Target, p: PropertyKey, attributes: PropertyDescriptor<Target>): Target
} = Object

interface PropertyDescriptor<This extends any = any> {
	configurable?: boolean;
	enumerable?: boolean;
	value?: any;
	writable?: boolean;
	get?(this: This): any;
	set?(this: This, v: any): void;
}

interface RecordOfPropertyReflectors<Element> {
	[propertyName: string]: PropertyReflector<Element, any>
}

interface PropertyReflector<Element, Value> {
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

export default ReflectedElement

interface PropertyInternals {
	value: any
	isSet: boolean
	setter(value: any): void
}
