import React, { useState } from "react";
import * as dateFns from "date-fns";
import { gql, useQuery } from "@apollo/client";

const ALL_SCREENINGS = gql`
	query {
		allScreenings {
			id
			title
			time
			date {
				day
			}
		}
	}
`;

interface ScreeningDate {
	day: number
}
interface Screening {
	id: string;
  title: string;
  time: string;
	date: ScreeningDate;
}

const Calendar = () => {
	const [date] = useState(new Date());
	const result = useQuery(ALL_SCREENINGS);

	if (result.loading)
    return <div>Loading...</div>

	// console.log(result.data.allScreenings.map(s => s.title));

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
					{
						dateFns.isSameMonth(day, monthStart) ? 
						result.data.allScreenings
							.filter((s: Screening) => s.date.day === Number(formattedDate))
							.map((s: Screening) => (
								<div key={s.id}>
									{s.time} - {s.title}
								</div>
							)) : null
					}
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