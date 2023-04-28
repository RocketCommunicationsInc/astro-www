export interface Field {
	type: string
	data: string

	[key: string]: any
}

export interface LinkField {
	data: {
		url: string;
		alt: string;
	}
}

export interface ComplianceFooter {
	type: string
	data: {
		title: Field
		version: Field
		link: LinkField
	}
}

export default Object as ComplianceFooter
