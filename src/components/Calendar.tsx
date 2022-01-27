import React, { useState } from "react";
import * as dateFns from "date-fns";

const Calendar = () => {
	const [date] = useState(new Date());

	const monthStart = dateFns.startOfMonth(date);
	const monthEnd = dateFns.endOfMonth(monthStart);
	const startDate = dateFns.startOfWeek(monthStart);
	const endDate = dateFns.endOfWeek(monthEnd);

	const dateFormat = "d";
	const rows = [];

	let days = [];
	let day = startDate;
	let formattedDate = "";

	while (day <= endDate) {
		for (let i = 0; i < 7; i++) {
			formattedDate = dateFns.format(day, dateFormat);
			days.push(
				<div className="border-2 border-gray-300 pt-2 px-5 pb-12 md:flex-1" key={day.toDateString()}>
					<span>{formattedDate}</span>
					<p>7:00pm - Freaky Friday</p>
					<p>7:00pm - Freaky Friday</p>
					<p>7:00pm - Freaky Friday</p>
				</div>
			);
			day = dateFns.addDays(day, 1);
		}
		rows.push(
			<div className="w-100 lg:flex lg:flex-row lg:flex-wrap" key={day.toDateString()}>
				{days}
			</div>
		);
		days = [];
	}

	return (
		<div className="">
			{rows}
		</div>
	);
};

export default Calendar;