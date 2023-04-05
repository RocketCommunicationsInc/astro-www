export const getTime = (dateTime: string) => new Date(dateTime).toLocaleString('en-US', {
	hour: 'numeric',
	minute: '2-digit',
	timeZoneName: 'short'
})

export const getDate = (dateTime: string) => new Date(dateTime).toLocaleString('en-US', {
	day: '2-digit',
	month: '2-digit',
	year: 'numeric',
	timeZone: 'PST',
})

export const isAllDay = (startDate: string, endDate: string) => {
	const dateA = new Date(`${startDate}T00:00:00.000Z`)
	const dateB = new Date(`${endDate}T00:00:00.000Z`)

	// moves the date back by 1 day
	dateB.setDate(dateB.getDate() - 1)

	return dateA.valueOf() === dateB.valueOf()
}

export const getDateRange = (startDate: string, endDate: string) => {
	const dateA = new Date(`${startDate}T00:00:00.000Z`)
	const dateB = new Date(`${endDate}T00:00:00.000Z`)

	// moves the date back by 1 day
	dateB.setDate(dateB.getDate() - 1)

	return `${
		dateA.toLocaleString('en-US', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
			timeZone: 'UTC',
		})
	} ${
		dateA.valueOf() === dateB.valueOf()
			? ``
		: `- ${
			dateB.toLocaleString('en-US', {
				day: '2-digit',
				month: '2-digit',
				year: 'numeric',
				timeZone: 'UTC',
			})
		}`
	}`
}
