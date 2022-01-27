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
				<div className="col" key={day.toDateString()}>
					<span>{formattedDate}</span>
				</div>
			);
			day = dateFns.addDays(day, 1);
		}
		rows.push(
			<div className="row" key={day.toDateString()}>
				{days}
			</div>
		);
		days = [];
	}

	return (
		<div>
			{rows}
		</div>
	);
};

export default Calendar;