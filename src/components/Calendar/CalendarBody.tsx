import React, { useState } from "react";
import * as dateFns from "date-fns";
import { getDayOfTheMonth, getNextDay, sortScreeningsByTime } from "./utils";
import { Screening } from "../../types";
import Day from "./Day";
import Week from "./Week";

const CalendarBody = ({ screenings }: { screenings: Array<Screening> }) => {
	const [date] = useState(new Date());

	const startOfMonth = dateFns.startOfMonth(date);
	const endOfMonth = dateFns.endOfMonth(startOfMonth);
	const startDate = dateFns.startOfWeek(startOfMonth);
	const endDate = dateFns.endOfWeek(endOfMonth);
	let day = startDate;

	const calendarRows = [];
	let calendarDays = [];

	while (day <= endDate) {
		// create week rows
		for (let i = 0; i < 7; i++) {
			// get screenings of that day
			const screeningsOfTheDay = screenings.filter(
				(screening: Screening) =>
					screening.date.day === Number(getDayOfTheMonth(day))
			);
			// get days of that week
			calendarDays.push(
				<Day
					day={day}
					key={day.toDateString()}
					screenings={sortScreeningsByTime(screeningsOfTheDay)}
					startOfMonth={startOfMonth}
				/>
			);
			day = getNextDay(day);
		}
		calendarRows.push(<Week key={day.toDateString()}>{calendarDays}</Week>);
		calendarDays = [];
	}

	return <tbody className="">{calendarRows}</tbody>;
};

export default CalendarBody;
