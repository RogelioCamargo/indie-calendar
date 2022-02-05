import React from "react";
import * as dateFns from "date-fns";
import { getDayOfTheMonth, getNextDay } from "./utils";
import { Screening } from "../../types";
import Day from "./Day";
import Week from "./Week";

const CalendarBody = ({ date, screenings }: { date: Date, screenings: Array<Screening> }) => {
	const monthStart = dateFns.startOfMonth(date);
	const monthEnd = dateFns.endOfMonth(monthStart);
	const startDate = dateFns.startOfWeek(monthStart);
	const endDate = dateFns.endOfWeek(monthEnd);
	let day = startDate;

	const rows = [];
	let days = [];

	while (day <= endDate) {
		for (let i = 0; i < 7; i++) {
			let screeningsOfTheDay = screenings.filter(
				(screening: Screening) =>
					screening.date.day === Number(getDayOfTheMonth(day))
			);
			const morningScreenings = screeningsOfTheDay.filter((screening: Screening) =>
				screening.time.toUpperCase().includes("AM")
			);
			const eveningScreenings = screeningsOfTheDay.filter((screening: Screening) =>
				screening.time.toUpperCase().includes("PM")
			);
			eveningScreenings.sort(
				(a: Screening, b: Screening) =>
					Number(a.time.replace(/[^0-9]/g, "")) -
					Number(b.time.replace(/[^0-9]/g, ""))
			);
			screeningsOfTheDay = [...morningScreenings, ...eveningScreenings];
			days.push(
				<Day
					day={day}
					key={day.toDateString()}
					screenings={screeningsOfTheDay}
					monthStart={monthStart}
				/>
			);
			day = getNextDay(day);
		}
		rows.push(<Week key={day.toDateString()}>{days}</Week>);
		days = [];
	}

	return (
		<tbody>
			{rows}
		</tbody>
	);
};

export default CalendarBody;