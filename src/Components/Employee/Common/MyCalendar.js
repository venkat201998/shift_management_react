import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

const MyCalendar = ({ eventList }) => {
	const localizer = momentLocalizer(moment);

	// Sample events for the calendar
	const myEventsList = [
		{
			title: 'Long Event',
			start: moment('2024-04-07').toDate(), // April 7, 2024
			end: moment('2024-04-10').toDate(),  // April 10, 2024
		},
		{
			title: 'Some Event',
			start: moment('2024-04-09').toDate(), // April 9, 2024
			end: moment('2024-04-09').toDate(),   // April 9, 2024
		},
		{
			title: 'Conference',
			start: moment('2024-04-11').toDate(), // April 11, 2024
			end: moment('2024-04-13').toDate(),   // April 13, 2024
		},
		{
			title: 'Meeting',
			start: moment('2024-04-12T10:30:00').toDate(), // April 12, 2024, 10:30 AM
			end: moment('2024-04-12T12:30:00').toDate(),   // April 12, 2024, 12:30 PM
			desc: 'Pre-meeting meeting, to prepare for the meeting'
		}
	];

	return (
		<div style={{ height: 700 }}>
			<Calendar
				views={['month', 'week', 'day']}
				localizer={localizer}
				events={eventList}
				startAccessor='start'
				endAccessor='end'
				style={{ height: 500 }}
			/>
		</div>
	);
}

export default MyCalendar;
