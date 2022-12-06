const key = 'AIzaSyCv0VW46P7doaxrHdQo4DGD_ydxKDDkKdA';
(() => {
	// get todays date and convert it to ISO so we only get events that happen today or after
	const startDate = new Date().toISOString();

    const url = `https://www.googleapis.com/calendar/v3/calendars/c_c00bcad50f7ad0acd24c335ddf65e16efd7538c0dd57be307b40c1677feb2637@group.calendar.google.com/events?maxResults=6&orderBy=startTime&singleEvents=true&timeMin=${startDate}&key=${key}`
	fetch(url) // api for the get request
  .then(response => response.json())
  .then((data) => {
	// if the data is good -- make sure its the right kind
	if (data.kind === `calendar#events`) {
		const communityEvents = document.querySelector('.p-community-events-content');
		// clear events
		communityEvents.innerHTML = '';
		// grab what we need and stick it in an array
		const events = data.items;

		// run through the array and add events to the .p-community-events-content div
		for (const item of events) {
			// format the date and time properly and then desconstruct
			const { date, time } = getTime(item.start.dateTime, item.start.date)

			// set up the event for posting
			const event = {
				date,
				time,
				title: item.summary,
				subTitle: item.location,
				url: item.htmlLink,
			}

			// add the event to community events list
			communityEvents.innerHTML += (
`			<article class="p-community-event">
				<small class="p-community-event-date">
					<span class="-date">${event.date}</span>
					${event.time && (
						`<span class="-time">${event.time}</span>`
					)}
				</small>
				<hgroup class="p-community-event-heading">
					<h5>${event.title}</h5>
					${event.subTitle && (
						`<small class="p-community-event-subheading">${event.subTitle}</small>`
					)}
				</hgroup>
				<span class="p-community-event-actions">
					<a href=${event.url} target="_blank">View Details</a>
				</span>
			</article>`
			)
		}
	} else
	// if there's an error
	if (data.error) {
		// do some stuff in here.. for now just make it log it
		console.log(data.error.code, data.error.message)
	} else {
		// something else happened?
		console.log(data, 'Something has gone horribly wrong!')
	}
});
})()

function getTime(ISOdateTime, ISOdate) {
	// does ISODateTime exist? If not then it is an all day event
	if (!ISOdateTime && ISOdate) {
		// since the date for all day events has strangeness due to timezone when converted, just reorganize the date instead
		const dateArray = ISOdate.split('-');
		const date = `${dateArray[1]}/${dateArray[2]}/${dateArray[0]}`
		return {
			date,
			time: 'All Day!'
		}
	}
	// set isoDate to something workable
	const dateTime = new Date(ISOdateTime);

	// get an appropriate datestring
	const date = dateTime.toLocaleString('en-US', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		});
		// create an appropriate time string
		const time = dateTime.toLocaleString('en-US', {
		timeZone: 'PST',
		hour: 'numeric',
		minute: '2-digit',
		timeZoneName: 'short'
		});

	return {
		date,
		time,
	}
}
