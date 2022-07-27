export default function Component<T>(props: Props<T>): any

export interface Props<T> {
	[key: string]: any
}
