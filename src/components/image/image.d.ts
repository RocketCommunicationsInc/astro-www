export interface Props {
	url: string
	description?: string
	width?: string | number
	height?: string | number

	[name: string]: any
}

export default function Image(props: Props): any
