import React, { useState } from "react";
import * as dateFns from "date-fns";
import { getDayOfTheMonth, getNextDay, sortScreeningsByTime } from "./utils";
import { Screening } from "../../types";
import Day from "./Day";
import Week from "./Week";

const CalendarBody = ({ screenings }: { screenings: Array<Screening> }) => {
	const [date] = useState(new Date());

	const monthStart = dateFns.startOfMonth(date);
	const monthEnd = dateFns.endOfMonth(monthStart);
	const startDate = dateFns.startOfWeek(monthStart);
	const endDate = dateFns.endOfWeek(monthEnd);
	let day = startDate;

	const calendarRows = [];
	let calendarDays = [];

	while (day <= endDate) {
		for (let i = 0; i < 7; i++) {
			const screeningsOfTheDay = screenings.filter(
				(screening: Screening) =>
					screening.date.day === Number(getDayOfTheMonth(day))
			);
			calendarDays.push(
				<Day
					day={day}
					key={day.toDateString()}
					screenings={sortScreeningsByTime(screeningsOfTheDay)}
					monthStart={monthStart}
				/>
			);
			day = getNextDay(day);
		}
		calendarRows.push(<Week key={day.toDateString()}>{calendarDays}</Week>);
		calendarDays = [];
	}

	return <tbody>{calendarRows}</tbody>;
};

export default CalendarBody;
