export const { defineProperties: setProps, getOwnPropertyDescriptors: getProps } = Object

export const extendProps = (target: object, value: object) => setProps(target, getProps(value))
