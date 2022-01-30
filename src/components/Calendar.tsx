import React, { useState } from "react";
import * as dateFns from "date-fns";
import { useQuery } from "@apollo/client";
import { ALL_SCREENINGS } from "../graphql/queries";
import { Screening } from "../types";

const Calendar = () => {
	const [date] = useState(new Date());
	const result = useQuery(ALL_SCREENINGS);

	if (result.loading)
    return <div>Loading...</div>

	const monthStart = dateFns.startOfMonth(date);
	const monthEnd = dateFns.endOfMonth(monthStart);
	const startDate = dateFns.startOfWeek(monthStart);
	const endDate = dateFns.endOfWeek(monthEnd);

	const dateFormat = "d";
	const rows = [];

	let days = [];
	let day = startDate;
	const month = dateFns.format(new Date(), "MMMM");
	let formattedDate = "";
	
	// get days of the week
	const daysOfWeek = [];
	for (let i = 0; i < 7; i++) {
		daysOfWeek.push(
			<div className="border border-gray-200 md:flex-1 py-2 font-bold" key={i}>
				{dateFns.format(dateFns.addDays(startDate, i), "iiii")}
			</div>
		);
	}

	rows.push(
		<div className="hidden w-full lg:flex lg:flex-row lg:flex-wrap">
			{daysOfWeek}
		</div>
	);

	while (day <= endDate) {
		for (let i = 0; i < 7; i++) {
			formattedDate = dateFns.format(day, dateFormat);
			days.push(
				<div 
					className={`border border-gray-200 pt-2 px-5 pb-5 md:flex-1 ${
          !dateFns.isSameMonth(day, monthStart)
            ? "bg-gray-100"
            : dateFns.isSameDay(day, new Date()) ? "pb-12 bg-red-500 text-white" : ""
          }`}
					key={day.toDateString()}>
					<span className="block font-bold mb-3">{formattedDate}</span>
					{
						dateFns.isSameMonth(day, monthStart) ? 
						result.data.allScreenings
							.filter((s: Screening) => s.date.day === Number(formattedDate))
							.map((s: Screening) => (
								<div key={s.id} className={`text-sm mb-2 lg:text-xs cursor-pointer ${dateFns.isSameDay(day, new Date()) ? "hover:text-black" : "hover:text-red-500"}`}>
									{s.title.toUpperCase()} | {s.time}
								</div>
							)) : null
					}
				</div>
			);
			day = dateFns.addDays(day, 1);
		}
		rows.push(
			<div className="w-full lg:flex lg:flex-row lg:flex-wrap" key={day.toDateString()}>
				{days}
			</div>
		);
		days = [];
	}

	return (
		<div className="m-5">
			<h2 className="text-2xl lg:text-3xl font-bold mb-5">{month}</h2>
			<div className="border border-gray-200">
				{rows}
			</div>
		</div>
	);
};

export default Calendar;