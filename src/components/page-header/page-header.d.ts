interface Props {
	[attributeName: string]: any
}

declare let ComponentHeader: {
	(props: Props): any

	Heading(props: Props): any
	Subheading(props: Props): any
	Nav(props: Props): any
	NavItem(props: Props): any
}

export = ComponentHeader
