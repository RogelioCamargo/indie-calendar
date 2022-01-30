import React, { useState } from "react";
import * as dateFns from "date-fns";
import { useQuery } from "@apollo/client";
import { ALL_SCREENINGS } from "../../graphql/queries";
import { Screening } from "../../types";
import { getDayOfTheMonth, getMonth, getNextDay } from "./utils";
import Week from "./Week";
import CalendarHeader from "./CalendarHeader";
import Day from "./Day";

const Calendar = () => {
	const [date] = useState(new Date());
	const result = useQuery(ALL_SCREENINGS);

	if (result.loading)
    return <div>Loading...</div>

	const monthStart = dateFns.startOfMonth(date);
	const monthEnd = dateFns.endOfMonth(monthStart);
	const startDate = dateFns.startOfWeek(monthStart);
	const endDate = dateFns.endOfWeek(monthEnd);

	const rows = [];

	let days = [];
	let day = startDate;
	const month = getMonth();

	// create header listing all day of the week names
	rows.push(<CalendarHeader date={startDate} key={"CalendarHeader"} />);

	while (day <= endDate) {
		for (let i = 0; i < 7; i++) {
			const screenings = result.data.allScreenings.filter(
				(screening: Screening) => (
					screening.date.day === Number(getDayOfTheMonth(day))
				)
			);
			days.push(
				<Day 
					day={day} 
					key={day.toDateString()} 
					screenings={screenings} 
					monthStart={monthStart}
				/>
			);
			day = getNextDay(day);
		}
		rows.push(
			<Week key={day.toDateString()}>
				{days}
			</Week>
		);
		days = [];
	}

	return (
		<div className="m-5">
			<h2 className="text-2xl lg:text-3xl font-bold mb-5">
				{month}
			</h2>
			<div className="border border-gray-200">
				{rows}
			</div>
		</div>
	);
};

export default Calendar;