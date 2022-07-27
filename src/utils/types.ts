export type anyobject = Record<never, never>
export type anystring = string & anyobject
export type anyboolean = boolean | '' | null | undefined
export type anyprimitive = string | number | bigint | boolean | symbol | null | undefined
