import React, { useState } from "react";
import * as dateFns from "date-fns";
import { useQuery } from "@apollo/client";
import { ALL_SCREENINGS } from "../graphql/queries";
import { Screening } from "../types";
import { getClassesForDayContainer, getDayName, getDayOfTheMonth, getMonth } from "../utils";

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

	const DayName = ({ name }: { name: string }) => (
		<div className="border border-gray-200 md:flex-1 py-2 font-bold">
			{name}
		</div>
	);
	
	const DayNameWeek = ({ children }: { children: Array<JSX.Element>}) => (
		<div className="hidden w-full lg:flex">
			{children}
		</div>
	);

	const Week = ({ day, children }: { day: Date, children: Array<JSX.Element>}) => (
		<div className="w-full lg:flex lg:flex-row lg:flex-wrap">
			{children}
		</div>
	);

	// get days of the week
	const daysOfWeek = [];
	for (let i = 0; i < 7; i++) {
		daysOfWeek.push(
			<DayName name={getDayName(startDate, i)} key={i}/>
		);
	}

	rows.push(
		<DayNameWeek key={"WeekNames"}>
			{daysOfWeek}
		</DayNameWeek>
	);

	while (day <= endDate) {
		for (let i = 0; i < 7; i++) {
			days.push(<Day day={day} dayOfTheMonth={getDayOfTheMonth(day)} key={day.toDateString()} />);
			day = dateFns.addDays(day, 1);
		}
		rows.push(
			<Week day={day} key={day.toDateString()}>
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