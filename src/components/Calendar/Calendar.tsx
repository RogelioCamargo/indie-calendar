import React, { useState } from "react";
import * as dateFns from "date-fns";
import { useQuery } from "@apollo/client";
import { ALL_SCREENINGS } from "../../graphql/queries";
import { Screening } from "../../types";
import { getDayOfTheMonth, getMonth, getNextDay } from "./utils";
import Week from "./Week";
import CalendarHeader from "./CalendarHeader";
import Day from "./Day";
import Loading from "../Loading";
import ServerError from "../Error";

const Calendar = () => {
	const [date] = useState(new Date());
	const result = useQuery(ALL_SCREENINGS);

	if (result.loading)
    return <Loading />

	if (result.error)
		return <ServerError />

	const monthStart = dateFns.startOfMonth(date);
	const monthEnd = dateFns.endOfMonth(monthStart);
	const startDate = dateFns.startOfWeek(monthStart);
	const endDate = dateFns.endOfWeek(monthEnd);
	const month = getMonth();
	let day = startDate;
	
	const rows = [];
	let days = [];
	
	// create header listing all day of the week names
	rows.push(<CalendarHeader date={startDate} key={"CalendarHeader"} />);

	while (day <= endDate) {
		for (let i = 0; i < 7; i++) {
			let screenings = result.data.allScreenings.filter(
				(screening: Screening) => screening.date.day === Number(getDayOfTheMonth(day))
			);
			const morningScreenings = screenings.filter((screening: Screening) => screening.time.toUpperCase().includes("AM"));
			const eveningScreenings = screenings.filter((screening: Screening) => screening.time.toUpperCase().includes("PM"));
			eveningScreenings.sort((a: Screening, b: Screening) => Number(a.time.replace(/[^0-9]/g, "")) - Number(b.time.replace(/[^0-9]/g, "")));
			screenings = [...morningScreenings, ...eveningScreenings];
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
		<div className="px-5 -mt-3 lg:max-w-screen-2xl lg:mx-auto">
			<h2 className="text-xl mb-3 lg:text-3xl font-bold py-3 bg-white sticky top-0">
				{month}
			</h2>
			<div className="border border-gray-200">
				{rows}
			</div>
		</div>
	);
};

export default Calendar;