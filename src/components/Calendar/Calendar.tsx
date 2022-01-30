import React, { useState } from "react";
import * as dateFns from "date-fns";
import { useQuery } from "@apollo/client";
import { ALL_SCREENINGS } from "../../graphql/queries";
import { Screening } from "../../types";
import { getClassesForDayContainer, getDayOfTheMonth, getMonth } from "./utils";
import Week from "./Week";
import CalendarHeader from "./CalendarHeader";

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

	const Day = ({ day, dayOfTheMonth }: { day: Date, dayOfTheMonth: string }) => (
		<div 
			className={`border border-gray-200 pt-2 px-5 pb-5 md:flex-1 ${getClassesForDayContainer(day, monthStart)}`}>
			<span className="block font-bold mb-3">{dayOfTheMonth}</span>
			{
				dateFns.isSameMonth(day, monthStart) &&
				result.data.allScreenings
					.filter((screening: Screening) => screening.date.day === Number(dayOfTheMonth))
					.map((screening: Screening) => (
						<div key={screening.id} className={`text-sm mb-2 lg:text-xs cursor-pointer ${dateFns.isSameDay(day, new Date()) ? "hover:text-black" : "hover:text-red-500"}`}>
							{screening.title.toUpperCase()} | {screening.time}
						</div>
					))
			}
		</div>
	);

	rows.push(<CalendarHeader date={startDate}/>);

	while (day <= endDate) {
		for (let i = 0; i < 7; i++) {
			days.push(<Day day={day} dayOfTheMonth={getDayOfTheMonth(day)} key={day.toDateString()} />);
			day = dateFns.addDays(day, 1);
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